
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBanking } from "@/contexts/BankingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { generateReferenceNumber } from "@/lib/utils";

const TransferPage = () => {
  const { accounts, createTransfer } = useBanking();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fromAccount: accounts[0]?.id || "",
    recipientName: "",
    recipientBank: "",
    accountNumber: "",
    amount: "",
    reason: "",
    transferType: "internal",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState(generateReferenceNumber());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fromAccount || !formData.recipientName || !formData.amount) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const amount = parseFloat(formData.amount);
      
      createTransfer(
        formData.fromAccount,
        formData.accountNumber,
        amount,
        formData.reason || `Transfer to ${formData.recipientName}`
      );
      
      toast.success("Transfer initiated successfully!");
      
      // Navigate to transaction summary to show the status
      navigate('/transaction-summary');
    } catch (error) {
      toast.error("Transfer failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Transfer Funds</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Transfer Details</CardTitle>
          <CardDescription>
            Complete the form below to transfer money to another account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* From Account */}
              <div>
                <Label htmlFor="fromAccount">From Account*</Label>
                <Select 
                  value={formData.fromAccount} 
                  onValueChange={(value) => handleSelectChange("fromAccount", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map(account => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.type} - {account.number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Transfer Type */}
              <div>
                <Label>Transfer Type*</Label>
                <RadioGroup 
                  defaultValue={formData.transferType}
                  onValueChange={(value) => handleSelectChange("transferType", value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="internal" id="internal" />
                    <Label htmlFor="internal" className="cursor-pointer">Internal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="external" id="external" />
                    <Label htmlFor="external" className="cursor-pointer">External</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Recipient Name */}
              <div>
                <Label htmlFor="recipientName">Recipient Name*</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Enter recipient's name"
                />
              </div>
              
              {/* Recipient Bank (only for external transfers) */}
              {formData.transferType === "external" && (
                <div>
                  <Label htmlFor="recipientBank">Recipient Bank*</Label>
                  <Select 
                    value={formData.recipientBank} 
                    onValueChange={(value) => handleSelectChange("recipientBank", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ghana-commercial">Ghana Commercial Bank</SelectItem>
                      <SelectItem value="ecobank">Ecobank</SelectItem>
                      <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                      <SelectItem value="zenith">Zenith Bank</SelectItem>
                      <SelectItem value="access">Access Bank</SelectItem>
                      <SelectItem value="other">Other Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Account Number */}
              <div>
                <Label htmlFor="accountNumber">Account Number*</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter recipient's account number"
                />
              </div>
              
              {/* Amount */}
              <div>
                <Label htmlFor="amount">Amount ($)*</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
              
              {/* Reason */}
              <div>
                <Label htmlFor="reason">Reason for Transfer</Label>
                <Input
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Business Payment, Gift, etc."
                />
              </div>
              
              {/* Reference Number */}
              <div>
                <Label htmlFor="referenceNumber">Reference Number</Label>
                <Input
                  id="referenceNumber"
                  value={referenceNumber}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Transfer Funds"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-sm text-gray-500">
          <p>
            Note: Transfers to external banks may take 1-3 business days to process.
            Internal transfers are usually processed immediately.
          </p>
          <p>
            A fee of 2.5% may apply for international transfers.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransferPage;
