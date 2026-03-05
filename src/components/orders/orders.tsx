"use client";
import { cn } from "@/src/lib/utils";
import {
  IconPlus,
  IconDots,
  IconChevronLeft,
  IconChevronRight,
  IconSortDescending2Filled,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import {  useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";

const menuItems = [
  "All",
  "Awaiting Payment",
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

interface OrderItem {
  productId: {
    _id: string;
    name: string;
    image: string;
  } 
  quantity: number;
  price: number;

 
}

interface Order {
  _id: string; 
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  status: "Awaiting Payment" | "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "COD" | "Online";
  createdAt: string; 
}



const statusStyles: Record<string, string> = {
  "Awaiting Payment": "bg-orange-50 text-orange-700 border-orange-400",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-500",
  Confirmed: "bg-indigo-50 text-indigo-700 border-indigo-400",
  Processing: "bg-purple-50 text-purple-700 border-purple-400",
  Shipped: "bg-cyan-50 text-cyan-700 border-cyan-400",
  Delivered: "bg-green-50 text-green-700 border-green-400",
  Cancelled: "bg-red-50 text-red-700 border-red-400",
};

const ROWS_PER_PAGE = 8;

export const Orders = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<"above" | "below">(
    "below",
  );
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const  orderData = async () => {
      try {
        const res = await axios.get('/api/admin/orders');
        const actualData = Array.isArray(res.data) ? res.data : (res.data.orders || []);
        setOrdersData(actualData);
      } catch (error) {
        
      }
    }
    orderData();
  }, []);
  const filteredOrders = ordersData.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesSearch =
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ROWS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );

  const allVisibleSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((o) => selectedRows.has(o._id));

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    // 1) If click is inside the dropdown menu, ignore it
    if (dropdownRef.current && dropdownRef.current.contains(target)) {
      return;
    }

    // 2) If click is on one of the three-dots buttons (or inside it), ignore it.
    //    This prevents the document handler from closing the menu before the button's onClick runs.
    for (const key in buttonRefs.current) {
      const btn = buttonRefs.current[key];
      if (btn && btn.contains(target)) {
        return;
      }
    }

    // Otherwise — it's an outside click: close dropdown.
    setOpenDropdownId(null);
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      const next = new Set(selectedRows);
      paginatedOrders.forEach((o) => next.delete(o._id));
      setSelectedRows(next);
    } else {
      const next = new Set(selectedRows);
      paginatedOrders.forEach((o) => next.add(o._id));
      setSelectedRows(next);
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const handleTabChange = (item: string) => {
    setActiveTab(item);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleViewOrder = (id: string) => {
    
    router.push(`/admin/dashboard/order-details/${id}`);
    setOpenDropdownId(null);
  };

  const handleEditOrder = (id: string) => {
    alert(`Edit order ${id}`);
    setOpenDropdownId(null);
  };
  const handleDeleteOrder = (id: string) => {
    if (confirm(`Are you sure you want to delete order ${id}?`)) {
      alert(`Order ${id} deleted`);
    }
    setOpenDropdownId(null);
  };

  return (
    <div className="p-4 flex flex-col relative">
      {
        popupOpen && <PopUp 
        setPopupOpen={setPopupOpen}
        onConfirm = {handleDeleteOrder}
        />
      }

      <h1 className="text-2xl font-bold mb-4 font-kumbh">Orders</h1>
      <div className="flex space-x-1 mb-4 bg-neutral-200 w-fit rounded-lg p-px ">
        {menuItems.map((item) => (
          <button
            onClick={() => handleTabChange(item)}
            key={item}
            className={`px-4 py-2 transition-all duration-100 rounded-lg text-[14px] font-kumbh cursor-pointer font-semibold ${
              activeTab === item
                ? "bg-neutral-100 text-neutral-900 "
                : "text-neutral-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex items-start justify-start gap-4 w-140 mt-4">
        <Search value={searchQuery} onChange={handleSearchChange} />
        <div className="flex justify-center items-center gap-2">
          <FilterButtons name="Filter" />
          <FilterButtons name="Category" />
        </div>
      </div>

      <div className="mt-6 border border-neutral-300 rounded-lg overflow-auto">
        <div className="min-h-125">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100 border-b border-neutral-300">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    onChange={toggleSelectAll}
                    className="accent-neutral-900 size-4 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 font-kumbh text-neutral-900 text-xs uppercase tracking-wider font-bold">
                  Order
                </th>
                <th className="px-4 py-3 font-kumbh text-neutral-900 text-xs uppercase tracking-wider font-bold">
                  Customer
                </th>
                <th className="px-4 py-3 font-kumbh text-neutral-900 text-xs uppercase tracking-wider font-bold">
                  Product
                </th>
                <th className="px-4 py-3 font-semibold font-kumbh text-neutral-600 text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer">
                  <IconSortDescending2Filled /> Amount
                </th>
                <th className="px-4 py-3 font-semibold font-kumbh text-neutral-600 text-xs uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 font-semibold font-kumbh text-neutral-600 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-neutral-500 font-kumbh"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className={`hover:bg-neutral-200/20 transition-colors ${
                      selectedRows.has(order._id) ? "bg-neutral-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(order._id)}
                        onChange={() => toggleRow(order._id)}
                        className="accent-neutral-900 size-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium font-kumbh text-neutral-900">
                      {order._id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-bold font-kumbh text-neutral-900">
                          {order.firstname} {order.lastname}
                        </span>
                        <span className="text-xs text-neutral-700 font-kumbh">
                          {order.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-kumbh font-semibold text-neutral-600">
                      <div className="flex justify-start items-center gap-1">
                        {
                          order.items[0].productId?.image && (
                           <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                          <Image
                            src={order.items[0].productId?.image }
                            alt = "product"
                            fill
                          ></Image>
                        </div>
                          )
                        }
                        <span className="text-sm">{order.items[0].productId?.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold font-kumbh text-neutral-900">
                      {order.totalAmount}
                    </td>
                    <td className="px-4 py-3 font-kumbh text-sm font-semibold text-neutral-700">
                      {order.createdAt}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-sm text-xs font-semibold font-kumbh border ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 relative">
                      <button
                        ref={(el) => {
                          buttonRefs.current[order._id] = el;
                        }}
                        onClick={(e) => {
                          
                          if (openDropdownId === order._id) {
                            setOpenDropdownId(null);
                            return;
                          }

                          if (openDropdownId !== order._id) {
                            const button = e.currentTarget;
                            if (button) {
                              const rect = button.getBoundingClientRect();
                              const spaceBelow =
                                window.innerHeight - rect.bottom;
                              setDropdownPosition(
                                spaceBelow < 150 ? "above" : "below",
                              );
                            }
                            setOpenDropdownId(order._id);
                          }

                          
                        }}
                        className="p-1.5 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        <div className={cn("size-4 text-neutral-600 w-8 h-8 flex items-center justify-center",
                          openDropdownId === order._id && "text-neutral-900 bg-neutral-200 rounded-md")}
                         >
                        <IconDots className={cn("size-4 text-neutral-600",
                          openDropdownId === order._id && "text-neutral-900 bg-neutral-200 rounded-md")}
                         />
                         </div>
                      </button>
                      {openDropdownId === order._id && (
                        <div
                          ref={dropdownRef}
                          className={`absolute right-3 w-38 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 py-1 ${
                            dropdownPosition === "above"
                              ? "bottom-full mb-1"
                              : "top-full mt-0.5"
                          }`}
                        >
                          <MenuItem
                            label="Order Details"
                            onClick={() => handleViewOrder(order._id)}
                          />
                          <MenuItem
                            label="Edit Order"
                            onClick={() => handleEditOrder(order._id)}
                          />
                          <MenuItem
                            label="Delete"
                            onClick={() => {
                              setOrderToDelete(order._id);
                              setPopupOpen(true)
                              setOpenDropdownId(null);
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Footer ── */}
        <div className="flex items-center justify-between border-t border-neutral-300 bg-neutral-50 px-4 py-3">
          <span className="text-sm text-neutral-600 font-kumbh">
            {selectedRows.size > 0
              ? `${selectedRows.size} of ${filteredOrders.length} row(s) selected`
              : `Showing ${(currentPage - 1) * ROWS_PER_PAGE + 1}–${Math.min(
                  currentPage * ROWS_PER_PAGE,
                  filteredOrders.length,
                )} of ${filteredOrders.length}`}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1.5 rounded-md border border-neutral-300 hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <IconChevronLeft className="size-4 text-neutral-700" />
            </button>
            <span className="text-sm font-kumbh text-neutral-700 min-w-20 text-center">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-md border border-neutral-300 hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <IconChevronRight className="size-4 text-neutral-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterButtons = ({ name }: { name: string }) => {
  return (
    <div
      className="flex items-center justify-center gap-2 border border-neutral-400 rounded-sm px-2 py-1 font-semibold cursor-pointer 
    hover:bg-neutral-100 transition-colors"
    >
      <div className="p-px rounded-full border border-neutral-900">
        <IconPlus className="size-3 text-neutral-800" />{" "}
      </div>
      <button className="font-kumbh text-sm text-neutral-800 cursor-pointer">
        {name}
      </button>
    </div>
  );
};

const Search = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  return (
    <div className="border border-neutral-400 rounded-sm px-2 py-1 w-80 ">
      <input
        type="text"
        placeholder="Search orders..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-0 placeholder:text-[14px] placeholder:text-neutral-600 text-neutral-800 font-semibold w-full"
      />
    </div>
  );
};

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={
      "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-kumbh font-semibold text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
    }
  >
    {label}
  </button>
);
function push(path: string) {
  const router = useRouter();
  router.push(path);
}

const PopUp = ({setPopupOpen, onConfirm}:{setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>, onConfirm: () => void}) => {
  return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center items-start bg-neutral-100 border border-neutral-200
         rounded-lg p-4 w-95 h-50 shadow-2xl z-30">
            <h2 className="font-kumbh font-bold text-2xl text-neutral-700
            ">Delete Item?</h2>
            <p className="font-kumbh font-medium text-neutral-500 text-sm ">This action cannot be undone. This will permanently delete the item from dashboard</p>
            <div className="flex justify-end items-center gap-2 w-full">
            <button
            onClick={()=> setPopupOpen(false) }
            className="border border-neutral-300 rounded-sm px-3 py-1 bg-neutral-100 text-neutral-700 font-kumbh font-semibold text-sm cursor-pointer">Cancel</button>
            <button
            onClick={()=> {
              onConfirm();
              setPopupOpen(false) }}
            className="border border-neutral-800 rounded-sm px-3 py-1 bg-neutral-900 text-neutral-200 font-kumbh font-semibold text-sm cursor-pointer">Delete</button>
            </div>
        </div>
  )
}

