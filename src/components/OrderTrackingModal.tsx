import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Search, Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, orders } = useShop();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  if (!isTrackOrderOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = query.trim().toUpperCase();
    const found = orders.find(
      (o) => o.orderId.toUpperCase() === clean || o.trackingNumber.toUpperCase() === clean
    );

    if (found) {
      setResult(found);
    } else if (clean) {
      // Mock generated tracking timeline for demo
      setResult({
        orderId: clean.startsWith('TUL-') ? clean : `TUL-${clean}`,
        trackingNumber: `DTDC98721903IN`,
        estimatedDelivery: '3-4 Days (In Transit)',
        paymentStatus: 'Paid (Prepaid)',
        items: [{ product: { name: 'Pure Handloom Silk Ensemble' }, quantity: 1 }]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pink-100 relative">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#168C78]" />
            <h3 className="font-bold text-base text-[#191919]">Track Shipment Status</h3>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-[#191919]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleTrack} className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. TUL-819203) or AWB..."
            className="flex-1 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#F50087]"
          />
          <button
            type="submit"
            className="bg-[#F50087] hover:bg-[#C90070] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs"
          >
            Track
          </button>
        </form>

        {searched && result && (
          <div className="mt-6 p-4 rounded-2xl bg-[#FFF2F8] border border-pink-200 text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-pink-200/80 pb-2">
              <span className="font-bold text-[#191919]">{result.orderId}</span>
              <span className="text-[#168C78] font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                In Transit (On Schedule)
              </span>
            </div>

            {/* Stepper */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#168C78]" />
                <div>
                  <p className="font-bold text-[#191919]">Handloom Quality Check & Packaging Complete</p>
                  <p className="text-[10px] text-neutral-500">Bengaluru Fulfillment Hub</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#F50087]" />
                <div>
                  <p className="font-bold text-[#F50087]">Dispatched via Express Courier</p>
                  <p className="text-[10px] text-neutral-500">AWB #{result.trackingNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <Clock className="w-4 h-4 text-neutral-400" />
                <div>
                  <p className="font-bold text-neutral-700">Out for Doorstep Delivery</p>
                  <p className="text-[10px] text-neutral-500">Expected: {result.estimatedDelivery || 'In 2 days'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {searched && !result && (
          <p className="text-xs text-neutral-500 mt-4 text-center">No order found with this tracking number.</p>
        )}
      </div>
    </div>
  );
};
