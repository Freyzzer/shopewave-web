"use client";

import { ShoppingCartIcon, User2Icon } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
import { Button } from "./ui/button";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky w-full min-w-full ">
        <article className="flex items-center justify-between py-3">
          {/* Logo */}
          <section className="flex gap-6 items-center ">
            <Link
              href="/"
              className="cursor-pointer text-2xl font-bold text-[#567e86]"
            >
              ShopWave
            </Link>
            <div className="max-md:hidden">
              <ol className="flex font-semibold gap-4 text-gray-700 md:flex">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
              </ol>
            </div>
          </section>

          {/* Desktop menu */}
          <section className="hidden md:flex items-center gap-6 max-md:hidden">
            <AutocompleteSearch />
            <Link
              className="cursor-pointer text-gray-700 hover:text-blue-600 relative"
              href="/cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute left-5 -top-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

            <section className="cursor-pointer text-gray-700 hover:text-blue-600 max-md:hidden">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Image
                      src={user.image}
                      alt="user profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link
                          href="/profile"
                          className="block px-2 py-1 text-sm hover:bg-muted"
                        >
                          My Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          onClick={logout}
                          className="block px-2 py-1 text-sm hover:bg-muted"
                        >
                          Log out
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <User2Icon className="h-6 w-6" />
                </Link>
              )}
            </section>
          </section>

          {/* Mobile cart icon */}
          <Link className="md:hidden max-md:hidden" href="/cart">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <Badge
                variant="default"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {cartCount}
              </Badge>
            )}
          </Link>
        </article>
      </nav>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg md:hidden">
        <div className="grid grid-cols-4 items-center">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 py-3 text-gray-700 hover:text-blue-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Home</span>
          </Link>

          <Link
            href="/products"
            className="flex flex-col items-center gap-1 py-3 text-gray-700 hover:text-blue-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs">Explore</span>
          </Link>

          <Link
            href="/cart"
            className="flex flex-col items-center gap-1 py-3 text-gray-700 hover:text-blue-600"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-xs">Cart</span>
             {cartCount > 0 && (
              <Badge
                variant="default"
                className="absolute right-30 top-0 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {cartCount}
              </Badge>
            )}
          </Link>

          {user ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1 py-3 text-gray-700 hover:text-blue-600">
                  <Image
                      src={user.image}
                      alt="user profile"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  <span className="text-xs">account</span>
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:w-full p-0">
                <SheetHeader className="p-4">
                  <SheetTitle>My Account</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-full">
                  <Card>
                    <CardContent>
                      <ul>
                        <li>
                          <Link
                            href="/profile"
                            className="block px-2 py-1 text-sm hover:bg-muted"
                          >
                            My Account
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logout}
                            className="block px-2 py-1 text-sm hover:bg-muted"
                          >
                            Log out
                          </button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <button className="flex flex-col items-center gap-1 py-3 text-gray-700 hover:text-blue-600">
              <Link href="/login">
                <User2Icon className="h-6 w-6" />
              </Link>
              <span className="text-xs">Account</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
