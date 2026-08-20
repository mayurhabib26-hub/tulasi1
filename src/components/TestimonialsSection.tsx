import React from 'react';
import { REVIEWS } from '../data/categories';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F50087]">
            Loved by 25,000+ Patrons
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] mt-1 font-heading">
            Stories from Our Tulasi Family
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Real feedback from connoisseurs of Indian handlooms, festive couture, and breathable everyday cottons.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-[#FFF2F8]/70 p-6 sm:p-8 rounded-3xl border border-pink-100/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative"
            >
              <div className="absolute top-6 right-6 text-pink-200">
                <Quote className="w-8 h-8 rotate-180" />
              </div>

              <div className="space-y-3 relative z-10">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 className="font-bold text-base text-[#191919] leading-snug">
                  "{review.title}"
                </h3>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light">
                  {review.comment}
                </p>

                {review.productName && (
                  <div className="pt-2">
                    <span className="text-[11px] text-[#168C78] font-medium bg-white/80 px-2.5 py-1 rounded-full border border-teal-100 inline-block">
                      Item: {review.productName}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer Profile info */}
              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-pink-200/60">
                <img
                  src={review.avatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#191919]">{review.userName}</h4>
                    {review.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#168C78]" title="Verified Buyer" />
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500">{review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
