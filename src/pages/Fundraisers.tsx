
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FundraiserCard from "@/components/FundraiserCard";
import { mockFundraisers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Fundraisers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFundraisers = mockFundraisers.filter((fundraiser) => {
    return (
      fundraiser.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      fundraiser.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fundraiser.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">School Fundraisers</h1>
            <p className="text-muted-foreground mt-1">Support important causes at our school</p>
          </div>
          
          <div className="w-full md:w-auto">
            <Input
              placeholder="Search fundraisers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
          </div>
        </div>
        
        {/* Banner/CTA for starting a fundraiser */}
        <div className="bg-educycle-blue/10 rounded-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-medium">Have a cause you care about?</h2>
            <p className="text-muted-foreground">Teachers and student clubs can start fundraising campaigns.</p>
          </div>
          <Button>Start a Fundraiser</Button>
        </div>
        
        {filteredFundraisers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFundraisers.map((fundraiser) => (
              <FundraiserCard key={fundraiser.id} {...fundraiser} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium">No fundraisers found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search query.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Fundraisers;
