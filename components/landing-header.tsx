"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  const router = useRouter();
  return (
    <header className="relative z-10 border-b border-border bg-card">
      <div className="mx-auto flex h-[77px] max-w-[1280px] items-center justify-between px-8">
        <button onClick={() => router.push("/")} type="button">
          <h1 className="cursor-pointer font-bold font-serif text-[15px] text-foreground transition-opacity hover:opacity-70">
            Form-Filling Assistant
          </h1>
        </button>
        <div className="flex items-center gap-4">
          <Button
            className="flex cursor-pointer items-center gap-1 bg-transparent px-4 py-2 text-foreground text-[14px] hover:bg-transparent hover:opacity-70"
            type="button"
            variant="ghost"
          >
            <span className="font-medium">English</span>
            <ChevronDown className="size-3" />
          </Button>
          <Button
            className="cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push("/login")}
            size="sm"
          >
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
}
