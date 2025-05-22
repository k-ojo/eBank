
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [showChargesPopup, setShowChargesPopup] = useState(false);
  
  // Show pending transaction popup after login
  useEffect(() => {
    if (isAuthenticated && !showChargesPopup) {
      const timer = setTimeout(() => {
        toast.warning(
          "⚠️ Your last transaction is pending – Pay charges to complete",
          {
            duration: 8000,
          }
        );
        setShowChargesPopup(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, showChargesPopup]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
