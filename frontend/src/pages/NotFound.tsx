
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-bank-primary mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-lg text-gray-500 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Button asChild className="flex items-center gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
