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
    <section className="relative w-screen h-[90vh] ">
      

    <Container>
      <div className="w-full h-[98vh] flex items-center justify-between  pl-16 pr-28    ">
        <Gridline />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" flex flex-col col-span-1 items-start justify-center ml-23 z-10"
        >
          <motion.div 
            className="relative w-65 p-[1.5px] group  z-10 overflow-hidden h-10 rounded-xl cursor-pointer lg:mt-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-black bg-neutral-200 z-20 flex items-center justify-center gap-3 h-full rounded-xl tracking-tight  font-mono">
              <motion.span
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                <IconFlameFilled className="size-5  transition-all text-orange-500" />{" "}
              </motion.span>{" "}
              Find your style{" "}
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <IconArrowRight className="size-3  transition-all" />{" "}
              </motion.span>{" "}
            </div>
            <div className="absolute inset-0 -z-10 scale-[12] bg-[conic-gradient(at_center,transparent,var(--color-emerald-500),10%,transparent_5%)] animate-[spin_6s_linear_infinite] "></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heading className="text-neutral-700  md:text-7xl tracking-tight">
              {" "}
              Welcome to Fashioneate
            </Heading>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SubHeading>
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae
              impedit fugiat laborum sequi consectetur exercitationem unde
              aspernatur autem dicta alias voluptate aut quasi illum possimus
              fugit praesentium, eligendi molestias, architecto quae veniam

            </SubHeading>
          </motion.div>
          <motion.div 
            className="flex items-center justify-center gap-4 md:mt-2 lg:mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={"/shop"} className="text-neutral-100 bg-neutral-900 border text-md  px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-neutral-800 hover:text-neutral-200 transition-all duration-300 inline-block">
                Shop Now
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={"/shop"} className="text-neutral-900 bg-neutral-100 text-md  border  px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-neutral-200 hover:text-neutral-800 transition-all duration-300 inline-block">
                View Collection
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* ---------------------------------------------- */}
        <div className="relative flex flex-col  gap-1 items-center justify-center [--pattern-fg:var(--color-neutral-900)]/10">
          <div className={cn("w-120 h-120 rounded-md overflow-hidden relative border-2 border-dashed  border-neutral-200",
            "bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"
          )}></div>
          <div className={cn("w-120 h-120 rounded-md overflow-hidden absolute translate-x-5 translate-y-5",
            "hover:translate-0 transition-all duration-400 ease-in-out"
          )}>
                        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ duration: 0.6 }}
            className="w-120 h-120 rounded-md overflow-hidden relative animate pulse"
            style={{ perspective: "1000px" }}
          >
            <Image
              src={"https://images.pexels.com/photos/9849647/pexels-photo-9849647.jpeg"}
              alt="shop"
              fill
              className="object-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
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
          <div className="pointer-events-none absolute mask-r-from-80% mask-l-from-80%   inset-0 z-0 grid h-[350vh] -translate-y-200 gap-15 -rotate-45 w-full    select-none grid-cols-2 md:grid-cols-4 ">
        <div className="relative w-full   border border-dashed  border-neutral-300" ></div>
        <div className="relative w-full   border border-dashed  border-neutral-300"></div>
        <div className="relative w-full   border border-dashed  border-neutral-300" ></div>
        <div className="relative w-full   border border-dashed  border-neutral-300"></div>

      </div>
  )
}