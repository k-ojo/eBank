
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path ? "text-bank-primary font-semibold" : "";
  };

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center py-4 gap-y-2">
          <div className="flex items-center min-w-0 overflow-hidden">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <img 
                src="/lovable-uploads/25b73466-b415-413c-abf2-336293f7b52e.png" 
                alt="Britfield Bank Logo" 
                className="h-10 w-auto mr-2" 
              />
              <span className="text-2xl font-bold text-bank-primary">
                Britfield<span className="text-bank-secondary">Bank</span>
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
            
            {/* Banking dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3 py-2 text-sm font-medium flex items-center gap-1">
                  Banking
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/transfer")}>
                  Transfer Funds
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/transaction-summary")}>
                  Transaction Summary
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/statements")}>
                  Statements
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/cards")}>
                  Cards
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate("/login")} 
                className="hidden md:flex bg-bank-primary text-white border-2 border-white hover:bg-bank-dark items-center gap-2"
              >
                Internet Banking
              </Button>
              <Button onClick={() => navigate("/register")}>Open an Account</Button>
            </div>
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
            Transfer Funds
          </Link>
          <Link
            to="/transaction-summary"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/transaction-summary")}`}
            onClick={closeMenu}
          >
            Transaction Summary
          </Link>
          <div className="flex flex-col space-y-2 mt-2">
            <Button variant="outline" onClick={() => { navigate("/login"); closeMenu(); }}>
              Login
            </Button>
            <Button onClick={() => { navigate("/register"); closeMenu(); }}>
              Open an Account
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
