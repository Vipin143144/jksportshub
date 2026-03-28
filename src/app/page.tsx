import { HomePortalHero } from "@/components/store/home-portal-hero";
import { ProductsWidget } from "@/components/store/products-widget";
import { AcademyWidget } from "@/components/store/academy-widget";
import { SearchSection } from "@/components/store/search-section";
import { StoreFooter } from "@/components/store/store-footer";
import { StoreHeader } from "@/components/store/store-header";
import { WhatsAppFab } from "@/components/store/whatsapp-fab";
import { getRootCategories } from "@/lib/queries";

export const revalidate = 3600;

export default async function HomePage() {
  const categories = await getRootCategories();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <StoreHeader categories={categories} />
      <SearchSection />
      <HomePortalHero categories={categories} />
      <div className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Deals of the Day</h2>
            <p className="text-sm text-gray-600">Get the best prices on our top products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProductsWidget />
            <AcademyWidget />
          </div>
        </div>
      </div>
      <StoreFooter categories={categories} variant="light" />
      <WhatsAppFab />
    </div>
  );
}
