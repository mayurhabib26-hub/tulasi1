import React from 'react';
import { CATEGORIES } from '../data/categories';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const CategorySection: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section id="shop-by-category-section" className="py-16 bg-white border-y border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#168C78] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Indian Textiles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              From ceremonial weaves to everyday breathable cottons, discover handloom masterworks crafted with devotion.
            </p>
          </div>

          <button
            id="view-all-categories-btn"
            onClick={() => navigateToCategory('sarees')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F50087] hover:text-[#C90070] transition-colors group cursor-pointer"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              id={`category-card-${cat.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => navigateToCategory(cat.slug)}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              {/* Image Container with circular/rounded frame and hover effects */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#FFF2F8] border border-pink-100 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-pink-300 group-hover:-translate-y-1">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating Tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#168C78] shadow-xs">
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom title inside card for mobile readability */}
                <div className="absolute bottom-3 inset-x-3 text-left">
                  <h3 className="text-white font-bold text-sm sm:text-base font-heading drop-shadow-sm group-hover:text-pink-200 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-neutral-200 font-medium truncate">
                    {cat.itemCount}+ Designs
                  </p>
                </div>
              </div>

              {/* Subtitle below card */}
              <div className="mt-2.5 w-full text-center hidden sm:block">
                <p className="text-xs text-neutral-500 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
