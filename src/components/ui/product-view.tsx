"use client";

import { ProductSchema } from "@/src/app/schema/product/product";
import { Fallback_Products } from "@/src/lib/data";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconCaretDown,
  IconCategory,
  IconEyeDollar,
  IconFilter,
  IconGraph,
  IconGraphFilled,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { log } from "console";

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
}

export const ProductsView = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [upload, setUpload] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<boolean | null>(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    category: "",
    price: "",
  });

  const handleClear = () => {
    setStatus("");
    setCategory("");
    setPrice("");
    setSortOption("");
    setAppliedFilters({
      status: "",
      category: "",
      price: "",
    });
  };
  const handleApply = () => {
    setAppliedFilters({
      status,
      category,
      price,
    });
    setFilter(false);
  };

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
      image: null,
    },
  });

  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("unit", data.unit);
      formData.append("status", data.status);
      formData.append("newprice", data.newprice?.toString() || "0");
      formData.append("comparePrice", data.comparePrice?.toString() || "0");
      formData.append("quantity", data.quantity?.toString() || "0");
      formData.append("newArrival", String(data.newArrival));
      formData.append("newArrivalFeatured", String(data.newArrivalFeatured));
      formData.append("isFeatured", String(data.isFeatured));

      if (data.size && Array.isArray(data.size)) {
        data.size.forEach((s) => formData.append("size", s));
      }

      if (data.image) {
        formData.append("image", data.image);
      }
      const response = await axios.post(
        "/api/product/upload-product",
        formData,
      );

      console.log("Product created:", response.data);
      toast.success("Product created successfully");
      setUpload(false);
    } catch (error) {
      console.error("Error creating product:", error);
      toast("Error creating product");
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4">
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
                      ? "border-red-300 bg-red-50"
                      : "border-neutral-200 hover:bg-neutral-50",
                  )}
                >
                  {preview ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
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
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        form.setValue("image", file);
                        form.clearErrors("image");
                      }
                    }}
                  />
                </label>

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
                        {...form.register("size")}
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
                    <span className="text-sm font-inter font-medium text-neutral-700">
                      Mark as new arrival
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
                          value={statusOption}
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
                className=" text-center bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-all shadow-xl cursor-pointer active:scale-95"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Upload Product"
                )}
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

      {/*  FILTERS & SEARCH */}
      <div className="w-full flex flex-col md:flex-row gap-4 bg-transparent px-4">
        <div className="relative flex-1 border border-neutral-300 rounded-lg">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg border  border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all",
              "placeholder:text-neutral-400 placeholder:font-inter text-neutral-600 font-inter text-lg",
            )}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setFilter(!filter)}
            className={cn(
              " flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:border-neutral-400 text-neutral-700 cursor-pointer transition-colors font-inter",
              filter && "bg-green-500/20  text-green-800",
            )}
          >
            <IconFilter size={18} />
            <span className="font-inter">Filters</span>
          </button>
          {filter && (
            <div className="absolute top-12 right-0 w-94 bg-white border border-neutral-200 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-4 font-inter border-b border-neutral-300 pb-1">
                    Filters
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <FilterSort
                    icon={<IconGraph size={16} className="text-neutral-500" />}
                    filterName="Status"
                    filterItem={["Active", "Inactive", "Out of Stock"]}
                    setSortOption={setStatus}
                    sortOption={status}
                  />
                  <FilterSort
                    icon={
                      <IconCategory size={16} className="text-neutral-500" />
                    }
                    filterName="Category"
                    filterItem={[
                      "All",
                      "Kids Fashion",
                      "Women's Fashion",
                      "Men's Fashion",
                    ]}
                    setSortOption={setCategory}
                    sortOption={category}
                  />
                  <FilterSort
                    icon={
                      <IconEyeDollar size={16} className="text-neutral-500" />
                    }
                    filterName="Price"
                    filterItem={["Low to High", "High to Low"]}
                    setSortOption={setPrice}
                    sortOption={price}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => {
                        handleClear();
                      }}
                      className="text-sm font-inter font-medium text-neutral-500 hover:text-neutral-900 transition-colors border border-neutral-300 hover:border-neutral-400 rounded-sm px-3 py-1 bg-transparent shadow-lg cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        handleApply();
                      }}
                      className="text-sm font-inter font-medium text-neutral-300 hover:text-neutral-200 transition-colors  rounded-sm px-3 py-1 bg-neutral-800 hover:bg-neutral-700 shadow-lg cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ProductList searchQuery={searchQuery} appliedFilters={appliedFilters} />
    </div>
  );
};

export const FilterSort = ({
  filterName,
  filterItem,
  icon,
  sortOption,
  setSortOption,
}: {
  filterName: string;
  icon?: React.ReactNode;
  filterItem: string[];
  sortOption: string;
  setSortOption: (val: string) => void;
}) => {
  const [sortOpen, setSortOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-1">
      <div
        onClick={() => setSortOpen(!sortOpen)}
        className={cn(
          "w-full flex justify-between items-center border rounded-md px-4 py-1 cursor-pointer transition-all",
          sortOption
            ? "border-green-500/50 bg-green-50/30"
            : "border-neutral-300 hover:border-neutral-400",
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <p
            className={cn(
              "font-inter font-semibold text-sm pb-1",
              sortOption ? "text-neutral-900" : "text-neutral-500",
            )}
          >
            {sortOption ? sortOption : filterName}
          </p>
        </div>
        <motion.div animate={{ rotate: sortOpen ? 180 : 0 }}>
          <IconCaretDown className="size-4" />
        </motion.div>
      </div>

      <AnimatePresence>
        {sortOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border border-neutral-300  rounded-md overflow-hidden bg-white shadow-sm"
          >
            {filterItem.map((option) => (
              <div
                onClick={() => {
                  setSortOption(option);
                  setSortOpen(false);
                }}
                key={option}
                className="flex flex-col items-start px-4 py-2 hover:bg-neutral-100 cursor-pointer transition-colors"
              >
                <span
                  className={cn(
                    "text-sm font-inter font-semibold transition-colors",
                    sortOption === option
                      ? "text-green-600"
                      : "text-neutral-600 hover:text-neutral-900",
                  )}
                >
                  {option}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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

export const ProductList = ({
  searchQuery,
  appliedFilters,
}: {
  searchQuery: string;
  appliedFilters: { status: string; category: string; price: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product/get-all-product");

        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setProducts(response.data);
          setLoading(false);
          console.log("RESPONSE DATA",response.data);
          
          return;
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
  const filteredProducts = products
    .filter((product) => {
      const filteredBySearch = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      const filteredByStatus = appliedFilters.status
        ? product.status.toLowerCase() === appliedFilters.status.toLowerCase()
        : true;
      const filteredByCategory =
        appliedFilters.category && appliedFilters.category !== "All"
          ? product.category.toLowerCase() ===
            appliedFilters.category.toLowerCase()
          : true;
      return filteredBySearch && filteredByStatus && filteredByCategory;
    })
    .sort((a, b) => {
      if (appliedFilters.price === "Low to High") {
        return a.newprice - b.newprice;
      } else if (appliedFilters.price === "High to Low") {
        return b.newprice - a.newprice;
      } else {
        return 0;
      }
    });
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/product/delete-product/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success("Product deleted successfully");
      console.log("Product id: ", id);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
      console.log("Product id: ", id);
    }
  };

  return (
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
                        className="p-2 hover:bg-green-100 rounded-lg text-neutral-600 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <IconPencil size={20} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-neutral-400 transition-colors cursor-pointer "
                        title="Delete"
                      >
                        <IconTrash size={20} />
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
  );
};
