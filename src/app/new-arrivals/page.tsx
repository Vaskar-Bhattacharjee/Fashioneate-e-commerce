"use client";
import { Container } from "@/src/components/ui/container";
import { Dropdown } from "@/src/components/ui/dropdown";
import { Heading } from "@/src/components/ui/header";
import { cn } from "@/src/lib/utils";
import {
  IconAdjustmentsFilled,
  IconShoppingBagCheck,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/src/store/useCartStore";
import axios from "axios";

interface CartItem {
  image: string;
  alt: string;
  category: string;
  _id: string;
  name: string;
  newprice: number;
}

interface Product {
  _id: string;
  image: string;
  alt: string;
  name: string;
  newprice: number;
  category: string;
}

const NewArrivals = () => {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const addToCart = useCartStore((state) => state.addToCart);
  const handleToCart = (item: CartItem) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.newprice,
      image: item.image,
      quantity: 1,
      selectedSize: "M",
    });
  };
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await axios.get("api/product/new-arrivals");
        setProducts(res.data)
            
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    }

    fetchNewArrivals();



  },[]);
  const displayedProducts = [...products ]
    .filter((p) => (category === "All" ? true : p.category === category))
    .sort((a, b) => {
      if (sortBy === "Price: High to Low") return b.newprice - a.newprice;
      if (sortBy === "Price: Low to High") return a.newprice - b.newprice;
      return 0;
    });

  return (
    <Container className="pt-10 md:pt-18 lg:pt-32 max-w-7xl mx-auto ">
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
                    items={[
                      { label: "Price: High to Low" },
                      { label: "Price: Low to High" }
                    ]}
                    onSelect={setSortBy}
                  />
                  <Dropdown
                    sortname="Category"
                    items={[
                      { label: "All" },
                      { label: "Women's Fashion"  },
                      { label: "Men's Fashion" },
                      { label: "Kid's Fashion" }
                    ]}
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
        {displayedProducts.map((item) => (
          <NewArrivalsCard
            key={item._id}
            {...item}
            onAddToCart={() => handleToCart(item)}
          />
        ))}
      </div>
    </Container>
  );
};

export default NewArrivals;

export const NewArrivalsCard = ({
  _id,
  image,
  alt,
  name,
  newprice,
  category,
  onAddToCart,
}: {
  _id: string;
  image: string;
  alt: string;
  name: string;
  newprice: number;
  category: string;
  onAddToCart: () => void;
}) => {
  return (
    <Link href={`/product/${_id}`}>
      <motion.div className="group w-full border border-neutral-200 rounded-2xl flex flex-col gap-5 items-start justify-start overflow-hidden cursor-pointer p-[1.5px]  bg-white bg-[radial-gradient(circle_at_top_left,theme(colors.blue.400)_0%,transparent_50%)] transition-all duration-300">
        <div className="w-full h-80 relative rounded-tl-[14.6px] rounded-tr-[14.6px] overflow-hidden bg-neutral-100 border border-neutral-100 ">
          <Image src={image} alt={alt || "shop"} fill className="object-cover group-hover:scale-110 transition-all ease-in-out duration-300" />
        </div>

        <div className="relative flex flex-col items-start gap-1 w-full pb-6 [--pattern-fg:var(--color-neutral-700)]/5">
          <Pattern />
          <h3 className="text-neutral-500 font-semibold pl-5">{category}</h3>
          <h3 className="text-xl font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors pl-5">
            {name}
          </h3>
          <div className="flex pt-2 justify-between items-center w-full px-5">
            <span className="text-lg font-semibold tracking-tight text-neutral-600 ">
              $ {newprice}
            </span>
            <div
              onClick={(e) => {
                e.preventDefault();
                onAddToCart();
              }}
              className="flex justify-center items-center gap-2 z-10 group shadow-input px-2 py-1 rounded-md bg-neutral-50 hover:bg-neutral-100 cursor-pointer"
            >
              <p className="text-sm font-semibold tracking-tight text-neutral-600">
                Add to Cart
              </p>
              <IconShoppingBagCheck className="bg-transparent text-neutral-900" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export const Pattern = () => {
  return (
    <div className="absolute inset-0 bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_1px,transparent_10%)] bg-size-[100px_100px] mask-t-from-70%"></div>
  );
};
