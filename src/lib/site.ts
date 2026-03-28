export const siteConfig = {
  name: "JKsportshub",
  tagline: "JK Strickers",
  description:
    "Pro-quality gear for cricket, football, and fitness—fast support and fair pricing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "966566845851",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@jksportshub.com",
};

export function waLink(text: string) {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;
}

export function mailtoLink(subject: string, body: string) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${siteConfig.email}?subject=${s}&body=${b}`;
}
