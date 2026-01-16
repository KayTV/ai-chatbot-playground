"use client";

import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { LandingHeader } from "@/components/landing-header";
import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RegisterActionState, register } from "../actions";

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  const { update: updateSession } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router and updateSession are stable refs
  useEffect(() => {
    if (state.status === "user_exists") {
      toast({ type: "error", description: "Account already exists!" });
    } else if (state.status === "failed") {
      toast({ type: "error", description: "Failed to create account!" });
    } else if (state.status === "invalid_data") {
      toast({
        type: "error",
        description: "Failed validating your submission!",
      });
    } else if (state.status === "success") {
      toast({ type: "success", description: "Account created successfully!" });

      setIsSuccessful(true);
      updateSession();
      router.refresh();
    }
  }, [state.status]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col bg-[#f5e9f2]">
      <LandingHeader />

      <div className="flex grow items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[414px] flex-col">
          {/* Main Card */}
          <div className="rounded-[10px] border border-[#e5e5e5] bg-white px-8 py-8 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <h1 className="mb-5 text-center font-serif text-[#171717] text-[32px] leading-[1.5] tracking-[0.16px]">
              Sign up
            </h1>

            {/* Microsoft Button */}
            <Button
              className="mb-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#e5e5e5] bg-white px-4 py-2.5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] transition-colors hover:bg-gray-50"
              type="button"
              variant="outline"
            >
              <svg
                className="size-[13.25px]"
                fill="none"
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect fill="#F25022" height="10" width="10" />
                <rect fill="#7FBA00" height="10" width="10" x="11" />
                <rect fill="#00A4EF" height="10" width="10" y="11" />
                <rect fill="#FFB900" height="10" width="10" x="11" y="11" />
              </svg>
              <span className="font-medium text-[#171717] text-[14px]">
                Continue with Microsoft
              </span>
            </Button>

            {/* Divider */}
            <div className="relative mb-5 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-[#f1f5f9] border-t" />
              </div>
              <div className="relative bg-white px-3">
                <span className="font-medium text-[#737373] text-[14px]">
                  or
                </span>
              </div>
            </div>

            {/* Form */}
            <Form action={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label
                  className="font-medium text-[14px] text-black"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  autoComplete="email"
                  autoFocus
                  className="h-[38px] rounded-[6px] border-[#cbd5e1] bg-white px-3 py-2 font-medium text-[14px] placeholder:text-[#94a3b8]"
                  defaultValue={email}
                  id="email"
                  name="email"
                  placeholder="name@domain.com"
                  required
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  className="font-medium text-[14px] text-black"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  className="h-[38px] rounded-[6px] border-[#cbd5e1] bg-white px-3 py-2 font-medium text-[14px] placeholder:text-[#94a3b8]"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  type="password"
                />
                <p className="text-[#999] text-[12px]">
                  Password should be at least 10 characters and include a
                  special character.
                </p>
              </div>

              <Button
                className="h-[36px] w-full cursor-pointer rounded-[8px] bg-[#b14092] px-4 py-2.5 font-medium text-[14px] text-white hover:bg-[#9a3680]"
                disabled={isSuccessful}
                type="submit"
              >
                {isSuccessful ? "Success!" : "Create account"}
              </Button>
            </Form>
          </div>

          {/* Bottom Link */}
          <p className="mt-6 text-center font-medium text-[#171717] text-[14px]">
            Already have an account?{" "}
            <Link
              className="underline decoration-solid [text-decoration-skip-ink:none] [text-underline-position:from-font] hover:opacity-70"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
