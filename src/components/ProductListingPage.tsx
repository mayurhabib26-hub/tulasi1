import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/categories';
import { ALL_FABRICS, ALL_OCCASIONS } from '../data/products';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  Grid3X3, 
  LayoutGrid, 
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductListingPage: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    searchQuery,
    setSearchQuery,
    formatPrice
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [visibleCount, setVisibleCount] = useState(12);

  // Available Sizes & Colors
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'Unstitched'];
  const allColors = [
    { name: 'Rani Pink', hex: '#F50087' },
    { name: 'Teal Green', hex: '#168C78' },
    { name: 'Royal Gold', hex: '#D4AF37' },
    { name: 'Ivory & Beige', hex: '#EBE5D8' },
    { name: 'Indigo Blue', hex: '#1E3A8A' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (filters.category && filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }
      // Price
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
        return false;
      }
      // Discount
      if (filters.discount > 0 && (!p.discountPercentage || p.discountPercentage < filters.discount)) {
        return false;
      }
      // Fabrics
      if (filters.fabrics.length > 0 && !filters.fabrics.some((f) => p.fabric.toLowerCase().includes(f.toLowerCase()))) {
        return false;
      }
      // Occasions
      if (filters.occasions.length > 0 && !filters.occasions.includes(p.occasion)) {
        return false;
      }
      // Sizes
      if (filters.sizes.length > 0 && !filters.sizes.some((s) => p.sizes.some((ps) => ps.toLowerCase().includes(s.toLowerCase())))) {
        return false;
      }
      // Search
      const q = (filters.searchQuery || searchQuery || '').trim().toLowerCase();
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.categoryLabel.toLowerCase().includes(q);
        const matchesFabric = p.fabric.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesFabric && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'discount':
          return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [products, filters, searchQuery]);

  const activeFilterCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.sizes.length +
    filters.fabrics.length +
    filters.occasions.length +
    (filters.discount > 0 ? 1 : 0) +
    (filters.priceRange[0] > 500 || filters.priceRange[1] < 10000 ? 1 : 0);

  const toggleArrayFilter = (field: 'sizes' | 'fabrics' | 'occasions', value: string) => {
    const current = filters[field];
    if (current.includes(value)) {
      updateFilter(field, current.filter((item) => item !== value));
    } else {
      updateFilter(field, [...current, value]);
    }
  };

  const FilterSidebarContent = (
    <div className="space-y-6 text-sm">
      {/* Category List */}
      <div>
        <h4 className="font-bold text-[#191919] mb-3 text-xs uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => updateFilter('category', 'all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-[#F50087] text-white font-bold'
                : 'text-neutral-700 hover:bg-pink-50'
            }`}
          >
            <span>All Indian Weaves</span>
            <span>{products.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => updateFilter('category', c.slug)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === c.slug
                  ? 'bg-[#F50087] text-white font-bold'
                  : 'text-neutral-700 hover:bg-pink-50'
              }`}
            >
              <span>{c.title}</span>
              <span className="text-[11px] opacity-75">{c.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-neutral-200/70">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-[#191919] text-xs uppercase tracking-wider">Price (INR)</h4>
          <span className="text-xs font-semibold text-[#F50087]">
            {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="10000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
          className="w-full accent-[#F50087] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
          <span>₹500</span>
          <span>₹10,000+</span>
        </div>
      </div>

      {/* Occasions */}
      <div className="pt-4 border-t border-neutral-200/70">
        <h4 className="font-bold text-[#191919] mb-3 text-xs uppercase tracking-wider">
          Occasion
        </h4>
        <div className="space-y-1.5">
          {ALL_OCCASIONS.map((occ) => (
            <label key={occ} className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 hover:text-[#F50087]">
              <input
                type="checkbox"
                checked={filters.occasions.includes(occ)}
                onChange={() => toggleArrayFilter('occasions', occ)}
                className="rounded text-[#F50087] focus:ring-[#F50087] accent-[#F50087]"
              />
              <span>{occ}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="pt-4 border-t border-neutral-200/70">
        <h4 className="font-bold text-[#191919] mb-3 text-xs uppercase tracking-wider">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleArrayFilter('sizes', s)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-all ${
                filters.sizes.includes(s)
                  ? 'border-[#F50087] bg-pink-50 text-[#F50087] font-bold'
                  : 'border-neutral-200 text-neutral-600 hover:border-pink-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Fabrics */}
      <div className="pt-4 border-t border-neutral-200/70">
        <h4 className="font-bold text-[#191919] mb-3 text-xs uppercase tracking-wider">
          Fabric & Weave
        </h4>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {ALL_FABRICS.map((fab) => (
            <label key={fab} className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 hover:text-[#F50087]">
              <input
                type="checkbox"
                checked={filters.fabrics.includes(fab)}
                onChange={() => toggleArrayFilter('fabrics', fab)}
                className="rounded text-[#F50087] focus:ring-[#F50087] accent-[#F50087]"
              />
              <span className="truncate">{fab}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Discount Filter */}
      <div className="pt-4 border-t border-neutral-200/70">
        <h4 className="font-bold text-[#191919] mb-2 text-xs uppercase tracking-wider">
          Discount Offers
        </h4>
        <div className="space-y-1 text-xs">
          {[10, 20, 30].map((d) => (
            <button
              key={d}
              onClick={() => updateFilter('discount', filters.discount === d ? 0 : d)}
              className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                filters.discount === d
                  ? 'bg-pink-100 text-[#F50087] font-bold'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {d}% and above
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters CTA */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          className="w-full py-2 px-3 rounded-xl border border-pink-200 text-[#F50087] hover:bg-pink-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Filters ({activeFilterCount})</span>
        </button>
      )}
    </div>
  );

  return (
    <div id="product-listing-page" className="py-8 bg-[#FFF2F8]/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#191919] font-medium capitalize">
              {filters.category === 'all' ? 'All Collections' : filters.category.replace('-', ' ')}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#191919] font-heading">
                {filters.category === 'all' ? 'Indian Ethnic & Handloom Collection' : `${filters.category.replace('-', ' ')} Collection`}
              </h1>
              <p className="text-xs text-neutral-600 mt-1">
                Showing <strong className="text-[#191919]">{filteredProducts.length}</strong> handcrafted items
              </p>
            </div>

            {/* Sort & View Switchers */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                id="mobile-filter-open-btn"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-pink-200 text-xs font-semibold text-[#191919] shadow-xs"
              >
                <Filter className="w-4 h-4 text-[#F50087]" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-pink-200 text-xs shadow-xs">
                <span className="text-neutral-500 font-medium hidden sm:inline">Sort by:</span>
                <select
                  id="product-sort-select"
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                  className="bg-transparent font-semibold text-[#191919] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured & Trending</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* Grid Toggle on Desktop */}
              <div className="hidden md:flex items-center gap-1 bg-white p-1 rounded-xl border border-pink-200">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 rounded-lg transition-colors ${gridCols === 3 ? 'bg-[#F50087] text-white' : 'text-neutral-500 hover:text-[#191919]'}`}
                  aria-label="3 Column Grid"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 rounded-lg transition-colors ${gridCols === 4 ? 'bg-[#F50087] text-white' : 'text-neutral-500 hover:text-[#191919]'}`}
                  aria-label="4 Column Grid"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm h-fit sticky top-24">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#F50087]" />
                <span className="font-bold text-sm text-[#191919]">Filter Catalog</span>
              </div>
              {activeFilterCount > 0 && (
                <span className="text-[11px] bg-pink-100 text-[#F50087] px-2 py-0.5 rounded-full font-bold">
                  {activeFilterCount} active
                </span>
              )}
            </div>
            {FilterSidebarContent}
          </aside>

          {/* Right Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="space-y-8">
                <div className={`grid grid-cols-2 ${gridCols === 4 ? 'sm:grid-cols-3 xl:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-3'} gap-4 sm:gap-6`}>
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center pt-8">
                    <button
                      id="load-more-products-btn"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="bg-white hover:bg-pink-50 text-[#191919] border border-pink-200 px-8 py-3 rounded-full text-xs font-semibold shadow-xs hover:border-[#F50087] transition-all cursor-pointer"
                    >
                      Load More Products ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Empty Search / Filter State */
              <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-[#F50087] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#191919]">No Weaves Found</h3>
                <p className="text-xs text-neutral-600 mt-2">
                  We couldn't find any products matching your current combination of filters. Try clearing your filters or exploring another category.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 bg-[#F50087] hover:bg-[#C90070] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-xs h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
                  <h3 className="font-bold text-base text-[#191919]">Filters ({activeFilterCount})</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {FilterSidebarContent}
              </div>

              <div className="pt-6 border-t border-neutral-100 mt-6">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-[#F50087] hover:bg-[#C90070] text-white py-3 rounded-2xl font-bold text-xs shadow-md transition-colors"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
