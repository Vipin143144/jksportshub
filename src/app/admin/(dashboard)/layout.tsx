import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOut } from "./sign-out";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/banners", label: "Banners" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-zinc-200 bg-zinc-900 p-4 text-zinc-100 md:flex dark:border-zinc-800">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-400">JK Admin</p>
        <p className="mt-1 truncate text-sm text-zinc-400">{session.user.email}</p>
        <nav className="mt-8 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-zinc-800"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <AdminSignOut />
        </div>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 md:hidden dark:border-zinc-800 dark:bg-zinc-900">
          <span className="font-bold text-zinc-900 dark:text-white">Admin</span>
          <AdminSignOut />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
