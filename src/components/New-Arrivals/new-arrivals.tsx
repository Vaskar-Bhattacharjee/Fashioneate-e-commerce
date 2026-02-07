import { IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const NewArrivalsItemCard = ({ imgSrc, productName, price, id }: { imgSrc: string; productName: string; price: number, id: string }) => {
  return (
    <Link href={`/product/${id}`}>
    <div className="relative w-full h-full overflow-hidden rounded-xl group min-h-[300px]">
      <div className="absolute top-4 right-4 "><IconHeartFilled className=" text-red size-5 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" /></div>
      <Image
        src={imgSrc}
        alt={productName}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Overlay/Content */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
      
      <div className="absolute bottom-0 left-0 p-4 w-full bg-linear-to-t from-black/80 to-transparent">
        <h3 className="text-white font-semibold text-3xl">{productName}</h3>
        <p className="text-white/90 font-medium text-2xl">${price}</p>
      </div>
    </div>
    </Link>
  );
};

export default NewArrivalsItemCard;