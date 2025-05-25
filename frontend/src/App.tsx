
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BankingProvider } from "@/contexts/BankingContext";

// Pages
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import ServicesPage from "./pages/ServicesPage";
import StatementsPage from "./pages/StatementsPage";
import ContactPage from "./pages/ContactPage";
import CardsPage from "./pages/CardsPage";
import SecurityPage from "./pages/SecurityPage";
import TransactionSummaryPage from "./pages/TransactionSummaryPage";
import TaxPaymentPage from "./pages/TaxPaymentPage";
import NotFound from "./pages/NotFound";

// Layout
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BankingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transfer" element={<TransferPage />} />
              <Route path="statements" element={<StatementsPage />} />
              <Route path="cards" element={<CardsPage />} />
              <Route path="transaction-summary" element={<TransactionSummaryPage />} />
              <Route path="tax-payment" element={<TaxPaymentPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </BankingProvider>
  </QueryClientProvider>
);

export default App;
