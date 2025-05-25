
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useBanking } from "@/contexts/BankingContext";
import { CreditCard, Lock, History, Plus, Shield } from "lucide-react";

const CardsPage = () => {
  const { cards } = useBanking();
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleCardDetails = () => {
    setShowCardDetails(prev => !prev);
  };

  const handleSetPin = async () => {
    if (!pin || pin.length !== 4 || !/^\d+$/.test(pin)) {
      toast.error("Please enter a valid 4-digit PIN");
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("PIN updated successfully");
      setPin("");
    } catch (error) {
      toast.error("Failed to update PIN. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const requestNewCard = async () => {
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Card request submitted successfully. Your new card will be delivered in 7-10 business days.");
    } catch (error) {
      toast.error("Failed to submit card request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Manage Your Cards</h1>
      <p className="text-gray-600 mb-8">
        View and manage your debit and credit cards
      </p>
      
      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px] mb-8">
          <TabsTrigger value="cards">My Cards</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* My Cards Tab */}
        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Card */}
            {cards.map(card => (
              <div key={card.id} className="bank-card p-6 overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm opacity-80">EverTrust Bank</p>
                    <p className="text-xs opacity-70 mt-1">{card.type}</p>
                  </div>
                  <div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.1"/>
                      <path d="M28 16H12V18H28V16ZM29 24V22H27V24H29ZM27 26H25V28H27V26ZM25 24H23V26H25V24ZM23 26H21V28H23V26ZM21 24H19V26H21V24ZM19 26H17V28H19V26ZM17 24H15V26H17V24ZM15 26H13V28H15V26ZM14 24H12V22H10V24H12V26H10V28H12V30H14V28H16V30H18V28H20V30H22V28H24V30H26V28H28V30H30V28H28V26H30V24H28V22H30V20H12V22H14V24Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                
                <div className="mb-10">
                  <p className="text-sm font-medium opacity-80">Card Number</p>
                  <p className="text-xl font-mono tracking-wider">
                    {showCardDetails ? "4532 8912 3456 7890" : card.number}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs opacity-80">Valid Thru</p>
                    <p className="font-medium">{card.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">CVV</p>
                    <p className="font-medium">{showCardDetails ? "123" : card.cvv}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Status</p>
                    <p className="font-medium capitalize">{card.status}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Card Actions */}
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Options</CardTitle>
                  <CardDescription>
                    Manage your card settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={toggleCardDetails} 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {showCardDetails ? "Hide Card Details" : "Show Card Details"}
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Set Card PIN
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Your Card PIN</DialogTitle>
                        <DialogDescription>
                          Enter a 4-digit PIN to secure your card transactions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="pin">New PIN (4 digits)</Label>
                          <Input
                            id="pin"
                            type="password"
                            maxLength={4}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="••••"
                          />
                        </div>
                        <Button 
                          onClick={handleSetPin} 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Setting PIN..." : "Set PIN"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.success("Card temporarily locked")}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Lock Card Temporarily
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Request New Card</CardTitle>
                  <CardDescription>
                    Apply for a new card or replace an existing one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Request a new card if you need an additional card or want to replace your current one.
                  </p>
                  <Button 
                    className="w-full"
                    onClick={requestNewCard}
                    disabled={isLoading}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {isLoading ? "Processing..." : "Request New Card"}
                  </Button>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  A $10 card issuance fee may apply for replacement cards.
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-bank-primary" />
                  Card Transaction History
                </CardTitle>
                <CardDescription>
                  View recent transactions made with your card
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-sm text-gray-500">
                      <th className="py-3 text-left font-medium">Date</th>
                      <th className="py-3 text-left font-medium">Merchant</th>
                      <th className="py-3 text-left font-medium">Category</th>
                      <th className="py-3 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 text-sm">2023-05-18</td>
                      <td className="py-3">Amazon.com</td>
                      <td className="py-3 text-sm">Shopping</td>
                      <td className="py-3 text-right text-red-600">-$129.99</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 text-sm">2023-05-15</td>
                      <td className="py-3">Starbucks</td>
                      <td className="py-3 text-sm">Dining</td>
                      <td className="py-3 text-right text-red-600">-$5.75</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 text-sm">2023-05-12</td>
                      <td className="py-3">Netflix</td>
                      <td className="py-3 text-sm">Entertainment</td>
                      <td className="py-3 text-right text-red-600">-$14.99</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 text-sm">2023-05-10</td>
                      <td className="py-3">Shell Gas Station</td>
                      <td className="py-3 text-sm">Automotive</td>
                      <td className="py-3 text-right text-red-600">-$45.33</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 text-sm">2023-05-07</td>
                      <td className="py-3">Walmart</td>
                      <td className="py-3 text-sm">Groceries</td>
                      <td className="py-3 text-right text-red-600">-$87.22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-bank-primary" />
                  Card Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security options for your card
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Online Purchases</h3>
                      <p className="text-sm text-gray-500">Allow card for online transactions</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-green-100 hover:bg-green-200 text-green-700 border-green-200"
                      onClick={() => toast.info("Online purchases setting updated")}
                    >
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">International Transactions</h3>
                      <p className="text-sm text-gray-500">Allow card use outside your country</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-red-100 hover:bg-red-200 text-red-700 border-red-200"
                      onClick={() => toast.info("International transactions setting updated")}
                    >
                      Disabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Contactless Payments</h3>
                      <p className="text-sm text-gray-500">Allow tap-to-pay functionality</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-green-100 hover:bg-green-200 text-green-700 border-green-200"
                      onClick={() => toast.info("Contactless payments setting updated")}
                    >
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">ATM Withdrawals</h3>
                      <p className="text-sm text-gray-500">Allow cash withdrawals from ATMs</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-green-100 hover:bg-green-200 text-green-700 border-green-200"
                      onClick={() => toast.info("ATM withdrawals setting updated")}
                    >
                      Enabled
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-bank-primary" />
                  Spending Limits
                </CardTitle>
                <CardDescription>
                  Set daily and monthly limits for your card
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="dailyLimit">Daily Purchase Limit</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="dailyLimit"
                      defaultValue="2000"
                      className="w-36"
                    />
                    <Button 
                      size="sm"
                      onClick={() => toast.success("Daily limit updated")}
                    >
                      Update
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="atmLimit">Daily ATM Withdrawal Limit</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="atmLimit"
                      defaultValue="500"
                      className="w-36"
                    />
                    <Button 
                      size="sm"
                      onClick={() => toast.success("ATM limit updated")}
                    >
                      Update
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="monthlyLimit">Monthly Spending Limit</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input
                      id="monthlyLimit"
                      defaultValue="10000"
                      className="w-36"
                    />
                    <Button 
                      size="sm"
                      onClick={() => toast.success("Monthly limit updated")}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Changes to limits may take up to 24 hours to reflect.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardsPage;
