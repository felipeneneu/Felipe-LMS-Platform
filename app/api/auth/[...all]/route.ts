import { auth } from "@/lib/auth";
import arcjet, { detectBot, protectSignup, slidingWindow } from "@/lib/arcjet";
import ip from "@arcjet/ip";
import {
  type ArcjetDecision,
  type BotOptions,
  type EmailOptions,
  type ProtectSignupOptions,
  type SlidingWindowRateLimitOptions,
} from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const emailOptions = {
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

const botOptions = {
  mode: "LIVE",
  // configured with a list of bots to allow from
  // https://arcjet.com/bot-list
  allow: [], // prevents bots from submitting the form
} satisfies BotOptions;

const rateLimitOptions = {
  mode: "LIVE",
  interval: "2m", // counts requests over a 2 minute sliding window
  max: 5, // allows 5 submissions within the window
} satisfies SlidingWindowRateLimitOptions<[]>;

const signupOptions = {
  email: emailOptions,
  // uses a sliding window rate limit
  bots: botOptions,
  // It would be unusual for a form to be submitted more than 5 times in 10
  // minutes from the same IP address
  rateLimit: rateLimitOptions,
} satisfies ProtectSignupOptions<[]>;

const emailSensitivePaths = new Set([
  "/api/auth/sign-up",
  "/api/auth/sign-up/email",
  "/api/auth/sign-in/email",
  "/api/auth/email-otp/send-verification-otp",
  "/api/auth/email-otp/request-password-reset",
]);

const rateLimitedPaths = new Set([
  "/api/auth/sign-up",
  "/api/auth/sign-up/email",
  "/api/auth/sign-in/email",
  "/api/auth/sign-in/email-otp",
  "/api/auth/email-otp/send-verification-otp",
  "/api/auth/email-otp/check-verification-otp",
  "/api/auth/email-otp/verify-email",
  "/api/auth/email-otp/request-password-reset",
  "/api/auth/email-otp/reset-password",
]);

function pathMatches(pathname: string, patterns: Set<string>): boolean {
  return Array.from(patterns).some(
    (pattern) => pathname === pattern || pathname.startsWith(`${pattern}/`),
  );
}

async function readJsonBody(req: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    return (await req.clone().json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmailFormatValid(email: string): boolean {
  return emailFormatRegex.test(email);
}

async function protect(req: NextRequest): Promise<ArcjetDecision> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  const sessionUserId = session?.user.id?.trim();
  const fingerprint = sessionUserId || ip(req) || "127.0.0.1";
  const pathname = req.nextUrl.pathname;
  const body = await readJsonBody(req);

  if (
    pathMatches(pathname, emailSensitivePaths) &&
    body &&
    typeof body.email === "string"
  ) {
    return arcjet
      .withRule(protectSignup(signupOptions))
      .protect(req, { email: body.email, fingerprint });
  }

  if (pathMatches(pathname, rateLimitedPaths)) {
    return arcjet
      .withRule(detectBot(botOptions))
      .withRule(slidingWindow(rateLimitOptions))
      .protect(req, { fingerprint });
  }

  return arcjet.withRule(detectBot(botOptions)).protect(req, { fingerprint });
}

const authHandlers = toNextJsHandler(auth.handler);

export const { GET } = authHandlers;

// Wrap the POST handler with Arcjet protections
export const POST = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const body = await readJsonBody(req);

  if (
    pathMatches(pathname, emailSensitivePaths) &&
    body &&
    typeof body.email === "string" &&
    !isEmailFormatValid(body.email)
  ) {
    return Response.json(
      { message: "Email address format is invalid. Is there a typo?" },
      { status: 400 },
    );
  }

  const decision = await protect(req);

  console.log("Arcjet Decision:", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return new Response(null, { status: 429 });
    } else if (decision.reason.isEmail()) {
      let message: string;

      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "Email address format is invalid. Is there a typo?";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "We do not allow disposable email addresses.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message =
          "Your email domain does not have an MX record. Is there a typo?";
      } else {
        // This is a catch all, but the above should be exhaustive based on the
        // configured rules.
        message = "Invalid email.";
      }

      return Response.json({ message }, { status: 400 });
    } else {
      return new Response(null, { status: 403 });
    }
  }

  return authHandlers.POST(req);
};
