"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function AccountMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-md">
      {!user ? (
        <>
          <Link
            href="/login"
            className="block px-4 py-2 text-sm hover:bg-muted"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="block px-4 py-2 text-sm hover:bg-muted"
          >
            Registrarse
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-muted"
          >
            Mi perfil
          </Link>
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-muted"
          >
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
}
