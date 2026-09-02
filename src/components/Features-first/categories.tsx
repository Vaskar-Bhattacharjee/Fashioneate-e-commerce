"use client";

import { Heading, SubHeading } from "../ui/header";
import { Container } from "../ui/container";
import { IconCrop11Filled } from "@tabler/icons-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";


const CATEGORIES = [
  {
    id: "wedding",
    label: "Wedding",
    images: [
      "https://images.pexels.com/photos/1651411/pexels-photo-1651411.jpeg",
      "https://images.pexels.com/photos/15686008/pexels-photo-15686008.jpeg",
      "https://images.pexels.com/photos/10110637/pexels-photo-10110637.jpeg",
    ],
  },

  {
    id: "men",
    label: "Men",
    images: [
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    ],
  },

  {
    id: "women",
    label: "Women",
    images: [
      "https://images.pexels.com/photos/33616961/pexels-photo-33616961.jpeg",
      "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
      "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg",
    ],
  },

  {
    id: "kids",
    label: "Kids",
    images: [
      "https://images.pexels.com/photos/6863565/pexels-photo-6863565.jpeg",
      "https://images.pexels.com/photos/3661358/pexels-photo-3661358.jpeg",
      "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg",
    ],
  },
];

type CardProps = {
  label: string;
  image: string;
  className?: string;
};





const CategoryCard = ({
  label,
  images,
  className = "",
}: {
  label: string;
  images: string[];
  className?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  return (
    <motion.div
      className={`
        relative
        overflow-hidden
        rounded-sm
        group
        bg-[#F5F3EE]
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* IMAGE LAYER — all three mounted, crossfade by opacity */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
animate={{
  opacity: i === index ? 1 : 0,
  scale: i === index ? (isHovered ? 1.05 : 1) : 1.02,
  x: i === index ? "0%" : "2%",
}}
transition={{
  opacity: { duration: 0.9, ease: "easeInOut" },
  scale: { duration: 6, ease: [0.22, 1, 0.36, 1] },
  x: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
}}
            style={{ zIndex: i === index ? 1 : 0 }}
          >
            <Image
              src={src}
              alt={label}
              fill
              priority={i === 0}
              className="
                object-cover
                grayscale-[10%]
                transition-[filter]
                duration-700
                group-hover:grayscale-0
              "
            />
          </motion.div>
        ))}
      </div>

      {/* EDITORIAL OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/50
          via-black/10
          to-transparent
        "
      />

      {/* CATEGORY CONTENT */}
      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          gap-3
        "
      >
        <motion.h2
          className="
            text-white
            font-serif
            font-bold
            text-xl
            md:text-2xl
            lg:text-3xl
            uppercase
            tracking-[.2em]
            whitespace-nowrap
            pointer-events-none
          "
          animate={{
            letterSpacing: isHovered ? "0.24em" : "0.20em",
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {label}
        </motion.h2>

        <motion.span
          className="
            text-white/80
            text-xs
            md:text-sm
            font-inter
            font-semibold
            uppercase
            tracking-[.15em]
            whitespace-nowrap
            flex
            items-center
            gap-1
          "
          animate={{
            y: isHovered ? -2 : 0,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          Shop Collection
          <span>›</span>
        </motion.span>
      </div>

      {/* SMALL PROGRESS INDICATOR */}
      <div
        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          flex
          gap-1.5
        "
      >
        {images.map((_, i) => (
          <span
            key={i}
            className={`
              h-[2px]
              rounded-full
              transition-all
              duration-500
              ${
                i === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/40"
              }
            `}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const Categories = () => {
  const [wedding, men, women, kids] = CATEGORIES;

  return (
    <section className="bg-transparent">
      <Container className="flex flex-col items-center justify-center md:w-7xl px-0 lg:px-20 pt-5 lg:pt-0">
        <Heading className="py-0 text-center tracking-tight md:tracking-tighter flex-nowrap">Shop by Collection</Heading>
        <SubHeading className="font-inter text-center text-neutral-500 relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-neutral-300 "
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
          <IconCrop11Filled className="absolute bottom-0 left-0 text-gray-400 -translate-x-2 translate-y-3 border rounded-sm p-0" />
          <IconCrop11Filled className="absolute bottom-0 right-0 text-gray-400 translate-x-2 translate-y-3 border rounded-sm p-0" />
          </motion.div>
          Curated styles for every occasion
        </SubHeading>

<div className="w-full mt-15 lg:mt-25 flex flex-col gap-6 md:flex-row md:gap-10">
  <CategoryCard {...wedding} className="w-90 h-72 md:w-1/2 md:h-140" />

  <div className="w-full flex flex-col gap-4 md:w-1/2 md:h-140 md:grid md:grid-rows-2 md:gap-6">
    <CategoryCard {...men} className="w-full h-72 md:h-auto" />
    <div className="grid grid-cols-2 gap-4">
      <CategoryCard {...women} className="w-full h-48 md:h-auto" />
      <CategoryCard {...kids} className="w-full h-48 md:h-auto" />
    </div>
  </div>
</div>
      </Container>
    </section>
  );
};
