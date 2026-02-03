"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { ModeToggle } from "@/components/button-darkmode";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import UserDropDown from "./user-dropdown";

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop--filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px:4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src={Logo} alt="Logo" className="size-9" />
          <span className="font-bold">FelipeLMS.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:justify-between md:items-center">
          <div className="ml-4 flex items-center space-x-2">
            {navigationItems.map((navigationItem, index) => (
              <Link
                key={index}
                href={navigationItem.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {navigationItem.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            {isPending ? null : session ? (
              <UserDropDown
                name={session.user.name}
                image={session.user.image || ""}
                email={session.user.email}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
