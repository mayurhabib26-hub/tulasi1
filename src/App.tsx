import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductCard } from './components/ProductCard';
import { ProductCarousel } from './components/ProductCarousel';
import { PromotionalBanners } from './components/PromotionalBanners';
import { BrandBenefits } from './components/BrandBenefits';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StyleGallery } from './components/StyleGallery';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductQuickView } from './components/ProductQuickView';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReturnsExchangeModal } from './components/ReturnsExchangeModal';
import { ToastContainer } from './components/Toast';
import { ArrowRight, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeView,
    products,
    navigateToCategory,
    navigateToShop,
    quickViewProduct,
    setQuickViewProduct
  } = useShop();

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF2F8] text-[#191919]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <CategorySection />

            {/* Featured Products Section */}
            <section id="featured-products-section" className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F50087] mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Handcrafted Exclusives</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] font-heading">
                      Featured Weaves & New Arrivals
                    </h2>
                    <p className="text-sm text-neutral-600 mt-1 max-w-xl">
                      Each piece tells a story of heritage artistry, woven with pure silkmark certified threads and organic dyes.
                    </p>
                  </div>

                  <button
                    onClick={() => navigateToShop({ sortBy: 'newest' })}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#F50087] hover:text-[#C90070] transition-colors group cursor-pointer"
                  >
                    <span>View All Collections</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>

            <PromotionalBanners />
            <ProductCarousel
              title="Tulasi Bestsellers"
              subtitle="The most cherished Banarasi weaves, Chanderi suits, and handloom fabrics chosen by our community."
              products={bestsellers}
            />
            <BrandBenefits />
            <TestimonialsSection />
            <StyleGallery />
            <NewsletterSection />
          </>
        )}

        {activeView === 'shop' && <ProductListingPage />}
        {activeView === 'product' && <ProductDetailsPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'order-success' && <OrderSuccessPage />}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <SizeGuideModal />
      <OrderTrackingModal />
      <ReturnsExchangeModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
