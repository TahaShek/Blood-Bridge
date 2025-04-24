import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const index: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 w-[95%] mx-auto py-2">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="cursor-pointer">Become a Donor</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-red-700 hover:bg-red-800 cursor-pointer">
                Request for Blood
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default index;
