import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    wishlistCount,
    toggleWishlist,
    moveToCartFromWishlist,
    formatPrice,
    setActiveView
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div id="wishlist-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <motion.div
        id="wishlist-drawer-container"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#F50087] fill-current" />
            <h3 className="font-bold text-base text-[#191919]">Saved Wishlist ({wishlistCount})</h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-[#191919] hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map(({ product }) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 rounded-2xl border border-pink-100/80 bg-white hover:border-pink-200 shadow-xs"
              >
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#FFF2F8] flex-shrink-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#191919] truncate">{product.name}</h4>
                    <p className="text-[11px] text-[#168C78] font-medium mt-0.5">{product.fabric}</p>
                    <p className="text-xs font-bold text-[#F50087] mt-1">{formatPrice(product.price)}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                    <button
                      onClick={() => moveToCartFromWishlist(product)}
                      className="flex-1 bg-[#F50087] hover:bg-[#C90070] text-white py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-100 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-[#F50087] flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#191919]">No Items in Wishlist</h4>
                <p className="text-xs text-neutral-500 mt-1">Tap the heart icon on any saree or kurta to save it for later.</p>
              </div>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveView('shop');
                }}
                className="bg-[#F50087] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md"
              >
                Browse Indian Weaves
              </button>
            </div>
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-5 border-t border-neutral-100 bg-[#FFF2F8]/40">
            <button
              onClick={() => {
                wishlist.forEach((item) => moveToCartFromWishlist(item.product));
              }}
              className="w-full bg-[#191919] hover:bg-[#168C78] text-white py-3 rounded-full text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Move All to Shopping Bag</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
