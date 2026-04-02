"use client";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/container";
import { motion } from "framer-motion";

export const BrandStory = () => {
  return (
    <section className="relative bg-[#1C1C1C] w-full overflow-hidden">
      <Container className="w-full  flex flex-col lg:flex-row justify-center items-stretch min-h-[600px]">

        <div className="relative w-full lg:w-[50%] min-h-[500px] lg:min-h-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0, filter: "grayscale(100%) blur(4px)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "grayscale(100%) blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.pexels.com/photos/35462550/pexels-photo-35462550.jpeg"
              alt="Fashioneate brand story"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-[2s] ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          
          {/* Subtle dark gradient on right edge — blends into dark right panel */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#1C1C1C] z-10" />
          {/* Bottom gradient for mobile blending */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1C1C1C] to-transparent lg:hidden z-10" />
        </div>

        {/* Right — Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 z-20">

          {/* Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-inter font-medium text-[#C9A96E]">
              Our Story
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorantGaramond font-normal text-4xl lg:text-5xl text-[#F5F0E8] leading-[1.1] tracking-tight mb-6"
          >
            Crafted for those<br />
            who dress with<br />
            intention.
          </motion.h2>

          {/* Gold divider */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-8 h-px bg-[#C9A96E] mb-8" 
          />

          {/* Body */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-inter text-sm text-[#A89880] leading-[1.9] font-light text-justify mb-10 max-w-md"
          >
            Fashioneate was born from a singular vision — to restore the
            reverence of the garment. Rooted in the heritage of master
            tailoring and the quiet luxury of timeless silhouettes, our
            collections represent a dialogue between the past and the
            present. Every stitch is a commitment to permanence. We do not
            design for the season — we curate for those who understand that
            true style is a legacy of craftsmanship and enduring quality.
          </motion.p>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 w-fit group mb-16"
            >
              <span className="text-[11px] tracking-[0.2em] uppercase font-inter font-medium text-[#F5F0E8] border-b border-[#F5F0E8]/40 pb-1 group-hover:border-[#C9A96E] group-hover:text-[#C9A96E] transition-colors duration-300">
                Read our story
              </span>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-start gap-y-6 gap-x-0 border-t border-white/10 pt-8"
          >

            <div className="w-1/3 sm:flex-1 flex flex-col gap-1 pr-2">
              <span className="font-cormorantGaramond font-normal text-3xl text-[#F5F0E8] leading-none">
                4
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase font-inter text-[#666] mt-1">
                Collections
              </span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[#C9A96E]/30 self-start mt-1" />

            <div className="w-1/3 sm:flex-1 flex flex-col gap-1 sm:pl-6 sm:border-none border-l border-[#C9A96E]/30 pl-4">
              <span className="font-cormorantGaramond font-normal text-2xl sm:text-3xl text-[#F5F0E8] leading-none">
                Ethically
              </span>
              <span className="font-cormorantGaramond font-normal text-lg sm:text-xl text-[#F5F0E8] leading-none">
                Made
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase font-inter text-[#666] mt-1">
                Traceable
              </span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[#C9A96E]/30 self-start mt-1" />

            <div className="w-1/3 sm:flex-1 flex flex-col gap-1 sm:pl-6 items-start sm:items-end sm:border-none border-l border-[#C9A96E]/30 pl-4">
              <span className="font-cormorantGaramond font-normal text-2xl sm:text-3xl text-[#F5F0E8] leading-none">
                30 Day
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase font-inter text-[#666] mt-1">
                Returns
              </span>
            </div>

          </motion.div>
        </div>

      </Container>
    </section>
  );
};