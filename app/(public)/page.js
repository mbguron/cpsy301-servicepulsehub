"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import PressButton from "@/components/ui/PressButton";

export default function MainPage() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="flex">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 rounded-lg p-8 mt-8">
            <div className="mb-6">
              <h1 className="text-4xl font-semibold text-gray-800 mb-4">
                Broken Screen?
                <br />
                Water Damage?
                <br />
                Battery Issues?
                <br />
                <span className="text-white bg-orange-400 px-4 py-1 rounded-lg mt-2 inline-block">
                  We Fix It All!
                </span>
              </h1>
              <p className="text-gray-600 text-lg my-6">
                We provide professional cell phone repair services that are
                trusted, reliable, and affordable. To see a full list of our
                services, visit our services page.
              </p>
              <div className="space-x-4">
                <PressButton
                  onClick={() => {
                    window.location.href = "/services";
                  }}
                  variant="primary"
                >
                  View Our Services
                </PressButton>
                <PressButton
                  onClick={() => {
                    window.location.href = "/booking";
                  }}
                  variant="primary"
                >
                  Book a Repair
                </PressButton>
              </div>
            </div>
          </div>
        </div>
        <section className="rounded-3xl bg-slate-900 px-8 py-16 text-white shadow-lg md:px-14">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            ServicePulse Hub
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Reliable Device Repair and Service Management
          </h1>

          <p className="mt-5 max-w-2xl text-base text-slate-300">
            Book services, explore repair options, and stay connected with a
            modern support experience built for speed, accuracy, and
            convenience.
          </p>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Trusted Expertise
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Our technicians are highly trained and experienced in repairing a
              wide range of devices, ensuring your device is in safe hands.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Quality Parts</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We use only high-quality replacement parts to ensure the longevity
              and performance of your repaired device.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Fast Turnaround
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We understand the importance of your device, which is why we
              strive to provide quick and efficient repair services without
              compromising on quality.
            </p>
          </div>

          <div className="flex -full  flex-col justify-center mt-16 bg-orange-300/50 p-12 rounded-lg items-center text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Customer FAQs
            </h2>
            <h2 className=" text-3xl font-extrabold text-gray-800 mb-2">
              Have a question about our services? Contact us at{" "}
            </h2>
            <Link href="/faqs" className="text-gray-600 hover:underline mt-4">
              Visit our FAQs page for frequently asked questions
            </Link>
          </div>

          <div className="w-full flex items-center justify-center mt-16">
            <PressButton
              onClick={() => {
                window.location.href = "/booking";
              }}
              variant="primary"
            >
              Book Your Repair Now
            </PressButton>
          </div>
        </section>
      </div>
    </main>
  );
}
