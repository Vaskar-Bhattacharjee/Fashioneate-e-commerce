"use client";
import Link from "next/link";
import { Container } from "../ui/container";
import { Heading, SubHeading } from "../ui/header";
import {
  NewArrivalsItemCard,
} from "./new-arrivals";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fallback_Products } from "@/src/lib/data";

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

export const NewArrivals = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/get-all-products");
        setProducts(response.data);
      } catch (error) {
        setProducts(Fallback_Products as ProductProps[]);
        console.error("Error fetching products:", error);
        console.log("products: ", products);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const displayedProducts = products.filter(
    (p) => p.newArrival === true && p.isFeatured === true,
  );
  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        Loading latest fashion...
      </div>
    );
  }
  return (
    <section className="h-auto">
      <Container>
        <div className="w-full min-h-96 pt-32 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="w-8 bg-neutral-400 h-0.5"></span>
              <Heading className="font-extrabold py-0">New Arrivals</Heading>
              <span className="w-8 bg-neutral-400 h-0.5"></span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-4 max-w-2xl"
            >
              <SubHeading className="md:text-center text-neutral-500 ">
                Explore our latest collection of fashion-forward pieces that
                have just arrived. From trendy apparel to stylish accessories,
                discover the perfect additions to elevate your wardrobe.
              </SubHeading>
            </motion.div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-8 w-5xl h-150">
            <div className="md:row-span-2">
              <NewArrivalsItemCard
                imgSrc={displayedProducts[0].image}
                productName={displayedProducts[0].name}
                price={displayedProducts[0].newprice}
                id = {displayedProducts[0]._id}
              />
            </div>

            <div className="md:row-span-1">
              <NewArrivalsItemCard
                imgSrc={displayedProducts[1].image}
                productName={displayedProducts[1].name}
                price={displayedProducts[1].newprice}
                id = {displayedProducts[1]._id}
              />
            </div>

            <div className="md:row-span-1">
              <NewArrivalsItemCard
                imgSrc={displayedProducts[2].image}
                productName={displayedProducts[2].name}
                price={displayedProducts[2].newprice}
                id = {displayedProducts[2]._id}
              />
            </div>
          </div>
          <div className="mt-12 flex items-center justify-center">
            <Link href="/new-arrivals">
              <div className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:bg-neutral-700">
                See More{" "}
                <span>
                  <IconArrowRight className="size-4" />{" "}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
