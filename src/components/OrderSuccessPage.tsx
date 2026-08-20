import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, Share2, MapPin } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { latestOrder, formatPrice, setActiveView } = useShop();

  if (!latestOrder) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-neutral-600">No active order found.</p>
        <button
          onClick={() => setActiveView('home')}
          className="mt-4 bg-[#F50087] text-white px-6 py-2 rounded-full text-xs font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div id="order-success-page" className="py-12 bg-[#FFF2F8]/50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-xl text-center space-y-6">
          
          {/* Animated Success Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 text-[#168C78] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 animate-bounce-slow" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#168C78]">Order Confirmed</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#191919] mt-1 font-heading">
              Thank You for Shopping at Tulasi!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2">
              Your order <strong className="text-[#F50087] font-mono">{latestOrder.orderId}</strong> has been received and is being prepared with Silk Mark certified care.
            </p>
          </div>

          {/* Tracking & Timeline Card */}
          <div className="bg-[#FFF2F8] p-5 rounded-2xl border border-pink-200 text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 border-b border-pink-200/80 pb-3">
              <div>
                <span className="text-neutral-500">Tracking AWB:</span>
                <span className="font-mono font-bold text-[#191919] ml-1.5">{latestOrder.trackingNumber}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#168C78] font-bold">
                <Truck className="w-4 h-4" />
                <span>Est. Delivery: {latestOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-neutral-700 pt-1">
              <MapPin className="w-4 h-4 text-[#F50087] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#191919]">{latestOrder.shippingAddress.fullName} ({latestOrder.shippingAddress.phone})</p>
                <p className="text-neutral-600">{latestOrder.shippingAddress.addressLine1}, {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} - {latestOrder.shippingAddress.pincode}</p>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="text-left border-t border-neutral-100 pt-4 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">Items in this shipment</h3>
            {latestOrder.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-bold text-[#191919]">{item.product.name}</p>
                    <p className="text-neutral-500">{item.selectedSize} • {item.selectedColor} • Qty {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-[#F50087]">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}

            <div className="pt-2 text-xs flex justify-between font-bold text-[#191919]">
              <span>Total Paid ({latestOrder.paymentMethod.toUpperCase()}):</span>
              <span className="text-base text-[#F50087]">{formatPrice(latestOrder.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveView('home')}
              className="bg-[#F50087] hover:bg-[#C90070] text-white px-8 py-3 rounded-full text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 px-6 py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
