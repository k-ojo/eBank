
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const copyPhoneNumber = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success("Phone number copied to clipboard!");
  };

  return (
    <footer className="bg-bank-dark text-white pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Britfield Bank</h3>
            <p className="text-sm text-gray-300 mb-4">
              Your Trusted Financial Partner since 2005. Providing secure banking services for all your needs.
            </p>
            <div className="flex items-center mt-4">
              <div className="flex items-center text-sm">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                <span>Online Banking is active</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-bank-secondary">Home</Link></li>
              <li><Link to="/services" className="hover:text-bank-secondary">Services</Link></li>
              <li><Link to="/contact" className="hover:text-bank-secondary">Contact Us</Link></li>
              <li><Link to="/security" className="hover:text-bank-secondary">Security</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-bank-secondary">Personal Banking</Link></li>
              <li><Link to="/services" className="hover:text-bank-secondary">Business Banking</Link></li>
              <li><Link to="/services" className="hover:text-bank-secondary">Loans & Mortgages</Link></li>
              <li><Link to="/services" className="hover:text-bank-secondary">Investments</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <address className="text-sm not-italic">
              <p>Britfield Bank</p>
              <p>1 Trust Lane, East Legon</p>
              <p>Accra, Ghana</p>
              <p className="mt-2 flex items-center">
                <strong>Support:</strong>&nbsp;
                <span className="group relative flex items-center">
                  +233 55 123 4567
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 ml-1 text-gray-400 hover:text-white" 
                    onClick={() => copyPhoneNumber("+233 55 123 4567")}
                  >
                    <Copy size={14} />
                  </Button>
                </span>
              </p>
              <p>
                <strong>Email:</strong>&nbsp;
                <a href="mailto:support@britfieldbank.com" className="hover:text-bank-secondary underline">
                  support@britfieldbank.com
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Britfield Bank. All rights reserved.
            </p>
            <div className="flex mt-4 md:mt-0">
              <div className="flex space-x-4 text-sm text-gray-400">
                <Link to="/security" className="hover:text-white">Privacy Policy</Link>
                <Link to="/security" className="hover:text-white">Terms of Service</Link>
                <Link to="/security" className="hover:text-white">Cookie Policy</Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 text-xs text-gray-500">
            Registered and secured bank – 24/7 Support | FDIC Insured
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
