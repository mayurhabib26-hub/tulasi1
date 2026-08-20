import React from 'react';
import { Truck, RotateCcw, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { setIsTrackOrderOpen, setIsReturnsModalOpen } = useShop();

  return (
    <div
      id="announcement-bar"
      className="bg-[#191919] text-white text-xs border-b border-neutral-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Offer highlights */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-neutral-300">
          <div className="flex items-center gap-1.5 font-medium text-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-[#F50087] animate-pulse" />
            <span>
              Festive Promo: Use code <strong className="text-white bg-[#F50087]/30 px-1.5 py-0.5 rounded border border-[#F50087]/50">TULASI10</strong> for 10% OFF
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#168C78]" />
            <span>Free shipping on orders above ₹999</span>
          </div>
        </div>

        {/* Right Side: Trust & Service links */}
        <div className="flex items-center gap-4 sm:gap-6 text-neutral-300">
          <button
            id="announcement-easy-returns-btn"
            onClick={() => setIsReturnsModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#F50087]" />
            <span>Easy 7-Day Returns</span>
          </button>

          <button
            id="announcement-track-order-btn"
            onClick={() => setIsTrackOrderOpen(true)}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#168C78]" />
            <span>Track Order & Secure Payments</span>
          </button>

          <a
            id="announcement-whatsapp-link"
            href="tel:+918023456789"
            className="hidden lg:flex items-center gap-1 hover:text-pink-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-neutral-400" />
            <span>Care: +91 80 2345 6789</span>
          </a>
        </div>
      </div>
    </div>
  );
};
