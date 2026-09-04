"use client";
import Link from "next/link";
import { Container } from "../ui/container";
import { Heading, SubHeading } from "../ui/header";
import { NewArrivalsItemCard } from "./new-arrivals";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

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
  newArrivalFeatured: boolean;
}

export const NewArrivals = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/get-all-product");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = [...products].filter(
    (p) =>
      p.newArrival === true &&
      p.isFeatured === true &&
      p.newArrivalFeatured === true,
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-800 rounded-full animate-spin" />
        <p className="text-neutral-500 font-inter text-sm">Loading latest fashion...</p>
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <p className="text-neutral-500 font-inter text-sm">No new arrivals at the moment. Check back later.</p>
      </div>
    );
  }

return (
    <section className="h-auto pt-20 lg:pt-25">
      <Container>
        <div className="w-full min-h-96 flex flex-col items-center justify-center">

          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="w-30 bg-neutral-300 h-0.5"></span>
              <Heading className="py-0 text-center">New Arrivals</Heading>
              <span className="w-30 bg-neutral-300 h-0.5"></span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-2 md:mt-4 max-w-2xl px-4 md:px-0"
            >
              <SubHeading className="text-center text-neutral-500 w-85 text-[16px] md:text-[18px]">
                Explore our latest collection of fashion-forward pieces that
                have just arrived. From trendy apparel to stylish accessories,
                discover the perfect additions to elevate your wardrobe.
              </SubHeading>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 md:mt-12 w-full px-4 md:px-0 md:w-4xl lg:w-5xl
              flex flex-col lg:flex-row gap-4 lg:gap-6"
            onMouseLeave={() => setActiveCard(null)}
          >
            {[0, 1, 2].map((index) => {
              const product = displayedProducts[index];

              if (!product) return null;

              const isActive = activeCard === index;
              const hasActive = activeCard !== null;

              return (
                <motion.div
                  key={product._id}
                  layout
                  onMouseEnter={() => setActiveCard(index)}
                  animate={{
                    flex: isActive
                      ? 1.05
                      : hasActive
                        ? 0.9
                        : 1.1,
                  }}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                    },
                    flex: {
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                    },
                  }}
                  className="relative min-w-0"
                >
                  <motion.div
                    animate={{
                      y: isActive ? -8 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 20,
                    }}
                    className="relative h-64 md:h-80 lg:h-96"
                  >
                    <NewArrivalsItemCard
                      imgSrc={product.image}
                      productName={product.name}
                      price={product.newprice}
                      id={product._id}
                      className="h-full"
                    />

                    {/* Active card atmosphere */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.35 }}
                      className="pointer-events-none absolute inset-0 rounded-md
                        bg-gradient-to-t
                        from-black/15
                        via-transparent
                        to-white/10"
                    />

                    {/* Editorial shine */}
                    <motion.div
                      initial={{ x: "-120%" }}
                      animate={{
                        x: isActive ? "120%" : "-120%",
                      }}
                      transition={{
                        duration: 0.9,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none absolute inset-y-0
                        w-1/3
                        skew-x-[-18deg]
                        bg-gradient-to-r
                        from-transparent
                        via-white/20
                        to-transparent"
                    />

                    {/* Focus marker */}
                    <motion.div
                      initial={false}
                      animate={{
                        width: isActive ? "100%" : "0%",
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-white"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mt-8 md:mt-12 flex items-center justify-center">
            <Link href="/new-arrivals">
              <div className="flex items-center justify-between gap-1 w-30 md:w-35 group hover:bg-neutral-900 hover:shadow-lg transition-all duration-300 px-2 md:px-3 py-1 md:py-2 border border-neutral-900 rounded-full text-neutral-900">
                <span className="bg-neutral-900 group-hover:bg-neutral-100 size-8 rounded-full flex items-center justify-center">
                  <IconArrowRight className="size-7 text-neutral-100 group-hover:text-neutral-900" />
                </span>
                <p className="text-neutral-900 group-hover:text-white font-semibold text-md lg:text-lg font-cormorantGaramond">
                  See More
                </p>
              </div>
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );

};
