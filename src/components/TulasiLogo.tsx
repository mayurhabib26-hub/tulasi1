import React from 'react';

interface TulasiLogoProps {
  variant?: 'badge' | 'full' | 'compact' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const TulasiLogo: React.FC<TulasiLogoProps> = ({
  variant = 'full',
  size = 'md',
  showTagline = true,
  className = '',
  onClick
}) => {
  const sizeMap = {
    sm: { badge: 36, text: 'text-xl', tag: 'text-[9px]' },
    md: { badge: 48, text: 'text-2xl', tag: 'text-[11px]' },
    lg: { badge: 64, text: 'text-3xl', tag: 'text-xs' },
    xl: { badge: 84, text: 'text-4xl', tag: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  // SVG badge exactly matching the uploaded circular logo
  const LogoBadge = (
    <div
      className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      style={{ width: currentSize.badge, height: currentSize.badge }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer White Ring */}
        <circle cx="80" cy="80" r="78" fill="#F50087" stroke="#FFFFFF" strokeWidth="4" />
        
        {/* Female Silhouette & Floral Motif (Stylized T) */}
        <path
          d="M48 48 C 50 38, 54 34, 52 30 C 50 26, 44 26, 44 26 C 44 26, 42 34, 46 42 C 43 45, 38 48, 38 52 C 38 58, 44 60, 46 64 C 42 66, 32 72, 32 82 C 32 94, 42 104, 56 104 C 68 104, 76 96, 76 86 C 76 74, 62 66, 52 64 C 48 62, 46 58, 48 48 Z"
          fill="#FFFFFF"
        />

        {/* Delicate Facial Profile Outline & Curl */}
        <path
          d="M44 38 C 42 42, 38 46, 36 50 C 34 54, 34 57, 36 60 C 37 62, 39 63, 39 65 C 38 67, 34 71, 32 76 C 28 84, 30 96, 38 106 C 46 116, 58 120, 68 116 C 76 112, 80 102, 78 94 C 76 84, 66 80, 58 78 C 52 76, 48 72, 48 66 C 48 58, 54 52, 54 44 C 54 36, 48 34, 44 38 Z"
          fill="#FFFFFF"
        />

        {/* Floating Leaves above head (White & Green Leaflets) */}
        {/* Leaf 1 (Top Left Leaf) */}
        <path
          d="M54 34 C 60 30, 68 32, 70 38 C 64 42, 56 40, 54 34 Z"
          fill="#FFFFFF"
        />
        {/* Leaf 2 (Main Leaflet) */}
        <path
          d="M58 44 C 68 40, 80 44, 82 52 C 72 56, 62 52, 58 44 Z"
          fill="#FFFFFF"
        />
        <path
          d="M60 44 C 70 42, 78 46, 80 50 C 72 53, 64 50, 60 44 Z"
          fill="#168C78"
          opacity="0.9"
        />

        {/* Wordmark "Tulasi" typography inside badge */}
        <g fill="#FFFFFF">
          {/* T Stem */}
          <path d="M74 76 L100 76 L100 82 L89 82 L89 104 L83 104 L83 82 L74 82 Z" />
          
          {/* u */}
          <path d="M102 86 L107 86 L107 98 C 107 101, 109 103, 112 103 C 115 103, 117 101, 117 98 L117 86 L122 86 L122 99 C 122 103, 117 105, 112 105 C 107 105, 102 103, 102 99 Z" />

          {/* l */}
          <path d="M125 76 L130 76 L130 104 L125 104 Z" />

          {/* a */}
          <path d="M133 95 C 133 90, 137 86, 142 86 C 147 86, 149 89, 149 93 L149 104 L145 104 L145 102 C 144 104, 141 105, 139 105 C 135 105, 133 102, 133 99 C 133 96, 136 94, 140 93 L145 92 L145 91 C 145 89, 143 88, 141 88 C 139 88, 137 89, 137 91 Z M145 96 L141 97 C 139 97, 137 98, 137 100 C 137 102, 139 103, 141 103 C 143 103, 145 101, 145 99 Z" />
        </g>

        {/* Tulasi Sacred Tree sprouting from 'i' with Green Foliage */}
        {/* Tree Trunk / i stem */}
        <path
          d="M130 104 C 130 96, 134 90, 136 84 C 138 78, 138 72, 137 66 L133 66 C 133 72, 130 78, 127 84 C 125 88, 124 96, 124 104 Z"
          fill="#FFFFFF"
        />
        {/* Tree Base Root / Flurry */}
        <path
          d="M120 104 L138 104 C 136 102, 135 101, 134 100 L124 100 C 123 101, 122 102, 120 104 Z"
          fill="#FFFFFF"
        />

        {/* Tulasi Tree Green Leaves (#168C78) */}
        {/* Branch Left Leaf */}
        <ellipse cx="125" cy="62" rx="4.5" ry="3" transform="rotate(-30 125 62)" fill="#168C78" />
        <ellipse cx="120" cy="68" rx="4" ry="2.5" transform="rotate(-40 120 68)" fill="#168C78" />
        <ellipse cx="122" cy="76" rx="3.5" ry="2.5" transform="rotate(-20 122 76)" fill="#168C78" />
        
        {/* Branch Right Leaf */}
        <ellipse cx="138" cy="60" rx="4.5" ry="3" transform="rotate(30 138 60)" fill="#168C78" />
        <ellipse cx="144" cy="67" rx="4" ry="2.5" transform="rotate(40 144 67)" fill="#168C78" />
        <ellipse cx="140" cy="74" rx="3.5" ry="2.5" transform="rotate(20 140 74)" fill="#168C78" />
        
        {/* Top Center Leaf Cluster */}
        <ellipse cx="132" cy="54" rx="4" ry="5" fill="#168C78" />
        <ellipse cx="132" cy="54" rx="2.5" ry="3.5" fill="#2DD4BF" opacity="0.6" />
      </svg>
    </div>
  );

  if (variant === 'badge') {
    return (
      <div
        id="tulasi-brand-badge"
        onClick={onClick}
        className={`inline-flex items-center cursor-pointer select-none group ${className}`}
        role="button"
        tabIndex={0}
        aria-label="Tulasi Indian Textiles Brand Logo"
      >
        {LogoBadge}
      </div>
    );
  }

  return (
    <div
      id="tulasi-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Tulasi - Indian Textiles and Clothing"
    >
      {LogoBadge}
      
      {variant !== 'compact' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-heading font-bold tracking-wider ${currentSize.text} text-[#191919] group-hover:text-[#F50087] transition-colors`}
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
            >
              TULASI
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#168C78] inline-block mb-1" />
          </div>
          {showTagline && (
            <span
              className={`text-[#168C78] font-medium tracking-widest uppercase mt-0.5 ${currentSize.tag}`}
              style={{ letterSpacing: '0.18em' }}
            >
              Indian Textiles & Weaves
            </span>
          )}
        </div>
      )}
    </div>
  );
};
