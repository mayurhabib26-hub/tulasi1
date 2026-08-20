import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubscribed(true);
    addToast({
      type: 'success',
      title: 'Subscribed Successfully!',
      message: 'Check your inbox for a special 10% welcome discount code.'
    });
  };

  return (
    <section id="newsletter-section" className="py-14 bg-[#191919] text-white relative overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-[#F50087]/20 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-80 h-80 rounded-full bg-[#168C78]/20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-pink-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F50087]" />
          <span>Exclusive Handloom Previews</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          Stay in Style with Tulasi
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-xl mx-auto font-light">
          Subscribe to receive early invitations to festive artisan drops, VIP weaver exhibitions, and a flat ₹500 voucher on your first order.
        </p>

        {isSubscribed ? (
          <div className="mt-8 p-6 rounded-2xl bg-white/10 border border-[#168C78] max-w-md mx-auto flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#168C78]" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">You're on the VIP list!</p>
              <p className="text-xs text-neutral-300">Welcome coupon code: <strong className="text-pink-300">TULASI10</strong></p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="email"
                id="newsletter-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-white/10 border border-white/20 focus:border-[#F50087] focus:bg-white/15 text-white placeholder-neutral-400 pl-10 pr-4 py-3 rounded-full text-xs sm:text-sm focus:outline-none transition-all"
                required
              />
            </div>
            <button
              type="submit"
              id="newsletter-subscribe-btn"
              className="bg-[#F50087] hover:bg-[#C90070] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-neutral-400 mt-4">
          We respect your privacy. Unsubscribe anytime with a single click.
        </p>
      </div>
    </section>
  );
};
