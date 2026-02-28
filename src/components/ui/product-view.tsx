"use client";

import { ProductSchema } from "@/src/app/schema/product/product";
import { cn } from "@/src/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconCaretDown,
  IconCategory,
  IconEyeDollar,
  IconFilter,
  IconGraph,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Switch } from "./switch";

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

type FormMode = "create" | "edit";

export const ProductsView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null,
  );

  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    category: "",
    price: "",
  });

  const onSuccess = () => {
    handleCloseModal();
    setRefreshKey((prevKey) => prevKey + 1);
    };
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

  const handleCreateNew = () => {
    setFormMode("create");
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: ProductProps) => {
    setFormMode("edit");
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setTimeout(() => setFormMode("create"), 300);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-between gap-3 px-4">
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between p-3 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 font-inter">
            Products
          </h1>
          <p className="text-neutral-500 text-sm font-inter">
            Manage your inventory and catalog
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm cursor-pointer active:scale-95"
        >
          <IconPlus size={20} />
          <span className="font-inter">Upload Product</span>
        </button>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ProductFormModal
            mode={formMode}
            product={selectedProduct}
            onClose={handleCloseModal}
            onSuccess={onSuccess}
          />
        )}
      </AnimatePresence>

      {/* FILTERS & SEARCH - FULLY RESTORED */}
      <div className="w-full flex flex-col md:flex-row gap-4 bg-transparent px-4">
        <div className="relative flex-1 border border-neutral-300 rounded-lg">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all",
              "placeholder:text-neutral-400 placeholder:font-inter text-neutral-600 font-inter text-lg",
            )}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setFilter(!filter)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:border-neutral-400 text-neutral-700 cursor-pointer transition-colors font-inter",
              filter && "bg-green-500/20 text-green-800",
            )}
          >
            <IconFilter size={18} />
            <span className="font-inter">Filters</span>
          </button>

          {/* FILTER DROPDOWN - FULLY RESTORED FROM YOUR CODE */}
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
                      className="text-sm font-inter font-medium text-neutral-300 hover:text-neutral-200 transition-colors rounded-sm px-3 py-1 bg-neutral-800 hover:bg-neutral-700 shadow-lg cursor-pointer"
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

      <ProductList
        searchQuery={searchQuery}
        appliedFilters={appliedFilters}
        onEdit={handleEdit}
        refreshKey={refreshKey}
        onRefresh={() => setRefreshKey((prev) => prev + 1)}
      />
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
            className="border border-neutral-300 rounded-md overflow-hidden bg-white shadow-sm"
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

interface ProductFormModalProps {
  mode: FormMode;
  product: ProductProps | null;
  onClose: () => void;
  onSuccess: () => void;
}

