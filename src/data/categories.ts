import { CategoryItem, CustomerReview } from '../types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-sarees',
    slug: 'sarees',
    title: 'Sarees',
    subtitle: 'Banarasi, Kanjivaram & Cotton Handlooms',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    itemCount: 48,
    tag: 'Pure Handloom'
  },
  {
    id: 'cat-kurtis',
    slug: 'kurtis',
    title: 'Kurtis & Sets',
    subtitle: 'Chikankari, Chanderi & Festive Sets',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    itemCount: 65,
    tag: 'Trending Now'
  },
  {
    id: 'cat-dress-materials',
    slug: 'dress-materials',
    title: 'Dress Materials',
    subtitle: 'Ajrakh, Ikat & Cotton-Silk Unstitched Sets',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80',
    itemCount: 34,
    tag: 'Custom Tailoring'
  },
  {
    id: 'cat-mens',
    slug: 'mens-wear',
    title: "Men’s Wear",
    subtitle: 'Raw Silk Kurtas, Nehru Jackets & Dhotis',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    itemCount: 28,
    tag: 'Royal Heritage'
  },
  {
    id: 'cat-kids',
    slug: 'kids-wear',
    title: "Kids’ Wear",
    subtitle: 'Festive Pattu Pavadas & Boys Kurta Sets',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    tag: 'Pure Comfort'
  },
  {
    id: 'cat-fabrics',
    slug: 'fabrics',
    title: 'Fabrics by Metre',
    subtitle: 'Tussar Ghicha, Pure Mulmul & Brocades',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    itemCount: 52,
    tag: 'Weaver Direct'
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    userName: 'Ananya Deshmukh',
    city: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Exquisite weave! The Rani Pink Banarasi saree stole the show.',
    comment: 'I ordered the Rani Pink Pure Katan Saree for my cousin’s wedding. The zari work is so delicate and lightweight, yet it looks extraordinarily regal. Beautiful packaging with a scented cloth pouch too!',
    date: '14 May 2026',
    verifiedPurchase: true,
    productName: 'Rani Pink Pure Katan Banarasi Silk Saree',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-2',
    userName: 'Meera Sundaram',
    city: 'Chennai, Tamil Nadu',
    rating: 5,
    title: 'Breathable Mulmul cotton with genuine Lucknowi Chikankari',
    comment: 'Living in Chennai heat, pure breathable fabrics are a blessing. The Chikankari Kurti is super soft, authentic hand embroidery, and fit accurately as per the size chart. Arrived within 3 days!',
    date: '28 Apr 2026',
    verifiedPurchase: true,
    productName: 'Mulmul Cotton Hand-Embroidered Chikankari Kurti',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'rev-3',
    userName: 'Rajesh & Pooja Varma',
    city: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'Matching festive outfits for our family Diwali celebration',
    comment: 'We purchased the men’s raw silk kurta along with the little one’s Pattu Pavada and Chanderi suit. The fabric quality, color richness, and seamless COD delivery made Tulasi our go-to family ethnic store.',
    date: '10 Apr 2026',
    verifiedPurchase: true,
    productName: 'Royal Heritage Raw Silk Men’s Kurta Set',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    caption: 'Draped in heritage gold zari for wedding season ✨ #TulasiSarees #PureBanarasi',
    likes: 1240,
    comments: 48,
    author: '@priya_sharma'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    caption: 'Teal Chanderi sets making everyday mornings effortless 🌿 #TulasiEveryday',
    likes: 890,
    comments: 29,
    author: '@thecontemporaryethnic'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    caption: 'Pure Mulmul Chikankari keeping it cool and chic 🌸 #TulasiCotton',
    likes: 1560,
    comments: 63,
    author: '@divya.nair'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    caption: 'Classic Raw Silk for festive evenings. Regality redefined. #TulasiMen',
    likes: 740,
    comments: 18,
    author: '@aditya_kapoor'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80',
    caption: 'Little princess in our signature Pattu Pavada! 💖 #TulasiKids',
    likes: 2100,
    comments: 92,
    author: '@sneha_and_anya'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80',
    caption: 'Raw Tussar & Ajrakh textures that tell a million artisan stories 🧵 #ArtisanTextiles',
    likes: 1120,
    comments: 34,
    author: '@textile_diaries'
  }
];
