import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  badge?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  products,
  badge = 'Bestseller'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.clientWidth * 0.8;
      const amount = direction === 'left' ? -cardWidth : cardWidth;
      containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section id="bestsellers-carousel-section" className="py-16 bg-[#FFF2F8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F50087] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-neutral-600 mt-1 max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-2">
            <button
              id="carousel-prev-btn"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollLeft
                  ? 'border-pink-200 bg-white text-[#191919] hover:bg-[#F50087] hover:text-white shadow-xs cursor-pointer'
                  : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
              aria-label="Previous items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="carousel-next-btn"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-full border transition-all ${
                canScrollRight
                  ? 'border-pink-200 bg-white text-[#191919] hover:bg-[#F50087] hover:text-white shadow-xs cursor-pointer'
                  : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed'
              }`}
              aria-label="Next items"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div
          ref={containerRef}
          onScroll={checkScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 pt-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((prod) => (
            <div
              key={prod.id}
              className="w-[260px] sm:w-[280px] lg:w-[300px] flex-shrink-0 snap-start"
            >
              <ProductCard product={prod} badge={badge} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
