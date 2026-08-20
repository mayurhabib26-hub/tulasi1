import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Heart, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    moveToWishlistFromCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formatPrice,
    setActiveView
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    setActiveView('checkout');
  };

  // Free shipping threshold ₹999
  const neededForFreeShipping = Math.max(0, 999 - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / 999) * 100));

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <motion.div
        id="cart-drawer-container"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="bg-white w-full max-w-md h-full flex flex-col justify-between shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F50087]" />
            <h3 className="font-bold text-base text-[#191919]">Shopping Bag ({cartCount})</h3>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-[#191919] hover:bg-neutral-100 transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FFF2F8] px-5 py-3 border-b border-pink-100 text-xs">
          {neededForFreeShipping > 0 ? (
            <p className="text-neutral-700">
              Add <strong className="text-[#F50087] font-bold">{formatPrice(neededForFreeShipping)}</strong> more to get <strong className="text-[#168C78]">FREE Pan-India Delivery!</strong>
            </p>
          ) : (
            <p className="text-[#168C78] font-bold flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> 🎉 Congratulations! You've unlocked FREE Shipping!
            </p>
          )}
          <div className="w-full bg-white h-2 rounded-full mt-2 overflow-hidden border border-pink-200">
            <div
              className="bg-[#F50087] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                id={`cart-item-${idx}`}
                className="flex gap-3.5 p-3 rounded-2xl border border-pink-100/80 bg-white hover:border-pink-200 shadow-xs"
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-24 rounded-xl overflow-hidden bg-[#FFF2F8] flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#191919] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Size: <span className="font-semibold text-neutral-800">{item.selectedSize}</span> | Color: <span className="font-semibold text-neutral-800">{item.selectedColor}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                      <button
                        onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#191919]">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#F50087]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Actions: Save for later & Remove */}
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-neutral-500 border-t border-neutral-100 mt-1">
                    <button
                      onClick={() => moveToWishlistFromCart(idx)}
                      className="hover:text-[#F50087] flex items-center gap-1"
                    >
                      <Heart className="w-3 h-3" /> Save to Wishlist
                    </button>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="hover:text-rose-600 flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-[#F50087] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#191919]">Your Bag is Empty</h4>
                <p className="text-xs text-neutral-500 mt-1">Looks like you haven't added any silk sarees or ethnic wear yet.</p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('shop');
                }}
                className="bg-[#F50087] hover:bg-[#C90070] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md"
              >
                Start Exploring Weaves
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer / Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-[#FFF2F8]/60 space-y-4">
            
            {/* Coupon Code Section */}
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.description})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter coupon (e.g. TULASI10)"
                    className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs uppercase focus:outline-none focus:border-[#F50087]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#191919] hover:bg-[#F50087] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-700 pt-2 border-t border-pink-100">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-[#191919]">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">- {formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Taxes (5% GST)</span>
                <span>{formatPrice(cartTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span>
                  {cartShipping === 0 ? (
                    <span className="text-[#168C78] font-bold">FREE</span>
                  ) : (
                    formatPrice(cartShipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#191919] pt-2 border-t border-pink-200">
                <span>Total Amount</span>
                <span className="text-[#F50087] text-base">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="cart-drawer-checkout-btn"
              onClick={proceedToCheckout}
              className="w-full bg-[#F50087] hover:bg-[#C90070] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-pink-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
