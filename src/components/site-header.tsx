"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, User, ShoppingBag } from "lucide-react";
import { CartSheet } from "./cart-sheet";
import { Logo } from "./logo";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./auth-modal";
import SearchModal from "./search-modal";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/initFirebase";
import { useState } from "react";
import { createPortal } from "react-dom";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

const handleProfileClick = async () => {
  if (!user) {
    // 🧠 No user? → Open Login Modal
    setShowAuthModal(true);
  } else {
    // ✅ Logged in → Go to account page
    window.location.href = "/account";
  }
};


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Left: Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-2 ml-auto">
            <Button variant="ghost" size="icon" onClick={() => setShowSearchModal(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* 🔥 Profile Icon */}
            <Button variant="ghost" size="icon" onClick={handleProfileClick}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>

            {/* 🛒 Cart */}
            <CartSheet>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </CartSheet>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal open={showSearchModal} onOpenChange={setShowSearchModal} />

      {/* Auth Modal in Portal */}
      {showAuthModal &&
        typeof window !== "undefined" &&
        createPortal(
          <AuthModal onClose={() => setShowAuthModal(false)} />,
          document.body
        )}
    </>
  );
}
