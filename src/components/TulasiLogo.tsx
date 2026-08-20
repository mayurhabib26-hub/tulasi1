import React from 'react';
import tulasiLogoImage from '../../assets/tulsi.jpg';

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

  const LogoBadge = (
    <div
      className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden"
      style={{ width: currentSize.badge, height: currentSize.badge }}
    >
      <img
        src={tulasiLogoImage}
        alt="Tulasi - Indian Textiles and Clothing"
        className="w-full h-full object-cover drop-shadow-sm"
      />
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
