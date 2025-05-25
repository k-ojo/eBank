
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, LockKeyhole, UserCheck, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SecurityPage = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Security Center</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          At EverTrust Bank, your security is our top priority. We use advanced encryption and security protocols to safeguard your information.
        </p>
      </div>
      
      {/* Main Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Shield className="h-12 w-12 text-bank-primary mx-auto" />
            <CardTitle>Bank-Grade Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your data is secured with 256-bit encryption, the same level of security used by major financial institutions worldwide.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <LockKeyhole className="h-12 w-12 text-bank-primary mx-auto" />
            <CardTitle>Secure Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Every transaction is protected by multiple layers of security and monitored 24/7 for suspicious activity.
            </p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <UserCheck className="h-12 w-12 text-bank-primary mx-auto" />
            <CardTitle>Privacy Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              We never share your personal information with third parties without your explicit consent, in compliance with banking regulations.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Security Tips */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Security Tips</h2>
        
        <div className="bg-white rounded-lg shadow p-6 border">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Never Share Your Password</h3>
                <p className="text-gray-600">
                  EverTrust Bank will never ask for your complete password, PIN, or security codes via email, phone, or text message. Keep your credentials private at all times.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Always Log Out</h3>
                <p className="text-gray-600">
                  Remember to log out after using your online banking, especially when using public computers or shared devices. This prevents unauthorized access to your account.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Beware of Phishing Attempts</h3>
                <p className="text-gray-600">
                  Be cautious of unsolicited emails or messages asking for your banking information. Always verify by contacting us directly through our official channels.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Our Staff Will Never Ask for OTPs</h3>
                <p className="text-gray-600">
                  EverTrust Bank staff will never ask for your One-Time Passwords (OTPs) or transaction authorization codes. These should only be entered on our official website or app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Privacy Policy */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Privacy and Data Protection
            </CardTitle>
            <CardDescription>
              Key information on how we collect, use, and protect your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Information We Collect</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p className="mb-2">We collect personal information such as:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Contact information (name, address, phone number, email)</li>
                    <li>Financial information (account numbers, transaction history)</li>
                    <li>Identification information (ID numbers, social security number)</li>
                    <li>Website usage data (cookies, IP address, device information)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How We Use Your Information</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p className="mb-2">We use your information to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Process transactions and manage your accounts</li>
                    <li>Provide customer service and respond to inquiries</li>
                    <li>Prevent fraud and ensure account security</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Improve our services and develop new offerings</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Information Sharing</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p className="mb-2">We may share your information with:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Service providers that help us operate our business</li>
                    <li>Financial partners to process transactions</li>
                    <li>Regulatory authorities as required by law</li>
                    <li>Credit bureaus for account verification and fraud prevention</li>
                  </ul>
                  <p className="mt-2">We do not sell your personal information to third parties for marketing purposes.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Your Rights and Choices</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p className="mb-2">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate or incomplete information</li>
                    <li>Opt-out of certain marketing communications</li>
                    <li>Request deletion of your information where applicable</li>
                  </ul>
                  <p className="mt-2">To exercise these rights, please contact our customer support team.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                This is a simplified version of our privacy policy. For the complete policy, please contact customer support or visit any of our branch locations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Security Certifications */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Our Security Certifications</h2>
        
        <div className="bg-bank-accent rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-bank-primary" />
              </div>
              <h3 className="font-semibold mb-2">PCI DSS Compliant</h3>
              <p className="text-sm text-gray-600">
                Meets all Payment Card Industry Data Security Standards
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LockKeyhole className="h-8 w-8 text-bank-primary" />
              </div>
              <h3 className="font-semibold mb-2">ISO 27001 Certified</h3>
              <p className="text-sm text-gray-600">
                Adheres to international information security management standards
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-bank-primary" />
              </div>
              <h3 className="font-semibold mb-2">FDIC Insured</h3>
              <p className="text-sm text-gray-600">
                Deposits insured up to $250,000 per depositor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
