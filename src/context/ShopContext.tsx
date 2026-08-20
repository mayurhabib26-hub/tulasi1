import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, WishlistItem, FilterState, Order, DeliveryAddress } from '../types';
import { PRODUCTS } from '../data/products';

export type ActiveView = 
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'order-success'
  | 'about'
  | 'track'
  | 'contact';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  description: string;
}

interface ShopContextType {
  // Navigation & Views
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  navigateToProduct: (productId: string) => void;
  navigateToCategory: (categorySlug: string) => void;
  navigateToShop: (filterOverrides?: Partial<FilterState>) => void;

  // Products
  products: Product[];
  selectedProduct: Product | null;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartShipping: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  moveToWishlistFromCart: (index: number) => void;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;

  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isReturnsModalOpen: boolean;
  setIsReturnsModalOpen: (open: boolean) => void;

  // Orders
  latestOrder: Order | null;
  createOrder: (address: DeliveryAddress, paymentMethod: Order['paymentMethod']) => Order;
  orders: Order[];

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Helpers
  formatPrice: (amount: number) => string;
}

const initialFilters: FilterState = {
  category: 'all',
  priceRange: [500, 10000],
  sizes: [],
  colors: [],
  fabrics: [],
  occasions: [],
  discount: 0,
  searchQuery: '',
  sortBy: 'featured'
};

const VALID_COUPONS: Record<string, Coupon> = {
  'TULASI10': { code: 'TULASI10', discountPercent: 10, description: '10% OFF on all orders' },
  'FESTIVE500': { code: 'FESTIVE500', flatDiscount: 500, description: '₹500 Flat OFF for festive shopping' },
  'FREESHIP': { code: 'FREESHIP', flatDiscount: 99, description: 'Free Express Shipping' }
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart & Wishlist with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tulasi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('tulasi_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tulasi_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState(false);

  // Filters & Search
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tulasi_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tulasi_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('tulasi_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView, selectedProductId]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product');
    setQuickViewProduct(null);
  };

  const navigateToCategory = (categorySlug: string) => {
    setFilters((prev) => ({
      ...prev,
      category: categorySlug
    }));
    setActiveView('shop');
  };

  const navigateToShop = (filterOverrides?: Partial<FilterState>) => {
    if (filterOverrides) {
      setFilters((prev) => ({ ...prev, ...filterOverrides }));
    }
    setActiveView('shop');
  };

  // Cart operations
  const addToCart = (product: Product, color?: string, size?: string, quantity: number = 1) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenSize = size || product.sizes[0] || 'Free Size';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
            quantity,
            addedAt: Date.now()
          }
        ];
      }
    });

    addToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.name} (${chosenSize}) added successfully.`
    });
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index].quantity = quantity;
      }
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => {
      const item = prev[index];
      if (item) {
        addToast({
          type: 'info',
          title: 'Removed from Bag',
          message: `${item.product.name} was removed.`
        });
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const moveToWishlistFromCart = (index: number) => {
    const item = cart[index];
    if (!item) return;

    toggleWishlist(item.product);
    removeFromCart(index);
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.product.id === product.id);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: `${product.name} removed from your saved items.`
        });
        return prev.filter((w) => w.product.id !== product.id);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist',
          message: `${product.name} added to your wishlist.`
        });
        return [...prev, { product, addedAt: Date.now() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((w) => w.product.id === productId);
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((w) => w.product.id !== product.id));
  };

  // Coupon handling
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = VALID_COUPONS[cleanCode];

    if (!coupon) {
      addToast({
        type: 'error',
        title: 'Invalid Coupon',
        message: 'Please enter a valid promo code like TULASI10 or FESTIVE500.'
      });
      return { success: false, message: 'Invalid coupon code' };
    }

    setAppliedCoupon(coupon);
    addToast({
      type: 'success',
      title: 'Coupon Applied!',
      message: `${coupon.description}`
    });
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast({
      type: 'info',
      title: 'Coupon Removed',
      message: 'Promo discount has been removed.'
    });
  };

  // Price calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      cartDiscount = Math.min(appliedCoupon.flatDiscount, cartSubtotal);
    }
  }

  // Free shipping on orders above ₹999, else ₹99
  const cartShipping = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 99;
  const cartTax = Math.round((cartSubtotal - cartDiscount) * 0.05); // 5% GST on apparel/textiles
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartTax + cartShipping);

  // Filter helpers
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  // Order creation
  const createOrder = (address: DeliveryAddress, paymentMethod: Order['paymentMethod']): Order => {
    const orderNum = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      orderId: `TUL-${orderNum}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      items: [...cart],
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      shipping: cartShipping,
      total: cartTotal,
      couponCode: appliedCoupon?.code,
      trackingNumber: `DTDC${Math.floor(80000000 + Math.random() * 10000000)}IN`,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-IN',
        { weekday: 'short', day: 'numeric', month: 'short' }
      )
    };

    setLatestOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveView('order-success');
    return newOrder;
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || null;

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        navigateToProduct,
        navigateToCategory,
        navigateToShop,
        products: PRODUCTS,
        selectedProduct,

        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartShipping,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        moveToWishlistFromCart,

        appliedCoupon,
        applyCoupon,
        removeCoupon,

        wishlist,
        wishlistCount: wishlist.length,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,

        filters,
        setFilters,
        updateFilter,
        resetFilters,
        searchQuery,
        setSearchQuery,

        quickViewProduct,
        setQuickViewProduct,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isReturnsModalOpen,
        setIsReturnsModalOpen,

        latestOrder,
        createOrder,
        orders,

        toasts,
        addToast,
        removeToast,

        formatPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
