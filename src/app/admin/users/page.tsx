"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users as UsersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type OrderStats = {
  totalOrders: number;
  totalReceived: number;
  totalPending: number;
};

type UserWithStats = {
  id: string;
  name?: string;
  email?: string;
  is_admin?: boolean;
  orderStats: OrderStats;
};

export default function UsersManager() {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsersAndOrders() {
      try {
        setLoading(true);
        
        // Fetch users and orders in parallel
        const [usersRes, ordersRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/orders")
        ]);
        
        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();
        
        if (!usersRes.ok) throw new Error(usersData.error || "Failed to fetch users");
        
        const usersList = usersData.users || [];
        const ordersList = ordersData.orders || [];
        
        // Calculate order stats per user
        const usersWithStats: UserWithStats[] = usersList.map((user: any) => {
          const userOrders = ordersList.filter((order: any) => order.user_id === user.id);
          
          const pendingStatuses = ["pending", "processing", "prepared"];
          const receivedStatuses = ["shipped", "arrived", "delivered"];
          
          const totalOrders = userOrders.length;
          const totalReceived = userOrders
            .filter((order: any) => receivedStatuses.includes(order.status?.toLowerCase()))
            .reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
          const totalPending = userOrders
            .filter((order: any) => pendingStatuses.includes(order.status?.toLowerCase()))
            .reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
          
          return {
            ...user,
            orderStats: {
              totalOrders,
              totalReceived,
              totalPending
            }
          };
        });
        
        setUsers(usersWithStats);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsersAndOrders();
  }, []);


  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">Customers</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            All Customers
          </CardTitle>
          <CardDescription>View and manage all registered users.</CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading users...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => {
                    const username = user.name || user.email?.split("@")[0] || "User";
                    const isAdmin = user.is_admin ?? false;

                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{username}</div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={isAdmin ? "default" : "secondary"}>
                            {isAdmin ? "Admin" : "User"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{user.orderStats.totalOrders}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-medium">
                          PKR {user.orderStats.totalReceived.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right text-amber-600 font-medium">
                          PKR {user.orderStats.totalPending.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
