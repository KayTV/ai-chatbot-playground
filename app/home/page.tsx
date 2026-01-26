"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LandingHeader } from "@/components/landing-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      router.push(`/chat?query=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <LandingHeader />

      <section className="relative overflow-hidden px-8 py-20">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[25px] bg-[#f4e4f0]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center px-8 py-20 lg:py-24">
              <h2 className="mb-6 font-serif text-[#111827] text-[48px] leading-[1.15] lg:text-[56px]">
                Start new application
              </h2>
              <p className="mb-8 max-w-[400px] font-sans text-[#111827] text-[18px] leading-[1.6] lg:text-[20px]">
                Get started by entering your client&apos;s{" "}
                <strong>Apricot ID number</strong> and{" "}
                <strong>what program</strong> they&apos;d like to apply for.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Input
                  className="flex-1 rounded-lg border-0 bg-white px-4 py-3 text-[16px] placeholder:text-gray-400"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="Apricot ID #, apply for IHSS"
                  type="text"
                  value={inputValue}
                />
                <Button
                  className="cursor-pointer whitespace-nowrap rounded-lg bg-primary px-7 py-3 text-primary-foreground hover:bg-primary/90"
                  onClick={handleSubmit}
                >
                  Enter ↵
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-end">
              <div className="relative h-[300px] w-full lg:h-[373px]">
                {/* biome-ignore lint: Using img for image optimization compatibility */}
                <img
                  alt="People collaborating on applications"
                  className="size-full object-cover object-left"
                  height={1450}
                  src="/images/illustration.png"
                  width={1450}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111827] py-[50px]">
        <div className="mx-auto max-w-[1280px] px-8">
          <h2 className="mb-[24px] font-serif text-[28px] text-white leading-[1.5]">
            Questions?
          </h2>
          <p className="text-[18px] text-white leading-[1.5]">
            Email{" "}
            <a
              className="underline decoration-solid underline-offset-auto"
              href="mailto:labs@navapbc.com"
            >
              labs@navapbc.com
            </a>{" "}
            with any issues or feedback.
          </p>
        </div>
      </footer>
    </div>
  );
}
