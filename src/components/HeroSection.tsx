import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { navigateToCategory, navigateToShop } = useShop();

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FFF2F8] pt-6 pb-14 lg:py-16">
      {/* Decorative background glows matching brand colors */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-teal-200/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-pink-200 shadow-sm text-xs font-semibold text-[#F50087]">
              <Sparkles className="w-3.5 h-3.5 text-[#F50087]" />
              <span>Festive 2026 Collection Live</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C78]" />
              <span className="text-[#168C78]">Up to 30% OFF</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#191919] leading-[1.12]">
              Tradition Woven with{' '}
              <span className="relative text-[#F50087] italic font-serif">
                Modern Elegance
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#168C78]/40 h-2"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="transparent"/>
                </svg>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-700 max-w-xl font-normal leading-relaxed">
              Step into the world of Tulasi. Celebrate India's rich handloom heritage with our 
              pure Banarasi silk sarees, breathable mulmul cotton kurtis, handcrafted unstitched dress materials, 
              and regal family festive ensembles.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-shop-women-btn"
                onClick={() => navigateToCategory('sarees')}
                className="inline-flex items-center justify-center gap-2.5 bg-[#F50087] hover:bg-[#C90070] text-white px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Shop Women</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-collections-btn"
                onClick={() => navigateToShop({ category: 'all' })}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-pink-50/60 text-[#191919] border border-pink-200 px-7 py-3.5 rounded-full font-semibold text-sm shadow-sm transition-all cursor-pointer hover:border-[#F50087]"
              >
                <span>Explore Collections</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-6 border-t border-pink-200/80 w-full text-xs text-neutral-600">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-pink-100/80 text-[#F50087] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#191919]">100% Authentic</p>
                  <p className="text-[11px] text-neutral-500">Silk Mark Certified</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-100/80 text-[#168C78] flex items-center justify-center flex-shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#191919]">Weaver Direct</p>
                  <p className="text-[11px] text-neutral-500">Fair Trade Artisans</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-pink-100/80 text-[#F50087] flex items-center justify-center flex-shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#191919]">7-Day Easy</p>
                  <p className="text-[11px] text-neutral-500">Hassle-free Returns</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Visual Image Card with subtle pink overlay & frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-white group">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="Tulasi Royal Banarasi Silk Saree Collection"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle pink-to-transparent gradient matching brand palette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/70 via-transparent to-[#F50087]/15 pointer-events-none" />

              {/* Floating Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-pink-100 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#168C78]">Handcrafted Heritage</span>
                  <p className="text-sm font-bold text-[#191919]">Rani Pink Katan Silk Saree</p>
                  <p className="text-xs font-semibold text-[#F50087]">₹6,499 <span className="text-neutral-400 line-through text-[11px]">₹8,999</span></p>
                </div>

                <button
                  id="hero-floating-view-btn"
                  onClick={() => navigateToCategory('sarees')}
                  className="bg-[#F50087] hover:bg-[#C90070] text-white p-2.5 rounded-xl shadow transition-transform hover:scale-105 cursor-pointer"
                  aria-label="View Rani Pink Katan Silk Saree"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Small Floating Accent Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-pink-100 items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-pink-200">
                <img
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=200&q=80"
                  alt="Chanderi Handloom Kurta"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#191919]">Chanderi Silk Sets</p>
                <p className="text-[10px] text-[#168C78] font-medium">★ 4.9 (98 reviews)</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
