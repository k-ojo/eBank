
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Get in touch with our support team or visit our branch
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-bank-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-gray-600">+233 55 123 4567</p>
                  <p className="text-sm text-gray-500 mt-1">
                    For general inquiries and support
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-bank-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@evertrustbank.com</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-bank-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">WhatsApp</h3>
                  <p className="text-gray-600">+233 55 123 4567</p>
                  <p className="text-sm text-gray-500 mt-1">
                    For quick assistance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-bank-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Main Branch</h3>
                  <p className="text-gray-600">
                    Ever Trust Bank<br />
                    1 Trust Lane, East Legon<br />
                    Accra, Ghana
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-bank-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday–Friday: 8am – 6pm</p>
                    <p>Saturday: 9am – 2pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Map placeholder */}
          <div className="mt-6 rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-center p-4">
              <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Interactive Map</p>
              <p className="text-sm">1 Trust Lane, East Legon, Accra</p>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject*</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message*</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 text-sm text-gray-500">
              <p>
                We value your privacy. Any information you provide will be handled in accordance with our privacy policy.
              </p>
              <p>
                For urgent matters, please call our 24/7 support line directly.
              </p>
            </CardFooter>
          </Card>
          
          {/* FAQ Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">How can I reset my online banking password?</h3>
                <p className="text-gray-600">
                  You can reset your password by clicking the "Forgot Password" link on the login page or by contacting our customer support.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">What documents do I need to open an account?</h3>
                <p className="text-gray-600">
                  You'll need a valid ID (passport, driver's license), proof of address, and proof of income for most account types.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">How long does a wire transfer take?</h3>
                <p className="text-gray-600">
                  Domestic transfers typically process within 1 business day. International transfers may take 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
