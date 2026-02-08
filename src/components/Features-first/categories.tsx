"use client";
import { IconArrowUpRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { Heading, SubHeading } from "../ui/header";
import Link from "next/link";
import { Container } from "../ui/container";
import { use, useState } from "react";
import { s } from "framer-motion/client";

const categoryData = [
    {
        name: "Wedding's Fashion",
        image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
        discount: "up to 50% off",
    },
  {
    name: "Women's Fashion",
    image: "https://images.pexels.com/photos/3965543/pexels-photo-3965543.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
      discount: "up to 50% off",
  },
  {
    name: "Men's Fashion",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
      discount: "up to 50% off",
  },
  {
    name: "Kids' Fashion",
    image: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
      discount: "up to 50% off",
  },
];

export const Categories = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  return (
    <section className=" bg-transparent">
      <Container className=" flex flex-col items-center justify-center md:w-6xl">
        <Heading className="py-0">Top Categories</Heading>
        <SubHeading className="font-inter md:text-center text-neutral-500">Find all your favourite items here</SubHeading>

        <div className="mt-12 flex flex-wrap items-start justify-between gap-4  w-5xl">
        
       
          {categoryData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              key={item.name}
              onMouseEnter={()=> setHoverIndex(index)}
              onMouseLeave={()=> setHoverIndex(null)}
              className="relative  flex justify-between items-center border border-neutral-200 bg-white rounded-[16px] pt-6 pl-5 w-120 h-60 mx-auto py-10  gap-4  [--pattern-fg:var(--color-gray-950)]/5"
            >
             <AnimatePresence >
             {hoverIndex === index && 
             <motion.div
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full  border-[0.2px] border-neutral-300 rounded-[15.2px] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed  "></motion.div>}
              </AnimatePresence>
              <div className="flex flex-col items-start justify-center gap-2 z-10">
                <h1 className="text-neutral-700 font-bold text-2xl">
                  {item.name}
                </h1>
                <p className="text-neutral-600 text-sm font-inter w-61">
                  {item.description}
                </p>
                <p className="w-30 h-7 py-[1.5px] text-center text-neutral-800 text-sm font-semibold rounded-full bg-amber-500/20 border border-amber-500 px-2">{item.discount}</p>
              </div>
              <div className="w-50 absolute inset-y-0 right-0  overflow-hidden">
              <div className="relative w-full h-full overflow-hidden rounded-tr-lg rounded-br-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
