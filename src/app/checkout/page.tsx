"use client";

import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/initFirebase";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { user } = useAuth();

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    line1: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  // Prefill shipping info from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const fullName = data.name || user.displayName || "";
        const [firstName, ...rest] = fullName.split(" ");
        const lastName = rest.join(" ");

        setShipping({
          firstName,
          lastName,
          line1: data.address?.line1 || "",
          city: data.address?.city || "",
          postalCode: data.address?.postalCode || "",
          country: data.address?.country || "",
        });
      }
    };
    fetchUserData();
  }, [user]);

  const handleChangeShipping = (e: any) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleChangePayment = (e: any) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!user) return alert("Please log in first!");

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return alert("User data not found!");
      const userData = userSnap.data();

      // Optional: validate payment info (basic)
      if (!payment.cardNumber || !payment.expiry || !payment.cvc) {
        return alert("Please fill all payment details.");
      }

      const payload = {
        total_amount: totalPrice,
        user_id: user.uid,
        user_name: userData.name || user.displayName,
        email: userData.email || user.email,
        shipping_address: shipping,
        payment_details: payment, // send payment info along
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Order failed:", result);
        return alert(`Failed to place order: ${result.error || "Unknown error"}`);
      }

      clearCart();
      alert(`Order placed successfully! Order ID: ${result.orderId}`);
      router.push("/account");
    } catch (err: any) {
      console.error("Order placement error:", err);
      alert(`Failed to place order: ${err.message}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Please log in to checkout.
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Shipping & Payment */}
        <div className="space-y-8">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    value={shipping.firstName}
                    onChange={handleChangeShipping}
                    name="firstName"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    value={shipping.lastName}
                    onChange={handleChangeShipping}
                    name="lastName"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Sparkle St"
                  value={shipping.line1}
                  onChange={handleChangeShipping}
                  name="line1"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={shipping.city}
                    onChange={handleChangeShipping}
                    name="city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="10001"
                    value={shipping.postalCode}
                    onChange={handleChangeShipping}
                    name="postalCode"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="USA"
                  value={shipping.country}
                  onChange={handleChangeShipping}
                  name="country"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="**** **** **** 1234"
                  value={payment.cardNumber}
                  onChange={handleChangePayment}
                  name="cardNumber"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={payment.expiry}
                    onChange={handleChangePayment}
                    name="expiry"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={payment.cvc}
                    onChange={handleChangePayment}
                    name="cvc"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                        <Image
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          PKR {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      PKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">Your cart is empty.</p>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>PKR {totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handlePlaceOrder}
            size="lg"
            className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Place Order
          </Button>
        </div>
      </div>
    </main>
  );
}
