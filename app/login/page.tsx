"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
      router.push("/profile");
    } catch {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm items-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5"
        aria-label="Sign in form"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials to continue
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Username
            </label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              aria-required="true"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-required="true"
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-xs text-muted-foreground">
            This API does not support registration. Use the following test account:
          </p>
          <p className="mt-2 text-xs text-foreground">
            <span className="font-medium">Username:</span> emilys
            <br />
            <span className="font-medium">Password:</span> emilyspass
          </p>
        </div>
      </form>
    </div>
  );
}
