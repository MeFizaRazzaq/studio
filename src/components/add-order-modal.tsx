// src/components/add-order-modal.tsx
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Trash2, CreditCard, Banknote } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface User {
  id: string;
  name?: string;
  email?: string;
  addresses?: Array<{
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  price: number;
  images?: Array<{ url: string }>;
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface AddOrderModalProps {
  onAdd: (order: any) => void;
  users: User[];
  trigger?: React.ReactNode;
}

export default function AddOrderModal({ onAdd, users, trigger }: AddOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [useCustomEmail, setUseCustomEmail] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [status, setStatus] = useState("pending");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  // Address fields
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Pakistan"
  });
  
  // Card details fields
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const statusOptions = ["pending", "prepared", "shipped", "arrived", "canceled", "returned"];

  // Fetch products when modal opens
  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  // Auto-fill address when user is selected
  useEffect(() => {
    if (selectedUserId && !useCustomEmail) {
      const selectedUser = users.find(u => u.id === selectedUserId);
      if (selectedUser?.addresses && selectedUser.addresses.length > 0) {
        const addr = selectedUser.addresses[0];
        setShippingAddress({
          street: addr.street || "",
          city: addr.city || "",
          state: addr.state || "",
          zip: addr.zip || "",
          country: addr.country || "Pakistan"
        });
      } else {
        // Reset if no address
        setShippingAddress({
          street: "",
          city: "",
          state: "",
          zip: "",
          country: "Pakistan"
        });
      }
    }
  }, [selectedUserId, users, useCustomEmail]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log("Fetched products:", data);
      if (res.ok) {
        setProducts(data.products || data || []);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const resetForm = () => {
    setSelectedUserId("");
    setUseCustomEmail(false);
    setCustomEmail("");
    setCustomName("");
    setStatus("pending");
    setPaymentMethod("cod");
    setItems([]);
    setShippingAddress({
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "Pakistan"
    });
    setCardDetails({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: ""
    });
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const addItem = () => {
    setItems([...items, { productId: "", name: "", price: 0, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newItems = [...items];
      newItems[index] = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: newItems[index].quantity || 1,
        image: product.images?.[0]?.url
      };
      setItems(newItems);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, quantity);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async () => {
    // Validate customer
    if (!useCustomEmail && !selectedUserId) {
      alert("Please select a customer or add a custom email.");
      return;
    }

    if (useCustomEmail && !customEmail) {
      alert("Please enter a customer email.");
      return;
    }

    if (items.length === 0 || items.some(item => !item.productId)) {
      alert("Please add at least one product to the order.");
      return;
    }

    // Validate shipping address for COD
    if (paymentMethod === "cod") {
      if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zip) {
        alert("Please enter complete shipping address for Cash on Delivery.");
        return;
      }
    }

    // Validate card details for card payment
    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert("Please enter complete card details for Card Payment.");
        return;
      }
    }

    setLoading(true);

    try {
      // Filter out items without product IDs and log them
      const validItems = items.filter(item => item.productId);
      const invalidItems = items.filter(item => !item.productId);
      
      if (invalidItems.length > 0) {
        console.warn("⚠️ Found items without product IDs:", invalidItems);
      }
      
      const orderData = {
        user_id: useCustomEmail ? `guest_${Date.now()}` : selectedUserId,
        customer_email: useCustomEmail ? customEmail : users.find(u => u.id === selectedUserId)?.email,
        customer_name: useCustomEmail ? customName : users.find(u => u.id === selectedUserId)?.name,
        is_guest: useCustomEmail,
        status,
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
        card_details: paymentMethod === "card" ? {
          last_four: cardDetails.cardNumber.slice(-4),
          card_holder: cardDetails.cardHolder,
          expiry: cardDetails.expiryDate
        } : null,
        items: validItems.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || ""
        })),
        total_amount: calculateTotal()
      };
      
      console.log("📦 Creating order with data:", orderData);

      await onAdd(orderData);
      resetForm();
      setOpen(false);
    } catch (err: any) {
      console.error("Error adding order:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDisplayName = (user: User) => {
    return user.name || user.email?.split("@")[0] || "Unknown";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Add Order</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6 py-4">
            {/* Customer Selection */}
            <div className="space-y-3">
              <Label>Customer *</Label>
              
              {/* Toggle between existing customer and custom email */}
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant={!useCustomEmail ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseCustomEmail(false)}
                >
                  Existing Customer
                </Button>
                <Button
                  type="button"
                  variant={useCustomEmail ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseCustomEmail(true)}
                >
                  New Customer
                </Button>
              </div>

              {!useCustomEmail ? (
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {getUserDisplayName(user)} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="customName" className="text-sm text-muted-foreground">Customer Name</Label>
                    <Input
                      id="customName"
                      type="text"
                      placeholder="Enter customer name"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customEmail" className="text-sm text-muted-foreground">Customer Email *</Label>
                    <Input
                      id="customEmail"
                      type="email"
                      placeholder="Enter customer email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <Label>Payment Method *</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer font-normal">
                    <Banknote className="h-4 w-4" />
                    Cash on Delivery
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer font-normal">
                    <CreditCard className="h-4 w-4" />
                    Card Payment
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Shipping Address - Always shown for COD, optional for Card */}
            {paymentMethod === "cod" && (
              <div className="space-y-3 p-4 border rounded-md bg-muted/20">
                <Label className="flex items-center gap-2">
                  <Banknote className="h-4 w-4" />
                  Shipping Address *
                </Label>
                {shippingAddress.street && shippingAddress.city ? (
                  <p className="text-sm text-muted-foreground mb-2">
                    ✓ Address auto-filled from customer profile. You can edit if needed.
                  </p>
                ) : null}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="street" className="text-sm text-muted-foreground">Street Address *</Label>
                    <Input
                      id="street"
                      placeholder="Street address"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-sm text-muted-foreground">City *</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm text-muted-foreground">State/Province</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-sm text-muted-foreground">ZIP/Postal Code *</Label>
                    <Input
                      id="zip"
                      placeholder="ZIP Code"
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm text-muted-foreground">Country</Label>
                    <Input
                      id="country"
                      placeholder="Country"
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Card Details - Only shown for Card Payment */}
            {paymentMethod === "card" && (
              <div className="space-y-3 p-4 border rounded-md bg-muted/20">
                <Label className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Card Details *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="cardNumber" className="text-sm text-muted-foreground">Card Number *</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardDetails({ ...cardDetails, cardNumber: value });
                      }}
                      maxLength={16}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="cardHolder" className="text-sm text-muted-foreground">Cardholder Name *</Label>
                    <Input
                      id="cardHolder"
                      placeholder="Name on card"
                      value={cardDetails.cardHolder}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate" className="text-sm text-muted-foreground">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length >= 2) {
                          value = value.slice(0, 2) + '/' + value.slice(2, 4);
                        }
                        setCardDetails({ ...cardDetails, expiryDate: value });
                      }}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm text-muted-foreground">CVV *</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setCardDetails({ ...cardDetails, cvv: value });
                      }}
                      maxLength={4}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Note: Only the last 4 digits will be stored for reference.
                </p>

                {/* Also ask for shipping address for card payments */}
                <div className="mt-4 pt-4 border-t">
                  <Label className="text-sm mb-2 block">Shipping Address</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <Input
                        placeholder="Street address"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      />
                    </div>
                    <Input
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                    <Input
                      placeholder="ZIP Code"
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Status Selection */}
            <div className="space-y-2">
              <Label htmlFor="status">Order Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {statusOptions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Order Items *</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addItem}
                  disabled={loadingProducts}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {loadingProducts ? "Loading..." : "Add Item"}
                </Button>
              </div>

              {loadingProducts ? (
                <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">
                  Loading products...
                </p>
              ) : items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">
                  No items added. Click "Add Item" to add products.
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-md bg-muted/30">
                      <div className="flex-1">
                        <Select 
                          value={item.productId} 
                          onValueChange={(value) => updateItem(index, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px] bg-background">
                            {products.length === 0 ? (
                              <SelectItem value="_no_products" disabled>
                                No products available
                              </SelectItem>
                            ) : (
                              products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name} - PKR {product.price?.toLocaleString()}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-24">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                          placeholder="Qty"
                        />
                      </div>
                      <div className="w-32 text-right font-medium">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Total */}
            {items.length > 0 && (
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-lg font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-primary">
                  PKR {calculateTotal().toLocaleString()}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
