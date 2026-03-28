import { Suspense } from "react";
import { AdminLoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-zinc-500">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
