"use client";

import { cn } from "@/src/lib/utils";
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

// 1. Interface matching your Mongoose Schema
interface ProductFormData {
  name: string;
  description: string;
  newprice: string; // string in form, convert to number on submit
  comparePrice: string;
  image: string;
  imagePublicId: string;
  category: string;
  quantity: string;
  unit: string;
  status: string;
  size: string[];
  newArrival: boolean;
  isFeatured: boolean;
}

export default function ProductsView() {
  const [upload, setUpload] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Form State
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    newprice: "",
    comparePrice: "",
    image: "",
    imagePublicId: "",
    category: "",
    quantity: "",
    unit: "piece",
    status: "active",
    size: ["M"], // Default as per your schema
    newArrival: false,
    isFeatured: false,
  });

  const availableSizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  // 3. Handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => {
      const currentSizes = prev.size;
      if (currentSizes.includes(size)) {
        return { ...prev, size: currentSizes.filter((s) => s !== size) };
      } else {
        return { ...prev, size: [...currentSizes, size] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting to API:", formData);
    // Here you would call your API endpoint
    setUpload(false);
  };

  // Fake data for display
  const filteredProducts: any[] = []; 

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 px-4 py-8">
      
      {/* --- TOP BAR --- */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 font-inter">
            Products
          </h1>
          <p className="text-neutral-500 text-sm font-inter mt-1">
            Manage your inventory and catalog
          </p>
        </div>
        <button
          onClick={() => setUpload(true)}
          className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm active:scale-95"
        >
          <IconPlus size={20} />
          <span className="font-inter">Upload Product</span>
        </button>
      </div>

      {/* --- MODAL --- */}
      {upload && (
        <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold font-inter text-neutral-800">
                Add New Product
              </h2>
              <button
                onClick={() => setUpload(false)}
                className="p-2 hover:bg-neutral-100 rounded-full text-neutral-500 transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Image & Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Product Name *
                  </label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Velvet Evening Dress"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Image URL *
                    </label>
                    <input
                        name="image"
                        required
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
                        placeholder="https://..."
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Image Public ID
                    </label>
                    <input
                        name="imagePublicId"
                        value={formData.imagePublicId}
                        onChange={handleChange}
                        className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all"
                        placeholder="Cloudinary ID"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {/* Pricing & Category Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="newprice"
                    required
                    value={formData.newprice}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Compare Price ($)
                  </label>
                  <input
                    type="number"
                    name="comparePrice"
                    value={formData.comparePrice}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                 <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Category *
                  </label>
                  <input
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 outline-none"
                    placeholder="e.g. Dresses"
                  />
                </div>
              </div>

              {/* Inventory Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 outline-none bg-white"
                  >
                    <option value="piece">Piece</option>
                    <option value="dozen">Dozen</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-neutral-900 outline-none bg-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Sizes (Array Handling) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={cn(
                        "w-10 h-10 rounded-lg border text-sm font-medium transition-all",
                        formData.size.includes(size)
                          ? "bg-neutral-800 text-white border-neutral-800"
                          : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newArrival"
                    checked={formData.newArrival}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-700">New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded border-gray-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-700">Featured Product</span>
                </label>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUpload(false)}
                  className="flex-1 px-4 py-3 border border-neutral-200 text-neutral-700 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-200"
                >
                  Upload Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SEARCH & FILTERS --- */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-100 transition-all placeholder:text-neutral-400 text-neutral-600 font-inter"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 text-neutral-700 transition-colors bg-white">
          <IconFilter size={18} />
          <span className="font-inter font-medium">Filters</span>
        </button>
      </div>

      {/* --- TABLE --- */}
      <div className="w-full bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-50/50 text-neutral-500 text-xs uppercase font-bold tracking-wider border-b border-neutral-100">
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
                    className="hover:bg-neutral-50/80 transition-colors group"
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
                        <div>
                            <span className="block font-medium text-neutral-800 font-inter">
                            {product.name}
                            </span>
                            <span className="text-xs text-neutral-400">{product.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 font-medium font-inter">
                      ${product.newprice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 text-neutral-600 font-inter tracking-tight">
                      {product.quantity} in stock
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    className="px-6 py-16 text-center text-neutral-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                        <IconSearch size={30} className="text-neutral-300" />
                        <p>No products found matching &quot;{searchQuery}&quot;</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper for status badge
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    inactive: "bg-neutral-100 text-neutral-600 border-neutral-200",
    "out-of-stock": "bg-red-100 text-red-700 border-red-200",
  };
  const activeStyle =
    styles[status as keyof typeof styles] ||
    "bg-neutral-100 text-neutral-600 border-neutral-200";

  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded-full text-xs font-bold border font-inter uppercase tracking-wider",
        activeStyle
      )}
    >
      {status}
    </span>
  );
};