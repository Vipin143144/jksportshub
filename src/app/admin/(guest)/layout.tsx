export default function AdminGuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-0px)] items-center justify-center bg-zinc-100 p-6 dark:bg-zinc-950">
      {children}
    </div>
  );
}
