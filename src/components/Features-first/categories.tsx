"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Heading, SubHeading } from "../ui/header";
import { Container } from "../ui/container";
import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { useOutsideClick } from "../hooks/use-outside-click";

const categoryData = [
  {
    name: "Wedding's Fashion",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
    discount: "up to 50% off",
    fullDescription: "Discover our exquisite wedding collection featuring traditional and contemporary designs. From bridal lehengas to groom sherwanis, find everything you need for your special day. Our curated selection includes designer pieces from renowned fashion houses, ensuring you look your best on this memorable occasion.",
    featured: ["Bridal Lehengas", "Sherwanis", "Wedding Jewelry", "Accessories"]
  },
  {
    name: "Women's Fashion",
    image: "https://images.pexels.com/photos/3965543/pexels-photo-3965543.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
    discount: "up to 50% off",
    fullDescription: "Explore the latest trends in women's fashion with our diverse collection. From casual everyday wear to elegant evening gowns, we offer styles that empower and inspire. Our selection includes sustainable fashion choices, designer collaborations, and timeless classics that belong in every wardrobe.",
    featured: ["Dresses", "Tops & Tees", "Ethnic Wear", "Western Wear"]
  },
  {
    name: "Men's Fashion",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
    discount: "up to 50% off",
    fullDescription: "Elevate your style with our premium men's fashion collection. From sharp business suits to relaxed weekend wear, discover clothing that fits your lifestyle. We feature quality craftsmanship, modern cuts, and classic designs that transition seamlessly from day to night.",
    featured: ["Suits & Blazers", "Casual Shirts", "Traditional Wear", "Footwear"]
  },
  {
    name: "Kids' Fashion",
    image: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim unde nobis impedit aspernatur .",
    discount: "up to 50% off",
    fullDescription: "Dress your little ones in style with our adorable kids' fashion range. Comfortable, durable, and oh-so-cute, our collection includes everything from playdate outfits to special occasion wear. Made with soft, child-friendly fabrics that parents trust and kids love to wear.",
    featured: ["Baby Wear", "School Uniforms", "Party Dresses", "Shoes"]
  },
];

export const Categories = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<typeof categoryData[0] | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCategory(null);
      }
    }
    
    if (activeCategory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCategory]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActiveCategory(null));

  return (
    <>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40  z-40"
            onClick={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>

      {/* Expanded Card Modal */}
      <AnimatePresence >
        {activeCategory && (
          <motion.div 
          initial={false}
          key="modal-wrapper"
          transition={{ duration: 0 }}

          className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.div
              layout
              layoutId={`card-${activeCategory.name}-${id}`}
              ref={ref}
              className="w-full max-w-108 h-150 bg-white rounded-[24px] overflow-hidden shadow-2xl relative"

            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-4 right-4 z-10 flex items-center justify-center bg-white/90 rounded-full h-8 w-8 shadow-lg hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCategory(null);
                }}
              >
                <CloseIcon />
              </motion.button>

              {/* Image Section */}
              <motion.div 
                className="relative w-full h-50 md:h-65"
                

              >
                <Image
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <motion.h1 
                    className="text-3xl font-bold text-white"
                  >
                    {activeCategory.name}
                  </motion.h1>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Discount Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-amber-500/20 border border-amber-500 text-amber-800">
                      {activeCategory.discount}
                    </span>
                  </div>

                  {/* Full Description */}
                  <p className="text-neutral-600 text-base text-sm leading-relaxed mb-6 font-inter">
                    {activeCategory.fullDescription}
                  </p>

                  {/* Featured Items */}


                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href="/shop"
                      className="flex-1 py-2 px-5 text-center text-neutral-800 font-semibold rounded-xl bg-green-500/50 border border-green-500 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => setActiveCategory(null)}
                    >
                      Shop Now
                    </Link>
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="px-5 py-2 text-neutral-600 font-semibold rounded-xl cursor-pointer border border-neutral-300 hover:bg-neutral-200 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original Section - Unchanged Structure */}
      <section className="bg-transparent">
        <Container className="flex flex-col items-center justify-center md:w-6xl">
          <Heading className="py-0">Top Categories</Heading>
          <SubHeading className="font-inter md:text-center text-neutral-500">
            Find all your favourite items here
          </SubHeading>

          <div className="mt-12 flex flex-wrap items-start justify-between gap-4 w-5xl">
            {categoryData.map((item, index) => (
              <motion.div
              
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                key={item.name}
                layout
                layoutId={`card-${item.name}-${id}`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setActiveCategory(item)}
                className="relative flex justify-between items-center border border-neutral-200 bg-white rounded-[16px] pt-6 pl-5 w-120 h-60 mx-auto py-10 gap-4 [--pattern-fg:var(--color-gray-950)]/5 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence>
                  {hoverIndex === index && (
                    <motion.div
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 w-full h-full border-[0.2px] border-neutral-300 rounded-[15.2px] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"
                    />
                  )}
                </AnimatePresence>

                <div className="flex flex-col items-start justify-center gap-2 z-10">
                  <motion.h1 
                    layoutId={`title-${item.name}-${id}`}
                    className="text-neutral-700 font-bold text-2xl"
                  >
                    {item.name}
                  </motion.h1>
                  <p className="text-neutral-600 text-sm font-inter w-61">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="w-30 h-7 py-[1.5px] text-center text-neutral-800 text-sm font-semibold rounded-full bg-amber-500/20 border border-amber-500 px-2">
                      {item.discount}
                    </p>

                    <span
                      className="w-25 h-7 py-[1.5px] text-center text-neutral-800 text-sm font-semibold rounded-full bg-green-500/20 border border-green-500 px-2 hover:bg-green-500/60 transition-all duration-300"
                    >
                      Explore
                    </span>
                  </div>
                </div>

                <motion.div 
                  layoutId={`image-${item.name}-${id}`}
                  className="w-50 absolute inset-y-0 right-0 overflow-hidden"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-tr-lg rounded-br-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

// Close Icon Component
const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-neutral-600"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
