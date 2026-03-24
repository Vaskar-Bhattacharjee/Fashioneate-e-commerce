"use client";

import { cn } from "@/src/lib/utils";
import { Container } from "./container";
import { ChevronRight } from "lucide-react";

const FreeReturns = ({ className }: { className: string }) => (
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

const SecureCheckout = ({ className }: { className: string }) => (
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

const EthicallyMade = ({ className }: { className: string }) => (
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

const FastDelivery = ({ className }: { className: string }) => (
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
  {
    Icon: FreeReturns,
    title: "Free Returns",
    border: "border-r border-neutral-200",
  },
  {
    Icon: SecureCheckout,
    title: "Secure Checkout",
    border: "border-r border-neutral-200",
  },
  {
    Icon: EthicallyMade,
    title: "Ethically Made",
    border: "border-r border-neutral-200",
  },
  {
    Icon: FastDelivery,
    title: "Fast Delivery",
    border: "",
  },
];

export const TrustBadge = () => {
  return (
    <section className="relative py-18 w-full">
      <Container className="relative border border-neutral-200 w-[80%] mx-auto">
        <ChevronRight className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-225 text-neutral-600 size-5" />
        <ChevronRight className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 -rotate-45 text-neutral-600 size-5" />
        <ChevronRight className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-45 text-neutral-600 size-5" />
        <ChevronRight className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rotate-135 text-neutral-600 size-5" />

        <div className="grid grid-cols-4 w-full h-50">
          {TrustElement.map(({ Icon, title, border }, index) => (
            <div
              key={index}
              className={cn(
                "group flex flex-col items-center justify-center gap-4 cursor-default",
                border,
              )}
            >
              <Icon className="w-10 h-10 text-neutral-800 transition-transform duration-500 ease-out group-hover:-translate-y-1.5" />
              <p className="text-md uppercase tracking-[.2em] font-inter font-medium text-neutral-600 transition-colors duration-500 group-hover:text-neutral-800">
                {title}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
