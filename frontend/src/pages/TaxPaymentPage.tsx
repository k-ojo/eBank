
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ArrowLeft, CreditCard, AlertTriangle, Phone, MessageCircle, Mail } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const TaxPaymentPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [supportContact, setSupportContact] = useState({
    email: "",
    phone: "",
    message: ""
  });
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    paymentMethod: "credit-card"
  });

  // Example tax amount - in a real app this would come from the transaction
  const taxAmount = 125.50;
  const transactionAmount = 5000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSupportContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSupportContact(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitSupport = () => {
    if (!supportContact.email && !supportContact.phone) {
      toast.error("Please provide at least an email or phone number");
      return;
    }
    
    // Here you would typically send this to your support system
    console.log("Support contact submitted:", supportContact);
    toast.success("Your contact information has been submitted. Our support team will reach out to you shortly.");
    setShowFailureDialog(false);
    setSupportContact({ email: "", phone: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate payment processing with potential failure
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment failure (for demonstration)
      const paymentSuccess = Math.random() > 0.3; // 70% chance of failure for demo
      
      if (paymentSuccess) {
        toast.success("Tax payment successful! Your transaction will now proceed.");
        navigate('/transaction-summary');
      } else {
        setShowFailureDialog(true);
      }
    } catch (error) {
      setShowFailureDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Tax Payment Required</h1>
          <p className="text-gray-600 mt-1">Complete tax payment to proceed with your transaction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Amount:</span>
                <span className="font-semibold">{formatCurrency(transactionAmount, 'USD')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax Amount:</span>
                <span className="font-semibold text-red-600">{formatCurrency(taxAmount, 'USD')}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Due:</span>
                <span className="text-red-600">{formatCurrency(taxAmount, 'USD')}</span>
              </div>
              
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription className="text-sm">
                  Tax payment is required by law for international transfers above $1,000. 
                  Your transaction will be processed immediately after payment.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Customer Care Support */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Need Help?</CardTitle>
              <CardDescription>
                Our customer care team is here to assist you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">24/7 Support</p>
                  <p className="text-sm text-gray-600">+233 55 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Live Chat</p>
                  <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/contact')}>
                    Start chat now
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="font-medium text-sm">Email Support</p>
                  <p className="text-sm text-gray-600">support@evertrustbank.com</p>
                </div>
              </div>
              
              <Alert className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Transaction Support</AlertTitle>
                <AlertDescription className="text-xs">
                  If your transaction is taking too long or you need verification assistance, please call our support line at +233 55 123 4567 for immediate help.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Enter your payment details to complete the tax payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="debit-card">Debit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(formData.paymentMethod === 'credit-card' || formData.paymentMethod === 'debit-card') && (
                  <>
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name*</Label>
                      <Input
                        id="cardholderName"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number*</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date*</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV*</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          type="password"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </>
                )}

                {formData.paymentMethod === 'bank-transfer' && (
                  <Alert>
                    <AlertDescription>
                      Bank transfer instructions will be provided after confirming this payment method. 
                      Processing may take 1-3 business days.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700" 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? "Processing Payment..." : `Pay Tax ${formatCurrency(taxAmount, 'USD')}`}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Your payment is secured with 256-bit SSL encryption. 
                  We do not store your card details on our servers.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Failure Dialog */}
      <AlertDialog open={showFailureDialog} onOpenChange={setShowFailureDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Payment Failed
            </AlertDialogTitle>
            <AlertDialogDescription>
              We're sorry, but your tax payment could not be processed at this time. 
              Please leave your contact information and our support team will help you resolve this issue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="supportEmail">Email Address</Label>
              <Input
                id="supportEmail"
                name="email"
                type="email"
                value={supportContact.email}
                onChange={handleSupportContactChange}
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="supportPhone">Phone Number (Optional)</Label>
              <Input
                id="supportPhone"
                name="phone"
                type="tel"
                value={supportContact.phone}
                onChange={handleSupportContactChange}
                placeholder="+1 234 567 8900"
              />
            </div>
            
            <div>
              <Label htmlFor="supportMessage">Additional Message (Optional)</Label>
              <textarea
                id="supportMessage"
                name="message"
                value={supportContact.message}
                onChange={handleSupportContactChange}
                placeholder="Describe any issues you're experiencing..."
                className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitSupport} className="bg-red-600 hover:bg-red-700">
              Submit Contact Info
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TaxPaymentPage;
