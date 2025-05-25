
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";

const TransactionSummaryPage = () => {
  const { transactions } = useBanking();
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">COMPLETED</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">PENDING</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">DENIED</Badge>;
      default:
        return <Badge variant="secondary">UNKNOWN</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Transaction Summary</h1>
          <p className="text-gray-600 mt-1">Overview of all your transactions and their current status</p>
        </div>
      </div>

      <div className="grid gap-6">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <CardTitle className="text-lg">{transaction.description}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>Reference: {transaction.reference}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(transaction.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Amount</p>
                  <p className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount, 'USD')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Transaction Type</p>
                  <p className="text-lg font-medium capitalize">{transaction.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    <span className="text-lg font-medium capitalize">{transaction.status}</span>
                  </div>
                </div>
              </div>
              
              {transaction.status === 'pending' && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-medium">⚠️ Action Required</p>
                  <p className="text-yellow-700 text-sm mt-1">
                    This transaction requires tax payment to proceed. 
                    <Button 
                      variant="link" 
                      className="p-0 ml-1 text-yellow-800 underline h-auto"
                      onClick={() => navigate('/tax-payment')}
                    >
                      Pay tax now
                    </Button>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {transactions.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">No transactions found</p>
              <Button className="mt-4" onClick={() => navigate('/transfer')}>
                Make Your First Transfer
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TransactionSummaryPage;
