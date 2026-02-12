"use client";

import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Mail, MapPin } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4">
        <User className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          Not signed in
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to view your profile
        </p>
        <Link href="/login">
          <Button className="mt-6" variant="outline">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-6 lg:py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        My Profile
      </h1>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <Image
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm text-foreground">{user.email}</span>
          </div>
          {user.address && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm text-foreground">
                {user.address.city}, {user.address.state}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <Button variant="outline" onClick={logout} className="text-sm">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
