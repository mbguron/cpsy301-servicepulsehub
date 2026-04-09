"use client";
import Link from "next/link";
import Image from "next/image";
import PressButton from "@/components/ui/PressButton";
import ServiceQualityCard from "@/components/ui/ServiceQualityCard";

const SERVICE_QUALITY = [
  {
    title: "Trusted Expertise",
    description:
      "Our technicians are highly trained and experienced in repairing a wide range of devices, ensuring your device is in safe hands.",
  },
  {
    title: "Quality Parts",
    description:
      "We use only high-quality replacement parts to ensure the longevity and performance of your repaired device.",
  },
  {
    title: "Fast Turnaround",
    description:
      "We understand the importance of your device, which is why we strive to provide quick and efficient repair services without compromising on quality.",
  },
  {
    title: "Customer Satisfaction",
    description:
      "Our commitment to customer satisfaction means we go above and beyond to ensure you are happy with our services, offering warranties on repairs and excellent customer support.",
  },
];

export default function Home() {
  return (
    <div className="w-full h-full bg-orange-100/50 flex flex-col justify-center items-center">
      <div className="flex w-full p-8">
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

        {/* Right Side */}
        <div className="hidden lg:flex w-1/2 h-full rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/landing-page-image.png"
            alt="Device Repair"
            width={500}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-16">
        <h2 className="text-4xl font-semibold text-gray-800">
          Why choose Mobile Care to repair your device?
        </h2>
        <ul className="w-full max-w-4xl flex flex-row justify-center mt-8 gap-6">
          {SERVICE_QUALITY.map((item, index) => (
            <li
              key={index}
              className="text-gray-600 text-lg my-4 decoration-none list-none"
            >
              <ServiceQualityCard
                title={item.title}
                description={item.description}
                icon={
                  index === 0
                    ? "🔧"
                    : index === 1
                      ? "🛠️"
                      : index === 2
                        ? "⏱️"
                        : "😊"
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-3/4 items-center justify-center mt-16 bg-orange-300/50 p-12 rounded-lg items-center text-center">
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
    </div>
  );
}
