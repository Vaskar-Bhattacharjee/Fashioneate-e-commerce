"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSearch, IconX, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  newprice: number;
  category: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/product/get-all-product");
        if (Array.isArray(res.data)) setProducts(res.data);
      } catch (err) {
        console.error("Search fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
    setResults(filtered);
  }, [query, products]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => { if (!open) setQuery(""); }, [open]);

  const handleSeeAll = () => {
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-xl bg-white rounded-xl shadow-2xl z-[70] overflow-hidden border border-neutral-200"
          >
            {/* Search Input Row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100">
              <IconSearch className="text-neutral-600 size-5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSeeAll()}
                placeholder="Search products, categories..."
                className="flex-1 font-inter text-neutral-900 placeholder-neutral-700 bg-transparent focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")}>
                  <IconX className="text-neutral-600 size-4 hover:text-neutral-700 transition-colors" />
                </button>
              )}
              <kbd className="hidden sm:flex items-center text-[11px] text-neutral-600 border border-neutral-200 rounded px-1.5 py-0.5 font-mono">
                ESC
              </kbd>
            </div>

            {/* Body */}
            <div className="max-h-[420px] overflow-y-auto">

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="w-5 h-5 border-2 border-neutral-200 border-t-neutral-700 rounded-full animate-spin" />
                </div>
              )}

              {!loading && !query && (
                <div className="flex flex-col items-center justify-center py-12 gap-2">
                  <IconSearch className="size-8 text-neutral-200" />
                  <p className="text-neutral-400 text-sm font-inter mt-1">
                    Start typing to search products
                  </p>
                </div>
              )}

              {/* No results */}
              {!loading && query && results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 gap-1">
                  <p className="text-neutral-500 text-sm font-inter">
                    No products found for "{query}"
                  </p>
                  <p className="text-neutral-400 text-xs font-inter">
                    Try a different keyword
                  </p>
                </div>
              )}

              {/* Results list */}
              {!loading && results.length > 0 && (
                <>
                  <p className="text-[10px] tracking-widest uppercase text-neutral-400 font-inter px-5 pt-4 pb-2">
                    Products
                  </p>

                  {results.map((product) => (
                    <Link
                      key={product._id}
                      href={`/product/${product._id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-neutral-50 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="w-12 h-12 relative rounded-md overflow-hidden border border-neutral-100 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Name + category */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-inter">
                          {product.category}
                        </span>
                        <span className="text-sm font-semibold text-neutral-800 font-inter truncate">
                          {product.name}
                        </span>
                      </div>

                      {/* Price + arrow */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-semibold text-neutral-700">
                          ${product.newprice}
                        </span>
                        <IconArrowRight className="size-4 text-neutral-300 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </Link>
                  ))}

                  {/* See all results */}
                  <button
                    onClick={handleSeeAll}
                    className="w-full flex items-center justify-center gap-2 py-3.5 border-t border-neutral-100 text-sm font-semibold text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors font-inter"
                  >
                    See all results for "{query}"
                    <IconArrowRight className="size-4" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};