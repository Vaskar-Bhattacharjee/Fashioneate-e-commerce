"use client";

import { Container } from "../ui/container";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import FabricShader from "../ui/FabricShader";

const EDGE_ITEMS = [
  {
    no: 1,
    heading: "Uncompromising Quality",
    subHeading:
      "We obsess over the fine details so you don't have to. From premium fabrics to reinforced stitching, every piece is a promise of durability and timeless style.",
  },
  {
    no: 2,
    heading: "Accessible Luxury",
    subHeading:
      "High-end fashion shouldn't require a second mortgage. By streamlining our supply chain, we deliver runway-ready designs at prices that actually make sense.",
  },
  {
    no: 3,
    heading: "Radical Transparency",
    subHeading:
      "Integrity is our finest thread. We are committed to ethical sourcing and honest pricing, building a brand relationship that lasts longer than a single season.",
  },
];

const WhyUsSection = ({
  heading,
  subHeading,
  no,
  isLastChild,
}: {
  heading: string;
  subHeading: string;
  no: number;
  isLastChild?: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-start justify-start",
        "py-7 border-b border-neutral-300",
        isLastChild && "border-b-0 pb-0",
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-neutral-900 font-semibold text-[18px] tracking-[0.05em]">
          {no}.
        </div>
        <h3 className="text-balance font-semibold text-xl text-neutral-900 tracking-tight">
          {heading}
        </h3>
      </div>
      <p className=" text-balance tracking-tight text-[16px] md:text-[18px] text-neutral-500 font-medium leading-relaxed  lg:w-140">
        {subHeading}
      </p>
    </motion.div>
  );
};

const Left = () => {
  return (
    <div className="w-full lg:flex-1 flex flex-col gap-5">
<div
  className="
    relative
    overflow-hidden
    rounded-lg
    px-10
    py-20
    isolate
  "
>
  <FabricShader />

  {/* Dark overlay */}
  <div
    className="
      absolute
      inset-0
      z-[1]
      bg-black/10
      pointer-events-none
    "
  />
        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase  text-neutral-100  mb-5 block">
            Our Promise
          </span>
          <h3 className="font-cormorantGaramond font-normal text-4xl lg:text-5xl text-neutral-50 tracking-tight mb-5 text-balance">
            Dressed for life, not just the season.
          </h3>
          <p className="text-neutral-200 max-w-sm leading-normal  text-[16px] md:text-[18px] font-light">
            We source the world's finest textiles so every piece earns its place
            in your wardrobe — year after year.
          </p>
          <div className="w-40 h-px bg-neutral-300 mt-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
          className="rounded-lg border border-neutral-200 bg-white p-8
  transition-all duration-500 hover:border-[#C9A96E]/50 group"
        >
          <h3 className="font-semibold text-xl text-neutral-900 tracking-tight text-balance mb-2">
            Modern Curation
          </h3>
          <p className="text-[16px] md:text-[17px] text-neutral-500 font-medium leading-relaxed">
            Accessible luxury direct to consumer craftsmanship.
          </p>
        </motion.div>

        <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
          className="rounded-lg border border-neutral-200 bg-white p-8
  transition-all duration-500 hover:border-[#C9A96E]/50 group"
        >
          <h3 className="font-semibold text-xl text-neutral-900 tracking-tight text-balance mb-2">
            Ethical Craftsmanship
          </h3>
          <p className="text-[16px] md:text-[17px] text-neutral-500 font-medium leading-relaxed mt-2">
            Ethical labor and transparent pricing in every single thread.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export const Right = () => {
  return (
    <div className="w-full lg:w-120 flex flex-col">
      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-4 mb-0">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-0.5 h-12 bg-[#C9A96E] shrink-0 origin-top"
          />

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-inter text-neutral-500 block mb-2">
              Why Fashioneate
            </span>
            <h2 className="font-cormorantGaramond font-semibold text-2xl md:text-4xl tracking-tight text-gray-900">
              The Fashioneate Edge
            </h2>
          </motion.div>
        </div>

        <div className="border-l border-neutral-200 pl-8 ml-px pt-2">
          {EDGE_ITEMS.map(({ heading, subHeading, no }, index) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >
              <WhyUsSection
                heading={heading}
                subHeading={subHeading}
                no={no}
                isLastChild={index === EDGE_ITEMS.length - 1}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WhyUs = () => {
  return (
    <Container className="pt-10 md:pt-20 lg:pt-28 flex flex-col items-center justify-center">
      <div
        className="relative w-full px-2 lg:px-10 lg:w-7xl 
        flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16
        pb-20"
      >
        <HandTraceLine className="absolute" />
        <Left />
        <Right />
      </div>
    </Container>
  );
};

const HandTraceLine = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 30 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 25, 10 
            
            /* First distinct hook, identical to top-left of your sketch */
            C 25, 10, 5, 20, 5, 40 
            
            /* Long spine downwards, matching the middle segment */
            L 5, 90 
            
            /* Second distinct hook, identical to bottom-right of your sketch */
            C 5, 110, 25, 110, 25, 120"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
