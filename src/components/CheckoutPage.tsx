import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { DeliveryAddress, Order } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Landmark, 
  Wallet, 
  Banknote, 
  ArrowLeft, 
  Lock, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh', 'Jammu & Kashmir', 'Ladakh'
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartShipping,
    cartTotal,
    appliedCoupon,
    formatPrice,
    createOrder,
    setActiveView,
    addToast
  } = useShop();

  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: 'Ananya Sharma',
    phone: '9876543210',
    email: 'ananya.sharma@example.com',
    addressLine1: 'Flat 402, Sai Residency, 5th Cross',
    addressLine2: 'Indiranagar 1st Stage',
    landmark: 'Near BDA Complex',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    addressType: 'home'
  });

  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-[#191919]">No Items to Checkout</h2>
        <p className="text-xs text-neutral-600 mt-2">Your bag is currently empty.</p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-6 bg-[#F50087] text-white px-6 py-2.5 rounded-full text-xs font-semibold"
        >
          Explore Tulasi Collections
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!/^\d{10}$/.test(address.phone.trim())) errs.phone = 'Enter valid 10-digit mobile number';
    if (!address.email.includes('@')) errs.email = 'Enter a valid email address';
    if (!address.addressLine1.trim()) errs.addressLine1 = 'House number and street required';
    if (!address.city.trim()) errs.city = 'City is required';
    if (!address.state.trim()) errs.state = 'State is required';
    if (!/^\d{6}$/.test(address.pincode.trim())) errs.pincode = 'Enter valid 6-digit Indian PIN code';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast({
        type: 'error',
        title: 'Incomplete Address',
        message: 'Please complete all required shipping fields correctly.'
      });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      createOrder(address, paymentMethod);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div id="checkout-page" className="py-10 bg-[#FFF2F8]/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setActiveView('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#F50087] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Shipping & Payment Details Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F50087] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-bold text-base text-[#191919]">Delivery Address (India)</h2>
                </div>
                <span className="text-[11px] text-[#168C78] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="e.g. Priya Iyer"
                  />
                  {errors.fullName && <p className="text-rose-600 text-[10px] mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Phone Number (+91) *</label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '') })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <p className="text-rose-600 text-[10px] mt-1">{errors.phone}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Email for Invoice & Tracking *</label>
                  <input
                    type="email"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-rose-600 text-[10px] mt-1">{errors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-neutral-700 mb-1">Flat / Building / House No. / Street *</label>
                  <input
                    type="text"
                    value={address.addressLine1}
                    onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="Street, area, or society name"
                  />
                  {errors.addressLine1 && <p className="text-rose-600 text-[10px] mt-1">{errors.addressLine1}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">Nearby Landmark (Optional)</label>
                  <input
                    type="text"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="e.g. Opposite Metro Pillar 42"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">6-Digit PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="e.g. 560038"
                  />
                  {errors.pincode && <p className="text-rose-600 text-[10px] mt-1">{errors.pincode}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087]"
                    placeholder="e.g. Bengaluru"
                  />
                  {errors.city && <p className="text-rose-600 text-[10px] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">State / UT *</label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#F50087] bg-white cursor-pointer"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Choices */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#F50087] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-bold text-base text-[#191919]">Select Payment Method</h2>
                </div>
                <span className="text-[11px] bg-pink-100 text-[#F50087] px-2 py-0.5 rounded-full font-bold">
                  Demo Mode Active
                </span>
              </div>

              {/* Notice that this is demonstration payment */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Demonstration Notice:</strong> This checkout runs in demo mode. No actual money will be charged to your bank account or card. Placing an order generates an authentic verified tracking slip!
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {/* UPI Option */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-[#F50087] bg-[#FFF2F8] shadow-xs' : 'border-neutral-200 hover:border-pink-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 accent-[#F50087]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#191919]">Instant UPI / QR Code</span>
                      <Smartphone className="w-4 h-4 text-[#168C78]" />
                    </div>
                    <p className="text-neutral-500 mt-0.5">Google Pay, PhonePe, Paytm, CRED or any UPI App</p>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-pink-200/80 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 text-[11px] font-bold text-[#191919]">GPay</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 text-[11px] font-bold text-[#191919]">PhonePe</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 text-[11px] font-bold text-[#191919]">Paytm UPI</span>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 text-[11px] font-bold text-[#191919]">Scan QR</span>
                      </div>
                    )}
                  </div>
                </label>

                {/* Credit / Debit Card */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-[#F50087] bg-[#FFF2F8] shadow-xs' : 'border-neutral-200 hover:border-pink-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 accent-[#F50087]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#191919]">Credit / Debit Card</span>
                      <CreditCard className="w-4 h-4 text-[#F50087]" />
                    </div>
                    <p className="text-neutral-500 mt-0.5">RuPay, Visa, Mastercard, Diners Club</p>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-[#F50087] bg-[#FFF2F8] shadow-xs' : 'border-neutral-200 hover:border-pink-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="mt-1 accent-[#F50087]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#191919]">Net Banking</span>
                      <Landmark className="w-4 h-4 text-[#168C78]" />
                    </div>
                    <p className="text-neutral-500 mt-0.5">HDFC, SBI, ICICI, Axis, Kotak & 50+ Banks</p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#F50087] bg-[#FFF2F8] shadow-xs' : 'border-neutral-200 hover:border-pink-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-[#F50087]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#191919]">Cash on Delivery (COD)</span>
                      <Banknote className="w-4 h-4 text-[#168C78]" />
                    </div>
                    <p className="text-neutral-500 mt-0.5">Pay in cash or scan delivery agent’s QR code upon arrival</p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm sticky top-24 space-y-6">
              <h3 className="font-bold text-base text-[#191919] border-b border-neutral-100 pb-3 font-heading">
                Order Summary ({cartCount} items)
              </h3>

              {/* Items Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#191919] truncate">{item.product.name}</p>
                      <p className="text-neutral-500 text-[11px]">Qty: {item.quantity} | {item.selectedSize}</p>
                    </div>
                    <span className="font-bold text-[#F50087]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-2 text-xs pt-4 border-t border-neutral-100 text-neutral-700">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span className="font-semibold">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Savings ({appliedCoupon?.code})</span>
                    <span className="font-semibold">- {formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5% Apparel Tax)</span>
                  <span>{formatPrice(cartTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Pan-India Delivery</span>
                  <span>{cartShipping === 0 ? <strong className="text-[#168C78]">FREE</strong> : formatPrice(cartShipping)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#191919] pt-3 border-t border-pink-200">
                  <span>Amount to Pay</span>
                  <span className="text-[#F50087] text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                id="place-order-submit-btn"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-[#F50087] hover:bg-[#C90070] text-white py-4 rounded-full font-bold text-sm shadow-xl shadow-pink-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <span>Generating Order Confirmation...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Place Order • {formatPrice(cartTotal)}</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-neutral-400">
                <span>By placing order, you agree to Tulasi's Terms and 7-Day Doorstep Return Policy.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
