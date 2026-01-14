import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background w-full h-full">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Mi E-commerce</h3>
          <p className="text-sm text-muted-foreground">
            Compras seguras, productos de calidad y envíos a todo el país.
          </p>
        </div>

        {/* Tienda */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Tienda</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/products">Productos</Link>
            </li>

          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Soporte</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">

          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase">Newsletter</h4>
          <p className="text-sm text-muted-foreground">
            Recibe ofertas y novedades directamente en tu correo.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mi E-commerce. Todos los derechos
            reservados.
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#">Facebook</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">Twitter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
