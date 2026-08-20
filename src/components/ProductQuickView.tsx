import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
    setIsSizeGuideOpen
  } = useShop();

  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div
        id="quickview-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id={`quickview-modal-${product.id}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-pink-100 relative my-8"
        >
          {/* Close button */}
          <button
            id="close-quickview-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm text-neutral-500 hover:text-[#191919] hover:bg-white shadow transition-colors"
            aria-label="Close Quick View"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-[#FFF2F8] flex flex-col justify-between">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-sm bg-white border border-pink-100">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === idx
                          ? 'border-[#F50087] ring-2 ring-pink-200'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Right */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                  <span className="uppercase font-semibold text-[#168C78]">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-400 font-normal">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#191919] leading-snug">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-[#F50087]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="bg-pink-100 text-[#F50087] text-xs font-bold px-2 py-0.5 rounded-full">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 mt-3 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Select Color: <span className="text-[#F50087]">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColor === c.name
                              ? 'border-[#F50087] ring-2 ring-pink-200 scale-110'
                              : 'border-white shadow hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 mb-1.5">
                    <span>Select Size</span>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[#168C78] hover:underline"
                    >
                      Size Chart
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                          selectedSize === s
                            ? 'border-[#F50087] bg-pink-50 text-[#F50087] font-bold shadow-xs'
                            : 'border-neutral-200 text-neutral-700 hover:border-pink-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-700">Quantity:</span>
                  <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-sm font-semibold hover:bg-neutral-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-[#191919]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-1 text-sm font-semibold hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    ({product.stockCount} in stock)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-3">
                  <button
                    id="quickview-add-to-bag-btn"
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`flex-1 py-3 px-4 rounded-2xl font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F50087] hover:bg-[#C90070] text-white shadow-pink-200 hover:shadow-pink-300'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    id="quickview-wishlist-toggle-btn"
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-2xl border transition-all ${
                      inWishlist
                        ? 'border-[#F50087] bg-pink-50 text-[#F50087]'
                        : 'border-neutral-200 text-neutral-600 hover:text-[#F50087] hover:border-pink-200'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  id="quickview-view-full-details-btn"
                  onClick={() => {
                    navigateToProduct(product.id);
                    onClose();
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-neutral-600 hover:text-[#F50087] flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Full Product Details & Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
