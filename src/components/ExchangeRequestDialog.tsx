
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/data/mockData";

interface ExchangeRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipientId: string;
  itemId: string;
  itemName: string;
}

const ExchangeRequestDialog = ({
  isOpen,
  onClose,
  recipientId,
  itemId,
  itemName
}: ExchangeRequestDialogProps) => {
  const { toast } = useToast();
  const [itemDetails, setItemDetails] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setItemDetails((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Validate form
    if (!itemDetails.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive",
      });
      return;
    }

    if (!itemDetails.category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }

    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please upload an image of your item",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to submit exchange request
    setTimeout(() => {
      toast({
        title: "Exchange request sent!",
        description: `Your exchange request for "${itemName}" has been sent to the trader.`,
      });
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1500);
  };

  const resetForm = () => {
    setItemDetails({
      name: "",
      description: "",
      category: "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Exchange</DialogTitle>
          <DialogDescription>
            Provide details about the item you want to exchange for "{itemName}".
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input
              id="item-name"
              name="name"
              value={itemDetails.name}
              onChange={handleInputChange}
              placeholder="What item are you offering?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={itemDetails.category} onValueChange={handleSelectChange} required>
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

          <div className="space-y-2">
            <Label htmlFor="description">Item Details</Label>
            <Textarea
              id="description"
              name="description"
              value={itemDetails.description}
              onChange={handleInputChange}
              placeholder="Describe your item's condition, age, features, etc."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Item Image</Label>
            <div className="border-2 border-dashed rounded-md p-4">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Item preview" 
                    className="mx-auto max-h-40 object-contain rounded" 
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Upload an image of your item</span>
                  <span className="text-xs text-muted-foreground mt-1">Accepted formats: JPG, PNG</span>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Exchange Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeRequestDialog;
