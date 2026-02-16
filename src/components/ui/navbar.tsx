"use client";
import { Container } from "@/src/components/ui/container";
import { cn } from "../../lib/utils";
import {
  IconJewishStar,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconX,
  IconLayoutDashboard,
  IconStarHalfFilled,
  IconAdjustmentsFilled, 
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/src/store/useCartStore";
import { CartDrawer } from "./cart-drawer";
// Import axios if you use it, or use standard fetch
import axios from "axios"; 

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {


   const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const mounted = true;

    const fetchUserRole = async () => {
      try {
        const res = await axios.get("/api/auth", { withCredentials: true });
        const role = res.data?.role ?? res.data?.user?.role ?? null;
        if (mounted) setUserRole(role);
      } catch (err: unknown) {
        console.log("error while getting user role",err);
      }
    };

    fetchUserRole();

  
  }, []);

  return (
    <Container>
      <DesktopNavbar userRole={userRole} />
      <MobileNavbar userRole={userRole} />
      <CartDrawer />
    </Container>
  );
};

export const Logo = ({ className }: { className?: string }) => {
  return (
    <h1 className={cn("font-cormorantGaramond font-extrabold text-2xl text-neutral-800 md:text-4xl md:mb-2 tracking-tight ", className)}>
      Fashioneate
    </h1>
  );
};

export const DesktopNavbar = ({userRole}: {userRole?: string | null}) => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const openCart = useCartStore((state) => state.openCart);
  const canAccessDashboard = userRole === "admin" || userRole === "moderator";

  return (
    <nav className={cn("fixed transition-all duration-200 ease-out top-0 inset-x-0 my-0 bg-transparent z-50 hidden lg:flex h-20 items-center justify-center gap-28 px-2 border border-b border-neutral-300")}>
      <Logo />

      <div>
        <ul className={cn("flex gap-8")}>
          {navLinks.map((link) => (
            <li key={link.name} className="group ">
              <Link href={link.href} className={cn("text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-xl font-semibold font-cormorantGaramond")}>
                {link.name}
              </Link>
              <div className="w-0 group-hover:w-full transition-all duration-300 h-[0.7px] bg-black dark:bg-white"></div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-6 items-center justify-between">
        <Input />
      </div>

      <div className="flex gap-4 items-center justify-between">
        {canAccessDashboard && (
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-md transition-colors"
          >
            <IconAdjustmentsFilled className="text-neutral-800 size-5" />
            <span className="text-sm font-semibold text-neutral-600 font-inter">Dashboard</span>
          </Link>
        )}

        <IconStarHalfFilled className="text-neutral-800 cursor-pointer" />
        
        <div className="relative cursor-pointer" id="shopping-cart-target" onClick={openCart}>
          <IconShoppingBag className="text-neutral-800" />
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-2 w-4 h-4 text-xs font-semibold text-white bg-neutral-800 rounded-full flex items-center justify-center border border-white">
              <p className="text-neutral-100 font-semibold text-[10px]">{totalItems}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const MobileNavbar = ({userRole}: {userRole?: string | null}) => {
  const [open, setOpen] = useState(false);
  const openCart = useCartStore((state) => state.openCart);

  const canAccessDashboard = userRole === "admin" || userRole === "moderator";
 
  return (
    <nav className="w-full lg:hidden h-20 flex items-center justify-between px-4 fixed top-0 bg-white z-50 border-b border-neutral-200">
      <Logo />
      <div className="hidden md:block">
        <Input />
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="flex gap-3 items-center justify-between">
            {canAccessDashboard && (
                <Link href="/admin/dashboard">
                    <IconLayoutDashboard className="text-neutral-600 size-6" />
                </Link>
            )}

          <div>
            <IconShoppingBag onClick={openCart} className="text-neutral-600 dark:text-gray-400 cursor-pointer size-6" />
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <IconMenu2 onClick={() => setOpen(!open)} className={cn("absolute text-neutral-600 dark:text-gray-400 cursor-pointer size-6", open && "hidden")} />
          <IconX onClick={() => setOpen(!open)} className={cn("absolute hidden text-neutral-600 dark:text-gray-400 cursor-pointer size-6", open && "block ")} />
        </div>
      </div>
      
      {open && (
        <motion.div
          style={{ backdropFilter: "blur(15px)" }}
          className="absolute top-20 inset-x-0 w-full h-screen bg-white/95 dark:bg-gray-900 shadow-md flex flex-col items-center justify-start space-y-6 py-10 z-60"
        >
          {navLinks.map((link) => (
            <motion.a
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * navLinks.indexOf(link) }}
              key={link.name}
              href={link.href}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 text-2xl font-semibold font-cormorantGaramond"
            >
              {link.name}
            </motion.a>
          ))}

          {/* MOBILE MENU TEXT logic */}
          {canAccessDashboard && (
             <motion.a
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                href="/admin/dashboard"
                className="text-red-600 font-bold text-2xl font-cormorantGaramond mt-4"
             >
                Admin Dashboard
             </motion.a>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export const Input = ({ className, placeholder, removeIcon }: { className?: string; placeholder?: string; removeIcon?: boolean; }) => {
  return (
    <div className={cn("flex gap-0 md:gap-3 w-34 md:w-64 h-8 md:h-10 px-2.5 py-1 justify-center items-center shadow-input dark:shadow-input-dark rounded-lg bg-neutral-50", className)}>
      <input type="text" placeholder={placeholder} className="pl-2 md:pl-4 font-quicksand text-gray-600 dark:text-gray-300 text-xs md:text-[15px] font-semibold placeholder-gray-400 flex-1 bg-transparent focus:outline-none " />
      {!removeIcon && <IconSearch className={cn("text-neutral-500 dark:text-gray-300 cursor-pointer size-5")} />}
    </div>
  );
};