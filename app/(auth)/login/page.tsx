"use client";

import Link from "next/link";
import { LogoGoogle, LogoMicrosoft } from "@/components/icons";
import { LandingHeader } from "@/components/landing-header";

export default function Page() {
  const handleMicrosoftLogin = () => {
    // TODO: Implement Microsoft OAuth login
    console.log("Microsoft login clicked");
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    console.log("Google login clicked");
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-[#f5e9f2]">
      <LandingHeader />

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center">
        {/* Login Card */}
        <div className="w-[414px] rounded-[10px] border border-neutral-200 bg-white px-[31px] py-[31px] shadow-lg">
          <div className="flex flex-col items-center gap-[18px]">
            {/* Welcome Text */}
            <h2 className="text-center font-medium text-[32px] text-neutral-900 leading-[1.5] tracking-[0.16px]">
              Welcome
            </h2>

            {/* Subtitle */}
            <p className="text-center font-normal text-[14px] text-neutral-900 leading-[1.5] tracking-[0.07px]">
              Sign in to access the Form-Filling Assistant
            </p>

            {/* OAuth Buttons */}
            <div className="mt-4 flex w-full flex-col gap-4">
              {/* Microsoft Button */}
              <button
                className="flex min-h-[36px] w-full items-center justify-center gap-2 rounded-[8px] border border-neutral-200 px-4 py-[7.5px] shadow-sm transition-colors hover:bg-neutral-50"
                onClick={handleMicrosoftLogin}
                type="button"
              >
                <LogoMicrosoft size={13.25} />
                <span className="font-medium text-[14px] text-neutral-900 leading-[14px]">
                  Continue with Microsoft
                </span>
              </button>

              {/* Google Button */}
              <button
                className="flex min-h-[36px] w-full items-center justify-center gap-2 rounded-[8px] border border-neutral-200 px-4 py-[7.5px] shadow-sm transition-colors hover:bg-neutral-50"
                onClick={handleGoogleLogin}
                type="button"
              >
                <LogoGoogle size={13.25} />
                <span className="font-medium text-[14px] text-neutral-900 leading-[14px]">
                  Continue with Google
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Sign up Link */}
        <p className="mt-8 text-center font-medium text-[14px] text-neutral-900 leading-[1.5] tracking-[0.07px]">
          Need an account?{" "}
          <Link className="underline" href="/register">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
