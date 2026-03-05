"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconArrowLeft, IconPackage } from "@tabler/icons-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface OrderItem {
  _id: string;
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  addressLine1: string;
  addressLine2?: string;
  items: OrderItem[];
  totalAmount: number;
  status: "Awaiting Payment" | "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "COD" | "Online";
  createdAt: string;
}

// ── Status styles ─────────────────────────────────────────────────────────────
const statusStyles: Record<string, string> = {
  "Awaiting Payment": "bg-orange-50 text-orange-700 border-orange-400",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-500",
  Confirmed: "bg-indigo-50 text-indigo-700 border-indigo-400",
  Processing: "bg-purple-50 text-purple-700 border-purple-400",
  Shipped: "bg-cyan-50 text-cyan-700 border-cyan-400",
  Delivered: "bg-green-50 text-green-700 border-green-400",
  Cancelled: "bg-red-50 text-red-700 border-red-400",
};

// ── Section Card ──────────────────────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-100">
        <h2 className="text-sm font-bold text-neutral-800 font-kumbh uppercase tracking-wider">{title}</h2>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between items-start py-1.5 border-b border-neutral-50 last:border-0">
      <span className="text-xs text-neutral-400 font-kumbh font-semibold uppercase tracking-wide w-32 shrink-0">{label}</span>
      <span className="text-sm text-neutral-800 font-kumbh font-semibold text-right">{value || "—"}</span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
 const OrderDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
        return console.error("No order ID provided.");
    }
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/admin/orders/order-single/${id}`);
        console.log(res.data);
        setOrder(res.data.order);
      } catch (err) {
        setError("Failed to load order details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // ── Loading ──
  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-3 text-neutral-400">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm font-kumbh font-semibold">Loading order...</span>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error || !order) {
    return (
      <div className="p-8 flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-3 text-neutral-400">
          <IconPackage className="w-10 h-10" />
          <span className="text-sm font-kumbh font-semibold">{error || "Order not found."}</span>
          <button onClick={() => router.back()} className="text-xs text-neutral-500 underline cursor-pointer">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const shippingFee = order.totalAmount >= 3000 ? 0 : 120;
  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="px-6 pt-30 max-w-5xl mx-auto flex flex-col gap-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <IconArrowLeft className="size-4 text-neutral-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 font-kumbh">
              Order <span className="text-neutral-400">#{order._id.slice(-8).toUpperCase()}</span>
            </h1>
            <p className="text-xs text-neutral-400 font-kumbh mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-BD", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold font-kumbh border ${statusStyles[order.status]}`}>
            {order.status}
          </span>
          <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold font-kumbh border ${
            order.paymentMethod === "COD"
              ? "bg-amber-50 text-amber-700 border-amber-300"
              : "bg-blue-50 text-blue-700 border-blue-300"
          }`}>
            {order.paymentMethod === "COD" ? "💵 Cash on Delivery" : "💳 Online Payment"}
          </span>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="pt-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

        {/* LEFT — Items */}
        <div className="flex flex-col gap-6">
          <Card title={`Items Ordered — ${order.items.length} item${order.items.length !== 1 ? "s" : ""}`}>
            <div className="divide-y divide-neutral-100">
              {order.items.map((item, idx) => (
                <div key={item._id || idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 border border-neutral-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-800 font-kumbh truncate">{item.name}</p>
                    <p className="text-xs text-neutral-400 font-kumbh mt-0.5">
                      Unit price: <span className="text-neutral-600 font-semibold">৳{item.price.toLocaleString()}</span>
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="shrink-0 text-center">
                    <span className="text-[10px] text-neutral-400 font-kumbh uppercase tracking-wider block">Qty</span>
                    <span className="text-sm font-bold text-neutral-800 font-kumbh">×{item.quantity}</span>
                  </div>

                  {/* Line total */}
                  <div className="shrink-0 text-right min-w-20">
                    <span className="text-[10px] text-neutral-400 font-kumbh uppercase tracking-wider block">Total</span>
                    <span className="text-sm font-bold text-neutral-900 font-kumbh">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Price summary */}
            <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
              <div className="flex justify-between text-sm text-neutral-500 font-kumbh">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-700">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-500 font-kumbh">
                <span>Shipping</span>
                <span className={`font-semibold ${shippingFee === 0 ? "text-green-600" : "text-neutral-700"}`}>
                  {shippingFee === 0 ? "Free" : `৳${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
                <span className="text-base font-bold text-neutral-800 font-kumbh">Total</span>
                <span className="text-xl font-bold text-neutral-900 font-kumbh">
                  ৳{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT — Customer + Shipping */}
        <div className="flex flex-col gap-4">

          {/* Customer Info */}
          <Card title="Customer">
            <InfoRow label="Name" value={`${order.firstname} ${order.lastname || ""}`} />
            <InfoRow label="Email" value={order.email} />
            <InfoRow label="Phone" value={order.phone} />
          </Card>

          {/* Shipping Address */}
          <Card title="Shipping Address">
            <InfoRow label="Country" value={order.country} />
            <InfoRow label="Division" value={order.state} />
            <InfoRow label="City" value={order.city} />
            <InfoRow label="Postcode" value={order.postcode} />
            <InfoRow label="Address" value={order.addressLine1} />
            {order.addressLine2 && (
              <InfoRow label="Address 2" value={order.addressLine2} />
            )}
          </Card>

        </div>
      </div>
    </div>
  );
};

export default OrderDetail;