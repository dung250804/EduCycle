
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, AlertTriangle, Star, UserCheck } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/user";

// Mock user data (replace with actual data when connected to backend)
const mockUser: User = {
  user_id: "1",
  name: "John Smith",
  email: "john@example.com",
  role: "Member",
  reputation_score: 75,
  violation_count: 0,
  rating: 4.5,
  status: "Active",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
};

const Profile = () => {
  const [user] = useState<User>(mockUser);

  const transactions = [
    {
      id: 1,
      type: "Sale",
      item: "Physics Textbook",
      date: "2024-04-20",
      amount: "$45.00",
      status: "Completed"
    },
    {
      id: 2,
      type: "Donation",
      item: "School Supplies Bundle",
      date: "2024-04-15",
      amount: "-",
      status: "Completed"
    },
    {
      id: 3,
      type: "Fundraiser",
      item: "Science Lab Equipment",
      date: "2024-04-10",
      amount: "$25.00",
      status: "In Progress"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="container py-8 flex-1">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">{user.role}</Badge>
                <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.rating}/5.0</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
                <Award className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.reputation_score}/100</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Violations</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.violation_count}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{user.status}</div>
              </CardContent>
            </Card>
          </div>

          {/* Activity List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {transaction.type === "Donation" ? (
                            <Heart className="h-4 w-4 text-red-500" />
                          ) : transaction.type === "Fundraiser" ? (
                            <Coins className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <ShoppingBag className="h-4 w-4 text-blue-500" />
                          )}
                          {transaction.type}
                        </div>
                      </TableCell>
                      <TableCell>{transaction.item}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
