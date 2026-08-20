export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'sarees' | 'kurtis' | 'dress-materials' | 'mens-wear' | 'kids-wear' | 'fabrics';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: {
    name: string;
    hex: string;
    bgClass?: string;
  }[];
  sizes: string[];
  fabric: string;
  weave?: string;
  occasion: 'Festive' | 'Bridal & Wedding' | 'Casual' | 'Daily Wear' | 'Work & Office' | 'Party';
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  details: string[];
  careInstructions: string[];
  blouseIncluded?: boolean;
  metersPerUnit?: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  itemCount: number;
  tag: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export interface CustomerReview {
  id: string;
  userName: string;
  city: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  productName?: string;
  avatar?: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  fabrics: string[];
  occasions: string[];
  discount: number;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'discount';
}

export interface DeliveryAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'work' | 'other';
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingAddress: DeliveryAddress;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';
  paymentStatus: 'paid' | 'pending';
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode?: string;
  trackingNumber: string;
  estimatedDelivery: string;
}
