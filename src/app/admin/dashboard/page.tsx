"use client";

import { Fallback_Products } from "@/src/lib/data";
import { cn } from "@/src/lib/utils";
import {
  IconLayoutSidebarFilled,
  IconHome,
  IconSettings,
  IconChartBar,
  IconUsers,
  IconShieldFilled,
  IconShield,
  IconPencil,
  IconTrash,
  IconPlus,
  IconSearch,
  IconFilter,
} from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  image: string;
  newprice: number;
  comparePrice: number;
  category: string;
  newArrival: boolean;
  quantity: number;
  unit: string;
  status: string;
  isFeatured: boolean;
}

const Dashboard = () => {
  const [isOpen, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const menuItems = [
    { label: "Overview", icon: <IconHome size={19} /> },
    { label: "Analytics", icon: <IconChartBar size={19} /> },
    { label: "Orders", icon: <IconUsers size={19} /> },
    { label: "Products", icon: <IconShield size={19} /> },
    { label: "Settings", icon: <IconSettings size={19} /> },
  ];

  return (
    <div className="flex w-full min-h-screen bg-neutral-50 pt-20">
      <aside
        className={cn(
          "bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
          isOpen ? "w-64" : "w-0 md:w-20",
        )}
      >
        <div className="p-6 font-bold font-inter text-4xl border-b border-neutral-100 text-neutral-900  truncate">
          {isOpen ? " Dashboard" : "🛍️"}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.label}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              isActive={activeTab === item.label}
              onClick={() => setActiveTab(item.label)}
            />
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-neutral-200 bg-white flex items-center px-6 justify-between sticky top-20 z-10">
          <button
            onClick={() => setOpen(!isOpen)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200"
          >
            <IconLayoutSidebarFilled
              className={cn(
                "size-6 text-neutral-600 transition-transform",
                !isOpen && "rotate-180",
              )}
            />
          </button>
        </header>
        {activeTab === "Overview" && <Overview />}
        {activeTab === "Products" && <ProductsView />}
 

      </main>
    </div>
  );
};

export const Overview = () => {
  return (
    <div className="p-8 max-w-7xl w-full mx-auto">
      <h1 className="text-2xl font-bold text-neutral-800">
        Welcome back, Admin
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-white rounded-xl border border-neutral-200 shadow-sm p-4"
          >
            <p className="text-neutral-500 text-sm">Total Revenue</p>
            <p className="text-3xl text-neutral-800 font-bold">$24,500</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SidebarLink = ({
  icon,
  label,
  isOpen,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition-colors",
        isActive
          ? "bg-neutral-600 text-white"
          : "text-neutral-700 hover:bg-neutral-100",
      )}
    >
      {icon}
      {isOpen && (
        <span className="font-normal font-inter whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

export const ProductsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);
useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/get-all-products");
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(Fallback_Products as ProductProps[]);
        }
      } catch (error: unknown) {
        console.warn("Backend failed, using fallback collection.", error);
        setProducts(Fallback_Products as ProductProps[]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4">
      
      {/* 1. TOP BAR: Title & Add Button */}
      <div className=" w-full flex flex-col md:flex-row md:items-center justify-between p-3 gap-4">
        <div>
            <h1 className="text-2xl font-bold text-neutral-800 font-inter">Products</h1>
            <p className="text-neutral-500 text-sm font-inter">Manage your inventory and catalog</p>
        </div>
        <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm cursor-pointer active:scale-95">
            <IconPlus size={20}  />
            <span className="font-inter">Upload Product</span>
        </button>
      </div>

      {/* 2. FILTERS & SEARCH */}
      <div className="w-full flex flex-col md:flex-row gap-4 bg-transparent  rounded-xl border">
        <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
            <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn("w-full pl-10 pr-4 py-2 rounded-lg border  border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all",
                    "placeholder:text-neutral-400 placeholder:font-inter text-neutral-600 font-inter text-lg",
                )}
            />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-700">
            <IconFilter size={18} />
            <span className="font-inter">Filters</span>
        </button>
      </div>

      {/* 3. TABLE */}
      <div className= "w-full bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase font-semibold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Product Info</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Inventory</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-neutral-100 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative size-12 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200">
                                            <Image 
                                                src={product.image} 
                                                alt={product.name} 
                                                fill 
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="font-medium text-neutral-800 font-inter">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-neutral-600 font-medium">
                                    ${product.newprice.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={product.status} />
                                </td>
                                <td className="px-6 py-4 text-neutral-600 font-inter tracking-tight">
                                    {product.quantity} in stock
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors" title="Edit">
                                            <IconPencil size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-neutral-400 transition-colors" title="Delete">
                                            <IconTrash size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                                No products found matching &quot;{searchQuery}&quot;
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};


const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        "active": "bg-green-100 text-green-700 border-green-200",
        "Low Stock": "bg-yellow-100 text-yellow-700 border-yellow-200",
        "Out of Stock": "bg-red-100 text-red-700 border-red-200",
    };
    
    // Default to gray if status doesn't match
    const activeStyle = styles[status as keyof typeof styles] || "bg-neutral-100 text-neutral-600 border-neutral-200";

    return (
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", activeStyle)}>
            {status}
        </span>
    );
};
export default Dashboard;
