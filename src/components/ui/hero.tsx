"use client";
import { IconArrowRight, IconFlameFilled } from "@tabler/icons-react";
import { Container } from "./container";
import { Heading, SubHeading } from "./header";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/src/lib/utils";

export const Hero = () => {
  return (
   <section className="relative w-screen h-[85vh] lg:h-[90vh] pt-32 lg:pt-0 overflow-hidden border-b border-neutral-200 flex items-center justify-center">

      
      <Container className="flex items-center justify-center h-full relative px-10">        
        <Gridline />
        <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-15 lg:justify-between">          

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start justify-center w-full z-10 gap-7"
          >
            <motion.div
              className="relative w-65 p-[1.5px] group z-10 overflow-hidden h-10 rounded-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            > 
              <div className="text-black bg-neutral-200 z-20 flex items-center justify-center gap-3 h-full rounded-xl tracking-tight font-mono ">
                <motion.span
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconFlameFilled className="size-5 transition-all text-orange-500" />
                </motion.span>
                Find your style
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconArrowRight className="size-3 transition-all" />
                </motion.span>
              </div>
              <div className="absolute inset-0 -z-10 scale-[12] bg-[conic-gradient(at_center,transparent,var(--color-emerald-500),10%,transparent_5%)] animate-[spin_6s_linear_infinite]"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heading className="text-neutral-700 tracking-tight lg:text-7xl">
                Timeless pieces for the <br /> life you're building
              </Heading>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SubHeading>
                Premium fashion for those who believe that how you dress is < br/>how you meet the world. Timeless pieces, honest prices.
                
              </SubHeading>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4 px-4 md:px-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href="/shop"
                  className="text-neutral-100 bg-neutral-900 shadow-box-2 border border-neutral-900 text-md px-8 py-2 rounded-md font-semibold cursor-pointer  inline-block font-inter"
                >
                  Shop Now
                </Link>
              </div>
              <div
    
                className="hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href="/new-arrivals"
                  className="text-neutral-950 shadow-box bg-neutral-100 text-md  px-4 py-2 rounded-md font-semibold cursor-pointer inline-block font-inter w-40 text-center"
                >
                  New Arrivals
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right image section ── */}
          <div className="relative flex flex-col gap-1 items-center justify-center [--pattern-fg:var(--color-neutral-900)]/10 w-full lg:w-auto">
            {/* ← shrink on mobile/tablet */}
            <div
              className={cn(
                "w-72 h-72 md:w-96 md:h-96 lg:w-120 lg:h-120 rounded-md overflow-hidden relative border-2 border-dashed border-neutral-200",
                "bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed",
              )}
            ></div>
            <div
              className={cn(
                "w-72 h-72 md:w-96 md:h-96 lg:w-120 lg:h-120 rounded-md overflow-hidden absolute translate-x-4 translate-y-4 md:translate-x-5 md:translate-y-5",
                "hover:translate-0 transition-all duration-400 ease-in-out",
              )}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.6 }}
                className="w-72 h-72 md:w-96 md:h-96 lg:w-120 lg:h-120 rounded-md overflow-hidden relative"
                style={{ perspective: "1000px" }}
              >
                <Image
                  src="https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg"
                  alt="shop"
                  fill
                  className="object-cover grayscale-25 "
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const Gridline = () => {
  return (
    <div className="pointer-events-none absolute grid grid-cols-4 gap-12 inset-0 h-900 scale-[1.2] -rotate-45 translate-x-100 -translate-y-300 mask-t-from-99% mask-b-from-95% z-0 overflow-hidden select-none">
      
        <div className="border border-dashed border-neutral-300 bg-rgba(0, 0, 0, 0.2) "></div>
        <div className="border border-dashed border-neutral-300 bg-[rgba(0, 0, 0, 0.2)] "></div>
        <div className="border border-dashed border-neutral-300 bg-[rgba(0, 0, 0, 0.2)] "></div>
        <div className="border border-dashed border-neutral-300 bg-[rgba(0, 0, 0, 0.2)] "></div>
    </div>
  );
};