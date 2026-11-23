import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:ml-64 p-5 md:p-8">{children}</main>
    </div>
  );
}
