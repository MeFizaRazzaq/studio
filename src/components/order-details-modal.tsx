// src/components/order-details-modal.tsx
"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, Package, MapPin, User, Calendar } from "lucide-react";
import Image from "next/image";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
}

export default function OrderDetailsModal({ 
  order, 
  open, 
  onOpenChange,
  customerName 
}: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    switch (statusLower) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "prepared":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "arrived":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Order Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-semibold font-mono">{order.id}</p>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-sm px-3 py-1`}>
              {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{customerName || order.customer_name || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{order.customer_email || "N/A"}</p>
              </div>
              {order.is_guest && (
                <div className="col-span-2">
                  <Badge variant="outline" className="text-xs">Guest Order</Badge>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Date */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Order Date
            </h3>
            <p className="text-sm">
              {order.created_at 
                ? new Date(order.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : "N/A"}
            </p>
          </div>

          <Separator />

          {/* Payment Information */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              {order.payment_method === "card" ? (
                <CreditCard className="h-4 w-4" />
              ) : (
                <Banknote className="h-4 w-4" />
              )}
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium capitalize">
                  {order.payment_method === "cod" ? "Cash on Delivery" : "Card Payment"}
                </p>
              </div>
              {order.payment_method === "card" && order.card_details && (
                <div>
                  <p className="text-muted-foreground">Card</p>
                  <p className="font-medium">
                    **** **** **** {order.card_details.last_four}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          {order.shipping_address && (
            <>
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </h3>
                <div className="text-sm bg-muted/30 p-4 rounded-md">
                  <p className="font-medium">{order.shipping_address.street}</p>
                  <p>
                    {order.shipping_address.city}
                    {order.shipping_address.state && `, ${order.shipping_address.state}`}
                    {order.shipping_address.zip && ` ${order.shipping_address.zip}`}
                  </p>
                  <p>{order.shipping_address.country}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Order Items ({order.items?.length || 0})
            </h3>
            <div className="space-y-3">
              {order.items?.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-md bg-muted/20">
                  {item.image && (
                    <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      PKR {item.price?.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right font-medium">
                    PKR {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Total */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-primary">
              PKR {order.total_amount?.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
