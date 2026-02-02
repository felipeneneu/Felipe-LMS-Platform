"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Loader2, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const emailFormatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEmailError(email: string): string | null {
  if (!emailFormatRegex.test(email)) return "Digite um email valido.";
  return null;
}

export function LoginForm() {
  const router = useRouter();
  const [gitHubPending, startGitHubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  async function signInWithGitHub() {
    startGitHubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed in with GitHub!");
          },
          onError: (error) => {
            toast.error(`GitHub sign-in failed: ${error.error.message}`);
          },
        },
      });
    });
  }

  function signInWithEmail() {
    const normalizedEmail = email.trim().toLowerCase();
    const validationError = getEmailError(normalizedEmail);

    if (validationError) {
      setEmailError(validationError);
      toast.error("Digite um email valido para continuar.");
      return;
    }

    setEmailError(null);

    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: normalizedEmail,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent! Please check your inbox.");
            router.push(`/verify-request?email=${encodeURIComponent(normalizedEmail)}`);
          },
          onError: () => {
            toast.error("Failed to send verification email. Please try again.");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your Github or Email</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={signInWithGitHub}
          disabled={gitHubPending}
        >
          {gitHubPending ? (
            <>
              <Loader className="animate-spin size-4" />
              loging in ...
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign in with GitHub
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t after:border-border my-4">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              onBlur={() => {
                const normalizedEmail = email.trim().toLowerCase();
                if (!normalizedEmail) {
                  setEmailError(null);
                  return;
                }
                setEmailError(getEmailError(normalizedEmail));
              }}
              type="email"
              placeholder="email@email.com"
              required
              aria-invalid={!!emailError}
            />
            {emailError ? (
              <p className="text-sm text-red-500" role="alert">{emailError}</p>
            ) : null}
          </div>

          <Button onClick={signInWithEmail} disabled={emailPending || email.trim().length === 0}>
            {emailPending ? (
              <>
                <Loader2 className="animate-spin size-4 mr-2" />
                Sending verification email...
              </>
            ) : (
              <>
                <Send className="size-4 mr-2" />
                <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
