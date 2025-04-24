
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockFundraisers } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  Award,
  DollarSign,
  HandHeart
} from "lucide-react";

const FundraiserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [donationType, setDonationType] = useState<"items" | "money">("items");
  const [donationAmount, setDonationAmount] = useState(10);
  const [donationDescription, setDonationDescription] = useState("");
  const [donationCompleted, setDonationCompleted] = useState(false);
  const [donationCode, setDonationCode] = useState("");
  
  // Find the fundraiser with the matching ID
  const fundraiser = mockFundraisers.find(f => f.id === id);
  
  if (!fundraiser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="container flex-1 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Fundraiser Not Found</h1>
          <p className="mb-8">The fundraiser you're looking for doesn't exist or has been removed.</p>
          <Link to="/fundraisers">
            <Button>Return to Fundraisers</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const percentage = Math.min(100, Math.round((fundraiser.amountRaised / fundraiser.goalAmount) * 100));
  
  const handleSubmitDonation = () => {
    // In a real app, this would submit to a backend
    // Generate a random donation code
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setDonationCode(randomCode);
    setDonationCompleted(true);
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation code is ${randomCode}. Please use this when delivering your donation.`,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Fundraiser details */}
          <div className="flex-1">
            <Link to="/fundraisers" className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-4">
              ← Back to all fundraisers
            </Link>
            
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{fundraiser.title}</h1>
              <p className="text-muted-foreground">Organized by {fundraiser.organizer}</p>
            </div>
            
            <div className="mb-6">
              <img 
                src={fundraiser.image} 
                alt={fundraiser.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About This Fundraiser</h2>
              <p className="mb-4">{fundraiser.description}</p>
              <p>
                This fundraiser aims to help our school community by raising funds for important resources. 
                Your contribution, no matter how small, will make a significant impact.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Dates</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()} - {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Participants</h3>
                  <p className="text-sm text-muted-foreground">{fundraiser.participants} people have contributed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-muted-foreground">School Main Hall & Online</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Status</h3>
                  <p className="text-sm text-muted-foreground">Active - Accepting donations</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Progress and donation */}
          <div className="lg:w-96">
            <div className="border rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Progress</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">${fundraiser.amountRaised}</span>
                  <span className="text-muted-foreground">Goal: ${fundraiser.goalAmount}</span>
                </div>
                <Progress value={percentage} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">{percentage}% of our goal</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{fundraiser.participants} supporters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>14 days left</span>
                  </div>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mb-4">Participate Now</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  {!donationCompleted ? (
                    <>
                      <DialogHeader>
                        <DialogTitle>Support this Fundraiser</DialogTitle>
                        <DialogDescription>
                          Choose how you'd like to participate in this fundraiser.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <Button
                          type="button" 
                          variant={donationType === "money" ? "default" : "outline"}
                          onClick={() => setDonationType("money")}
                          className="flex flex-col h-auto py-6 gap-2"
                        >
                          <DollarSign className="h-6 w-6" />
                          <div className="text-sm">Donate Money</div>
                        </Button>
                        <Button
                          type="button"
                          variant={donationType === "items" ? "default" : "outline"}
                          onClick={() => setDonationType("items")}
                          className="flex flex-col h-auto py-6 gap-2"
                        >
                          <HandHeart className="h-6 w-6" />
                          <div className="text-sm">Donate Items</div>
                        </Button>
                      </div>
                      
                      {donationType === "money" ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Donation Amount ($)</label>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                              {[5, 10, 25].map((amount) => (
                                <Button
                                  key={amount}
                                  type="button"
                                  variant={donationAmount === amount ? "default" : "outline"}
                                  onClick={() => setDonationAmount(amount)}
                                  className="h-10"
                                >
                                  ${amount}
                                </Button>
                              ))}
                            </div>
                            <Input 
                              type="number" 
                              value={donationAmount} 
                              onChange={(e) => setDonationAmount(Number(e.target.value))} 
                              className="mt-2"
                              min="1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Add a message (optional)</label>
                            <Textarea 
                              placeholder="Write a message of support"
                              className="mt-1"
                              value={donationDescription}
                              onChange={(e) => setDonationDescription(e.target.value)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Type of item(s) to donate</label>
                            <Input 
                              placeholder="Books, clothing, school supplies, etc."
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea 
                              placeholder="Brief description of the items you'll be donating"
                              className="mt-1"
                              value={donationDescription}
                              onChange={(e) => setDonationDescription(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                      
                      <DialogFooter>
                        <Button onClick={handleSubmitDonation}>
                          {donationType === "money" ? "Complete Donation" : "Get Donation Code"}
                        </Button>
                      </DialogFooter>
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle>Thank You for Your Support!</DialogTitle>
                        <DialogDescription>
                          Your donation will help our school community.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-6 flex flex-col items-center justify-center">
                        <div className="mb-4">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto">
                            <Award className="h-8 w-8 text-educycle-green" />
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-medium text-center mb-2">
                          {donationType === "money" ? "Donation Completed!" : "Your Donation Code"}
                        </h3>
                        
                        {donationType === "items" && (
                          <div className="mb-6 text-center">
                            <div className="text-2xl font-bold mb-2 tracking-wide text-educycle-blue">{donationCode}</div>
                            <p className="text-sm text-muted-foreground">
                              Present this code when delivering your donation to the collection point
                            </p>
                          </div>
                        )}
                        
                        <p className="text-center text-sm">
                          {donationType === "money" 
                            ? "Your donation of $" + donationAmount + " has been processed. Thank you for your support!"
                            : "Please bring your donation to the Main Hall during school hours (8am-3pm)."
                          }
                        </p>
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          onClick={() => setDonationCompleted(false)}
                          variant="outline"
                          className="w-full"
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="w-full">Share This Fundraiser</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FundraiserDetails;
