export function formatInr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function discountPct(price: number, compare: number | null | undefined) {
  if (compare == null || compare <= price) return null;
  return Math.round(((compare - price) / compare) * 100);
}
