
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Camera, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { checkPasswordStrength } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const backendUrl = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    dob: "",
    password: "",
    confirmPassword: "",
    referralCode: ""
  });

  const [passwordStrength, setPasswordStrength] = useState({
    strength: "weak",
    color: "bg-gray-200",
    message: "Enter a password",
    score: 0
  });

  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [passportPhotoFile, setPassportPhotoFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [passportPhotoPreview, setPassportPhotoPreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [currentCapture, setCurrentCapture] = useState<"id" | "passport" | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const europeanCountries = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
    "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
    "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
    "Slovenia", "Spain", "Sweden"
  ];

  const availableCountries = ["United States", "Canada", ...europeanCountries];

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(checkPasswordStrength(formData.password));
    } else {
      setPasswordStrength({
        strength: "weak",
        color: "bg-gray-200",
        message: "Enter a password",
        score: 0
      });
    }
  }, [formData.password]);

  useEffect(() => {
    // Clean up camera resources when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({ ...prev, country: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'passport') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);

      if (type === 'id') {
        setIdCardFile(file);
        setIdCardPreview(previewUrl);
      } else {
        setPassportPhotoFile(file);
        setPassportPhotoPreview(previewUrl);
      }
    }
  };

  const startCamera = async (type: 'id' | 'passport') => {
    setCurrentCapture(type);
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Unable to access camera. Please check your permissions.");
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
    setCurrentCapture(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && currentCapture) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${currentCapture}-photo.jpg`, { type: 'image/jpeg' });
            const previewUrl = URL.createObjectURL(blob);

            if (currentCapture === 'id') {
              setIdCardFile(file);
              setIdCardPreview(previewUrl);
            } else {
              setPassportPhotoFile(file);
              setPassportPhotoPreview(previewUrl);
            }

            stopCamera();
            toast.success(`${currentCapture === 'id' ? 'ID Card' : 'Passport Photo'} captured successfully!`);
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, country, password, confirmPassword, phone } = formData;

    // Validation
    if (!fullName || !email || !password || !country || !phone || !formData.dob) {
      toast.error("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!idCardFile) {
      toast.error("Please upload or capture your ID card");
      return;
    }

    if (!passportPhotoFile) {
      toast.error("Please upload or capture your passport-style photo");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call delay
      const data = new FormData();

      // Append all form fields
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("dob", formData.dob);
      data.append("country", formData.country);
      data.append("password", formData.password);
      data.append("confirmPassword", formData.confirmPassword);
      if (formData.referralCode) {
        data.append("referralCode", formData.referralCode);
      }

      // Append files
      data.append("idCardFile", idCardFile);
      data.append("passportPhotoFile", passportPhotoFile);


      const response = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        body: data,
        // Note: DO NOT set Content-Type header manually with multipart/form-data
      });

      if (!response.ok) {
        const errorText = await response.text(); // or await response.json();
        console.log("Server response error:", errorText);
        throw new Error(errorText || "Registration failed");
      }

      const result = await response.json();

      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>
              Enter your details to open a new bank account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name*</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number*</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth*</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Select onValueChange={handleCountryChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Create Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  {/* Password strength indicator */}
                  <div className="space-y-1 mt-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{passwordStrength.message}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password*</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* ID Card Upload Section */}
              <div className="space-y-2 border p-4 rounded-lg">
                <Label>ID Card Upload/Capture*</Label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center w-full sm:w-1/2 h-40">
                    {idCardPreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={idCardPreview}
                          alt="ID Card Preview"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-0 right-0"
                          onClick={() => {
                            setIdCardFile(null);
                            setIdCardPreview(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="mb-2 text-gray-500" />
                        <p className="text-sm text-center text-gray-500">
                          Upload or capture a photo of your ID card
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2">
                    <div className="flex items-center justify-center">
                      <Input
                        id="idCardUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'id')}
                      />
                      <Label
                        htmlFor="idCardUpload"
                        className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
                      >
                        <Upload size={16} />
                        Upload
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => startCamera('id')}
                      className="flex items-center gap-2"
                    >
                      <Camera size={16} />
                      Capture
                    </Button>
                  </div>
                </div>
              </div>

              {/* Passport Photo Upload Section */}
              <div className="space-y-2 border p-4 rounded-lg">
                <Label>Passport Photo Upload/Capture*</Label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center w-full sm:w-1/2 h-40">
                    {passportPhotoPreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={passportPhotoPreview}
                          alt="Passport Photo Preview"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-0 right-0"
                          onClick={() => {
                            setPassportPhotoFile(null);
                            setPassportPhotoPreview(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="mb-2 text-gray-500" />
                        <p className="text-sm text-center text-gray-500">
                          Upload or capture your passport-style photo
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2">
                    <div className="flex items-center justify-center">
                      <Input
                        id="passportPhotoUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'passport')}
                      />
                      <Label
                        htmlFor="passportPhotoUpload"
                        className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90"
                      >
                        <Upload size={16} />
                        Upload
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => startCamera('passport')}
                      className="flex items-center gap-2"
                    >
                      <Camera size={16} />
                      Capture
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code (optional)</Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  placeholder="Enter code if you have one"
                  value={formData.referralCode}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Login
              </Link>
            </div>
            <div className="text-xs text-center text-gray-500">
              By creating an account, you agree to our{" "}
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

      {/* Camera Dialog */}
      <Dialog open={isCameraOpen} onOpenChange={(open) => {
        if (!open) stopCamera();
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentCapture === 'id' ? 'Capture ID Card' : 'Capture Passport Photo'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex justify-center">
              <Button onClick={capturePhoto} className="px-8">
                Capture
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterPage;
