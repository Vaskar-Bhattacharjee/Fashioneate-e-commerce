"use client";
import Link from "next/link";
import { Logo } from "../ui/navbar";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { Container } from "../ui/container";
import { cn } from "@/src/lib/utils";

export const Footer = () => {

  const handleFaqScroll = () => {
    const faqSection = document.getElementById("faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container className="bg-neutral-900 flex flex-col justify-center items-center rounded-t-3xl mt-20">
      
      <div
        className={cn(
          "absolute inset-0",
          "bg-size-[35px_35px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "opacity-7 mask-l-from-70% mask-r-from-70% mask-t-from-70% mask-b-from-70%",
        )}
      />

      <div className="z-1 grid grid-cols-1 md:grid-cols-5 gap-8 py-10 px-6 md:px-10 lg:px-16 w-full">

        <div className="py-4 px-4 flex flex-col col-span-1 md:col-span-2 items-start justify-between gap-1 lg:mr-18">
          <Logo className="text-white md:text-6xl text-left ml-0" />
          <p className="text-sm font-semibold text-left text-neutral-400 w-full mt-2">
            Fashioneate is where timeless elegance meets modern craftsmanship.
            We provide premium quality apparel for men, women, and children
            who value style without compromise. Elevate your everyday wardrobe
            with the art of dressing well. Shop now and elevate your style.
          </p>
          <div className="flex gap-2 mt-5 items-center">
            <span className="text-neutral-400 text-md font-semibold">Follow us on:</span>
            <div className="flex gap-2 md:gap-3">
              <Link href="https://www.linkedin.com/in/vaskar-bhattacharjee/" className="text-neutral-400 hover:text-white transition-colors">
                <IconBrandLinkedin />
              </Link>
              <Link href="https://x.com/sourav_0002" className="text-neutral-400 hover:text-white transition-colors">
                <IconBrandX />
              </Link>
              <Link href="https://github.com/Vaskar-Bhattacharjee" className="text-neutral-400 hover:text-white transition-colors">
                <IconBrandGithub />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-8">
          
          <GridElement
            heading="About Us"
            items={[
              { label: "Our Story", href: "/about" },
              { label: "Our Team", href: "/about#team" },
            ]}
          />

          <GridElement
            heading="Customer Service"
            items={[
              { label: "Shipping & Returns", href: "/ship-policy" },
              { label: "Contact Us", href: "/contact" },
              { label: "FAQs", onClick: handleFaqScroll }, // ← scroll, no href
            ]}
          />

          <GridElement
            heading="Legal"
            items={[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-policy" },
            ]}
          />

        </div>
      </div>

      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="w-full h-px bg-neutral-400 mb-2" />
      </div>

      <div className="text-neutral-300 mb-4 text-sm text-center px-4">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">Fashioneate</span>. All rights reserved.
      </div>

    </Container>
  );
};

// ── Item can either be a link (href) or a button (onClick) ──
interface GridItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export const GridElement = ({
  heading,
  items,
}: {
  heading: string;
  items: GridItem[];
}) => {
  return (
    <div className="flex flex-col gap-2 lg:pt-10">
      <h4 className="text-sm lg:text-lg font-bold mb-2 md:mb-4 text-neutral-100">
        {heading}
      </h4>
      <div className="flex flex-col gap-2">
        {items.map((item) =>
          item.href ? (
            // ── Has href → render as Link ──
            <Link
              key={item.label}
              href={item.href}
              className="text-neutral-400 hover:text-white transition-colors text-xs md:text-sm"
            >
              {item.label}
            </Link>
          ) : (
            // ── Has onClick → render as button (FAQ scroll) ──
            <button
              key={item.label}
              onClick={item.onClick}
              className="text-neutral-400 hover:text-white transition-colors text-xs md:text-sm text-left cursor-pointer"
            >
              {item.label}
            </button>
          )
        )}
      </div>
    </div>
  );
};
