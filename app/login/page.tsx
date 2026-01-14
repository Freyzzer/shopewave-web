"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(username, password);
    router.push("/profile");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm h-full space-y-4 p-6">
      <h1 className="text-xl font-semibold">Iniciar sesión</h1>
      <input
        className="w-full border p-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full rounded bg-primary py-2 text-primary-foreground">
        Entrar
      </button>
      <p>
        La api no cuenta con registro de usuarios, por lo que puedes usar el siguiente usurio:
        <br />
        Usuario: <strong>emilys</strong>
        <br />
        Contraseña: <strong>emilyspass</strong>
      </p>
    </form>
  );
}
