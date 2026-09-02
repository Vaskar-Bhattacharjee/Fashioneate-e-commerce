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
   <section className="relative w-screen h-[130vh] lg:h-[90vh]  lg:pt-0 mt-10 overflow-hidden border-b border-neutral-200 flex items-center justify-center  "
   >
     <Image
    src="https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg"
    alt=""
    fill
    priority
    className="
      object-cover
      object-[58%_center]
      scale-[1.03]
      brightness-[0.72]
      contrast-[1.05]
      saturate-[0.75]
    "
  />

  {/* Editorial shadow */}
  <div
    className="
      absolute
      inset-0
      bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.48)_32%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.04)_100%)]
    "
  />

  {/* Very subtle overall tone */}
  <div
    className="
      absolute
      inset-0
      bg-black/[0.06]
    "
  />

      
      <Container className="flex items-center justify-center h-full relative px-10">        
        {/* <Gridline /> */}
        <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-15 lg:justify-between">          

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start justify-center w-full z-10 gap-7"
          >
          
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heading className="text-gray-200 tracking-tight lg:text-7xl ">
                Timeless pieces for <br /> the modern wardrobe
              </Heading>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <SubHeading className="-mt-5 lg:w-140 text-gray-400">
                Premium fashion for those who believe that how you dress is < br className="hidden lg:visible"/>how you meet the world. Timeless pieces, honest prices.
                
              </SubHeading>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4 px-4 md:px-0"
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href="/shop"
                  className="text-gray-100 bg-gray-900 shadow-box-2 border border-gray-900 text-sm md:text-lg px-8 py-2 rounded-md font-semibold cursor-pointer  inline-block font-cormorantGaramond"
                >
                  Shop Now
                </Link>
              </div>
              <div
    
                className="hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link
                  href="/new-arrivals"
                  className="text-neutral-950 shadow-box bg-neutral-100 text-sm md:text-lg  px-4 py-2 rounded-md font-semibold cursor-pointer inline-block font-cormorantGaramond w-40 text-center"
                >
                  New Arrivals
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right image section ── */}

        </div>
      </Container>
    </section>
  );
};

export const Gridline = () => {
  return (
    <div className="pointer-events-none absolute grid grid-cols-3 md:grid-cols-4 gap-12 inset-0 h-900 scale-[1.2] -rotate-45 translate-x-100 -translate-y-270 md:translate-x-100 md:-translate-y-300 mask-t-from-99% mask-b-from-95% z-0 overflow-hidden select-none">
      
        <div className="border border-dashed border-neutral-300 "></div>
        <div className="border border-dashed border-neutral-300 bg-linear-to-b from-transparent via-neutral-50 to-transparent mask-b-from-70% ma "></div>
        <div className="border border-dashed border-neutral-300   "></div>
        <div className="border border-dashed border-neutral-300  "></div>
    </div>
  );
};