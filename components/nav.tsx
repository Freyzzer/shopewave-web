"use client";

import { ShoppingBag, User, Search, Menu, X, Home, Grid3X3, LogOut } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AutocompleteSearch from "./search";
import { useAuth } from "@/context/auth-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
          {/* Logo + Nav Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground"
              aria-label="ShopWave home"
            >
              ShopWave
            </Link>
            <div className="hidden items-center gap-6 md:flex" role="menubar">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                role="menuitem"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                role="menuitem"
              >
                Products
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <AutocompleteSearch />

            <Link
              href="/cart"
              className="relative flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-muted"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center justify-center overflow-hidden rounded-full ring-2 ring-border transition-all hover:ring-foreground focus:outline-none focus:ring-foreground"
                    aria-label="User menu"
                  >
                    <Image
                      src={user.image}
                      alt={`${user.firstName || "User"} profile photo`}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full cursor-pointer">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-muted"
                aria-label="Sign in"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/cart"
              className="relative flex items-center justify-center rounded-full p-2 text-foreground"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-4 items-center py-1">
          <Link
            href="/"
            className="flex flex-col items-center gap-0.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Home"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>

          <Link
            href="/products"
            className="flex flex-col items-center gap-0.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Explore products"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">Explore</span>
          </Link>

          <Link
            href="/cart"
            className="relative flex flex-col items-center gap-0.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1/4 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-foreground text-[8px] font-medium text-background">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex flex-col items-center gap-0.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Account menu"
                >
                  <Image
                    src={user.image}
                    alt={`${user.firstName || "User"} profile`}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="text-[10px] font-medium">Account</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-2xl">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-left">My Account</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-destructive transition-colors hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Log out
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Link
              href="/login"
              className="flex flex-col items-center gap-0.5 py-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Sign in"
            >
              <User className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">Account</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
