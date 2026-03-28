import { ProductCard, type ProductCardProduct } from "./product-card";

export function ProductGrid({
  products,
  variant = "news",
}: {
  products: ProductCardProduct[];
  variant?: "store" | "news";
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} variant={variant} />
      ))}
    </div>
  );
}
