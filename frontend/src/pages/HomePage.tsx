
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LogIn, CreditCard, Wallet, Shield, Users, Clock } from "lucide-react";
import CurrencyTicker from "@/components/CurrencyTicker";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <CurrencyTicker />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}></div>
        <div className="hero-gradient absolute inset-0 z-10"></div>
        
        <div className="relative z-20 py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block bg-bank-primary/70 px-6 py-2 rounded-full mb-4">
              <h2 className="text-lg md:text-xl text-white font-medium">Your Trusted Financial Partner</h2>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Banking Solutions for Every Need
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Secure banking for your everyday needs with personalized solutions and 24/7 support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-white text-bank-primary hover:bg-gray-100 text-lg"
              >
                Open an Account
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-white border-2 text-white hover:bg-white hover:text-bank-primary transition-colors duration-300 text-lg flex items-center gap-2 font-bold bg-bank-secondary/80"
              >
                <LogIn size={20} />
                Login to Internet Banking
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/services")}
                className="bg-bank-secondary text-white hover:bg-bank-secondary/90 text-lg flex items-center gap-2"
              >
                <CreditCard size={20} />
                Apply for Loan
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Professional Image Section - NEW */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Expert Financial Guidance</h2>
            <p className="text-gray-600 mb-6">
              At EverTrust Bank, our team of experienced professionals is dedicated to helping you achieve your financial goals. 
              Whether you're planning for retirement, buying a home, or starting a business, we have the expertise to guide you every step of the way.
            </p>
            <p className="text-gray-600 mb-6">
              Our personalized approach ensures that we understand your unique needs and provide tailored solutions that work for you.
            </p>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-bank-primary text-white hover:bg-bank-primary/90"
            >
              Speak to an Advisor
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80" 
              alt="Financial professional working on laptop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Fixed buttons for quick access */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 sm:hidden">
        <Button 
          onClick={() => navigate("/login")} 
          className="rounded-full bg-bank-primary shadow-lg flex items-center gap-2 px-6 py-5 border-2 border-white"
        >
          <LogIn size={18} />
          <span className="font-bold">Internet Banking</span>
        </Button>
        <Button 
          onClick={() => navigate("/services")} 
          className="rounded-full bg-bank-secondary shadow-lg flex items-center gap-2"
        >
          <CreditCard size={18} />
          Loans
        </Button>
      </div>
      
      {/* Key Services Section - Enhanced */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Key Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover how EverTrust Bank can help you achieve your financial goals with our comprehensive range of services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-bank-accent rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-bank-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Wallet size={28} className="text-bank-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Banking</h3>
              <p className="text-gray-600 mb-4">
                Everyday banking solutions tailored to your personal needs, from checking accounts to savings plans.
              </p>
              <Button
                variant="link"
                onClick={() => navigate("/services")}
                className="text-bank-primary p-0 flex items-center"
              >
                Learn More <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="bg-bank-accent rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-bank-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield size={28} className="text-bank-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Solutions</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive banking services designed to help your business grow, from merchant accounts to credit lines.
              </p>
              <Button
                variant="link"
                onClick={() => navigate("/services")}
                className="text-bank-primary p-0 flex items-center"
              >
                Learn More <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="bg-bank-accent rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-bank-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <CreditCard size={28} className="text-bank-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Loans & Mortgages</h3>
              <p className="text-gray-600 mb-4">
                Flexible financing options with competitive rates for personal, business, and home purchases.
              </p>
              <Button
                variant="link"
                onClick={() => navigate("/services")}
                className="text-bank-primary p-0 flex items-center"
              >
                Learn More <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Enhanced */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - see what our satisfied customers have to say about their experience with EverTrust Bank.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-3 left-6 bg-yellow-400 text-xs px-3 py-1 rounded-full font-bold text-white">
                VERIFIED CUSTOMER
              </div>
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "This bank helped me secure my first home loan! The process was smooth and the staff were exceptionally helpful throughout every step."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-bank-primary/20 rounded-full w-10 h-10 flex items-center justify-center text-bank-primary font-bold">
                  MA
                </div>
                <div>
                  <p className="font-semibold">Michael A.</p>
                  <p className="text-sm text-gray-500">Homeowner, Chicago</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-3 left-6 bg-yellow-400 text-xs px-3 py-1 rounded-full font-bold text-white">
                VERIFIED CUSTOMER
              </div>
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "I've been a customer for over 10 years and I'm always impressed by the personalized service and innovative solutions they provide."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-bank-primary/20 rounded-full w-10 h-10 flex items-center justify-center text-bank-primary font-bold">
                  SJ
                </div>
                <div>
                  <p className="font-semibold">Sarah J.</p>
                  <p className="text-sm text-gray-500">Business Owner, New York</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative">
              <div className="absolute -top-3 left-6 bg-yellow-400 text-xs px-3 py-1 rounded-full font-bold text-white">
                VERIFIED CUSTOMER
              </div>
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "The mobile banking app is simply amazing! I can manage all my accounts and make transfers easily from anywhere, anytime."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-bank-primary/20 rounded-full w-10 h-10 flex items-center justify-center text-bank-primary font-bold">
                  DT
                </div>
                <div>
                  <p className="font-semibold">Daniel T.</p>
                  <p className="text-sm text-gray-500">Tech Professional, San Francisco</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Notice */}
      <section className="py-12 px-6 bg-bank-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Shield size={24} />
            <p className="text-lg font-medium">
              Registered and secured bank – 24/7 Support | FDIC Insured
            </p>
          </div>
          <p className="mt-2">
            Your data is secured with 256-bit encryption. EverTrust Bank, ensuring your financial security since 2005.
          </p>
        </div>
      </section>

      {/* Internet Banking Shortcut - New fixed element */}
      <div className="fixed top-24 left-6 z-40 hidden md:block">
        <Button 
          onClick={() => navigate("/login")} 
          className="bg-bank-primary text-white border-2 border-white shadow-lg hover:bg-bank-dark flex items-center gap-2 px-6 py-6 rounded-lg font-bold"
        >
          <Wallet size={24} />
          Internet Banking Login
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
