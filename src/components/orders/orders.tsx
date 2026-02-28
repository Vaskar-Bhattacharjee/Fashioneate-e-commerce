"use client";
import {
  IconPlus,
  IconDots,
  IconChevronLeft,
  IconChevronRight,
  IconSortDescending2Filled,
  IconTrash,
} from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

type OrderStatus =
  | "Completed"
  | "Pending"
  | "Cancelled"
  | "Refunded"
  | "Returned";

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  date: string;
  status: OrderStatus;
}

const ordersData = [
  {
    id: "ORD-7523",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    date: "2024-01-15T14:30:00",
    amount: 245.5,
    status: "Delivered",
    paymentMethod: "Online",
    product: "Wireless Headphones",
    items: 3,
  },
  {
    id: "ORD-7524",
    customer: "Michael Chen",
    email: "michael@example.com",
    avatar: "https://i.pravatar.cc/150?u=michael",
    date: "2024-01-15T16:45:00",
    amount: 189.0,
    status: "Pending",
    paymentMethod: "COD",
    product: "Smartwatch",
    items: 2,
  },
  {
    id: "ORD-7525",
    customer: "Emma Williams",
    email: "emma@example.com",
    avatar: "https://i.pravatar.cc/150?u=emma",
    date: "2024-01-14T09:20:00",
    amount: 567.8,
    status: "Awaiting Payment",
    paymentMethod: "Online",
    product: "Gaming Console",
    items: 5,
  },
  {
    id: "ORD-7526",
    customer: "James Brown",
    email: "james@example.com",
    avatar: "https://i.pravatar.cc/150?u=james",
    date: "2024-01-14T11:15:00",
    amount: 123.25,
    status: "Shipped",
    paymentMethod: "COD",
    product: "Laptop",
    items: 1,
  },
  {
    id: "ORD-7527",
    customer: "Lisa Davis",
    email: "lisa@example.com",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    date: "2024-01-13T15:50:00",
    amount: 899.99,
    status: "Cancelled",
    paymentMethod: "Online",
    product: "Smartphone",
    items: 4,
  },
  {
    id: "ORD-7528",
    customer: "David Wilson",
    email: "david@example.com",
    avatar: "https://i.pravatar.cc/150?u=david",
    date: "2024-01-13T10:20:00",
    amount: 456.0,
    status: "Processing",
    paymentMethod: "Online",
    product: "Tablet",
    items: 3,
  },
  {
    id: "ORD-7529",
    customer: "Anna Taylor",
    email: "anna@example.com",
    avatar: "https://i.pravatar.cc/150?u=anna",
    date: "2024-01-12T14:15:00",
    amount: 234.5,
    status: "Confirmed",
    paymentMethod: "COD",
    product: "Bluetooth Speaker",
    items: 2,
  },
];

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

  const filteredOrders = ordersData.filter((order) => {
    const matchesTab = activeTab === "All" || order.status === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ROWS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );

  const allVisibleSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((o) => selectedRows.has(o.id));

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
      paginatedOrders.forEach((o) => next.delete(o.id));
      setSelectedRows(next);
    } else {
      const next = new Set(selectedRows);
      paginatedOrders.forEach((o) => next.add(o.id));
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
    alert(`View details for order ${id}`);
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
    <div className="p-4 flex flex-col">
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
        <div className="min-h-[500px]">
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
                    key={order.id}
                    className={`hover:bg-neutral-200/20 transition-colors ${
                      selectedRows.has(order.id) ? "bg-neutral-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(order.id)}
                        onChange={() => toggleRow(order.id)}
                        className="accent-neutral-900 size-4 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium font-kumbh text-neutral-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-bold font-kumbh text-neutral-900">
                          {order.customer}
                        </span>
                        <span className="text-xs text-neutral-700 font-kumbh">
                          {order.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-kumbh font-semibold text-neutral-600">
                      <div className="flex justify-start items-center gap-1">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative">
                          <Image
                            src={order.avatar}
                            alt={order.product}
                            fill
                          ></Image>
                        </div>
                        <span className="text-sm">{order.product}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold font-kumbh text-neutral-900">
                      {order.amount}
                    </td>
                    <td className="px-4 py-3 font-kumbh text-sm font-semibold text-neutral-700">
                      {order.date}
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
                          buttonRefs.current[order.id] = el;
                        }}
                        onClick={(e) => {
                          
                          if (openDropdownId === order.id) {
                            setOpenDropdownId(null);
                            return;
                          }

                          if (openDropdownId !== order.id) {
                            const button = e.currentTarget;
                            if (button) {
                              const rect = button.getBoundingClientRect();
                              const spaceBelow =
                                window.innerHeight - rect.bottom;
                              setDropdownPosition(
                                spaceBelow < 150 ? "above" : "below",
                              );
                            }
                            setOpenDropdownId(order.id);
                          }

                          
                        }}
                        className="p-1.5 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        <IconDots className="size-4 text-neutral-600" />
                      </button>
                      {openDropdownId === order.id && (
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
                            onClick={() => handleViewOrder(order.id)}
                          />
                          <MenuItem
                            label="Edit Order"
                            onClick={() => handleEditOrder(order.id)}
                          />
                          <MenuItem
                            label="Delete"
                            onClick={() => handleDeleteOrder(order.id)}
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
