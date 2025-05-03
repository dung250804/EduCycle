
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeftRight, 
  DollarSign, 
  HandHeart, 
  MapPin, 
  Calendar,
  MessageSquare,
  User,
  Share
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Post, ItemType } from "@/types/user";

// Mock item data (replace with actual data fetching when connected to backend)
const mockItems: Post[] = [
  {
    post_id: "1",
    seller_id: "1",
    title: "Algebra Textbook - 10th Grade",
    description: "Excellent condition textbook for 10th grade algebra. Minimal highlighting and notes.",
    price: 25,
    type: "Liquidation",
    product_type: "Textbook",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1603344204980-4edb0ea63dc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRleHRib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Mathematics"
  },
  {
    post_id: "2",
    seller_id: "2",
    title: "Chemistry Lab Equipment Set",
    description: "Complete set of basic chemistry lab equipment including test tubes, beakers, and safety goggles.",
    price: 50,
    type: "Liquidation",
    product_type: "Lab Equipment",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZW1pc3RyeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    category: "Science"
  },
  {
    post_id: "3",
    seller_id: "1",
    title: "World History Textbook",
    description: "World History textbook covering ancient civilizations to modern times. Perfect for high school students.",
    price: 0,
    type: "Exchange",
    product_type: "Textbook",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1583330620425-d577d0453155?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGlzdG9yeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    category: "History"
  },
  {
    post_id: "4",
    seller_id: "3",
    title: "School Supplies Bundle",
    description: "Bundle of school supplies including notebooks, pens, pencils, and folders. Donating to students in need.",
    price: 0,
    type: "Donation",
    product_type: "School Supplies",
    status: "Approved",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2Nob29sJTIwc3VwcGxpZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    category: "Supplies"
  }
];

const mockSellers = [
  {
    user_id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "Member",
    reputation_score: 95,
    violation_count: 0,
    rating: 4.8,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    user_id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    role: "Member",
    reputation_score: 88,
    violation_count: 0,
    rating: 4.5,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
  },
  {
    user_id: "3",
    name: "Education Foundation",
    email: "foundation@edu.org",
    role: "Representative",
    reputation_score: 100,
    violation_count: 0,
    rating: 5.0,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Foundation"
  }
];

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");
  
  // Find the item with the matching ID
  const item = mockItems.find(item => item.post_id === id);
  
  // If no item is found, display a not found message
  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="container flex-1 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <p className="mb-8">The item you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse">
            <Button>Return to Browsing</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Find the seller for this item
  const seller = mockSellers.find(seller => seller.user_id === item.seller_id);
  
  const getTypeIcon = () => {
    switch (item.type) {
      case "Liquidation":
        return <DollarSign className="h-5 w-5" />;
      case "Exchange":
        return <ArrowLeftRight className="h-5 w-5" />;
      case "Donation":
        return <HandHeart className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case "Liquidation":
        return "bg-educycle-blue text-white";
      case "Exchange":
        return "bg-educycle-yellow text-black";
      case "Donation":
        return "bg-educycle-green text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeText = () => {
    switch (item.type) {
      case "Liquidation":
        return "For Sale";
      case "Exchange":
        return "For Exchange";
      case "Donation":
        return "Free Donation";
      default:
        return item.type;
    }
  };

  const handleContactSeller = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${seller?.name}!`,
    });
    setMessage("");
    setShowContactModal(false);
  };

  const handleItemAction = () => {
    if (item.type === "Liquidation") {
      toast({
        title: "Purchase Started",
        description: "Proceeding to checkout...",
      });
    } else if (item.type === "Exchange") {
      toast({
        title: "Exchange Requested",
        description: "Your exchange request has been sent!",
      });
    } else if (item.type === "Donation") {
      toast({
        title: "Donation Claimed",
        description: "You have successfully claimed this donation!",
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="container py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground flex items-center mb-4">
            ← Back to browsing
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left side - Item Image */}
            <div className="md:col-span-2">
              <div className="relative rounded-lg overflow-hidden h-[400px] mb-6">
                <img 
                  src={item.image || "/placeholder.svg"} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getTypeColor()}>
                    <span className="flex items-center gap-1">
                      {getTypeIcon()}
                      {getTypeText()}
                    </span>
                  </Badge>
                </div>
              </div>
              
              {/* Item details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">{item.title}</h1>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <span>{item.product_type}</span>
                    <span className="mx-2">•</span>
                    <span>{item.category}</span>
                    <span className="mx-2">•</span>
                    <span>Status: {item.status}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {item.type === "Liquidation" && (
                    <div className="text-2xl font-bold">${item.price.toFixed(2)}</div>
                  )}
                  <div className="flex">
                    <Button onClick={handleItemAction} className="mr-2">
                      {item.type === "Liquidation" ? "Buy Now" : 
                       item.type === "Exchange" ? "Request Exchange" : "Claim Donation"}
                    </Button>
                    <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact Seller
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contact {seller?.name}</DialogTitle>
                          <DialogDescription>
                            Send a message to the seller about this item.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="font-medium">About: {item.title}</div>
                          </div>
                          <Textarea
                            placeholder="Write your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-32"
                          />
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setShowContactModal(false)}>Cancel</Button>
                          <Button onClick={handleContactSeller}>Send Message</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-sm text-muted-foreground">Campus Main Building</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium">Posted Date</h3>
                        <p className="text-sm text-muted-foreground">May 1, 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Seller info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the {item.type === "Donation" ? "Donor" : "Seller"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {seller && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={seller.avatar} 
                            alt={seller.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{seller.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{seller.role}</span>
                            <span className="mx-1">•</span>
                            <span>Rating: {seller.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full" onClick={() => setShowContactModal(true)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>

                      <Link to={`/profile`} className="block w-full">
                        <Button variant="outline" className="w-full">
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Related items from the same seller */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">More from this {item.type === "Donation" ? "Donor" : "Seller"}</h2>
                <div className="space-y-4">
                  {mockItems
                    .filter(relatedItem => relatedItem.seller_id === item.seller_id && relatedItem.post_id !== item.post_id)
                    .slice(0, 2)
                    .map(relatedItem => (
                      <Link to={`/post/${relatedItem.post_id}`} key={relatedItem.post_id} className="block">
                        <div className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedItem.image || "/placeholder.svg"} 
                              alt={relatedItem.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium line-clamp-1">{relatedItem.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-1">{relatedItem.product_type}</p>
                            {relatedItem.type === "Liquidation" && (
                              <p className="font-bold mt-1">${relatedItem.price.toFixed(2)}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ItemDetails;
