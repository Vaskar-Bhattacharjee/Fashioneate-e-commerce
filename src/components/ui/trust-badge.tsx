"use client";

import { cn } from "@/src/lib/utils";
import { Container } from "./container";
import { ChevronRight } from "lucide-react";

// SVGs remain exactly as your original code
const FreeReturns = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M 18 6 A 9 9 0 1 1 6 6" />
    <path d="M 3 6 L 6 6 L 6 9" />
    <path d="M 12 6.5 L 17 9.5 L 12 12.5 L 7 9.5 Z" />
    <path d="M 17 9.5 L 17 15.5 L 12 18.5 L 12 12.5 Z" />
    <path d="M 7 9.5 L 12 12.5 L 12 18.5 L 7 15.5 Z" />
  </svg>
);

const SecureCheckout = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="11" width="14" height="11" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>
);

const EthicallyMade = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const FastDelivery = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
    <rect x="9" y="11" width="14" height="10" rx="1" />
    <circle cx="12" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
  </svg>
);

const TrustElement = [
  { Icon: FreeReturns, title: "Free Returns" },
  { Icon: SecureCheckout, title: "Secure Checkout" },
  { Icon: EthicallyMade, title: "Ethically Made" },
  { Icon: FastDelivery, title: "Fast Delivery" },
];

export const TrustBadge = () => {
  return (
    <section className="relative lg:pt-48 w-full">
      <Container className="relative border border-neutral-200 w-[90%] md:w-[85%] mx-auto bg-white">
<div
  className="absolute inset-0 pointer-events-none opacity-[0.3] z-50 mix-blend-multiply"
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    filter: "contrast(150%) brightness(100%)", // Makes the grain sharper
  }}
/>
        <ChevronRight className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-225 text-neutral-500 size-5 z-20 bg-white" />
        <ChevronRight className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 -rotate-45 text-neutral-500 size-5 z-20 bg-white" />
        <ChevronRight className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-45 text-neutral-500 size-5 z-20 bg-white" />
        <ChevronRight className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-135 text-neutral-500 size-5 z-20 bg-white" />

        <div className="grid grid-cols-2 lg:grid-cols-4 w-full min-h-[200px]">
          {TrustElement.map(({ Icon, title }, index) => (
            <div
              key={index}
              className={cn(
                "group flex flex-col items-center justify-center gap-4 py-10 transition-colors hover:bg-neutral-50/30",
                index % 2 === 0
                  ? "border-r border-neutral-200"
                  : "lg:border-r lg:border-neutral-200",
                index === 1 && "lg:border-r border-neutral-200",
                index === 3 && "border-none",

                index < 2 && "border-b lg:border-b-0 border-neutral-200",
              )}
            >
              <Icon className="w-10 h-10 text-neutral-800 transition-transform duration-500 ease-out group-hover:-translate-y-1.5" />
              <p className="text-xs uppercase tracking-[0.2em] font-inter font-medium text-neutral-600 transition-colors duration-500 group-hover:text-neutral-900">
                {title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
