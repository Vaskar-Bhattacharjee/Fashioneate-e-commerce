"use client";

import { Container } from "../ui/container";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

const QualityIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#262626"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

const LuxuryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#262626"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const TransparencyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#262626"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const EDGE_ITEMS = [
  {
    heading: "Uncompromising Quality",
    subHeading:
      "We obsess over the fine details so you don't have to. From premium fabrics to reinforced stitching, every piece is a promise of durability and timeless style.",
    Icon: QualityIcon,
  },
  {
    heading: "Accessible Luxury",
    subHeading:
      "High-end fashion shouldn't require a second mortgage. By streamlining our supply chain, we deliver runway-ready designs at prices that actually make sense.",
    Icon: LuxuryIcon,
  },
  {
    heading: "Radical Transparency",
    subHeading:
      "Integrity is our finest thread. We are committed to ethical sourcing and honest pricing, building a brand relationship that lasts longer than a single season.",
    Icon: TransparencyIcon,
  },
];

const WhyUsSection = ({
  heading,
  subHeading,
  icon,
  isLastChild,
}: {
  heading: string;
  subHeading: string;
  isLastChild?: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-start justify-start",
        "py-8 border-b border-neutral-300",
        isLastChild && "border-b-0 pb-0",
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="text-[#503f20] font-semibold">{icon}</div>
        <h3 className="font-inter font-semibold text-lg text-neutral-900 tracking-wide">
          {heading}
        </h3>
      </div>
      <p className="font-inter text-sm text-neutral-600 font-normal leading-[1.8] lg:w-96">
        {subHeading}
      </p>
    </motion.div>
  );
};

const Left = () => {
  return (
    <div className="w-full lg:flex-1 flex flex-col gap-5">
      <div className="relative overflow-hidden rounded-xl bg-[#1C1C1C] p-10">
<div
  className="absolute inset-0 pointer-events-none z-50 mix-blend-multiply opacity-[0.9] "
  style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    filter: "contrast(180%) brightness(100%)",
  }}
/>
        <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border border-[#C9A96E]/10" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border border-[#C9A96E]/15" />

        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase font-inter text-[#C9A96E] mb-5 block">
            Our Promise
          </span>
          <h3 className="font-cormorantGaramond font-normal text-4xl lg:text-5xl text-[#F5F0E8] tracking-tight mb-5 leading-[1.1]">
            Dressed for life, not just the season.
          </h3>
          <p className="text-[#A89880] max-w-xs leading-relaxed font-inter text-[16px] font-light">
            We source the world's finest textiles so every piece earns its place
            in your wardrobe — year after year.
          </p>
          <div className="w-40 h-px bg-[#b28531] mt-8" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-xl border border-neutral-200 bg-white p-6
          transition-all duration-500 hover:border-[#C9A96E]/50 group"
        >
          <div className="mb-3 text-neutral-300 group-hover:text-[#C9A96E] transition-colors duration-500">
            <Modern />
          </div>
          <h4 className="font-inter font-semibold text-neutral-900 text-sm tracking-wide mb-2 uppercase">
            Modern Curation
          </h4>
          <p className="text-xs font-inter text-neutral-600 leading-relaxed">
            Accessible luxury through direct-to-consumer craftsmanship.
          </p>
        </div>

        <div
          className="rounded-xl border border-neutral-200 bg-white p-6
          transition-all duration-500 hover:border-[#C9A96E]/50 group"
        >
          <div className="mb-3 text-neutral-300 group-hover:text-[#C9A96E] transition-colors duration-500">
              <TotalHonesty />
          </div>
          <h4 className="font-inter font-semibold text-neutral-900 text-sm tracking-wide mb-2 uppercase">
            Total Honesty
          </h4>
          <p className="text-xs font-inter text-neutral-600 leading-relaxed">
            Ethical labor and transparent pricing in every single thread.
          </p>
        </div>
      </div>
    </div>
  );
};




export const Right = () => {
  return (
    <div className="w-full lg:w-120 flex flex-col border-r border-neutral-300">
      <div className="flex flex-col gap-0">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-2">
          {/* 1. The Drawing Bar: Inline scale animation */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-0.5 h-12 bg-[#C9A96E] shrink-0 origin-top" 
          />
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-inter text-neutral-500 block mb-1">
              Why Fashioneate
            </span>
            <h2 className="font-inter font-semibold text-2xl md:text-3xl tracking-tight text-neutral-900">
              The Fashioneate Edge
            </h2>
          </motion.div>
        </div>

        {/* List Section */}
<div className="border-l border-neutral-200 pl-8 ml-px pt-2">
  {EDGE_ITEMS.map(({ heading, subHeading, Icon }, index) => (
    <motion.div
      key={heading}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      // THE FIX IS HERE:
      // margin: "100px" extends the detection zone artificially
      // amount: 0 forces it to trigger instantly without waiting for the whole box
      viewport={{ once: false, amount: 0, margin: "100px" }} 
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15 // Increased delay slightly so the waterfall effect is obvious
      }}
    >
      <WhyUsSection
        heading={heading}
        subHeading={subHeading}
        icon={<Icon />}
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
    <Container className="pt-10 md:pt-20 lg:pt-32 flex flex-col items-center justify-center">
      <div className="relative w-full px-4 md:px-6 lg:px-0 lg:w-6xl 
      flex flex-col lg:flex-row items-start justify-between gap-16 
      border-b border-neutral-300 pb-4">
        <HandTraceLine className="absolute" />
        <Left />
        <Right />
      </div>
    </Container>
  );
};

const Modern = ({ className }: { className?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#262626"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3L9 7h6l-3-4z" />
      <path d="M9 7c-2 4-3 8-3 14h12c0-6-1-10-3-14H9z" />
    </svg>
  );
};

const TotalHonesty = ({ className }: { className?: string }) => {
  return (
                <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={className}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
  )
}

const HandTraceLine = ({ className }: { className?: string }) => {
  return (
    <svg
      // Thin ViewBox (0 0 30 120) makes the default size much smaller.
      viewBox="0 0 30 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        // Start Top-Right
        d="M 25, 10 
           
           /* First distinct hook, identical to top-left of your sketch */
           C 25, 10, 5, 20, 5, 40 
           
           /* Long spine downwards, matching the middle segment */
           L 5, 90 
           
           /* Second distinct hook, identical to bottom-right of your sketch */
           C 5, 110, 25, 110, 25, 120"
        
        // Custom "engineered precision" stroke look
        stroke="currentColor" // Use parent text-white class for color
        strokeWidth="1.5"     // Thin, professional line weight
        strokeLinecap="round" // Rounded ends, like a trace
        strokeLinejoin="round"
      />
    </svg>
  );
};