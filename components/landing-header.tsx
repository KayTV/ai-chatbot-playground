import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="relative z-10 border-b bg-white">
      <div className="mx-auto flex h-[77px] max-w-[1280px] items-center justify-between px-8">
        <h1 className="font-bold font-serif text-[15px] text-black">
          Form-Filling Assistant
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 px-4 py-2 text-[#0f172a] text-[14px]"
            type="button"
          >
            <span className="font-medium">English</span>
            <ChevronDown className="size-3" />
          </button>
          <Link href="/login">
            <Button
              className="rounded-lg bg-[#b14092] px-5 py-2.5 text-white hover:bg-[#9a3680]"
              size="sm"
            >
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
