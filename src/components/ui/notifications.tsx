"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Notification {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread?: boolean;
  actions?: boolean;
}

// ── Data (matching the HTML exactly) ─────────────────────────────────────────
const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1,  name: "Your order is placed",       message: "Amet minim mollit non deser unt ullamco est sit aliqua.",                                                          time: "2 days ago", avatar: "https://i.pravatar.cc/150?img=1",  unread: false },
  { id: 2,  name: "Congratulations Darlene 🎉", message: "Won the monthly best seller badge",                                                                                time: "11 am",      avatar: "https://i.pravatar.cc/150?img=2",  unread: true  },
  { id: 3,  name: "Joaquina Weisenborn",        message: "Requesting access permission",                                                                                     time: "12 pm",      avatar: "https://i.pravatar.cc/150?img=3",  unread: true,  actions: true },
  { id: 4,  name: "Brooklyn Simmons",           message: "Added you to Top Secret Project group...",                                                                         time: "1 pm",       avatar: "https://i.pravatar.cc/150?img=4",  unread: true  },
  { id: 5,  name: "Margot Henschke",            message: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",                   time: "3 pm",       avatar: "https://i.pravatar.cc/150?img=5",  unread: false },
  { id: 6,  name: "Sal Piggee",                 message: "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish.", time: "4 pm",       avatar: "https://i.pravatar.cc/150?img=6",  unread: false },
  { id: 7,  name: "Miguel Guelff",              message: "Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.",  time: "7 pm",       avatar: "https://i.pravatar.cc/150?img=7",  unread: true  },
  { id: 8,  name: "Mauro Elenbaas",             message: "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly.",      time: "10 pm",      avatar: "https://i.pravatar.cc/150?img=8",  unread: true  },
  { id: 9,  name: "Bridgett Omohundro",         message: "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw.",                                      time: "10 pm",      avatar: "https://i.pravatar.cc/150?img=9",  unread: false },
  { id: 10, name: "Zenia Jacobs",               message: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",                   time: "10 am",      avatar: "https://i.pravatar.cc/150?img=10", unread: false },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconBell = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="size-3 shrink-0" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────────
export const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // ── Click outside closes dropdown ─────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleAccept = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, unread: false, actions: false, message: "Access granted ✓" } : n
      )
    );
  };

  const handleDecline = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={ref}>

      {/* ── Bell Button ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-1 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
      >
        <IconBell className="size-4 text-neutral-600" />
        {unreadCount > 0 && (
          <div className="absolute size-1.5 rounded-full bg-red-500 top-1 right-1.5" />
        )}
      </button>

      {/* ── Dropdown Panel ── */}
      {open && (
        <div className="absolute right-0 top-9 w-80 bg-white border border-neutral-200 rounded-md shadow-md z-50 overflow-hidden">

          {/* Sticky Header */}
          <div className="flex justify-between items-center border-b px-6 py-4 sticky top-0 bg-white z-10">
            <span className="text-sm font-medium text-neutral-800 font-kumbh">
              Notifications
            </span>
            <a href="#" className="text-xs text-blue-600 hover:underline font-medium font-kumbh">
              View all
            </a>
          </div>

          {/* Scrollable List — scrollbar hidden, 350px height matching HTML */}
          <div
            className="overflow-y-scroll"
            style={{ height: "350px", scrollbarWidth: "none" }}
          >
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex cursor-pointer items-start gap-9 border-b px-4 py-3 hover:bg-neutral-50 transition-colors"
              >
                {/* Left: avatar + content */}
                <div className="flex flex-1 items-start gap-2">

                  {/* Avatar */}
                  <div className="flex-none">
                    <img
                      src={n.avatar}
                      alt=""
                      className="size-8 rounded-full object-cover aspect-square"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="truncate text-sm font-medium text-neutral-800 font-kumbh">
                      {n.name}
                    </div>
                    <div className="text-xs text-neutral-500 line-clamp-1 font-kumbh">
                      {n.message}
                    </div>

                    {/* Accept / Decline — only item 3 (Joaquina) */}
                    {n.actions && (
                      <div className="flex items-center gap-2 mt-0.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAccept(n.id); }}
                          className="inline-flex items-center justify-center h-6 px-2 text-xs font-medium font-kumbh rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDecline(n.id); }}
                          className="inline-flex items-center justify-center h-6 px-2 text-xs font-medium font-kumbh rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {/* Time */}
                    <div className="flex items-center gap-1 text-xs text-neutral-400 font-kumbh">
                      <IconClock />
                      {n.time}
                    </div>
                  </div>
                </div>

                {/* Right: unread dot */}
                {n.unread && (
                  <div className="flex-none mt-1">
                    <span className="block size-2 rounded-full bg-red-500/80 border" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};