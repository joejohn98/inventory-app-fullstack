import {
  BarChart3,
  BoxesIcon,
  LayoutDashboard,
  Package,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";
import UserBlock from "@/components/userBlock";

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
  return (
    <div className="w-68 fixed min-h-screen bg-slate-800 p-6 text-white z-10">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-7 h-7" />
          <span className="text-lg font-semibold">Inventory Hub</span>
        </div>
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
              <span className="text-sm">{item.name}</span>
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
  );
};

export default Sidebar;
