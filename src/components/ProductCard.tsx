import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  badge?: string;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  badge,
  onQuickView
}) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
    setQuickViewProduct
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [isAdding, setIsAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, selectedColor, product.sizes[0], 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateToProduct(product.id)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-pink-100/80 shadow-xs hover:shadow-xl hover:border-pink-200 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] bg-[#FFF2F8] overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <span className="bg-[#F50087] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          ) : null}

          {product.isNewArrival && (
            <span className="bg-[#168C78] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              NEW
            </span>
          )}

          {badge && (
            <span className="bg-[#191919] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            inWishlist
              ? 'bg-[#F50087] text-white shadow-md'
              : 'bg-white/85 backdrop-blur-sm text-neutral-600 hover:text-[#F50087] hover:bg-white shadow-xs'
          }`}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 hidden sm:flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={handleQuickViewClick}
            className="flex-1 bg-white/95 backdrop-blur-md hover:bg-white text-[#191919] py-2 rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors border border-pink-100 hover:border-[#F50087]"
          >
            <Eye className="w-3.5 h-3.5 text-[#F50087]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-neutral-500 font-medium tracking-wide uppercase text-[10px]">
              {product.categoryLabel}
            </span>

            <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-sm text-[#191919] group-hover:text-[#F50087] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Fabric Note */}
          <p className="text-[11px] text-[#168C78] font-medium mt-1">
            {product.fabric}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c.name);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === c.name
                    ? 'ring-2 ring-[#F50087] ring-offset-1 border-white scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Color ${c.name}`}
              />
            ))}
            <span className="text-[10px] text-neutral-500 ml-1 truncate max-w-[90px]">
              {selectedColor}
            </span>
          </div>
        )}

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-pink-50 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base text-[#191919]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.stockCount <= 5 && (
              <span className="text-[10px] text-rose-600 font-medium">
                Only {product.stockCount} left
              </span>
            )}
          </div>

          {/* Add to Bag Button */}
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isAdding}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
              isAdding
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FFF2F8] hover:bg-[#F50087] text-[#F50087] hover:text-white border border-pink-200 hover:border-transparent'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
