import Image from "next/image";
import { Navbar } from "./_components/navbar";
import bg from "@/public/background-orange.png";
import heroPerson from "@/public/woman-page-teste.png";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <section className="relative w-full h-196 overflow-hidden">
        <Image
          src={bg}
          alt="bg"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 container mx-auto h-full px-4 md:px-6 lg:px-8 mt-8 md:mt-0">
          <div className="flex h-full items-center">
            <div className="flex w-full flex-col md:gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-135 flex-col gap-6">
                <h1 className="text-balance font-bold text-5xl text-white sm:text-6xl lg:text-7xl">
                  Elevate your Learning Experience
                </h1>
                <p className="text-base text-white/90 sm:text-lg">
                  Discover a new way to learn with our modern, interactive
                  learning management system. Acces high-quality courses
                  anytime, anywhere.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="h-12 rounded-md bg-white px-6 text-sm font-semibold text-orange-600 hover:bg-white/90">
                    Sign in
                  </Button>
                  <button className="h-12 rounded-md border border-white/60 px-6 text-sm font-semibold text-white hover:border-white hover:bg-white/10">
                    Explore courses
                  </button>
                </div>
                <div className="hidden md:flex items-center text-white/90 mt-28">
                  <ArrowDown className="size-4 mr-2 animate-bounce" />
                  Continue explorando
                </div>
              </div>
              <div className="flex w-full items-center justify-center lg:justify-end">
                <div className="relative h-105 w-[320px] sm:h-120 sm:w-90 lg:h-200 lg:w-200 -bottom-10 md:bottom-0">
                  <Image
                    src={heroPerson}
                    alt="Woman learning"
                    fill
                    quality={100}
                    sizes="(min-width: 1024px) 700px, (min-width: 640px) 480px, 320px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main className="container mx-auto px-4 md:px-6 lg:px-8">{children}</main>
    </div>
  );
}
