"use client";
import { Container } from "@/src/components/ui/container";
import { Dropdown } from "@/src/components/ui/dropdown";
import { Heading, SubHeading } from "@/src/components/ui/header";
import { cn } from "@/src/lib/utils";
import { IconAdjustmentsFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Fallback_newArrivals = [
  {
    img: "https://images.pexels.com/photos/7622259/pexels-photo-7622259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Women's Fashion",
    category: "Women", // Normalized to match dropdown
    title: "Minimalist Silk Blazer",
    price: 450,
  },
  {
    img: "https://images.pexels.com/photos/9849633/pexels-photo-9849633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Men's Collection",
    category: "Men", // Normalized to match dropdown
    title: "Classic Wool Overcoat",
    price: 890,
  },
  {
    img: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Accessories",
    category: "Accessories",
    title: "Leather Tote Bag",
    price: 1200,
  },
];

const NewArrivals = () => {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const displayedProducts = [...Fallback_newArrivals]
    .filter((p) => (category === "All" ? true : p.category === category))
    .sort((a, b) => {
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Price: Low to High") return a.price - b.price;
      return 0;
    });

  return (
    <Container className="pt-10 md:pt-18 lg:pt-32 max-w-7xl mx-auto ">
      {/* Header Section */}
      <div className="relative flex flex-col justify-center items-center gap-6 text-center pb-10">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-size-[40px_40px]",
          "bg-[linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)]",
          "mask-l-from-70% mask-r-from-70% mask-t-from-70% mask-b-from-70% ",
        )}
      />


        <div className="w-5xl flex items-center justify-between gap-6 z-10">
          <Heading className="text-5xl md:text-5xl font-bold tracking-tight">
            New Arrivals
          </Heading>
                <div className=" flex items-center gap-4 relative z-50">


        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 90 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Dropdown
                sortname="Sort By"
                items={["Price: High to Low", "Price: Low to High"]}
                onSelect={setSortBy}
              />
              <Dropdown
                sortname="Category"
                items={["All", "Women", "Men"]}
                onSelect={setCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
                <div
          onClick={() => setIsHovered(!isHovered)}
          className={`border shadow-sm p-3 flex justify-center items-center gap-2 rounded-full cursor-pointer transition-all duration-300 ${isHovered ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-50"}`}
        >
          <IconAdjustmentsFilled
            className={`size-6 ${isHovered ? "text-white" : "text-neutral-700"}`}
          />
        </div>
      </div>
        </div>
        

       
      </div>

  


      {/* Grid Section */}
      <div className="w-5xl grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-5  ">
        {displayedProducts.map((item, index) => (
          <NewArrivalsCard key={index} {...item} />
        ))}
      </div>
    </Container>
  );
};

export default NewArrivals;

export const NewArrivalsCard = ({
  img,
  alt,
  title,
  price,
  category,
}: {
  img: string;
  alt: string;
  title: string;
  price: number;
  category: string;
}) => {
  return (
    <motion.div className="group w-full border border-neutral-200 rounded-2xl flex flex-col gap-5 items-start justify-start overflow-hidden cursor-pointer pt-[1.5px] pl-[1.5px] hover:p-0 bg-white bg-[radial-gradient(circle_at_top_left,theme(colors.blue.400/100%)_0%,transparent_50%)] transition-all duration-300">
      <div className="w-full h-80 relative rounded-tl-[15px] rounded-tr-2xl overflow-hidden bg-neutral-100 border border-neutral-100">
        <Image src={img} alt={alt} fill className="object-cover " />
      </div>

      <div className="relative flex flex-col items-start gap-1 w-full pb-6 [--pattern-fg:var(--color-neutral-700)]/5">
        <Pattern />
        <h3 className="text-neutral-500 font-semibold pl-5">{category}</h3>
        <h3 className="text-xl font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors pl-5">
          {title}
        </h3>
        <span className="text-lg font-semibold tracking-tight text-neutral-600 pl-5">
          $ {price.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export const Pattern = () => {
  return (
    <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_1px,transparent_10%)] bg-size-[100px_100px] mask-t-from-70%"></div>
  );
};