const ProductFormModal = ({
  mode,
  product,
  onClose,
  onSuccess,
}: ProductFormModalProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = mode === "edit";
  const title = isEditMode ? "Edit Product" : "Upload New Product";
  const submitButtonText = isEditMode ? "Update Product" : "Upload Product";
  const apiEndpoint = isEditMode
    ? `/api/product/edit-product/${product?._id}`
    : "/api/product/upload-product";
  const httpMethod = isEditMode ? "patch" : "post";

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      newprice: null as number | null,
      comparePrice: null as number | null,
      category: "",
      newArrival: false,
      newArrivalFeatured: false,
      quantity: null as number | null,
      unit: "",
      status: "active",
      isFeatured: false,
      size: [] as string[],
      image: null as File | null,
    },
  });

  useEffect(() => {
    if (isEditMode && product) {
      form.reset({
        name: product.name,
        description: product.description,
        newprice: product.newprice,
        comparePrice: product.comparePrice,
        category: product.category,
        newArrival: product.newArrival,
        newArrivalFeatured: false,
        quantity: product.quantity,
        unit: product.unit,
        status: product.status,
        isFeatured: product.isFeatured,
        size: product.size || [],
        image: null,
      });
      setPreview(product.image);
    }
  }, [isEditMode, product, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("image", file);
      form.clearErrors("image");
    }
  };
  console.log("Form Errors:", form.formState.errors);
  async function onSubmit(data: z.infer<typeof ProductSchema>) {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      if (isEditMode && product?._id) {
        formData.append("id", product._id);
      }

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

      const response = await axios[httpMethod](apiEndpoint, formData);

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      toast.success(
        isEditMode
          ? "Product updated successfully"
          : "Product created successfully",
      );
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        isEditMode ? "Error updating product" : "Error creating product",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-neutral-800 font-inter">
              {title}
            </h2>
            <p className="text-neutral-500 text-sm font-inter">
              {isEditMode
                ? `Editing: ${product?.name}`
                : "Add a new product to your catalog"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <IconX size={20} className="text-neutral-500" />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Product Name"
              name="name"
              type="text"
              register={form.register}
              errors={form.formState.errors}
            />
            <div className="mb-4">
              <label className="block font-semibold text-sm font-inter text-neutral-600 mb-1">
                Category
              </label>
              <select
                {...form.register("category")}
className="w-full bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800 transition-all"              >
                <option value="men fashion" >Men&apos;s Fashion</option>
                <option value="women fashion" >Women&apos;s Fashion</option>
                <option value="kids fashion" >Kid&apos;s Fashion</option>
                <option value="wedding collection" >Wedding Collection</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-sm font-inter text-neutral-600 mb-1">
              Description
            </label>
            <textarea
              {...form.register("description")}
              className="w-full hover:bg-neutral-50 border border-neutral-200 text-neutral-800 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800 transition-all resize-none"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-red-500 font-inter text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-700">
              Product Image {isEditMode && "(Leave empty to keep current)"}
            </label>
            <label
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden",
                form.formState.errors.image
                  ? "border-red-300 bg-red-50"
                  : "border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50",
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
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium text-sm transition-all">
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
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                className="w-full hover:bg-neutral-50 border border-neutral-200 text-neutral-800 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800 transition-all"
              >
                <option value="piece">Piece</option>
                <option value="dozen">Dozen</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-sm font-inter text-neutral-600 mb-2">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "xl", "2xl", "3xl"].map((sizeOption) => (
                <label
                  key={sizeOption}
                  className="flex items-center gap-2 border border-neutral-200 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block font-semibold text-sm font-inter text-neutral-600 mb-2">
                Status
              </label>
<div className="flex items-center gap-3 ">
  {/* The Switch itself */}
  <Switch
    size="default"
    checked={form.watch("status") === "active"}
    onCheckedChange={(checked) => {
      form.setValue("status", checked ? "active" : "inactive");
    }}
  />

  <span className="text-sm font-semibold font-inter text-neutral-700 capitalize">
    {form.watch("status")}
  </span>
</div>
            </div>  

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...form.register("newArrival")}
                  className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
                />
                <span className="text-sm font-inter font-medium text-neutral-700">
                  Mark as new arrival
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...form.register("isFeatured")}
                  className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900"
                />
                <span className="text-sm font-inter font-medium text-neutral-700">
                  Featured product
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-400 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin size-4" />
                  <span>Saving...</span>
                </>
              ) : (
                submitButtonText
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

interface ProductListProps {
  searchQuery: string;
  appliedFilters: { status: string; category: string; price: string };
  onEdit: (product: ProductProps) => void;
  refreshKey: number;
  onRefresh: () => void;
}

export const ProductList = ({
  searchQuery,
  appliedFilters,
  onEdit,
  refreshKey,
  onRefresh,
}: ProductListProps) => {
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
          
        } else {
          toast.error("No products found.");
        }
      } catch (error) {
        console.warn("Backend failed, using fallback collection.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [refreshKey]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus = appliedFilters.status
        ? product.status.toLowerCase() === appliedFilters.status.toLowerCase()
        : true;
      const matchesCategory =
        appliedFilters.category && appliedFilters.category !== "All"
          ? product.category.toLowerCase() ===
            appliedFilters.category.toLowerCase()
          : true;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (appliedFilters.price === "Low to High")
        return a.newprice - b.newprice;
      if (appliedFilters.price === "High to Low")
        return b.newprice - a.newprice;
      return 0;
    });

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`/api/product/delete-product/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      onRefresh();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-neutral-400" />
      </div>
    );
  }

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
                  className="hover:bg-neutral-50 transition-colors group"
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
                        <span className="font-medium text-neutral-800 font-inter block">
                          {product.name}
                        </span>

                        <span className="text-xs text-neutral-500 font-inter">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-neutral-800">
                        ${product.newprice.toFixed(2)}
                      </span>
                      {product.comparePrice > 0 && (
                        <span className="text-xs text-neutral-400 line-through">
                          ${product.comparePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-6 py-4 text-neutral-600 font-inter">
                    {product.quantity} in stock
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600 cursor-pointer hover:text-neutral-900 transition-colors"
                        title="Edit"
                      >
                        <IconPencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-neutral-400 cursor-pointer hover:text-red-600 transition-colors"
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
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    inactive: "bg-yellow-100 text-neutral-600 border-yellow-500",
    "out of stock": "bg-red-100 text-red-700 border-red-200",
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
      {status.replace("-", " ")}
    </span>
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
  errors: FieldErrors<any>;
}) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold text-sm font-inter text-neutral-600 mb-1">
        {label}
      </label>
      <input
        {...register(name)}
        type={type || "text"}
        className="w-full border border-neutral-200 text-neutral-800 hover:bg-neutral-50 font-inter rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800 transition-all"
      />
      {errors[name] && (
        <p className="text-red-500 font-inter text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
