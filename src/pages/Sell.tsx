
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, DollarSign, ArrowLeftRight, HandHeart } from "lucide-react";
import { categories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Sell = () => {
  const { toast } = useToast();
  const [itemType, setItemType] = useState<"sale" | "exchange" | "donation">("sale");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exchangePreferences, setExchangePreferences] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call/processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Listing submitted successfully!",
        description: "Your item is now pending review and will be published soon.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create a New Listing</h1>
          <p className="text-muted-foreground mb-6">Fill out the form below to list your item.</p>
          
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>
                Provide clear information about your item to help others find it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Listing Type */}
                  <div>
                    <Label htmlFor="listing-type">Listing Type</Label>
                    <RadioGroup 
                      defaultValue="sale" 
                      value={itemType}
                      onValueChange={(value) => setItemType(value as "sale" | "exchange" | "donation")}
                      className="flex flex-col sm:flex-row gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sale" id="sale" />
                        <Label htmlFor="sale" className="flex items-center gap-1 cursor-pointer">
                          <DollarSign className="h-4 w-4" /> For Sale
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="exchange" id="exchange" />
                        <Label htmlFor="exchange" className="flex items-center gap-1 cursor-pointer">
                          <ArrowLeftRight className="h-4 w-4" /> For Exchange
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="donation" id="donation" />
                        <Label htmlFor="donation" className="flex items-center gap-1 cursor-pointer">
                          <HandHeart className="h-4 w-4" /> Free Donation
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Item Title */}
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Give your listing a clear title" required />
                  </div>
                  
                  {/* Item Category */}
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Item Description */}
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your item in detail (condition, features, etc.)" 
                      rows={5}
                      required
                    />
                  </div>
                  
                  {/* Price - Only shown for Sale type */}
                  {itemType === "sale" && (
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        min="0.01" 
                        step="0.01" 
                        placeholder="0.00"
                        required 
                      />
                    </div>
                  )}

                  {/* Exchange Preferences - Only shown for Exchange type */}
                  {itemType === "exchange" && (
                    <div>
                      <Label htmlFor="exchange-preferences">Exchange Preferences</Label>
                      <Textarea
                        id="exchange-preferences"
                        placeholder="What are you looking to exchange this item for? List specific items or categories you're interested in."
                        rows={3}
                        value={exchangePreferences}
                        onChange={(e) => setExchangePreferences(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Be specific about what you're willing to trade for. This helps potential exchangers know if their items match your interests.
                      </p>
                    </div>
                  )}
                  
                  {/* Item Photos */}
                  <div>
                    <Label>Photos</Label>
                    <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center bg-muted/50">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Drag photos here or click to upload</p>
                        <p className="text-xs text-muted-foreground mt-1">Upload up to 5 photos (PNG, JPG)</p>
                      </div>
                      <Input 
                        id="image-upload" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                      />
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit for Review"}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    All listings are subject to review before being published.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Sell;
