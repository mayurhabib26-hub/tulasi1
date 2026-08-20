import React, { useState } from 'react';
import { INSTAGRAM_POSTS } from '../data/categories';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export const StyleGallery: React.FC = () => {
  const [activePost, setActivePost] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  return (
    <section id="style-gallery-section" className="py-16 bg-[#FFF2F8]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#168C78]">
            <Instagram className="w-3.5 h-3.5 text-[#F50087]" />
            <span>@TulasiEthnics Lookbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#191919] mt-1 font-heading">
            Style Inspiration
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Tag #TulasiTradition on Instagram to be featured in our royal style showcase.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={post.image}
                alt={post.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#191919]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-3 text-center">
                <Instagram className="w-5 h-5 text-[#F50087] mb-2" />
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current text-pink-400" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-current text-teal-300" /> {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-200 mt-2 line-clamp-2">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-pink-50 text-[#191919] border border-pink-200 px-6 py-2.5 rounded-full text-xs font-semibold shadow-xs hover:border-[#F50087] transition-all"
          >
            <Instagram className="w-4 h-4 text-[#F50087]" />
            <span>Follow @Tulasi on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
