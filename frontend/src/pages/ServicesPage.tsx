import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Banknote, Home, TrendingUp, Briefcase, CreditCard, PiggyBank, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CurrencyTicker from "@/components/CurrencyTicker";

const ServicesPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Our Services</h1>
      <p className="text-gray-600 mb-8">
        Explore our comprehensive range of financial services designed to meet your needs.
      </p>
      
      <CurrencyTicker />
      
      <div className="mt-8">
        <Tabs defaultValue="loans" className="w-full">
          <TabsList className="grid grid-cols-4 md:w-[600px] mb-8">
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="other">Other Services</TabsTrigger>
          </TabsList>
          
          {/* Loans Tab */}
          <TabsContent value="loans" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Personal Loan</CardTitle>
                  </div>
                  <CardDescription>
                    Flexible funding for your personal needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Borrow up to $100,000</li>
                    <li>Competitive interest rates from 8.5% p.a.</li>
                    <li>Flexible repayment terms up to 5 years</li>
                    <li>No collateral required for qualified applicants</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Business Loan</CardTitle>
                  </div>
                  <CardDescription>
                    Capital to grow your business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Loans from $25,000 to $2 million</li>
                    <li>Interest rates from 9.0% p.a.</li>
                    <li>Repayment terms up to 10 years</li>
                    <li>Flexible collateral options</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Mortgage Loan</CardTitle>
                  </div>
                  <CardDescription>
                    Finance your dream home
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Financing up to 90% of property value</li>
                    <li>Fixed and variable rate options</li>
                    <li>Terms up to 30 years</li>
                    <li>Special rates for first-time homebuyers</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Investments Tab */}
          <TabsContent value="investments" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Fixed Deposit</CardTitle>
                  </div>
                  <CardDescription>
                    Secure returns on your investment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Interest rates up to 7% p.a.</li>
                    <li>Terms from 3 months to 5 years</li>
                    <li>Minimum deposit of $1,000</li>
                    <li>Option for interest payout or reinvestment</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Learn More</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Stocks & Bonds</CardTitle>
                  </div>
                  <CardDescription>
                    Grow your wealth through market investments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Access to domestic and international markets</li>
                    <li>Professional portfolio management available</li>
                    <li>Regular market insights and analysis</li>
                    <li>Low transaction fees for bank customers</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Invest Now</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Retirement Planning</CardTitle>
                  </div>
                  <CardDescription>
                    Secure your financial future
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Tailored retirement savings plans</li>
                    <li>Tax-advantaged investment options</li>
                    <li>Regular performance reviews</li>
                    <li>Expert financial advice</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Planning</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Accounts Tab */}
          <TabsContent value="accounts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Checking Accounts</CardTitle>
                  </div>
                  <CardDescription>
                    Everyday banking made simple
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>No monthly maintenance fees</li>
                    <li>Free unlimited transactions</li>
                    <li>Online and mobile banking access</li>
                    <li>Debit card with worldwide acceptance</li>
                    <li>24/7 customer support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Open Account</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Savings Accounts</CardTitle>
                  </div>
                  <CardDescription>
                    Grow your savings with competitive rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>High-interest savings options</li>
                    <li>No minimum balance requirements</li>
                    <li>Automatic savings plans available</li>
                    <li>Goal-based savings tools</li>
                    <li>FDIC insured up to $250,000</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Open Account</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Other Services Tab */}
          <TabsContent value="other" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Currency Exchange</CardTitle>
                  </div>
                  <CardDescription>
                    Competitive exchange rates for major currencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">Current exchange rates to USD:</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>USD 1.00</span>
                        <span className="font-medium">USD 13.20</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EUR 1.00</span>
                        <span className="font-medium">USD 14.55</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GBP 1.00</span>
                        <span className="font-medium">USD 16.80</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Exchange Currency</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Agent Accounts</CardTitle>
                  </div>
                  <CardDescription>
                    We hold funds for third-party clearance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Our agent accounts allow secure handling of funds for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Real estate transactions</li>
                    <li>Business acquisitions</li>
                    <li>International trade settlements</li>
                    <li>Legal settlements and escrow</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Learn More</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-bank-primary" />
                    <CardTitle>Financial Advisory</CardTitle>
                  </div>
                  <CardDescription>
                    Expert guidance for your financial journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li>Personalized financial planning</li>
                    <li>Wealth management strategies</li>
                    <li>Retirement planning</li>
                    <li>Tax optimization advice</li>
                    <li>Estate planning services</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Consultation</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-16 bg-bank-accent p-8 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-6">
            Our financial experts are ready to help you find the perfect banking solutions for your unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline">Schedule a Call</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
