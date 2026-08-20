import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReturnsExchangeModal: React.FC = () => {
  const { isReturnsModalOpen, setIsReturnsModalOpen, addToast } = useShop();
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('size_issue');
  const [submitted, setSubmitted] = useState(false);

  if (!isReturnsModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Reverse Pickup Scheduled',
      message: 'A pickup agent will arrive in 24-48 hours. Refund initiated.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-pink-100 relative">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#F50087]" />
            <h3 className="font-bold text-base text-[#191919]">7-Day Easy Returns & Exchange</h3>
          </div>
          <button
            onClick={() => setIsReturnsModalOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-[#191919]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#168C78] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[#191919]">Request Registered</h4>
            <p className="text-xs text-neutral-600">
              Your return request for <strong className="text-[#F50087]">{orderId}</strong> has been confirmed. Our executive will collect the unstitched / unused garment with tags intact.
            </p>
            <button
              onClick={() => setIsReturnsModalOpen(false)}
              className="mt-4 bg-[#F50087] text-white px-6 py-2 rounded-full text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Order ID *</label>
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. TUL-542198"
                className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F50087]"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Reason for Return / Exchange</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F50087] bg-white"
              >
                <option value="size_issue">Size / Fit Issue (Request Exchange)</option>
                <option value="color_variation">Color Shade Preference</option>
                <option value="different_weave">Want to try a different saree weave</option>
                <option value="other">Other reason</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-pink-50 text-neutral-700 text-[11px] space-y-1">
              <p>• Items must be unused, unwashed, and in original packaging.</p>
              <p>• Reverse pickup is 100% free of charge across all Indian PIN codes.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F50087] hover:bg-[#C90070] text-white py-3 rounded-full font-bold text-xs shadow-md transition-colors"
            >
              Submit Return Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
