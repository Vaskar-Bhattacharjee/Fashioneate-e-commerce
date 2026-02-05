"use client";

import {
  IconArrowRight,
  IconBoltFilled,
  IconSeedlingFilled,
  IconTableDashed,
  IconTableSpark,
} from "@tabler/icons-react";
import { Container } from "../ui/container";
import { Heading, SubHeading } from "../ui/header";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";
import Link from "next/link";

export const WhyUs = () => {
  return (
    <Container className="pt-10 md:pt-20 lg:pt-32 flex flex-col items-center justify-center">
      <div className="w-6xl flex items-center justify-between gap-10">
        <Left />
        <Right />
      </div>
    </Container>
  );
};

export const WhyUsSection = ({
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
      initial={{ opacity: 0, y: 50, backdropFilter: "blur(35px)" }}
      whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(0px)" }}
      transition={{ delay: 0.5 }}
      className={cn(
        "flex flex-col py-4 items-start justify-start border-b border-neutral-300",
        isLastChild && "border-b-0",
      )}
    >
      <div className="flex items-center justify-start gap-2">
        {icon}
        <h1 className="text-neutral-700 font-bold text-2xl">{heading}</h1>
      </div>
      <SubHeading className="md:text-left font-inter flex-wrap md:text-sm md:w-120">
        {subHeading}
      </SubHeading>
    </motion.div>
  );
};


export const Left = () => {
  return (
        <div className="flex-1 w-full flex flex-col gap-6">
          <div className="relative group/card overflow-hidden rounded-3xl bg-linear-to-r from-emerald-900/90 to-neutral-800 p-8 text-white shadow-2xl transition-all duration-500 hover:shadow-red-500/10">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover/card:opacity-70 transition-opacity">
              <IconBoltFilled className="size-24 text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-tight mb-3">
                Uncompromising Quality
              </h3>
              <p className="text-neutral-400 max-w-xs leading-relaxed font-inter text-smna">
                We source the world’s finest textiles to ensure your wardrobe
                stands the test of time, not just the season.
              </p>
              <Link
                href="/materials"
                className="mt-6 flex items-center gap-2 text-sm font-semibold tracking-widest border border-neutral-300 px-4 py-2 rounded-xl w-50 cursor-pointer bg-transparent group hover:bg-neutral-300  transition-all duration-200  "
              >
                <p className="text-sm text-neutral-300 group-hover:text-neutral-900">
                  View Materials
                </p>{" "}
                <IconArrowRight className="size-4 group-hover:text-neutral-900 " />
              </Link>
            </div>
          </div>

          {/* Bottom Row - Two Smaller Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Style Card */}
            <div className="rounded-3xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-800/60">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                <IconTableDashed className="size-5" />
              </div>
              <h4 className="font-bold text-neutral-900">Modern Curation</h4>
              <p className="mt-2 text-sm font-inter text-neutral-500 leading-relaxed">
                Accessible luxury through direct-to-consumer craftsmanship.
              </p>
            </div>

            {/* Ethics Card */}
            <div className="rounded-3xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-800/60">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-900">
                <IconTableSpark className="size-5" />
              </div>
              <h4 className="font-bold text-neutral-900">Total Honesty</h4>
              <p className="mt-2 text-sm font-inter text-neutral-500 leading-relaxed">
                Ethical labor and transparent pricing in every single thread.
              </p>
            </div>
          </div>
        </div>
  );
};


export const Right = () =>{
  return (
            <div className="flex flex-col items-start justify-start">
          <div className="flex items-start flex-col justify-start gap-6">
            <div className="flex items-center justify-start gap-6">
              <div className="w-1.5 h-10 bg-[#138b71]"></div>{" "}
              <Heading className="md:text-4xl font-bold tracking-tight text-neutral-800">
                The Fashioneate Edge
              </Heading>
              <div className="w-24 h-px bg-neutral-300"></div>
            </div>

            {/* Why Us Content Area */}
            <div className="flex flex-col items-start justify-center gap-8 border-l-2 border-neutral-100 pl-8 py-2 ml-1">
              <WhyUsSection
                heading="Uncompromising Quality"
                subHeading="We obsess over the fine details so you don't have to. From premium fabrics to reinforced stitching, every piece is a promise of durability and timeless style."
                icon={<IconBoltFilled className="size-5 text-orange-500" />}
              />

              <WhyUsSection
                heading="Accessible Luxury"
                subHeading="High-end fashion shouldn't require a second mortgage. By streamlining our supply chain, we deliver runway-ready designs at prices that actually make sense."
                icon={<IconTableDashed className="size-5 text-blue-600" />}
              />

              <WhyUsSection
                heading="Radical Transparency"
                subHeading="Integrity is our finest thread. We are committed to ethical sourcing and honest pricing, building a brand relationship that lasts longer than a single season."
                icon={<IconSeedlingFilled className="size-5 text-green-700" />}
                isLastChild
              />
            </div>
          </div>
        </div>
  )
}