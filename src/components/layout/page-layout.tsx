"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

interface PageLayoutProps {
  currentPath: string;
  children: ReactNode;
  padding?: string;
}

const PageLayout = ({
  currentPath,
  children,
  padding = "p-5 md:p-8",
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} />
      <main className={`lg:ml-64 ${padding}`}>{children}</main>
    </div>
  );
};

export default PageLayout;
