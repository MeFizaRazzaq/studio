"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AddOrderModal from "@/components/add-order-modal";
import OrderDetailsModal from "@/components/order-details-modal";

export default function OrdersManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const statusOptions = ["pending", "prepared", "shipped", "arrived", "canceled", "returned"];

  // Fetch orders and users from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/users")
      ]);
      
      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();
      
      if (!ordersRes.ok) throw new Error(ordersData.error || "Failed to fetch orders");
      
      // Create a map of user_id -> user name
      const userNameMap: Record<string, string> = {};
      const usersList = usersData.users || [];
      usersList.forEach((user: any) => {
        userNameMap[user.id] = user.name || user.email?.split("@")[0] || "Unknown";
      });
      
      setUsers(usersList);
      setUsersMap(userNameMap);
      setOrders(ordersData.orders || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new order
  const handleAddOrder = async (orderData: any) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to create order");
    }

    // Refresh orders list
    await fetchData();
  };


  // Update order status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update order");
      }

      // Update local state
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status");
    }
  };

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  if (loading) return <p className="text-muted-foreground">Loading orders...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">Orders</h1>
        <AddOrderModal 
          onAdd={handleAddOrder} 
          users={users}
          trigger={<Button variant="outline">Add Order</Button>}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow 
              key={order.id}
              onClick={() => handleRowClick(order)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{usersMap[order.user_id] || order.user_id}</TableCell>
              <TableCell>
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Select
                  value={order.status?.toLowerCase() || "pending"}
                  onValueChange={(val) => updateOrderStatus(order.id, val)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">PKR {order.total_amount?.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        customerName={selectedOrder ? usersMap[selectedOrder.user_id] : undefined}
      />
    </div>
  );
}
