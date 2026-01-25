"use client";

import {
  BarChart3,
  BoxesIcon,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import UserBlock from "@/components/userBlock";
import { useEffect, useState } from "react";

const navItems = [
  {
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
    name: "Dashboard",
  },
  { href: "/departments", icon: <BoxesIcon size={20} />, name: "Departments" },
  { href: "/inventory", icon: <Package size={20} />, name: "Inventory" },
  { href: "/add-product", icon: <Plus size={20} />, name: "Add Product" },
  { href: "/settings", icon: <Settings size={20} />, name: "Settings" },
];

const Sidebar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const sidebarClasses = isMobile
    ? `fixed inset-0 z-50 w-72 bg-gray-900 text-white p-6 shadow-xl transform ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`
    : "w-68 fixed top-0 left-0 h-screen bg-gray-800 text-white p-6";

  return (
    <>
      {isMobile && (
        <div className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold text-white">Inventory App</h1>
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-7 h-7" />
            <span className="text-xl font-semibold">Inventory Hub</span>
          </div>
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer mb-4"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          <div className="text-sm font-semibold text-gray-400 uppercase">
            Inventory
          </div>
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                href={item.href}
                key={item.name}
                className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${
                  isActive
                    ? "bg-purple-100 text-gray-800"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                <span className={`${isActive ? "text-purple-500" : ""}`}>
                  {item.icon}
                </span>
                <span className="text-md lg:text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            {/* User Info Here */}
            <UserBlock />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
