
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export interface FundraiserCardProps {
  id: string;
  title: string;
  description: string;
  goalAmount: number;  // Changed from goal to goalAmount
  amountRaised: number; // Changed from raised to amountRaised
  image: string;
  organizer: string;
  endDate: Date;
  participants: number; // Added participants field
}

const FundraiserCard = ({ id, title, description, goalAmount, amountRaised, image, organizer, endDate }: FundraiserCardProps) => {
  const progress = Math.min((amountRaised / goalAmount) * 100, 100);
  const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/fundraisers/${id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Organized by {organizer} • {daysLeft} days left
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-3">{description}</p>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm">
          <span className="font-medium">${amountRaised.toLocaleString()}</span>
          <span className="text-muted-foreground">of ${goalAmount.toLocaleString()}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/fundraisers/${id}`} className="w-full">
          <Button className="w-full">Support This Cause</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FundraiserCard;
