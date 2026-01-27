"use client";
import { Container } from "@/src/components/ui/container";
import { cn } from "../../lib/utils";
import {
  IconJewishStar,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/src/store/useCartStore";
import { CartDrawer } from "./cart-drawer";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  return (
    <Container className="">
      <DesktopNavbar />
      <MobileNavbar />
      <CartDrawer />
    </Container>
  );
};

export const Logo = ({ className }: { className?: string }) => {
  return (
    <h1
      className={cn(
        "font-cormorantGaramond font-extrabold text-2xl text-neutral-800 md:text-4xl md:mb-2 tracking-tight ",
        className,
      )}
    >
      Fashioneate
    </h1>
  );
};

export const DesktopNavbar = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const openCart = useCartStore((state) => state.openCart);
  return (
    <nav
      className={cn(
        "fixed transition-all duration-200 ease-out top-0 inset-x-0  my-0 bg-white z-50 hidden lg:flex h-20 items-center justify-center gap-28 px-2 border border-b border-neutral-200 ",
      )}
    >
      <Logo />

      <div className={cn("")}>
        <ul className={cn("flex gap-8")}>
          {navLinks.map((link) => (
            <li key={link.name} className="group ">
              <Link
                href={link.href}
                className={cn(
                  "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100  text-xl font-semibold font-cormorantGaramond",
                )}
              >
                {link.name}
              </Link>
              <div className=" w-0 group-hover:w-full transition-all duration-300 h-[0.7px] bg-black dark:bg-white"></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-6 items-center justify-between">
        <Input />
      </div>

      <div className="flex gap-3 items-center justify-between">
        <IconJewishStar className="text-neutral-500 dark:text-gray-400 cursor-pointer" />
        <div className="relative">
          <IconShoppingBag onClick={openCart} className="text-neutral-500 dark:text-gray-400 cursor-pointer" />
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-2 w-4 h-4 text-xs font-semibold text-white bg-neutral-800 rounded-full flex items-center justify-center">
              <p className="text-neutral-100 font-semibold text-xs">{totalItems}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const openCart = useCartStore((state) => state.openCart);
  return (
    <nav className="w-full lg:hidden h-20 flex items-center justify-between px-4">
      <Logo />
      <Input />

      <div className="flex items-center justify-center gap-6">
        <div className="flex gap-1 md:gap-3 items-center justify-between">
          <div>
            {" "}
            <IconShoppingBag onClick={openCart} className="text-neutral-600  dark:text-gray-400 cursor-pointer size-5 md:size-6" />{" "}
          </div>
          {/* <ModeToggle /> */}
        </div>

        <div className="relative flex items-center justify-center">
          <IconMenu2
            onClick={() => {
              setOpen(!open);
            }}
            className={cn(
              "absolute text-neutral-600 dark:text-gray-400 cursor-pointer",
              open && "hidden",
            )}
          />
          <IconX
            onClick={() => {
              setOpen(!open);
            }}
            className={cn(
              "absolute hidden text-neutral-600 dark:text-gray-400 cursor-pointer ",
              open && "block ",
            )}
          />
        </div>
      </div>
      {open && (
        <motion.div
          style={{
            backdropFilter: "blur(15px)",
          }}
          className="absolute top-20 inset-x-0 w-full h-screen bg-white dark:bg-gray-900 shadow-md flex flex-col items-center justify-start space-y-6 py-6 z-60"
        >
          {navLinks.map((link) => (
            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * navLinks.indexOf(link),
              }}
              key={link.name}
              href={link.href}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-2xl font-semibold font-cormorantGaramond"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export const Input = ({
  className,
  placeholder,
  removeIcon,
}: {
  className?: string;
  placeholder?: string;
  removeIcon?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex gap-0 md:gap-3 w-34 md:w-64 h-8 md:h-10 px-2.5 py-1 justify-center items-center shadow-input dark:shadow-input-dark rounded-lg",
        className,
      )}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="pl-2 md:pl-4 font-quicksand text-gray-600 dark:text-gray-300 text-xs md:text-[15px] font-semibold placeholder-gray-400 flex-1  focus:outline-none "
      />
      {!removeIcon && (
        <IconSearch
          className={cn(
            "text-neutral-500 dark:text-gray-300 cursor-pointer size-6",
          )}
        />
      )}
    </div>
  );
};
