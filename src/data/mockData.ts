import { ItemCardProps, ItemType } from "@/components/ItemCard";
import { FundraiserCardProps } from "@/components/FundraiserCard";

export const categories = [
  "Textbooks",
  "School Supplies",
  "Electronics",
  "Sports Equipment",
  "Musical Instruments",
  "Art Supplies",
  "Uniforms",
  "Lab Equipment"
];

export const mockItems: ItemCardProps[] = [
  {
    id: "1",
    title: "Calculus Textbook - 10th Edition",
    description: "Like new condition, used for only one semester. No highlights or markings inside.",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Textbooks",
    type: "sale",
    seller: "Ms. Johnson"
  },
  {
    id: "2",
    title: "Scientific Calculator TI-84",
    description: "Perfect working condition, comes with batteries and cover case.",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Electronics",
    type: "sale",
    seller: "Alex Smith"
  },
  {
    id: "3",
    title: "Basketball - Official Size",
    description: "Slightly used basketball, still has good grip and bounce.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Sports Equipment",
    type: "exchange",
    seller: "Coach Wilson"
  },
  {
    id: "4",
    title: "Art Supply Bundle",
    description: "Set of acrylic paints, brushes, and sketchbook. Perfect for beginners.",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    category: "Art Supplies",
    type: "donation",
    seller: "Emma Green"
  },
  {
    id: "5",
    title: "Chemistry Lab Coat - Size M",
    description: "White lab coat in excellent condition. Required for AP Chemistry.",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Lab Equipment",
    type: "sale",
    seller: "Dr. Franklin"
  },
  {
    id: "6",
    title: "Recorder Instrument",
    description: "Barely used recorder from music class. Sanitized and ready for a new home.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "Musical Instruments",
    type: "donation",
    seller: "Music Department"
  }
];

export const mockFundraisers: FundraiserCardProps[] = [
  {
    id: "1",
    title: "Band Trip to State Competition",
    description: "Help our award-winning band travel to the state competition this spring. Funds will cover transportation, lodging, and meals for 45 students.",
    goalAmount: 5000,
    amountRaised: 3250,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    organizer: "Music Department",
    endDate: new Date(new Date().setDate(new Date().getDate() + 14)), // 14 days from now
    participants: 42
  },
  {
    id: "2",
    title: "New Science Lab Equipment",
    description: "Our science department needs updated microscopes and lab materials to enhance student learning experiences.",
    goalAmount: 3500,
    amountRaised: 1200,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    organizer: "Science Department",
    endDate: new Date(new Date().setDate(new Date().getDate() + 30)), // 30 days from now
    participants: 18
  },
  {
    id: "3",
    title: "School Library Book Drive",
    description: "Help us add 200 new books to our school library. Your donations will directly fund new literature for students of all ages.",
    goalAmount: 2000,
    amountRaised: 1850,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    organizer: "Library Club",
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)), // 10 days from now
    participants: 35
  }
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
}

export const currentUser: User = {
  id: "u1",
  name: "Alex Johnson",
  email: "alex.johnson@school.edu",
  role: "student",
  avatar: "https://i.pravatar.cc/150?u=alex"
};
