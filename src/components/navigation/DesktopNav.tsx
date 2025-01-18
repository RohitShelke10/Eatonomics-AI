import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";
import type { NavItemType } from "./types";

interface DesktopNavProps {
  navItems: NavItemType[];
  isActive: (path: string) => boolean;
  isAuthenticated: boolean;
}

export const DesktopNav = ({ navItems, isActive, isAuthenticated }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          {...item}
          isActive={isActive(item.path)}
        />
      ))}
      {!isAuthenticated && (
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};