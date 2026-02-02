"use client";
import { authClient } from "@/lib/auth-client";
import { LoginForm } from "./_components/login-form";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const { data: session } = authClient.useSession();

  if (session) {
    return redirect("/");
  }

  return <LoginForm />;
}
