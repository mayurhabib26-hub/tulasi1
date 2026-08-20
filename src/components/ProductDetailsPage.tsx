import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { REVIEWS } from '../data/categories';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  MapPin, 
  Check, 
  ChevronRight, 
  Share2, 
  Sparkles, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    selectedProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActiveView,
    setIsSizeGuideOpen,
    products,
    addToast
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-neutral-600">Product not found.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-4 bg-[#F50087] text-white px-6 py-2 rounded-full text-xs font-semibold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || 'Free Size');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping' | 'reviews'>('details');

  // PIN Code checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{ checked: boolean; valid: boolean; message: string } | null>(null);

  const inWishlist = isInWishlist(selectedProduct.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus({
        checked: true,
        valid: true,
        message: `Delivery available to ${pincode}! Express delivery by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}. Cash on Delivery is available.`
      });
    } else {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian postal PIN code.'
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    setActiveView('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast({
      type: 'success',
      title: 'Link Copied',
      message: 'Product link copied to clipboard.'
    });
  };

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category)
    .slice(0, 4);

  return (
    <div id="product-details-page" className="py-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
          <button onClick={() => setActiveView('home')} className="hover:text-[#F50087]">Home</button>
          <span>/</span>
          <button onClick={() => setActiveView('shop')} className="hover:text-[#F50087] capitalize">{selectedProduct.categoryLabel}</button>
          <span>/</span>
          <span className="text-[#191919] font-medium truncate max-w-xs">{selectedProduct.name}</span>
        </div>

        {/* Top Product Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-neutral-200">
          
          {/* Left Gallery: Vertical Thumbnails + Main Zoom Image */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] scrollbar-none pb-2 sm:pb-0">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === idx
                      ? 'border-[#F50087] ring-2 ring-pink-200 scale-95'
                      : 'border-neutral-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${selectedProduct.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 aspect-[3/4] rounded-3xl overflow-hidden bg-[#FFF2F8] border border-pink-100 shadow-md relative group">
              <img
                src={selectedProduct.images[selectedImage] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {selectedProduct.discountPercentage && (
                  <span className="bg-[#F50087] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {selectedProduct.discountPercentage}% OFF
                  </span>
                )}
                {selectedProduct.isNewArrival && (
                  <span className="bg-[#168C78] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Handloom Certified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Product Buy Box & Specification */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#168C78] bg-teal-50 px-2.5 py-1 rounded-md">
                  {selectedProduct.categoryLabel}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-neutral-400 font-normal">({selectedProduct.reviewCount} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#191919] mt-3 font-heading leading-snug">
                {selectedProduct.name}
              </h1>

              {/* Weave & Fabric Highlight */}
              <p className="text-xs font-medium text-neutral-600 mt-1">
                Fabric: <strong className="text-[#191919]">{selectedProduct.fabric}</strong> 
                {selectedProduct.weave ? ` • Weave: ${selectedProduct.weave}` : ''}
              </p>

              {/* Pricing Box */}
              <div className="mt-4 p-4 rounded-2xl bg-[#FFF2F8] border border-pink-100 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#F50087]">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    MRP {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-neutral-500 ml-auto">
                  (Inclusive of all taxes & GST)
                </span>
              </div>

              {/* Color Swatches Selection */}
              {selectedProduct.colors.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-2">
                    <span>Color: <strong className="text-[#F50087]">{selectedColor}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'border-[#F50087] ring-2 ring-pink-300 scale-110 shadow-sm'
                            : 'border-neutral-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-2">
                  <span>Size: <strong className="text-[#191919]">{selectedSize}</strong></span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#168C78] hover:underline font-semibold flex items-center gap-1 text-xs"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        selectedSize === s
                          ? 'border-[#F50087] bg-pink-50 text-[#F50087] shadow-xs'
                          : 'border-neutral-200 text-neutral-700 hover:border-pink-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Stock */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs font-semibold text-neutral-800">Quantity:</span>
                <div className="flex items-center border border-neutral-200 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-neutral-600 hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#191919]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(selectedProduct.stockCount, quantity + 1))}
                    className="px-3 py-1.5 text-sm font-bold text-neutral-600 hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-500">
                  {selectedProduct.stockCount > 0 ? (
                    <span className="text-emerald-700 font-medium">In Stock (Ships in 24 hrs)</span>
                  ) : (
                    <span className="text-rose-600 font-medium">Out of Stock</span>
                  )}
                </span>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="pdp-add-to-bag-btn"
                  onClick={() => addToCart(selectedProduct, selectedColor, selectedSize, quantity)}
                  className="w-full bg-[#FFF2F8] hover:bg-pink-100 text-[#F50087] border-2 border-[#F50087] py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  id="pdp-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full bg-[#F50087] hover:bg-[#C90070] text-white py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-pink-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Buy Now (Instant Checkout)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Wishlist & Share link */}
              <div className="mt-4 flex items-center justify-between text-xs text-neutral-600">
                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className="flex items-center gap-1.5 hover:text-[#F50087] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#F50087] text-[#F50087]' : ''}`} />
                  <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#168C78] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Product</span>
                </button>
              </div>
            </div>

            {/* Delivery Postcode Checker */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#191919]">
                <MapPin className="w-4 h-4 text-[#F50087]" />
                <span>Check Delivery & Cash on Delivery Availability</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code (e.g. 560001)"
                  className="flex-1 border border-neutral-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#F50087]"
                />
                <button
                  type="submit"
                  className="bg-[#191919] hover:bg-[#168C78] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className={`mt-2 p-2.5 rounded-xl text-xs ${
                  pincodeStatus.valid ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {pincodeStatus.message}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Tabbed Product Information (Description, Wash Care, Shipping, Reviews) */}
        <div className="py-12 border-b border-neutral-200">
          <div className="flex items-center gap-4 sm:gap-8 border-b border-neutral-200 pb-3 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'details' ? 'text-[#F50087]' : 'text-neutral-500 hover:text-[#191919]'
              }`}
            >
              Product Story & Highlights
              {activeTab === 'details' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#F50087]" />}
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'care' ? 'text-[#F50087]' : 'text-neutral-500 hover:text-[#191919]'
              }`}
            >
              Fabric & Care Instructions
              {activeTab === 'care' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#F50087]" />}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'shipping' ? 'text-[#F50087]' : 'text-neutral-500 hover:text-[#191919]'
              }`}
            >
              Shipping & 7-Day Returns
              {activeTab === 'shipping' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#F50087]" />}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === 'reviews' ? 'text-[#F50087]' : 'text-neutral-500 hover:text-[#191919]'
              }`}
            >
              Customer Reviews ({selectedProduct.reviewCount})
              {activeTab === 'reviews' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#F50087]" />}
            </button>
          </div>

          {/* Tab Contents */}
          <div className="pt-6 text-sm text-neutral-700 leading-relaxed">
            {activeTab === 'details' && (
              <div className="max-w-3xl space-y-4">
                <p className="text-base text-neutral-800">{selectedProduct.description}</p>
                <h4 className="font-bold text-xs uppercase text-[#168C78] tracking-wider pt-2">Key Specifications</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProduct.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#168C78] flex-shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-2xl space-y-3">
                <h4 className="font-bold text-sm text-[#191919]">Preserving Handloom Artistry</h4>
                <p className="text-xs text-neutral-600">
                  Each Tulasi textile is handcrafted with natural fibers. Follow these guidelines to maintain its rich luster and structural drape:
                </p>
                <ul className="space-y-2 text-xs pt-2">
                  {selectedProduct.careInstructions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#FFF2F8] p-3 rounded-xl border border-pink-100">
                      <Sparkles className="w-4 h-4 text-[#F50087] flex-shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="max-w-2xl space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 space-y-2">
                  <h4 className="font-bold text-sm text-[#168C78] flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Pan-India Express Delivery
                  </h4>
                  <p>• Orders dispatched within 24 to 48 hours via premium DTDC and BlueDart couriers.</p>
                  <p>• Metro cities: 2-3 business days. Rest of India: 4-6 business days.</p>
                  <p>• Free shipping automatically applies to all orders above ₹999.</p>
                </div>

                <div className="p-4 rounded-2xl bg-pink-50/70 border border-pink-100 space-y-2">
                  <h4 className="font-bold text-sm text-[#F50087] flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" /> Doorstep 7-Day Easy Returns
                  </h4>
                  <p>• If you are not 100% satisfied with the size or drape, request a reverse pickup in 1 click.</p>
                  <p>• Instant full refund or free size exchange upon pickup verification.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF2F8] border border-pink-100">
                  <div className="text-center pr-4 border-r border-pink-200">
                    <span className="text-3xl font-bold text-[#F50087]">{selectedProduct.rating}</span>
                    <p className="text-[10px] text-neutral-500">out of 5.0</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-600 mt-1">Based on {selectedProduct.reviewCount} customer ratings.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl border border-neutral-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#191919]">{rev.userName} ({rev.city})</span>
                        <span className="text-[10px] text-neutral-400">{rev.date}</span>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-700">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="pt-14">
            <h2 className="text-2xl font-bold text-[#191919] font-heading mb-6">
              You May Also Adore
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
