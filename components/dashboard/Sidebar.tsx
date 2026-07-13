"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { SidebarNavItem } from "@/types";
import { useSession, signOut } from "next-auth/react";

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: "FileText",
  },
  {
    title: "AI Chat",
    href: "/dashboard/ai-chat",
    icon: "MessageCircle",
  },
  {
    title: "Summary",
    href: "/dashboard/summary",
    icon: "BookText",
  },
  {
    title: "Quiz",
    href: "/dashboard/quiz",
    icon: "ClipboardCheck",
  },
  {
    title: "Flashcards",
    href: "/dashboard/flashcards",
    icon: "Copy",
  },
  {
    title: "Mindmap",
    href: "/dashboard/mindmap",
    icon: "GitFork",
  },
  {
    title: "Progress",
    href: "/dashboard/progress",
    icon: "LineChart",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "User",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 bg-gray-800 p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8 gradient-text">EduMind</h1>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {sidebarNavItems.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons] || Icons.HelpCircle;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto">
        {session?.user && (
          <div className="mb-4">
            <p className="text-sm">Signed in as</p>
            <p className="font-bold">{session.user.name}</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
        >
          <Icons.LogOut size={20} />
          <span className="ml-2">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
