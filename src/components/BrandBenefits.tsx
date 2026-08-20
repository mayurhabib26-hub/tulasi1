import React from 'react';
import { Sparkles, ShieldCheck, RotateCcw, Truck, Headphones, Award } from 'lucide-react';

export const BrandBenefits: React.FC = () => {
  const benefits = [
    {
      id: 'benefit-fabrics',
      icon: <Award className="w-6 h-6 text-[#F50087]" />,
      title: '100% Quality Fabrics',
      description: 'Pure Silk Mark certified silk, genuine mulmul cotton, and hand-reeled organic weaves.'
    },
    {
      id: 'benefit-payments',
      icon: <ShieldCheck className="w-6 h-6 text-[#168C78]" />,
      title: 'Secure Payments',
      description: '256-bit encrypted checkout with UPI, Cards, NetBanking, and Cash on Delivery.'
    },
    {
      id: 'benefit-returns',
      icon: <RotateCcw className="w-6 h-6 text-[#F50087]" />,
      title: 'Easy 7-Day Returns',
      description: 'Hassle-free return & exchange pickup right from your doorstep across India.'
    },
    {
      id: 'benefit-delivery',
      icon: <Truck className="w-6 h-6 text-[#168C78]" />,
      title: 'Pan-India Free Delivery',
      description: 'Express shipping on all orders over ₹999 with real-time SMS & WhatsApp tracking.'
    },
    {
      id: 'benefit-support',
      icon: <Headphones className="w-6 h-6 text-[#F50087]" />,
      title: 'Dedicated Customer Care',
      description: 'Direct styling assistance and order queries available 7 days a week via call or chat.'
    }
  ];

  return (
    <section id="brand-benefits-section" className="py-14 bg-[#FFF2F8] border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#168C78]">
            The Tulasi Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#191919] mt-1 font-heading">
            Authenticity, Comfort & Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((b) => (
            <div
              key={b.id}
              id={b.id}
              className="bg-white p-6 rounded-2xl border border-pink-100/80 shadow-xs hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FFF2F8] flex items-center justify-center border border-pink-100">
                {b.icon}
              </div>
              <h3 className="text-sm font-bold text-[#191919]">
                {b.title}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
