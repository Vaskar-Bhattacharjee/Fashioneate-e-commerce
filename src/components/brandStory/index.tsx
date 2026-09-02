"use client";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../ui/container";
import { motion } from "framer-motion";
import React from "react";

const BRAND_STORY = {
  title: "Our Story",
  description: "Fashioneate was born from a passion for creating clothing that empowers women to express their unique style. We believe fashion should be accessible, sustainable, and made with care. Our journey began with a simple idea: to make beautiful, high-quality clothing that makes every woman feel confident and beautiful.",
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2, // Short pause when scrolled into view
      staggerChildren: 0.03, // The delay between each word
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0 }, // Removed y: 20
  visible: {
    opacity: 1, // Removed y: 0
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] as const 
    },
  },
};

export const BrandStory = () => {
  return (
    <section className="relative bg-[#1C1C1C] w-full overflow-hidden">
      <Container className="w-full lg:max-w-7xl flex flex-col lg:flex-row justify-center items-stretch min-h-[600px]">

        <div className="relative w-full lg:w-[50%] min-h-125 lg:min-h-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0, filter: "grayscale(100%) blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "grayscale(100%) blur(0px)" }}
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
          
          <div className="absolute inset-y-0 right-0 w-24 
                bg-linear-to-r from-transparent to-[#1C1C1C] z-10" />

{/* Add this — left fade */}
<div className="absolute inset-y-0 left-0 w-20 
                bg-linear-to-l from-transparent to-[#1C1C1C] z-10" />

{/* Add this — top fade */}
<div className="absolute inset-x-0 top-0 h-20 
                bg-linear-to-b from-[#1C1C1C] to-transparent z-10" />

{/* Existing bottom fade — keep */}
<div className="absolute inset-x-0 bottom-0 h-24 
                bg-linear-to-t from-[#1C1C1C] to-transparent lg:hidden z-10" />        </div>

        <div className="w-full lg:w-[50%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-20 z-20">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-inter font-medium text-[#C9A96E]">
              {BRAND_STORY.title}
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorantGaramond font-normal text-4xl lg:text-5xl text-[#F5F0E8] leading-[1.1] tracking-tight mb-6"
          >
            Crafted for those<br />
            who dress with
            intention.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-8 h-px bg-[#C9A96E] mb-8" 
          />

<motion.p
  variants={containerVariants}
  initial="hidden"
  whileInView="visible" // <--- Triggered ONLY when scrolled into view
  viewport={{ once: true, amount: 0.2 }} // <--- Ensures it only happens once, and waits until 20% of the paragraph is visible
  className="font-inter text-[#A89880] font-light text-left mb-10 max-w-lg"
>
  {BRAND_STORY.description.split("\n").map((line, lineIndex, array) => (
    <React.Fragment key={lineIndex}>
      {/* Map through each word in the line */}
      {line.split(" ").map((word, wordIndex) => (
        <motion.span
          key={`${lineIndex}-${wordIndex}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em] text-[16px] md:text-[18px]" // Keeps standard spacing between words
        >
          {word}
        </motion.span>
      ))}
      
      {/* Add a line break at the end of every line EXCEPT the very last one */}
      {lineIndex !== array.length - 1 && <br />}
    </React.Fragment>
  ))}
</motion.p>


            {/* <motion.div 
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
            </motion.div> */}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
              <span className="font-cormorantGaramond font-normal text-2xl sm:text-4xl text-[#F5F0E8] leading-none">
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