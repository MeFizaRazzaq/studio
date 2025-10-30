"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/initFirebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back 👋" });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white/90 dark:bg-neutral-900/90 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center border border-border/30 backdrop-blur-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-foreground/60 hover:text-foreground"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-headline text-primary mb-4">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-foreground/60 mb-6 text-sm">
            {mode === "login"
              ? "Sign in to your Haus of Meem account."
              : "Join our community of modern artisans."}
          </p>

          {/* Form */}
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
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
            <Button type="submit" className="mt-2 w-full" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </Button>
          </form>

          {/* Switch Mode */}
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
