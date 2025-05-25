
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const backendUrl = import.meta.env.VITE_API_URL;


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      toast.error("Please enter both email and password");
      return;
    }

    // Check for minimum password length
    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Extract error message from backend
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // Store token for authenticated requests later
      localStorage.setItem("access_token", data.access_token);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <img
                src="/lovable-uploads/25b73466-b415-413c-abf2-336293f7b52e.png"
                alt="Britfield Bank Logo"
                className="h-12 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold">Login to Your Account</CardTitle>
            <CardDescription>
              Enter your email and password to access your Britfield Bank account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email or Account Number</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/security"
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                Sign up
              </Link>
            </div>
            <div className="text-xs text-center text-gray-500">
              By logging in, you agree to our{" "}
              <Link to="/security" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/security" className="underline">
                Privacy Policy
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
