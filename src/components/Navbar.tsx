import React, { useState, useEffect, useRef } from 'react';
import { TulasiLogo } from './TulasiLogo';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Flame, 
  ChevronDown, 
  Tag, 
  Check, 
  Package, 
  LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    navigateToCategory,
    navigateToShop,
    navigateToProduct,
    products,
    searchQuery,
    setSearchQuery,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    orders,
    setIsTrackOrderOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search live preview
  const searchMatches = searchQuery.trim() === ''
    ? []
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.occasion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToShop({ searchQuery });
      setIsSearchExpanded(false);
    }
  };

  const searchSuggestionsContent = (
    <>
      <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-2 mb-2">
        Matching Collections & Products
      </p>

      {searchMatches.length > 0 ? (
        <div className="space-y-1">
          {searchMatches.map((item) => (
            <div
              key={item.id}
              id={`search-item-${item.id}`}
              onClick={() => {
                navigateToProduct(item.id);
                setSearchQuery('');
                setIsSearchExpanded(false);
              }}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FFF2F8] cursor-pointer transition-colors group"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#191919] group-hover:text-[#F50087] truncate">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <span>{item.categoryLabel}</span>
                  <span>•</span>
                  <span className="font-semibold text-[#168C78]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            id="search-view-all-results-btn"
            onClick={() => {
              navigateToShop({ searchQuery });
              setSearchQuery('');
              setIsSearchExpanded(false);
            }}
            className="w-full text-center py-2 text-xs font-semibold text-[#F50087] hover:bg-pink-50 rounded-xl mt-2 transition-colors"
          >
            View all results for "{searchQuery}" →
          </button>
        </div>
      ) : (
        <div className="p-4 text-center text-xs text-neutral-500">
          No matches found for "{searchQuery}". Try "Banarasi", "Kurti", or "Silk".
        </div>
      )}
    </>
  );

  const navLinks = [
    { label: 'Home', view: 'home', onClick: () => setActiveView('home') },
    { 
      label: 'New Arrivals', 
      view: 'shop', 
      highlight: true, 
      onClick: () => navigateToShop({ sortBy: 'newest', category: 'all' }) 
    },
    { 
      label: 'Women', 
      view: 'shop', 
      onClick: () => navigateToCategory('sarees') 
    },
    { 
      label: 'Men', 
      view: 'shop', 
      onClick: () => navigateToCategory('mens-wear') 
    },
    { 
      label: 'Kids', 
      view: 'shop', 
      onClick: () => navigateToCategory('kids-wear') 
    },
    { 
      label: 'Fabrics', 
      view: 'shop', 
      onClick: () => navigateToCategory('fabrics') 
    },
    { 
      label: 'Collections', 
      view: 'shop', 
      onClick: () => navigateToShop({ category: 'all' }) 
    },
    { 
      label: 'Sale %', 
      view: 'shop', 
      isSale: true, 
      onClick: () => navigateToShop({ discount: 20 }) 
    }
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-pink-100'
          : 'bg-white/90 backdrop-blur-sm border-b border-pink-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#191919] hover:text-[#F50087] hover:bg-pink-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Tulasi Main Brand Logo */}
            <TulasiLogo
              size={isScrolled ? 'sm' : 'md'}
              onClick={() => setActiveView('home')}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={link.onClick}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  link.isSale
                    ? 'text-[#F50087] font-semibold hover:bg-pink-50'
                    : 'text-[#191919] hover:text-[#F50087] hover:bg-pink-50/50'
                }`}
              >
                <span className="flex items-center gap-1">
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F50087] inline-block" />
                  )}
                  {link.label}
                  {link.isSale && (
                    <span className="text-[10px] bg-[#F50087] text-white px-1.5 py-0.5 rounded-full font-bold">
                      UP TO 30%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input / Button */}
            <div className="relative">
              {/* Mobile: icon-only trigger that opens a full-width overlay (input is unreachable via focus while hidden) */}
              <button
                type="button"
                id="navbar-search-btn-mobile"
                onClick={() => setIsSearchExpanded(true)}
                className="sm:hidden p-2.5 text-neutral-600 hover:text-[#F50087] hover:bg-pink-50 rounded-full transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Tablet / Desktop: inline expanding search */}
              <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center">
                <div
                  className={`flex items-center bg-[#FFF2F8] border rounded-full transition-all duration-300 ${
                    isSearchExpanded
                      ? 'w-80 border-[#F50087] ring-2 ring-pink-200'
                      : 'w-56 lg:w-64 border-pink-200 focus-within:border-[#F50087]'
                  }`}
                >
                  <button
                    type="submit"
                    id="navbar-search-btn"
                    className="p-2.5 text-neutral-600 hover:text-[#F50087] transition-colors"
                    aria-label="Search items"
                  >
                    <Search className="w-4 h-4" />
                  </button>

                  <input
                    ref={searchInputRef}
                    type="text"
                    id="navbar-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    placeholder="Search silk sarees, kurtis, fabrics..."
                    className="bg-transparent text-sm text-[#191919] placeholder-neutral-400 focus:outline-none pr-3 py-2 w-full"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-neutral-400 hover:text-[#191919] mr-2"
                      aria-label="Clear search text"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Desktop Live Search Suggestions Dropdown */}
              {isSearchExpanded && searchQuery.trim() !== '' && (
                <div
                  id="search-live-suggestions"
                  className="hidden sm:block absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-pink-100 p-3 z-50 animate-fadeIn"
                >
                  {searchSuggestionsContent}
                </div>
              )}
            </div>

            {/* Mobile Full-Width Search Overlay */}
            {isSearchExpanded && (
              <div
                id="mobile-search-overlay"
                className="sm:hidden fixed inset-x-0 top-0 z-50 bg-white border-b border-pink-100 shadow-lg p-3 max-h-screen overflow-y-auto"
              >
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-[#FFF2F8] border border-[#F50087] ring-2 ring-pink-200 rounded-full">
                    <button type="submit" className="p-2.5 text-neutral-600" aria-label="Search items">
                      <Search className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      id="navbar-search-input-mobile"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search silk sarees, kurtis..."
                      autoFocus
                      className="bg-transparent text-sm text-[#191919] placeholder-neutral-400 focus:outline-none pr-3 py-2 w-full min-w-0"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="p-1 text-neutral-400 hover:text-[#191919] mr-2"
                        aria-label="Clear search text"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery('');
                    }}
                    className="p-2 text-neutral-500 hover:text-[#191919] flex-shrink-0"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>

                {searchQuery.trim() !== '' && (
                  <div id="search-live-suggestions-mobile" className="mt-3 animate-fadeIn">
                    {searchSuggestionsContent}
                  </div>
                )}
              </div>
            )}

            {/* Account Profile Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                id="navbar-account-btn"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="p-2 rounded-full text-neutral-700 hover:text-[#F50087] hover:bg-pink-50 transition-colors relative"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </button>

              {isAccountMenuOpen && (
                <div
                  id="account-dropdown-menu"
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 z-50"
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="text-xs text-neutral-400">Welcome to Tulasi</p>
                    <p className="text-sm font-bold text-[#191919]">Ethnic Connoisseur</p>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      id="account-track-orders-btn"
                      onClick={() => {
                        setIsTrackOrderOpen(true);
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-700 hover:text-[#F50087] hover:bg-[#FFF2F8] rounded-xl transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#168C78]" />
                      <span>My Orders & Tracking ({orders.length})</span>
                    </button>

                    <button
                      id="account-saved-wishlist-btn"
                      onClick={() => {
                        setIsWishlistOpen(true);
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-700 hover:text-[#F50087] hover:bg-[#FFF2F8] rounded-xl transition-colors"
                    >
                      <Heart className="w-4 h-4 text-[#F50087]" />
                      <span>Wishlist ({wishlistCount})</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 px-3">
                    <p>Free pan-India shipping & express support.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon Button */}
            <button
              id="navbar-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full text-neutral-700 hover:text-[#F50087] hover:bg-pink-50 transition-colors relative"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span
                  id="wishlist-badge-count"
                  className="absolute -top-1 -right-1 bg-[#F50087] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow"
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#F50087] hover:bg-[#C90070] text-white px-3.5 py-2 rounded-full shadow-md hover:shadow-pink-200 transition-all group"
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-pink-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-4 space-y-3">
              {/* Category Quick Chips */}
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-neutral-100">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    id={`mobile-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => {
                      link.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      link.isSale
                        ? 'bg-pink-50 text-[#F50087] font-bold'
                        : 'hover:bg-[#FFF2F8] text-[#191919]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Service shortcuts for mobile */}
              <div className="flex items-center justify-between text-xs text-neutral-600 pt-2">
                <button
                  id="mobile-track-order-btn"
                  onClick={() => {
                    setIsTrackOrderOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[#168C78] font-semibold hover:underline"
                >
                  Track Recent Order
                </button>
                <span>Free Shipping &gt; ₹999</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
