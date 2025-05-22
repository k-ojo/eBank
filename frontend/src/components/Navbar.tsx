
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, LogOut, User, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-bank-primary font-semibold" : "";
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User size={18} />
              {user.name}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/transfer")}>
              Transfer Funds
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/statements")}>
              Statements
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/cards")}>
              Cards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut size={16} className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={() => navigate("/login")} 
          className="hidden md:flex bg-bank-primary text-white border-2 border-white hover:bg-bank-dark items-center gap-2"
        >
          <LogIn size={18} />
          Internet Banking
        </Button>
        <Button onClick={() => navigate("/register")}>Open an Account</Button>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-bank-primary">
                EverTrust<span className="text-bank-secondary">Bank</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className={`px-3 py-2 text-sm font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/services" className={`px-3 py-2 text-sm font-medium ${isActive("/services")}`}>
              Services
            </Link>
            <Link to="/contact" className={`px-3 py-2 text-sm font-medium ${isActive("/contact")}`}>
              Contact
            </Link>
            <Link to="/security" className={`px-3 py-2 text-sm font-medium ${isActive("/security")}`}>
              Security
            </Link>
            {user && (
              <Link to="/dashboard" className={`px-3 py-2 text-sm font-medium ${isActive("/dashboard")}`}>
                Dashboard
              </Link>
            )}
            {renderAuthButtons()}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/")}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/services")}`}
            onClick={closeMenu}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/contact")}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link
            to="/security"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/security")}`}
            onClick={closeMenu}
          >
            Security
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/dashboard")}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/transfer"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/transfer")}`}
                onClick={closeMenu}
              >
                Transfer
              </Link>
              <Link
                to="/statements"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/statements")}`}
                onClick={closeMenu}
              >
                Statements
              </Link>
              <Link
                to="/cards"
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/cards")}`}
                onClick={closeMenu}
              >
                Cards
              </Link>
              <Button 
                variant="destructive" 
                className="w-full mt-2" 
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 mt-2">
              <Button variant="outline" onClick={() => { navigate("/login"); closeMenu(); }}>
                Login
              </Button>
              <Button onClick={() => { navigate("/register"); closeMenu(); }}>
                Open an Account
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
