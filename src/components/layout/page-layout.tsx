import { ReactNode } from "react";

interface PageLayoutProps {
  currentPath?: string;
  children: ReactNode;
  padding?: string;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return <>{children}</>;
};

export default PageLayout;
