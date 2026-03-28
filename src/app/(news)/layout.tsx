import { NewsShell } from "@/components/news/news-shell";

export default function NewsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NewsShell>{children}</NewsShell>;
}
