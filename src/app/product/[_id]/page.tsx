"use client";
import { Container } from "@/src/components/ui/container";
import { Heading } from "@/src/components/ui/header";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import {  useEffect, useState } from "react";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";
import { Fallback_Products } from "@/src/lib/data";
import { useParams } from "next/navigation";
import { useCartStore } from "@/src/store/useCartStore";

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
  size?: string| string[];
  imagePublicId?: string;
}

export default function Product() {
    const [count, setCount] = useState(1)
    const [product, setProduct] = useState<ProductProps>()
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const  _id  = params._id

    const addToCart = useCartStore((state) => state.addToCart);

const handleAddToCart = () => {
  if (!product) return;
  addToCart({
    _id: product._id,
    name: product.name,
    price: product.newprice,
    image: product.image,
    quantity: count,
    selectedSize: "1" // This is the state from your Sizes component
  });
}

useEffect(() => {
    // This logic only runs when the component mounts or the ID changes
    const findProduct = () => {
      setLoading(true);
      
      const found = Fallback_Products.find((p) => String(p._id) === String(_id));
      
      if (found) {
        // Map the keys carefully to match your schema/interface
        setProduct(found as ProductProps);
      }
      
      setLoading(false);
    };

    if (_id) {
      findProduct();
    }
  }, [_id]);
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //            setLoading(true);
    //             const response = await axios.get(`/api/product/get-product/${_id}`);
    //             if (response.data && response.data._id){
    //                 setProduct(response.data)
    //             }
    //         } catch (error) {
    //             console.error("Product not found::", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchProduct();


        
    // }, [_id]);
    const increament = () => {
        setCount(count+1)
    }
    const decreament = () => {
        if (count > 1 ) {
            setCount(count-1)
        }
    }
  return (
    <Container className="pt-10 md:pt-55 w-6xl mx-auto">
      {loading ? (
        <div className="text-neutral-950 text-7xl">Loading...</div>
      ) : product ? (
      <div className="flex flex-col md:flex-row justify-center items-center gap-20">
        <motion.div
        initial={{ opacity: 0, scale: 0.3, backdropFilter: "blur(15px)" }}
        whileInView={{ opacity: 1, scale: 1, backdropFilter: "blur(15px)" }}
        transition={{ duration: 0.4 }}
        className="relative w-120 h-120 pl-50 rounded-lg overflow-hidden">
          <Image  
            fill
            className="object-cover"
            src={product.image}   
            alt="Placeholder"
          />
        </motion.div>
        <motion.div
        key={product.name}
        initial={{ opacity: 0, y: 50, scale: 0.3, x: -50, backdropFilter: "blur(15px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, x: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.2 }}
        className="">
          <Heading className="pb-2">Minimalist Silk Blazer</Heading>
          <div className="flex items-center justify-start  gap-2">
            <motion.h2
        initial={{ opacity: 0, y: 50, backdropFilter: "blur(15px)" }}
        whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(0px)" }}
        transition={{ delay: 0.2 }}            
            key={product.newprice}
            className="text-left text-[2.5rem] tracking-tight text-neutral-800 font-bold">
              ${product.newprice}
            </motion.h2>
            <p className="text-left text-sm tracking-tight text-neutral-500 font-semibold mt-3">
                (Tax Included)
            </p>
          </div>
          <motion.div
        initial={{ opacity: 0, y: 50, backdropFilter: "blur(15px)" }}
        whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(0px)" }}
        transition={{ delay: 0.3 }}         
          className="flex justify-start items-center gap-1 mt-7">
            <span className="text-neutral-900 font-bold">100+ </span>
            <p className="text-neutral-600">sold</p>
            <div className="bg-neutral-600 w-2 h-2 rounded-full ml-2"></div>
            <div className="flex justify-center items-center gap-1">
              <IconStarFilled className="text-yellow-400 size-4 ml-2" />
              <p className="text-neutral-700 font-bold">4.8</p>
              <p className="text-neutral-500 tracking-tight font-semibold">
                (100 reviews)
              </p>
            </div>
          </motion.div>
            <Sizes product={product}/>
          <motion.div
          initial={{ opacity: 0, y: 50, backdropFilter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, backdropFilter: "blur(0px)" }}
          transition={{ delay: 0.4 }}
          className="flex justify-between h-10 px-4 w-50 items-center shadow-input rounded-lg mt-2">
            <h2 className="text-neutral-700 font-semibold bg-transparent">Quantity:</h2>
            <div className="flex justify-center items-center gap-2">
              <button
              onClick={decreament}
              className="text-neutral-700 font-semibold bg-transparent border border-neutral-300 rounded-md w-7 h-7 text-3xl flex items-center justify-center cursor-pointer hover:bg-neutral-100">-</button>
              <p className="text-neutral-700 font-semibold bg-transparent">{count}</p>
              <button
              onClick={increament}
              className="text-neutral-700 font-semibold bg-transparent border border-neutral-300 rounded-md w-7 h-7 text-2xl flex items-center justify-center cursor-pointer hover:bg-neutral-100">+</button>
            </div>
          </motion.div>
         <div className="flex gap-4 pt-10">
          <button
          onClick={handleAddToCart}
          className="h-11 w-40 text-white bg-neutral-800 font-semibold rounded-lg hover:bg-neutral-900 cursor-pointer">Add to Cart</button>
          <button className="h-11 w-40 text-white bg-neutral-800 font-semibold rounded-lg hover:bg-neutral-900 cursor-pointer">Buy Now</button>
        </div>  

        </motion.div>
        </div>
      ) : (
        <div>Product not found</div>
      )}

      <div className="pt-32">
          <div className="border border-neutral-200 w-full h-px"></div>
          <div className="flex items-center justify-between mt-7">

          </div>
      </div>
    </Container>
  );
}

export const Sizes = ({product}:{product:ProductProps}) => {
        const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];
        // const [size, setSize] = useState("M");
        const [selectedSize, setSelectedSize] = useState("M");
        // useEffect(() => {
        //   const size = async() => {
        //     await axios.get(`/api/product/get-product/${product._id}`).then((res) => {
        //       setSize(res.data.size)
        //     })
        //   }
        //   size()
        // })
    return (
        <div className="flex flex-col justify-center items-start gap-1 mt-2">
            <div className="flex items-center justify-start gap-2"><h2 className="text-neutral-800 font-semibold tracking-tight">Sizes:</h2> <p className="font-bold text-neutral-600 text-lg">{selectedSize}</p></div>
         
          <div className="flex flex-wrap justify-start items-center gap-2">
            {sizes.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "relative h-12 min-w-12  flex items-center justify-center rounded-lg border border-neutral-200 cursor-pointer",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-[1.3px] flex items-center justify-center rounded-[7px] border transition-all duration-300 text-sm font-semibold uppercase z-10",
                      "shadow-sm hover:shadow-md", // Slight shadow
                      isSelected
                        ? " text-neutral-100" // Active State
                        : "bg-transparent border-neutral-200 text-black hover:border-neutral-400", // Inactive State
                    )}
                  >
                    <span className="relative z-10">{size}</span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="size-glow"
                      className="absolute inset-[1.3px] bg-neutral-700 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.3,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          </div>
    )
}