"use client";
import { Container } from "@/src/components/ui/container";
import { Heading } from "@/src/components/ui/header";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Fallback_Products } from "@/src/lib/data";
import { useParams } from "next/navigation";
import { useCartStore } from "@/src/store/useCartStore";

// Interface remains the same
interface ProductProps {
  _id: string;
  name: string;
  description: string;
  image: string;
  newprice: number;
  comparePrice?: number;
  category: string;
  newArrival?: boolean;
  quantity: number;
  unit?: string;
  status: string;
  isFeatured?: boolean;
  size?: string | string[];
  imagePublicId?: string;
}

export default function Product() {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState<ProductProps>();
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(5);
  const [selectedSize, setSelectedSize] = useState("M"); // Lifted state from Sizes component

  const params = useParams();
  const _id = params._id;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isFlying, setIsFlying] = useState(false);
  const [flightPath, setFlightPath] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const addToCart = useCartStore((state) => state.addToCart);

  // FIXED: Wrapped everything inside the handler function
  const handleAddToCart = () => {
    if (!product || !buttonRef.current) return;

    // A. GET POSITIONS
    const btnRect = buttonRef.current.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2 - 20;
    const startY = btnRect.top;

    const targetEl = document.getElementById("shopping-cart-target");
    let endX = window.innerWidth - 100;
    let endY = 50;

    if (targetEl) {
      const targetRect = targetEl.getBoundingClientRect();
      endX = targetRect.left;
      endY = targetRect.top;
    }

    // B. TRIGGER ANIMATION
    setFlightPath({ startX, startY, endX, endY });
    setIsFlying(true);

    // C. ACTUAL ZUSTAND UPDATE (Delayed to match animation)
    setTimeout(() => {
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.newprice,
        image: product.image,
        quantity: count,
        selectedSize: selectedSize, // Now uses the dynamic state
      });
    }, 800);
  };

  useEffect(() => {
    const findProduct = () => {
      setLoading(true);
      const found = Fallback_Products.find((p) => String(p._id) === String(_id));
      if (found) {
        console.log(found)
        setProduct(found as ProductProps);
        setAvailable(found.quantity || 5);
      }
      setLoading(false);
    };
    if (_id) findProduct();
  }, [_id]);

  const increament = () => {
    if (count < available) setCount(count + 1);
  };
  const decreament = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <Container className="pt-10 md:pt-55 w-6xl mx-auto">
      {loading ? (
        <div className="text-neutral-950 text-7xl font-cormorantGaramond">Loading...</div>
      ) : product ? (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full md:w-120 h-120 rounded-lg overflow-hidden"
          >
            <Image fill className="object-cover" src={product.image} alt={product.name} />
          </motion.div>

          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full md:max-w-140 px-4 md:px-0"
          >
            <Heading className="pb-2">{product.name}</Heading>
            <div className="flex items-center gap-2">
              <h2 className="text-[2.5rem] text-neutral-800 font-bold">${product.newprice}</h2>
              <p className="text-sm text-neutral-500 font-semibold mt-3">(Tax Included)</p>
            </div>

            <div className="mt-6">
              {/* Passed state down to the component */}
              <Sizes selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            </div>

            <div className="flex justify-between h-12 px-4 w-full md:w-48 items-center shadow-input rounded-lg mt-8">
              <h2 className="text-neutral-700 font-semibold">Quantity:</h2>
              <div className="flex items-center gap-3">
                <button onClick={decreament} className="text-xl cursor-pointer text-neutral-600 shadow-input px-1 rounded-sm ">-</button>
                <p className="font-bold text-neutral-600">{count}</p>
                <button onClick={increament} className="text-xl cursor-pointer text-neutral-600 shadow-input px-1 rounded-sm">+</button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <IconCircleCheckFilled className="text-green-600" />
              <p className="text-neutral-600 text-sm">
                Only {available} piece{available > 1 ? "s" : ""} available
              </p>
            </div>

            <div className="flex gap-4 pt-8">
              <button
                ref={buttonRef} // ATTACHED REF
                onClick={handleAddToCart}
                className="h-11 w-44 text-white bg-neutral-800 font-semibold rounded-lg hover:bg-neutral-900 transition cursor-pointer"
              >
                Add to Cart
              </button>
              <button className="h-11 w-44 text-neutral-800 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition cursor-pointer">
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div>Product not found</div>
      )}

      {/* FLYING ANIMATION PORTAL */}
      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{
              position: "fixed",
              zIndex: 100,
              left: flightPath.startX,
              top: flightPath.startY,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              left: flightPath.endX,
              top: flightPath.endY,
              scale: 0.1,
              opacity: 0,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => setIsFlying(false)}
            className="w-10 h-10 bg-black rounded-lg pointer-events-none"
          />
        )}
      </AnimatePresence>
    </Container>
  );
}

// Sub-component now receives props from parent
export const Sizes = ({ 
  selectedSize, 
  setSelectedSize 
}: { 
  selectedSize: string; 
  setSelectedSize: (val: string) => void 
}) => {
  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-neutral-800 font-semibold">Sizes:</h2>
        <p className="font-bold text-neutral-600">{selectedSize}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={cn(
              "relative h-12 w-12 rounded-lg border flex items-center justify-center transition-all",
              selectedSize === size ? "bg-black text-white" : "bg-transparent border-neutral-200 text-black hover:border-neutral-400"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};