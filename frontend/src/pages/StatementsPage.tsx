
import { useState } from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Filter } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

interface FilterState {
  dateFrom: string;
  dateTo: string;
  transactionType: string;
  minAmount: string;
  maxAmount: string;
}

const StatementsPage = () => {
  const { transactions } = useBanking();
  
  const [activeTab, setActiveTab] = useState("statements");
  const [filter, setFilter] = useState<FilterState>({
    dateFrom: "",
    dateTo: "",
    transactionType: "all",
    minAmount: "",
    maxAmount: "",
  });
  
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFilter(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = () => {
    // In a real app, this would filter the transactions
    toast.success("Filters applied");
  };
  
  const resetFilters = () => {
    setFilter({
      dateFrom: "",
      dateTo: "",
      transactionType: "all",
      minAmount: "",
      maxAmount: "",
    });
    toast.info("Filters reset");
  };
  
  const downloadStatement = () => {
    // In a real app, this would download a PDF statement
    toast.success("Statement download initiated");
  };
  
  const viewReceipt = (transactionId: string) => {
    setSelectedReceipt(transactionId);
    setActiveTab("receipts");
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Statements & Receipts</h1>
      <p className="text-gray-600 mb-8">
        View and download your account activity
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px] mb-8">
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>
        
        {/* Statements Tab */}
        <TabsContent value="statements">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filter Panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="dateFrom">From Date</Label>
                    <Input
                      id="dateFrom"
                      name="dateFrom"
                      type="date"
                      value={filter.dateFrom}
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateTo">To Date</Label>
                    <Input
                      id="dateTo"
                      name="dateTo"
                      type="date"
                      value={filter.dateTo}
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="transactionType">Transaction Type</Label>
                    <Select 
                      value={filter.transactionType} 
                      onValueChange={(value) => handleSelectChange("transactionType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="credit">Credits Only</SelectItem>
                        <SelectItem value="debit">Debits Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="minAmount">Minimum Amount</Label>
                    <Input
                      id="minAmount"
                      name="minAmount"
                      type="number"
                      min="0"
                      value={filter.minAmount}
                      onChange={handleFilterChange}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="maxAmount">Maximum Amount</Label>
                    <Input
                      id="maxAmount"
                      name="maxAmount"
                      type="number"
                      min="0"
                      value={filter.maxAmount}
                      onChange={handleFilterChange}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button onClick={applyFilters} className="flex-1">
                      Apply Filters
                    </Button>
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Transactions List */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Transaction History</CardTitle>
                <Button variant="outline" onClick={downloadStatement} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-sm text-gray-500">
                        <th className="py-3 text-left font-medium">Date</th>
                        <th className="py-3 text-left font-medium">Description</th>
                        <th className="py-3 text-right font-medium">Amount</th>
                        <th className="py-3 text-right font-medium">Reference</th>
                        <th className="py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
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
                          <td className="py-3 text-right font-mono text-sm">
                            {transaction.reference}
                          </td>
                          <td className="py-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => viewReceipt(transaction.id)}
                              className="text-bank-primary"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Receipts Tab */}
        <TabsContent value="receipts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Transaction Receipt
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedReceipt ? (
                <div>
                  {/* Find the selected transaction */}
                  {(() => {
                    const transaction = transactions.find(t => t.id === selectedReceipt);
                    
                    if (!transaction) {
                      return (
                        <div className="text-center py-8">
                          <p>Receipt not found. Please select a valid transaction.</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="bg-white p-6 border rounded-lg max-w-2xl mx-auto">
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-bank-primary">EverTrust Bank</h3>
                          <p className="text-sm text-gray-500">Transaction Receipt</p>
                        </div>
                        
                        <div className="border-t border-b py-4 my-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Transaction Date</p>
                              <p className="font-medium">{transaction.date}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <p className={`font-medium ${
                                transaction.status === 'completed' 
                                  ? 'text-green-600' 
                                  : transaction.status === 'pending'
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Amount</p>
                              <p className={`font-medium ${
                                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {transaction.type === 'credit' ? '+' : '-'}
                                {formatCurrency(transaction.amount, 'USD')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Transaction Type</p>
                              <p className="font-medium">
                                {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Description</p>
                              <p className="font-medium">{transaction.description}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Reference Number</p>
                              <p className="font-medium font-mono">{transaction.reference}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-center">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2"
                            onClick={() => toast.success("Receipt download initiated")}
                          >
                            <Download className="h-4 w-4" />
                            Download Receipt
                          </Button>
                        </div>
                        
                        <div className="mt-8 text-center text-xs text-gray-500">
                          <p>This is an electronic receipt and does not require a signature.</p>
                          <p className="mt-1">For any queries, please contact customer support.</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Receipt Selected</h3>
                  <p className="text-gray-500 mb-4">
                    Please select a transaction from the Statements tab to view its receipt.
                  </p>
                  <Button variant="outline" onClick={() => setActiveTab("statements")}>
                    Go to Statements
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatementsPage;
