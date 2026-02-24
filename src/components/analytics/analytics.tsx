"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconShoppingCart,
  IconUsers,
  IconPackage,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Types for your analytics data
interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    revenueChange: number;
    ordersChange: number;
    customersChange: number;
    productsChange: number;
  };
  salesTrend: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  categoryDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  recentOrders: {
    id: string;
    customer: string;
    amount: number;
    status: string;
    date: string;
  }[];
  topProducts: {
    name: string;
    sales: number;
    revenue: number;
  }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/analytics?range=${timeRange}`);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (!data) {
    return <div className="p-8 text-center text-neutral-500">Failed to load analytics</div>;
  }

  return (
    <div className="p-6 w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 font-inter">
            Analytics Dashboard
          </h1>
          <p className="text-neutral-500 text-sm font-inter">
            Track your business performance and growth
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg p-1">
          {[
            { label: "7 Days", value: "7d" },
            { label: "30 Days", value: "30d" },
            { label: "90 Days", value: "90d" },
            { label: "1 Year", value: "1y" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                timeRange === range.value
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Revenue"
          value={`$${data.overview.totalRevenue.toLocaleString()}`}
          change={data.overview.revenueChange}
          icon={<IconCurrencyDollar className="size-5" />}
          color="blue"
        />
        <OverviewCard
          title="Total Orders"
          value={data.overview.totalOrders.toLocaleString()}
          change={data.overview.ordersChange}
          icon={<IconShoppingCart className="size-5" />}
          color="green"
        />
        <OverviewCard
          title="Total Customers"
          value={data.overview.totalCustomers.toLocaleString()}
          change={data.overview.customersChange}
          icon={<IconUsers className="size-5" />}
          color="purple"
        />
        <OverviewCard
          title="Active Products"
          value={data.overview.totalProducts.toLocaleString()}
          change={data.overview.productsChange}
          icon={<IconPackage className="size-5" />}
          color="orange"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 font-inter">
              Revenue & Orders Trend
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-neutral-600">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Revenue
              </span>
              <span className="flex items-center gap-1 text-neutral-600">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Orders
              </span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.salesTrend}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis 
                  dataKey="date" 
                  stroke="#737373"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#737373" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-neutral-800 font-inter mb-6">
            Sales by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {data.categoryDistribution.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </span>
                <span className="font-medium text-neutral-700">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-neutral-800 font-inter mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {data.topProducts.map((product, index) => (
              <div 
                key={product.name}
                className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-neutral-100 text-neutral-600 font-semibold rounded-lg">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-neutral-800">{product.name}</p>
                    <p className="text-sm text-neutral-500">{product.sales} sales</p>
                  </div>
                </div>
                <span className="font-semibold text-neutral-800">
                  ${product.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-neutral-800 font-inter mb-4">
            Recent Orders
          </h3>
          <div className="space-y-3">
            {data.recentOrders.map((order) => (
              <div 
                key={order.id}
                className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg"
              >
                <div>
                  <p className="font-medium text-neutral-800">{order.customer}</p>
                  <p className="text-sm text-neutral-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-neutral-800">${order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Overview Card Component
function OverviewCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
}) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-neutral-300 rounded-xl p-5  hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-neutral-800 font-inter">{value}</p>
        <p className="text-sm text-neutral-500 font-inter">{title}</p>
      </div>
    </motion.div>
  );
}

// Loading Skeleton
function AnalyticsSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-neutral-200 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-96 bg-neutral-200 rounded-xl animate-pulse" />
        <div className="h-96 bg-neutral-200 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}