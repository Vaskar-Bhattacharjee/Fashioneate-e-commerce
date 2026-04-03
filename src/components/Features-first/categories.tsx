"use client";

import { Heading, SubHeading } from "../ui/header";
import { Container } from "../ui/container";
import Image from "next/image";
import { IconCrop11Filled } from "@tabler/icons-react";
import { motion } from "framer-motion";

// ── YOUR SVGs — untouched ────────────────────────────────────────
const WeddingRing = ({ className }: { className: string }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="15" r="5" />
    <path d="M9 9h6" />
    <path d="M8.5 9l1.5-3h3l1.5 3" />
    <path d="M8.5 9l3.5 3 3.5-3" />
    <path d="M12 9v3" />
  </svg>
);

const MenSuit = ({ className }: { className: string }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Blazer/jacket shape */}
    <path d="M8 2L4 8l4 2V22h12V10l4-2L16 2" />
    <path d="M8 2c0 4 8 4 8 0" />
    <path d="M12 10v12" />
  </svg>
);

const WomenDress = ({ className }: { className: string }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 3c0 2-1 3-2 4" />
    <path d="M15 3c0 2 1 3 2 4" />
    <path d="M7 7h10" />
    <path d="M7 7l-1 5h12l-1-5" />
    <path d="M6 12l-3 9h18l-3-9" />
    <path d="M9 3c0 0 1 2 3 2s3-2 3-2" />
  </svg>
);

const Kids = ({ className }: { className: string }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 6l3 2v11h10V8l3-2" />
    <path d="M4 6c1 0 2 1 3 2" />
    <path d="M20 6c-1 0-2 1-3 2" />
    <path d="M9 6c0 0 1 2 3 2s3-2 3-2" />
    <path d="M12 12l0.5 1.5H14l-1.2 0.9 0.5 1.6L12 15l-1.3 1 0.5-1.6L10 13.5h1.5z" />
  </svg>
);

const CATEGORIES = [
  {
    id: "wedding",
    label: "Wedding",
    image: "https://images.pexels.com/photos/1651411/pexels-photo-1651411.jpeg",
    Icon: WeddingRing,
    iconSize: "size-18",
  },
  {
    id: "men",
    label: "Men",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
    Icon: MenSuit,
  },
  {
    id: "women",
    label: "Women",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
    Icon: WomenDress,
  },
  {
    id: "kids",
    label: "Kids",
    image: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg",
    Icon: Kids,
  },
];

type CardProps = {
  label: string;
  image: string;
  Icon: ({ className }: { className: string }) => React.ReactElement;
  className?: string;
  iconSize?: string;
};

const CategoryCard = ({
  label,
  image,
  Icon,
  className = "",
  iconSize = "size-12",
}: CardProps) => (
  <div
    className={`relative overflow-hidden rounded-sm group bg-[#F5F3EE] ${className}`}
  >
    <Image
      fill
      src={image}
      alt={label}
      className="object-cover grayscale opacity-80 transition-all duration-700 
      group-hover:opacity-90 group-hover:scale-105"
    />

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
      <Icon className={`text-neutral-700 ${iconSize}`} />
      <h2 className="text-black  group-hover:text-neutral-800 font-serif font-bold text-xl md:text-2xl lg:text-3xl uppercase tracking-[.2em] whitespace-nowrap">
        {label}
      </h2>
      <span className="text-neutral-800 text-sm font-inter font-semibold uppercase tracking-[.15em] whitespace-nowrap flex items-center gap-1 hover:text-neutral-800 transition-colors cursor-pointer">
        Shop Collection <span>›</span>
      </span>
    </div>
  </div>
);

export const Categories = () => {
  const [wedding, men, women, kids] = CATEGORIES;

  return (
    <section className="bg-transparent">
      <Container className="flex flex-col items-center justify-center md:w-7xl px-20 pt-22 lg:pt-0">
        <Heading className="py-0 text-center">Shop by Collection</Heading>
        <SubHeading className="font-inter text-center text-neutral-500 relative">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-neutral-300 "
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
          <IconCrop11Filled className="absolute bottom-0 left-0 text-gray-400 -translate-x-2 translate-y-3 border rounded-sm p-0" />
          <IconCrop11Filled className="absolute bottom-0 right-0 text-gray-400 translate-x-2 translate-y-3 border rounded-sm p-0" />
          </motion.div>
          Curated styles for every occasion
        </SubHeading>

        <div className="w-full mt-30 flex gap-10">
          <CategoryCard {...wedding} className="w-1/2 h-140" />

          <div className="w-1/2 h-140 grid grid-rows-2 gap-6">
            <CategoryCard {...men} className="w-full" />
            <div className="grid grid-cols-2 gap-4">
              <CategoryCard {...women} className="w-full" />
              <CategoryCard {...kids} className="w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
