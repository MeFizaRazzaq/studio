"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/firebase/initFirebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ✅ New field
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 🚫 Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        // ✅ Existing user login
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back 👋" });
      } else {
        // ✅ Register new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        // ✅ Update Firebase Auth display name
        await updateProfile(user, {
          displayName: username,
        });

        // ✅ Add user info to Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: username,
          provider: "password",
          address: {
            line1: "",
            city: "",
            postalCode: "",
            country: "",
          },
          createdAt: serverTimestamp(),
        });

        toast({ title: "Account created successfully 🎉" });
      }

      onClose();
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div
          key="modal"
          onClick={(e) => e.stopPropagation()}
          className="relative bg-background rounded-2xl shadow-2xl border border-border/30 w-[90%] max-w-md p-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          {/* ❌ Close button */}
          <button
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-headline text-primary mb-3">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-foreground/60 mb-6 text-sm">
            {mode === "login"
              ? "Sign in to your Haus of Meem account."
              : "Join our community of modern artisans."}
          </p>

          {/* Form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {mode === "register" && (
              <Input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="mt-2" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </Button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-sm text-foreground/70">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-primary hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
