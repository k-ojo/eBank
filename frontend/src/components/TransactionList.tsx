
import { useBanking } from "@/contexts/BankingContext";
import { formatCurrency } from "@/lib/utils";

interface TransactionListProps {
  limit?: number;
  showHeading?: boolean;
}

const TransactionList = ({ limit, showHeading = true }: TransactionListProps) => {
  const { transactions } = useBanking();
  
  // Limit the number of transactions shown if specified
  const displayedTransactions = limit 
    ? transactions.slice(0, limit) 
    : transactions;

  return (
    <div className="w-full">
      {showHeading && (
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="py-3 text-left font-medium">Date</th>
              <th className="py-3 text-left font-medium">Description</th>
              <th className="py-3 text-right font-medium">Amount</th>
              <th className="py-3 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-3 text-sm">{transaction.date}</td>
                <td className="py-3">{transaction.description}</td>
                <td 
                  className={`py-3 text-right ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}
                  {formatCurrency(transaction.amount, 'USD')}
                </td>
                <td className="py-3 text-right">
                  <span 
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
            
            {displayedTransactions.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
