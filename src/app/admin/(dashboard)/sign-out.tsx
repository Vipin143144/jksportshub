"use client";

import { signOut } from "next-auth/react";

export function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="w-full rounded-lg border border-zinc-600 px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800"
    >
      Sign out
    </button>
  );
}
