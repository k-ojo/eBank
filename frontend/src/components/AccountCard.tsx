
import { formatCurrency } from "@/lib/utils";
import { useBanking } from "@/contexts/BankingContext";

interface AccountCardProps {
  accountId: string;
  className?: string;
}

const AccountCard = ({ accountId, className = "" }: AccountCardProps) => {
  const { getAccountById } = useBanking();
  const account = getAccountById(accountId);

  if (!account) return null;

  return (
    <div className={`bank-card p-5 ${className}`}>
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium opacity-80">Account Type</h3>
          <p className="text-lg font-semibold">{account.type}</p>
        </div>
        <div className="text-right">
          <h3 className="text-sm font-medium opacity-80">Balance</h3>
          <p className="text-lg font-semibold">{formatCurrency(account.balance, account.currency)}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium opacity-80">Account Number</h3>
        <p className="text-lg font-mono tracking-wider">{account.number}</p>
      </div>
      
      <div className="mt-6 flex justify-between items-end">
        <div>
          <p className="text-xs opacity-70">EverTrust Bank</p>
        </div>
        <div className="text-right">
          <p className="text-xs opacity-70">Active</p>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
