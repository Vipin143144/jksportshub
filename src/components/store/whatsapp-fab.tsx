import { waLink } from "@/lib/site";

export function WhatsAppFab() {
  const href = waLink("Hi! I'm browsing JKsportshub and have a question.");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/30 transition hover:scale-105 hover:bg-[#1ebe5d] motion-reduce:hover:scale-100"
    >
      <span aria-hidden>💬</span>
      Chat on WhatsApp
    </a>
  );
}
