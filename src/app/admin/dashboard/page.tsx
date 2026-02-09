"use client";

import { Fallback_Products } from "@/src/lib/data";
import { cn } from "@/src/lib/utils";
import {
  IconLayoutSidebarFilled,
  IconHome,
  IconSettings,
  IconChartBar,
  IconUsers,
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
import {
  FieldErrors,

  useForm,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "../../schema/product/product";
import z from "zod";

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
  size: string[];
  newArrivalFeatured: boolean;
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
  // const [imageError, setImageError] = useState<boolean | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [upload, setUpload] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/get-all-products");

        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
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
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      newprice: null,
      comparePrice: null,
      category: "",
      newArrival: false,
      newArrivalFeatured: false,
      quantity: null,
      unit: "",
      status: "active",
      isFeatured: false,
      size: [],
    },
  });

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    try {
      const response = await axios.post("/api/product/upload-product", data);
      console.log("Product created:", response.data);
      setUpload(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4">
      {/* 1. TOP BAR: Title & Add Button */}
      <div className=" w-full flex flex-col md:flex-row md:items-center justify-between p-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 font-inter">
            Products
          </h1>
          <p className="text-neutral-500 text-sm font-inter">
            Manage your inventory and catalog
          </p>
        </div>
        <button
          onClick={() => setUpload(true)}
          className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <IconPlus size={20} />
          <span className="font-inter">Upload Product</span>
        </button>
      </div>
      {upload && (
        <div className="absolute py-6 top-0 left-0 w-full min-h-screen bg-neutral-300/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <h2 className="text-2xl font-inter text-neutral-800 font-bold mb-4">
              Upload New Product
            </h2>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <Input
                label="Product Name"
                name="name"
                type="text"
                register={form.register}
                errors={form.formState.errors}
              />
              <div className="mb-4">
                <label className="block font-semibold text-sm font-inter text-neutral-600 mb-1">
                  Description
                </label>
                <textarea
                  {...form.register("description")}
                  className="w-full hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
                  rows={4}
                ></textarea>
                {form.formState.errors.description && (
                  <p className="text-red-500 font-inter text-sm mt-1">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
              <Input
                label="New Price"
                name="newprice"
                type="number"
                register={form.register}
                errors={form.formState.errors}
              />
              <Input
                label="Compare Price"
                name="comparePrice"
                type="number"
                register={form.register}
                errors={form.formState.errors}
              />
<div className="flex flex-col gap-2 mb-4">
  <label className="text-sm font-semibold text-neutral-700">
    Product Image
  </label>

  <label 
    className={cn(
      "relative flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden",
      form.formState.errors.image 
        ? "border-red-300 bg-red-50" // Turn red if error
        : "border-neutral-200 hover:bg-neutral-50"
    )}
  >
    {/* LOGIC: If we have a preview, show Image. If not, show Upload Box */}
    {preview ? (
      <div className="relative w-full h-full group">
        <Image
          src={preview}
          alt="Preview"
          fill
          className="object-cover"
        />
        {/* Overlay to change image */}
        <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white font-medium text-sm transition-all">
          Click to Change
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-2 text-center p-4">
        <div className="bg-neutral-100 p-3 rounded-full">
            <IconPlus size={24} className="text-neutral-500" />
        </div>
        <p className="text-sm font-semibold text-neutral-700 font-inter">
          Click to upload image
        </p>
        <p className="text-xs text-neutral-400 font-inter">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
    )}

    {/* THE INPUT: Hidden, but doing the work */}
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          // 1. Create a fake local URL so user sees image INSTANTLY
          setPreview(URL.createObjectURL(file));
          // 2. Manually give the file to React Hook Form
          form.setValue("image", file); // OR form.setValue("image", [file]) depending on your schema
          // 3. Clear any previous errors
          form.clearErrors("image");
        }
      }}
    />
  </label>

  {/* ERROR MESSAGE */}
  {form.formState.errors.image && (
    <p className="text-red-500 font-inter text-sm">
      {form.formState.errors.image.message as string}
    </p>
  )}
</div>
              <Input
                label="Category"
                name="category"
                type="text"
                register={form.register}
                errors={form.formState.errors}
              />
              <Input
                label="Quantity"
                name="quantity"
                type="number"
                register={form.register}
                errors={form.formState.errors}
              />
              <div className="mb-4">
                <label className="block font-semibold text-sm font-inter text-neutral-600 mb-1">
                  Unit
                </label>
                <select
                  {...form.register("unit")}
                  className="w-full hover:bg-neutral-100 border border-neutral-200 text-neutral-800 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
                >
                  <option value="piece">Piece</option>
                  <option value="dozen">Dozen</option>
                </select>
                {form.formState.errors.unit && (
                  <p className="text-red-500 font-inter text-sm mt-1">
                    {form.formState.errors.unit.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-sm font-inter text-neutral-600 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "xl", "2xl", "3xl"].map((sizeOption) => (
                    <label
                      key={sizeOption}
                      className="flex items-center gap-2 border border-neutral-200 px-3 py-1 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        value={sizeOption}
                        {...form.register("size")} // Hooks into the "size" array in your schema
                        className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
                      />
                      <span className="text-sm font-medium text-neutral-700 uppercase">
                        {sizeOption}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mb-4 mt-4">
                  <label className="block font-semibold text-sm font-inter text-neutral-600 ">
                    New Arrival
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      {...form.register("newArrival")}
                      className="size-5 cursor-pointer rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Mark as new arrival
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-sm font-inter text-neutral-600 ">
                    Featured on New Arrivals
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      {...form.register("newArrivalFeatured")}
                      className="size-5 cursor-pointer rounded border-neutral-300 text-green-900 focus:ring-neutral-900 accent-neutral-900"
                    />
                    <span className="text-sm font-medium font-inter text-neutral-700">
                      Feature on new arrivals section (max 3)
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-semibold text-sm font-inter text-neutral-600">
                    Status
                  </label>

                  {["active", "inactive", "out-of-stock"].map(
                    (statusOption) => (

                      <div
                        key={statusOption}
                        className="flex items-center gap-2 mt-2"
                      >
                        <input
                          type="radio"
                          {...form.register("status")}
                          className="size-5 cursor-pointer rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
                        />
                        <span className="text-sm font-inter font-medium text-neutral-700">
                          {statusOption.charAt(0).toUpperCase() +
                            statusOption.slice(1)}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm cursor-pointer active:scale-95"
              >
                Upload
              </button>
              {form.formState.errors.name && (
                <p className="text-red-500 font-inter text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 2. FILTERS & SEARCH */}
      <div className="w-full flex flex-col md:flex-row gap-4 bg-transparent  rounded-xl border">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg border  border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-200 transition-all",
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
      <div className="w-full bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
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
                  <tr
                    key={product._id}
                    className="hover:bg-neutral-100 transition-colors group"
                  >
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
                        <span className="font-medium text-neutral-800 font-inter">
                          {product.name}
                        </span>
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
                        <button
                          className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors"
                          title="Edit"
                        >
                          <IconPencil size={18} />
                        </button>
                        <button
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-neutral-400 transition-colors"
                          title="Delete"
                        >
                          <IconTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-neutral-400"
                  >
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

export const Input = ({
  label,
  name,
  type,
  register,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
}) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-sm font-inter text-neutral-600 mb-1">
        {label}
      </label>
      <input
        {...register(name)}
        type={type || "text"}
        className="w-full border border-neutral-200 text-neutral-800 hover:bg-neutral-100 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-200 transition-all"
      />
      {errors[name] && (
        <p className="text-red-500 font-inter text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    "Low Stock": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Out of Stock": "bg-red-100 text-red-700 border-red-200",
  };

  // Default to gray if status doesn't match
  const activeStyle =
    styles[status as keyof typeof styles] ||
    "bg-neutral-100 text-neutral-600 border-neutral-200";

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium border",
        activeStyle,
      )}
    >
      {status}
    </span>
  );
};
export default Dashboard;
