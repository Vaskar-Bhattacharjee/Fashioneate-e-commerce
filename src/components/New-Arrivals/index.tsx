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
    <section className="h-auto py-18">
      <Container>
        <div className="w-full min-h-96 flex flex-col items-center justify-center">

          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="w-30 bg-neutral-300 h-0.5"></span>
              <Heading className="font-extrabold py-0 text-center">New Arrivals</Heading>
              <span className="w-30 bg-neutral-300 h-0.5"></span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-2 md:mt-4 max-w-2xl px-4 md:px-0"
            >
              <SubHeading className="text-center text-neutral-500">
                Explore our latest collection of fashion-forward pieces that
                have just arrived. From trendy apparel to stylish accessories,
                discover the perfect additions to elevate your wardrobe.
              </SubHeading>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 md:mt-12 w-full px-4 md:px-0 md:w-4xl lg:w-5xl
              flex flex-row gap-4 lg:gap-6"  
          >
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 min-w-0"  // ← flex-1 + min-w-0 prevents overflow
            >
              <NewArrivalsItemCard
                imgSrc={displayedProducts[0].image}
                productName={displayedProducts[0].name}
                price={displayedProducts[0].newprice}
                id={displayedProducts[0]._id}
                className="h-64 md:h-80 lg:h-96"
              />
            </motion.div>

            {displayedProducts[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex-1 min-w-0"
              >
                <NewArrivalsItemCard
                  imgSrc={displayedProducts[1].image}
                  productName={displayedProducts[1].name}
                  price={displayedProducts[1].newprice}
                  id={displayedProducts[1]._id}
                  className="h-64 md:h-80 lg:h-96"
                />
              </motion.div>
            )}

            {displayedProducts[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex-1 min-w-0"
              >
                <NewArrivalsItemCard
                  imgSrc={displayedProducts[2].image}
                  productName={displayedProducts[2].name}
                  price={displayedProducts[2].newprice}
                  id={displayedProducts[2]._id}
                  className="h-64 md:h-80 lg:h-96"
                />
              </motion.div>
            )}
          </motion.div>

          <div className="mt-10 md:mt-12 flex items-center justify-center">
            <Link href="/new-arrivals">
              <div className="flex items-center justify-between gap-2 w-35 group hover:bg-neutral-900 hover:shadow-lg transition-all duration-300 px-3 py-2 border border-neutral-900 rounded-full text-neutral-900">
                <span className="bg-neutral-900 group-hover:bg-neutral-100 size-8 rounded-full flex items-center justify-center">
                  <IconArrowRight className="size-7 text-neutral-100 group-hover:text-neutral-900" />
                </span>
                <p className="text-neutral-900 group-hover:text-white font-inter font-semibold">
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
