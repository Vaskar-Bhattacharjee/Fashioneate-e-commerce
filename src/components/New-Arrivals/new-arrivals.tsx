import { IconHeartFilled, IconShoppingBag } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";



export const NewArrivalsItemCard = ({
  imgSrc,
  productName,
  price,
  id,
  className,
}: {
  imgSrc: string;
  productName: string;
  price: number;
  id: string;
  className?: string;
}) => {
  return (
    <Link href={`/product/${id}`} className="block w-full h-full">
      <div className={`relative w-full overflow-hidden rounded-2xl group cursor-pointer ${className}`}>
        
        {/* ── Image ── */}
        <Image
          src={imgSrc}
          alt={productName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* ── Dark overlay — darker on hover ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />

        {/* ── Wishlist button — top right ── */}
        <div className="absolute top-4 right-4 z-10">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40">
            <IconHeartFilled className="text-white size-4" />
          </div>
        </div>

        {/* ── New badge — top left ── */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[11px] font-bold tracking-widest uppercase bg-white text-neutral-900 px-3 py-1 rounded-full">
            New
          </span>
        </div>

        {/* ── Bottom content ── */}
        <div className="absolute bottom-0 left-0 w-full p-5 flex items-end justify-between gap-2">
          <div>
            {/* ── CHANGED: smaller font, cleaner hierarchy ── */}
            <h3 className="text-white font-semibold text-lg leading-tight line-clamp-1">
              {productName}
            </h3>
            <p className="text-white/80 font-medium text-sm mt-1">
              ৳{price}
            </p>
          </div>

          {/* ── Shop button — appears on hover ── */}
          <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
              <IconShoppingBag className="size-4 text-neutral-900" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default NewArrivalsItemCard;
