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
import { Orders } from "@/src/components/orders/orders";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [isOpen, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [activeNotice, setActiveNotice] = useState<boolean>(false);
  const [activeAdminBoard, setActiveAdminBoard] = useState<boolean>(false);
  const menuItems = [
    { label: "Overview", icon: <IconHome size={19} /> },
    { label: "Analytics", icon: <IconChartBar size={19} /> },
    { label: "Orders", icon: <IconUsers size={19} /> },
    { label: "Products", icon: <IconShield size={19} /> },
    { label: "Settings", icon: <IconSettings size={19} /> },
  ];
 const router = useRouter();
  const LogoutHandle = async() => {
    try {
      const res = await axios.post("/api/moderator/mod-logout");
      if (res.status === 200) {
        router.push("/")
      }

    } catch (error) {
      console.log("error while logging out", error);
    }
  }

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

        <nav className="flex-1 p-4 space-y-1">
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
        <header
          className="h-12 border-b border-neutral-300 bg-transparent flex items-center
           px-6 justify-between  top-20 z-10"
        >
          <button
            onClick={() => setOpen(!isOpen)}
            className="p-1 hover:bg-neutral-100 rounded-md transition-colors border border-neutral-200 cursor-pointer"
          >
            <IconLayoutSidebarFilled
              className={cn(
                "size-6 text-neutral-600 transition-transform",
                !isOpen && "rotate-180",
              )}
            />
          </button>
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <button
                onClick={() => setActiveNotice(!activeNotice)}
                className="relative p-1 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
              >
                <IconBell className="size-4 text-neutral-600" />
                <div className="absolute size-1.5 rounded-full bg-red-500 top-1 right-1.5"></div>
              </button>
            </div>
            <div className="relative">
              <button
                onClick={() => setActiveAdminBoard(!activeAdminBoard)}
                className="flex items-center justify-center gap-1"
              >
                <User className="size-6 text-neutral-700" />
              </button>
              {activeAdminBoard && <AdminCard onConfirm={() => {
                LogoutHandle()
                setActiveAdminBoard(false)
              }} />}
            </div>
          </div>
        </header>
        {activeTab === "Overview" && <Overview />}
        {activeTab === "Products" && <ProductsView />}
        {activeTab === "Analytics" && <AnalyticsPage />}
        {activeTab === "Orders" && <Orders />}
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
          : "text-neutral-700 hover:bg-neutral-300",
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
const IconBell = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </svg>
  );
};
const Logout = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    </svg>
  );
};
const User = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

const AdminCard = ({ onConfirm }: { onConfirm: () => void}) => {
  return (
    <div
      className="absolute top-9 -right-2.5 w-60 h-30 border border-neutral-300 bg-white rounded-md shadow-lg
              px-4 flex flex-col justify-center items-center"
    >
      <div className="flex items-center justify-start gap-3 w-full border-b border-neutral-300 pb-2">
        <div>
          <User className="size-6 text-neutral-700" />
        </div>
        <div className="flex flex-col justify-center items-start gap-1 overflow-hidden">
          <h2 className="text-sm text-neutral-900 font-bold font-inter">
            Vaskar
          </h2>
          <p className="text-xs text-neutral-500 font-medium font-kumbh ">
            vaskarbhattacharjee03@gmail.com
          </p>
        </div>
      </div>
      <button
      onClick={()=>onConfirm()}
      className="flex items-center justify-start w-full gap-2 mt-2 cursor-pointer ">
        <Logout className="size-5 text-neutral-700" />
        <span className="text-sm text-neutral-700 font-semibold font-inter">
          Log Out
        </span>
      </button>
    </div>
  );
};

export default Dashboard;
