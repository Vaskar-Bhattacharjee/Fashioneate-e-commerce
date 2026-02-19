"use client";
import { Container } from "@/src/components/ui/container";
import { Heading } from "@/src/components/ui/header";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarView,
  BarViewThree,
  BarViewTwo,
  GridView,
} from "@/src/SVG illustrations/page";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown } from "@/src/components/ui/dropdown";
import { Fallback_Products } from "@/src/lib/data";
import axios from "axios";
import {
  IconFileDollarFilled,
  IconFilter,
  IconMoodKidFilled,
  IconSeedlingFilled,
  IconUserFilled,
  IconWomanFilled,
} from "@tabler/icons-react";

interface gridLayout {
  layout: "grid" | "list" | "barTwo" | "barThree";
}
interface ProductProps {
  _id: string;
  name: string;
  description: string;
  image: string;
  newprice: number;
  comparePrice: number;
  category: string;
  newArrival: boolean;
  quantity: number;
  unit: string;
  status: string;
  isFeatured: boolean;
}

export default function ShopPage() {
  const [layout, setLayout] = useState<gridLayout["layout"]>("grid");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState<ProductProps[]>();
  const [loading, setLoading] = useState(true);
  console.log("category", category);
  console.log("sortBy", sortBy);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/get-all-product");

        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setProducts(response.data);
          console.log("Fetched products from backend:", response.data);
        } else {
          setProducts(Fallback_Products as ProductProps[]);
        }
      } catch (error: unknown) {
        console.warn("Backend failed, using fallback collection.", error);
        setProducts(Fallback_Products as ProductProps[]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const displayedProducts = [...(products || [])]
    .filter((p) => (category === "All" ? true : p.category === category))
    .sort((a, b) => {
      if (sortBy === "Price: High to Low") {
        return b.newprice - a.newprice;
      }
      if (sortBy === "Price: Low to High") {
        return a.newprice - b.newprice;
      }
      return 0;
    });

  return (
    <Container className="min-h-screen pt-4 md:pt-20 lg:pt-28 w-full px-3  lg:w-6xl flex flex-col items-start justify-start bg-transparent">
      <div className="w-full flex flex-col justify-center items-start gap-4 border-b border-neutral-200 pb-4">
        <Heading className="text-[29px] lg:text-4xl md:pb-0">
          Our Collection for Your Style Needs
        </Heading>

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-2 md:gap-3">
            <p className="text-neutral-600 text-[14px] md:text-[16px] font-bold">
              View:
            </p>

            <div className="flex items-start justify-center gap-1">
              <GridView
                onClick={() => {
                  setLayout("grid");
                }}
                size={15}
                className={cn(
                  "flex text-neutral-900  transition-colors cursor-pointer",
                  layout === "grid" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
              <BarViewTwo
                onClick={() => {
                  setLayout("barTwo");
                  console.log(layout);
                }}
                size={15}
                className={cn(
                  "text-neutral-900  transition-colors cursor-pointer",
                  layout === "barTwo" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
              <BarViewThree
                onClick={() => {
                  setLayout("barThree");
                  console.log(layout);
                }}
                size={15}
                className={cn(
                  "text-neutral-900  transition-colors cursor-pointer",
                  layout === "barThree" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
              <BarView
                onClick={() => {
                  setLayout("list");
                  console.log(layout);
                }}
                size={16}
                rotate="90deg"
                className={cn(
                  "text-neutral-900  transition-colors cursor-pointer",
                  layout === "list" &&
                    "text-neutral-100 bg-neutral-900 border-0",
                )}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-4">
            <Dropdown
              sortname="Category:"
              onSelect={(val) => setCategory(val)}
              items={[
                { label: "All", icon: <IconFilter className="size-4" /> },
                {
                  label: "Men's Fashion",
                  icon: <IconUserFilled className="size-4" />,
                },
                {
                  label: "Women's Fashion",
                  icon: <IconWomanFilled className="size-4" />,
                },
                {
                  label: "Kid's Fashion",
                  icon: <IconMoodKidFilled className="size-4" />,
                },
                {
                  label: "Wedding Collection",
                  icon: <IconSeedlingFilled className="size-4" />,
                },
              ]}
            />

            <Dropdown
              sortname="Sort by:"
              onSelect={(val) => setSortBy(val)}
              items={[
                {
                  label: "Price: Low to High",
                  icon: <IconFileDollarFilled className="size-4" />,
                },
                {
                  label: "Price: High to Low",
                  icon: <IconFileDollarFilled className="size-4" />,
                },
              ]}
            />
          </div>
        </div>
      </div>
      {layout === "grid" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20, stiffness: 120 }}
              >
                <CardLayoutOne
                  _id={product._id}
                  src={product.image}
                  category={product.category}
                  productName={product.name}
                  description={product.description}
                  price={product.newprice}
                />
              </motion.div>
            ))}{" "}
            {/* <--- This was missing */}
          </AnimatePresence>
        </motion.div>
      )}
      {layout === "barTwo" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center items-center gap-4 flex-wrap"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", damping: 20, stiffness: 120 }}
              >
                <CardLayoutTwo
                  key={product._id}
                  _id={product._id}
                  src={product.image}
                  category={product.category}
                  productName={product.name}
                  description={product.description}
                  price={product.newprice}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      {layout === "barThree" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 pl-0 lg:pl-20"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ stiffness: 120, damping: 20, type: "spring" }}
              >
                <CardLayoutThree
                  key={product._id}
                  _id={product._id}
                  src={product.image}
                  category={product.category}
                  productName={product.name}
                  description={product.description}
                  price={product.newprice}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      {layout === "list" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-0 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.div
                layout
                key={product._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ stiffness: 120, damping: 20, type: "spring" }}
              >
                <CardLayoutFour
                  key={product._id}
                  _id={product._id}
                  src={product.image}
                  category={product.category}
                  productName={product.name}
                  description={product.description}
                  price={product.newprice}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </Container>
  );
}

export const CardLayoutOne = ({
  _id,
  category,
  productName,
  description,
  price,
  src,
}: {
  _id: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={`/product/${_id}`}
      className=" md:w-65 md:h-105 mt-7 md:flex flex-col border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-60 relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className="w-full h-45 flex flex-col items-start justify-center px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>

          <p className="font-bold text-lg text-black leading-tight">
            {productName}
          </p>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[22px] font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};
export const CardLayoutTwo = ({
  _id,
  category,
  productName,
  description,
  price,
  src,
}: {
  _id: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={`/product/${_id}`}
      className=" lg:w-100 lg:h-105 mt-7 flex flex-col border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-60 relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className="w-full h-45 flex flex-col items-start justify-center px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>

          <p className="font-bold text-lg text-black leading-tight">
            {productName}
          </p>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[22px] font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export const CardLayoutThree = ({
  _id,
  category,
  productName,
  description,
  price,
  src,
}: {
  _id: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={`/product/${_id}`}
      className="lg:w-80 lg:h-105 mt-7 flex flex-col border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-60 relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className="w-full h-45 flex flex-col items-start justify-center px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center gap-1">
          <span className="text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>

          <p className="font-bold text-lg text-black leading-tight">
            {productName}
          </p>
          <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[22px] font-semibold text-neutral-800">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export const CardLayoutFour = ({
  _id,
  category,
  productName,
  description,
  price,
  src,
}: {
  _id: string;
  category: string;
  productName: string;
  description: string;
  price: number;
  src: string;
}) => {
  return (
    <Link
      href={`/product/${_id}`}
      className="w-full h-35 md:h-40 mt-7 flex items-center justify-between md:gap-10 border border-neutral-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-40 md:w-60 h-full relative">
        <Image src={src} alt="shop" fill className="object-cover" />
      </div>

      <div className=" h-full  flex flex-col items-start justify-center px-3 md:px-6 py-4 bg-white">
        <div className="flex flex-col items-start justify-center md:gap-1 py-2">
          <span className="text-xs md:text-[15px]  tracking-[0.2em] text-neutral-700 font-bold ">
            {category}
          </span>
          <p className="font-bold text-xl text-black leading-tight">
            {productName}
          </p>

          <p className="text-xs  md:text-sm w-50 md:w-200 text-neutral-500 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <p className="text-[18px] md:text-[22px] font-bold md:font-semibold text-neutral-800">
            ${price}
          </p>
        </div>
      </div>
    </Link>
  );
};
