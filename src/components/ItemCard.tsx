
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import type { Post } from "@/types/user";

export interface ItemCardProps extends Post {}

const ItemCard = ({ post_id, title, description, price, type, product_type, status, image }: ItemCardProps) => {
  const getTypeIcon = () => {
    switch (type) {
      case "Liquidation":
        return <DollarSign className="h-4 w-4" />;
      case "Exchange":
        return <ArrowLeftRight className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "Liquidation":
        return "bg-educycle-blue text-white";
      case "Exchange":
        return "bg-educycle-yellow text-black";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getTypeText = () => {
    switch (type) {
      case "Liquidation":
        return "For Sale";
      case "Exchange":
        return "For Exchange";
      default:
        return type;
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/post/${post_id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image || "/placeholder.svg"} 
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
              {product_type} • {status}
            </CardDescription>
          </div>
          {type === "Liquidation" && price && (
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/post/${post_id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
        {type === "Liquidation" && status === "Approved" && (
          <Button size="sm">Buy Now</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
