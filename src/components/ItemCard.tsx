
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowLeftRight, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";

export type ItemType = "sale" | "exchange" | "donation";

export interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  price?: number;
  image: string;
  category: string;
  type: ItemType;
  seller: string;
}

const ItemCard = ({ id, title, description, price, image, category, type, seller }: ItemCardProps) => {
  const getTypeIcon = () => {
    switch (type) {
      case "sale":
        return <DollarSign className="h-4 w-4" />;
      case "exchange":
        return <ArrowLeftRight className="h-4 w-4" />;
      case "donation":
        return <HandHeart className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "sale":
        return "bg-educycle-blue text-white";
      case "exchange":
        return "bg-educycle-yellow text-black";
      case "donation":
        return "bg-educycle-green text-white";
    }
  };

  const getTypeText = () => {
    switch (type) {
      case "sale":
        return "For Sale";
      case "exchange":
        return "For Exchange";
      case "donation":
        return "Free Donation";
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/item/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-2 left-2">
            <Badge className={getTypeColor()}>
              <span className="flex items-center gap-1">
                {getTypeIcon()}
                {getTypeText()}
              </span>
            </Badge>
          </div>
        </div>
      </Link>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Posted by {seller} • {category}
            </CardDescription>
          </div>
          {type === "sale" && price && (
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/item/${id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
        {type === "sale" && (
          <Button size="sm">Add to Cart</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
