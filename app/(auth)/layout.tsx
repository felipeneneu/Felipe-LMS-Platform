import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-4 left-4",
        })}
      >
        <ArrowLeft className="size-4" />
        Back to home
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6 px-4 md:px-0">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image src={Logo} alt="Logo" width={32} />
          FelipeLMS.
        </Link>
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline transition cursor-pointer">
            Terms of service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline transition cursor-pointer">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
}
