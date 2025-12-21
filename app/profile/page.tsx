"use client";

import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <p className="p-6">Debes iniciar sesión</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Mi perfil</h1>
      <pre className="mt-4 rounded bg-muted p-4 text-sm">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}
