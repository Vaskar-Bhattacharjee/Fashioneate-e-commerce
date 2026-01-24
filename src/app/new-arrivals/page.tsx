import { Container } from "@/src/components/ui/container";
import { Heading, SubHeading } from "@/src/components/ui/header";
import { img } from "framer-motion/client";
import Image from "next/image";

const Fallback_newArrivals = [
    {
        img: "https://images.pexels.com/photos/7622259/pexels-photo-7622259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Women's Fashion",
        title: "Minimalist Silk Blazer",
        price: 450
    },
    {
        img:"https://images.pexels.com/photos/9849633/pexels-photo-9849633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Men's Collection",
        title: "Classic Wool Overcoat",
        price: 890
    },
    {
        img:"https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        alt: "Accessories",
        title: "Leather Tote Bag",
        price: 1200
    }

]
const NewArrivals = () => {
  return (
    <Container className="pt-10 md:pt-18 lg:pt-32 w-6xl">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="w-20 h-px bg-black"></div>
          <Heading>New Arrivals</Heading>
          <div className="w-20 h-px bg-black"></div>
        </div>
        <SubHeading className="">
          Explore our latest collection of fashion-forward pieces that have just
          arrived. From trendy apparel to stylish accessories, discover the
          perfect additions to elevate your wardrobe.
        </SubHeading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 pt-12 w-5xl mx-auto">
        {Fallback_newArrivals.map((item, index) => (
          <NewArrivalsCard
            key={index}
            img={item.img}
            alt={item.alt}
            title={item.title}
            price={item.price}
          />
        ))}

      </div>
    </Container>
  );
};

export default NewArrivals;

export const NewArrivalsCard = ({img, alt, title, price}:{
  img: string;
  alt: string;
  title: string;
  price: number;
}) => {
  return (
    <div className="w-80 h-100 bg-gray-50 rounded-2xl flex flex-col gap-4 items-start justify-start overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300 border border-neutral-200">
      <div className="w-full h-70 relative">
        <Image
          src={img}
          alt={alt}
          fill
          className="object-cover object-center  absolute"
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-1 px-4">
        <span className="text-2xl font-bold text-neutral-800">
          {title}
        </span>
        <span className="text-lg font-semibold text-neutral-600">
          $ {price}
        </span>
      </div>
    </div>
  );
};
