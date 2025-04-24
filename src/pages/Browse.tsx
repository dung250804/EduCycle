
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ItemCard, { ItemType } from "@/components/ItemCard";
import CategoryFilter from "@/components/CategoryFilter";
import { mockItems, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Exchange, HandHeart, DollarSign } from "lucide-react";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ItemType | null>(null);
  
  const filteredItems = mockItems.filter((item) => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType ? item.type === selectedType : true;
    
    return matchesCategory && matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Browse Items</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Search</h2>
                <div className="relative">
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
              />
              
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Item Type</h2>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={selectedType === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(null)}
                    className="justify-start"
                  >
                    All Types
                  </Button>
                  <Button
                    variant={selectedType === "sale" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("sale")}
                    className="justify-start"
                  >
                    <DollarSign className="h-4 w-4 mr-2" /> For Sale
                  </Button>
                  <Button
                    variant={selectedType === "exchange" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("exchange")}
                    className="justify-start"
                  >
                    <Exchange className="h-4 w-4 mr-2" /> For Exchange
                  </Button>
                  <Button
                    variant={selectedType === "donation" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType("donation")}
                    className="justify-start"
                  >
                    <HandHeart className="h-4 w-4 mr-2" /> Free Donation
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium">No items found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Browse;
