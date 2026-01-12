import Link from "next/link";
import { LandingHeader } from "@/components/landing-header";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#5b0462]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-8 py-20 lg:py-24">
            <h2 className="mb-6 font-serif text-[48px] text-white leading-[1.15] lg:text-[56px]">
              Welcome!
            </h2>
            <p className="mb-8 max-w-[400px] font-sans text-[18px] text-white leading-[1.6] lg:text-[20px]">
              Form-Filling Assistant helps you and your clients complete benefit
              applications faster.
            </p>
            <div>
              <Link href="/chat">
                <Button className="rounded-lg bg-[#b14092] px-7 py-3 text-white hover:bg-[#9a3680]">
                  Get started
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
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
      </section>

      {/* How it works Section */}
      <section className="bg-white py-[115px]">
        <div className="mx-auto max-w-[1280px] px-8">
          <h2 className="mb-[21px] font-serif text-[28px] text-black leading-[1.5]">
            How it works
          </h2>
          <p className="mb-[58px] max-w-[846px] text-[18px] text-black leading-[1.5]">
            This tool uses artificial intelligence (AI) to help you complete
            applications, while you stay in control.
          </p>

          {/* Steps Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-[25px] bg-[#fafafa] p-[30px]">
              <p className="mb-[20px] font-mono text-[#b14092] text-[12px] uppercase">
                step 1
              </p>
              <h3 className="mb-[28px] font-serif text-[20px] text-black leading-[1.5]">
                Start and autofill
              </h3>
              <p className="text-[16px] text-black leading-[1.5]">
                AI autofills the application for you, using client data from
                your case management system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-[25px] bg-[#fafafa] p-[30px]">
              <p className="mb-[20px] font-mono text-[#b14092] text-[12px] uppercase">
                step 2
              </p>
              <h3 className="mb-[28px] font-serif text-[20px] text-black leading-[1.5]">
                Fill in any gaps
              </h3>
              <p className="text-[16px] text-black leading-[1.5]">
                You review and complete anything that&apos;s missing. The AI
                only adds what&apos;s already in your system.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-[25px] bg-[#fafafa] p-[30px]">
              <p className="mb-[20px] font-mono text-[#b14092] text-[12px] uppercase">
                step 3
              </p>
              <h3 className="mb-[28px] font-serif text-[20px] text-black leading-[1.5]">
                Submit with confidence
              </h3>
              <p className="text-[16px] text-black leading-[1.5]">
                You submit the application once everything looks right. Nothing
                is submitted automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Questions Section */}
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
