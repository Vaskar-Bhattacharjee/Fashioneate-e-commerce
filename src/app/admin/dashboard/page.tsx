"use client";

import { cn } from "@/src/lib/utils";
import {
  IconLayoutSidebarFilled,
  IconHome,
  IconSettings,
  IconChartBar,
  IconUsers,
  IconShield,

} from "@tabler/icons-react";
import { useState } from "react";
import { ProductsView } from "@/src/components/ui/product-view";
import AnalyticsPage from "@/src/components/analytics/analytics";


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
    <div className="flex w-full min-h-screen bg-transparent pt-20">
      <aside
        className={cn(
          "bg-transparent border-r border-neutral-300 transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
          isOpen ? "w-64" : "w-0 md:w-20",
        )}
      >
        <div className="p-6 font-bold font-inter text-4xl border-b border-neutral-300 text-neutral-900  truncate">
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
        <header className="h-16 border-b border-neutral-300 bg-transparent flex items-center px-6 justify-between  top-20 z-10">
          <button
            onClick={() => setOpen(!isOpen)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200 cursor-pointer"
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
        {activeTab === "Analytics" && <AnalyticsPage />}
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






export default Dashboard;
