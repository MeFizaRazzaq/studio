"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/initFirebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createPortal } from "react-dom";
import { AuthModal } from "@/components/auth-modal";
import { Input } from "@/components/ui/input";



export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
const [loadingOrders, setLoadingOrders] = useState(true);

useEffect(() => {
  if (!user) return;

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await fetch(`/api/orders/${user.uid}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to fetch orders:", data.error);
        return;
      }

      setOrders(data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  fetchOrders();
}, [user]);


  // 🧠 Show login modal if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true);
    }
  }, [loading, user]);

  // 🧾 Fetch user Firestore data
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setUserData(snap.data());
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };
      fetchUserData();
    }
  }, [user]);

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Checking your account...
      </div>
    );
  }

  // 🚫 No user — show login modal
  if (!user) {
    return (
      <>
        {showAuthModal &&
          typeof window !== "undefined" &&
          createPortal(
            <AuthModal onClose={() => router.push("/")} />,
            document.body
          )}
      </>
    );
  }

  // ✅ Logged-in UI
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center md:text-left">
  <h1 className="text-4xl font-headline text-primary">
    Welcome Back,&nbsp;
    {user.displayName ? (
      <span className="capitalize">{user.displayName.split(" ")[0]} </span>
    ) : (
      "Account Details"
    )}
  </h1>
</div>


      <div className="grid gap-12 md:grid-cols-3">
        {/* Left: Orders */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View the status of your recent orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
  {loadingOrders ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        Loading orders...
      </TableCell>
    </TableRow>
  ) : orders.length > 0 ? (
    orders.map((order) => (
      <TableRow key={order.id}>
        <TableCell className="font-medium">{order.id}</TableCell>
        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell className="text-right">
          PKR {order.total_amount?.toFixed(2) || 0}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        No orders found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right: Account Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">{user.displayName || "User"}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                {userData?.address ? (
                  <address className="text-sm text-muted-foreground not-italic">
                    {userData.address.line1}
                    <br />
                    {userData.address.city}, {userData.address.postalCode}
                    <br />
                    {userData.address.country}
                  </address>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No address added yet.
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={async () => {
                  await signOut(auth);
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ✏️ Edit Profile Modal */}
      {showEditModal &&
        createPortal(
          <EditProfileModal
            user={user}
            userData={userData}
            onClose={() => setShowEditModal(false)}
            onSave={(updated) => setUserData(updated)}
          />,
          document.body
        )}
    </div>
  );
}

/* ===========================
   📦 Edit Profile Modal
=========================== */
interface EditProfileModalProps {
  user: any;
  userData: any;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

function EditProfileModal({ user, userData, onClose, onSave }: EditProfileModalProps) {

  const [form, setForm] = useState({
    line1: userData?.address?.line1 || "",
    city: userData?.address?.city || "",
    postalCode: userData?.address?.postalCode || "",
    country: userData?.address?.country || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { address: form });
      onSave({ ...userData, address: form });
      onClose();
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-background">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your shipping address below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Address Line"
            name="line1"
            value={form.line1}
            onChange={handleChange}
          />
          <Input
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <Input
            placeholder="Postal Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
          />
          <Input
            placeholder="Country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>,
    document.body
  );
}
