import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Flame, Crown } from 'lucide-react';
import { motion } from 'motion/react';

export const PromotionalBanners: React.FC = () => {
  const { navigateToCategory, navigateToShop } = useShop();

  return (
    <section id="promotional-banners-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Large Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#191919] via-[#2A1020] to-[#F50087]/80 text-white p-8 sm:p-12 lg:p-14 mb-8 shadow-xl"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 sm:opacity-40 pointer-events-none hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
              alt="Festive Weave Artwork"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F50087]/30 border border-[#F50087]/60 text-xs font-bold text-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-[#F50087]" />
              <span>Diwali & Wedding Season Grand Showcase</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight">
              Festive Collection – <br />
              <span className="text-[#F50087]">Up to 30% Off</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-light">
              Elevate every celebration with royal Katan weaves, organza zari dupattas, and authentic hand-embroidered silks created by master weavers.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                id="banner-shop-festive-btn"
                onClick={() => navigateToShop({ occasions: ['Festive', 'Bridal & Wedding'] })}
                className="bg-[#F50087] hover:bg-[#C90070] text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg shadow-pink-500/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Shop Festive Sarees & Sets</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
                Code: <strong>TULASI10</strong>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Mini Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Premium Handloom Sarees */}
          <div
            id="banner-handloom-sarees"
            className="group relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] shadow-md border border-pink-100 flex items-end p-6 sm:p-8 cursor-pointer"
            onClick={() => navigateToCategory('sarees')}
          >
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80"
              alt="Premium Handloom Sarees"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/90 via-[#191919]/40 to-transparent" />

            <div className="relative z-10 text-white space-y-1.5">
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#168C78] bg-white/90 px-2 py-0.5 rounded-full inline-block">
                Artisan Heritage
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Premium Handloom Sarees
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm">
                Authentic Banarasi, Kanjivaram, and Kalamkari pure silks crafted with certified Silk Mark.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-pink-300 group-hover:text-white transition-colors">
                <span>Explore Saree Weaves</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Fresh Styles for Every Celebration */}
          <div
            id="banner-family-celebration"
            className="group relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/9] shadow-md border border-pink-100 flex items-end p-6 sm:p-8 cursor-pointer"
            onClick={() => navigateToCategory('kurtis')}
          >
            <img
              src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
              alt="Fresh Styles for Every Celebration"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/90 via-[#191919]/40 to-transparent" />

            <div className="relative z-10 text-white space-y-1.5">
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#F50087] bg-white/90 px-2 py-0.5 rounded-full inline-block">
                Family Ensembles
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Fresh Styles for Every Celebration
              </h3>
              <p className="text-xs text-neutral-300 max-w-sm">
                Curated Kurta sets, Men’s raw silk attire, and Kids’ festive pavadas for joyful family gatherings.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-pink-300 group-hover:text-white transition-colors">
                <span>View Family Styles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
