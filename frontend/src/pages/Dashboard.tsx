
import { useBanking } from "@/contexts/BankingContext";
import AccountCard from "@/components/AccountCard";
import TransactionList from "@/components/TransactionList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CreditCard, Download, PiggyBank } from "lucide-react";

const Dashboard = () => {
  const { accounts } = useBanking();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard!</h1>
        <p className="text-gray-600">Here's a summary of your accounts and recent activity.</p>
      </div>
      
      {/* Account Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="col-span-1 lg:col-span-2">
          <AccountCard accountId="acc1" className="h-full" />
        </div>
        
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-bank-accent rounded-lg p-5 flex-1">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => navigate("/transfer")}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight size={18} />
                Transfer
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Deposit
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <ArrowRight size={18} className="rotate-180" />
                Withdraw
              </Button>
              <Button
                onClick={() => navigate("/statements")}
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Statements
              </Button>
            </div>
          </div>
          
          <div className="bg-bank-light rounded-lg p-5 flex-1">
            <h3 className="text-lg font-semibold mb-3">Other Accounts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded border border-gray-200 flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <PiggyBank size={20} className="text-bank-secondary mr-2" />
                    <span className="font-medium">Savings Account</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    **** 4502
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$250,000.00</div>
                </div>
              </div>
              
              <div className="p-3 bg-white rounded border border-gray-200 flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <CreditCard size={20} className="text-bank-secondary mr-2" />
                    <span className="font-medium">Credit Card</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    **** 8912
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-red-500">-$3,250.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button
            variant="ghost"
            onClick={() => navigate("/statements")}
            className="text-bank-primary"
          >
            View All
          </Button>
        </div>
        <TransactionList limit={5} showHeading={false} />
      </div>
      
      {/* Notifications */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              You have pending transfer charges. Please complete your pending transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
