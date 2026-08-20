import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'tulasi-001',
    name: 'Rani Pink Pure Katan Banarasi Silk Saree',
    slug: 'rani-pink-katan-banarasi-silk-saree',
    category: 'sarees',
    categoryLabel: 'Sarees',
    price: 6499,
    originalPrice: 8999,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 142,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Rani Pink', hex: '#F50087' },
      { name: 'Peacock Teal', hex: '#168C78' },
      { name: 'Royal Gold', hex: '#D4AF37' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    fabric: 'Pure Katan Silk',
    weave: 'Banarasi Kadwa Zari Weave',
    occasion: 'Bridal & Wedding',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    blouseIncluded: true,
    description: 'An ode to timeless Varanasi craftsmanship. Woven with pure Katan silk threads and intricate floral jaal motifs in antique gold zari, finished with an ornate meenakari pallu.',
    details: [
      'Authentic Banarasi Handloom with Silk Mark Certification',
      'Length: 5.5 metres saree + 0.8 metres unstitched brocade blouse piece',
      'Rich antique gold zari floral border and heavy pallu',
      'Lightweight, breathable luxury drape suitable for grand occasions'
    ],
    careInstructions: [
      'Strictly Dry Clean Only',
      'Store wrapped in a breathable cotton or muslin cloth',
      'Avoid direct perfume sprays onto the zari weave',
      'Iron on lowest silk setting with a protective cloth'
    ]
  },
  {
    id: 'tulasi-002',
    name: 'Teal Green Handblock Chanderi Silk Kurta Set with Dupatta',
    slug: 'teal-green-handblock-chanderi-kurta-set',
    category: 'kurtis',
    categoryLabel: 'Kurtis & Sets',
    price: 3299,
    originalPrice: 4299,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Teal Leaf', hex: '#168C78' },
      { name: 'Gulabi Pink', hex: '#F50087' },
      { name: 'Ivory Beige', hex: '#EBE5D8' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Chanderi Silk-Cotton',
    weave: 'Handblock Printed with Gota Patti Highlights',
    occasion: 'Festive',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 15,
    description: 'An elegant 3-piece festive kurta set featuring delicate handblock floral motifs on sheer Chanderi fabric, accompanied by straight trousers and an organza dupatta edged with scalloped gota work.',
    details: [
      '3-Piece Set: Kurta, Ankle Trousers, and Organza Dupatta',
      'Kurta length: 46 inches, with soft mulmul lining',
      'Round neck with button placket and 3/4 sleeves',
      'Elasticated waistband trousers with functional pocket'
    ],
    careInstructions: [
      'Dry clean recommended for first 2 washes',
      'Gentle hand wash in cold water thereafter',
      'Do not soak or bleach',
      'Medium heat iron inside out'
    ]
  },
  {
    id: 'tulasi-003',
    name: 'Unstitched Ajrakh Modal Silk Dress Material with Dupatta',
    slug: 'ajrakh-modal-silk-dress-material',
    category: 'dress-materials',
    categoryLabel: 'Dress Materials',
    price: 2499,
    originalPrice: 3200,
    discountPercentage: 22,
    rating: 4.7,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Indigo & Madder', hex: '#1E3A8A' },
      { name: 'Rani & Maroon', hex: '#991B1B' },
      { name: 'Forest Teal', hex: '#168C78' }
    ],
    sizes: ['Unstitched (Kurta: 2.5m, Bottom: 2.5m, Dupatta: 2.4m)'],
    fabric: 'Pure Modal Silk',
    weave: 'Traditional Kutch Ajrakh Handblock Print',
    occasion: 'Daily Wear',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 20,
    description: 'Premium unstitched dress material handcrafted using natural vegetable dyes by Kutch artisans. Lustrous modal silk feel with intricate geometric and floral patterns.',
    details: [
      'Top Fabric: 2.5 Metres Pure Modal Silk (Ajrakh Block Printed)',
      'Bottom Fabric: 2.5 Metres Solid Cotton-Silk',
      'Dupatta: 2.4 Metres Pure Modal Silk with Zari Border',
      'Customizable to any cut, neckline or sleeve style'
    ],
    careInstructions: [
      'Wash separately in cold water with mild detergent',
      'Natural dyes may release excess tint during initial wash',
      'Dry in shade away from direct sunlight'
    ]
  },
  {
    id: 'tulasi-004',
    name: 'Mulmul Cotton Hand-Embroidered Chikankari Kurti',
    slug: 'mulmul-cotton-chikankari-kurti',
    category: 'kurtis',
    categoryLabel: 'Kurtis & Sets',
    price: 1899,
    originalPrice: 2499,
    discountPercentage: 24,
    rating: 4.9,
    reviewCount: 185,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Soft Blush Pink', hex: '#FFF2F8' },
      { name: 'Mint Teal', hex: '#6EE7B7' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% Breathable Mulmul Cotton',
    weave: 'Lucknowi Hand Chikankari Embroidery',
    occasion: 'Work & Office',
    isNewArrival: true,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 32,
    description: 'Breathable, feather-light mulmul cotton kurti with exquisite Lucknowi shadow-work and bakhiya stitching. Perfect for daily elegance, office wear, and summer festivities.',
    details: [
      '100% Superfine Mulmul Cotton with matching slip included',
      'Delicate hand-embroidered floral jaal on front, back, and sleeves',
      'Straight silhouette with side slits and comfortable regular fit',
      'Length: 44 inches'
    ],
    careInstructions: [
      'Hand wash gently in cold water with liquid detergent',
      'Do not wring or brush embroidery',
      'Iron on reverse side'
    ]
  },
  {
    id: 'tulasi-005',
    name: 'Royal Heritage Raw Silk Men’s Kurta & Churidar Set',
    slug: 'royal-heritage-raw-silk-mens-kurta-set',
    category: 'mens-wear',
    categoryLabel: 'Men’s Wear',
    price: 4599,
    originalPrice: 5999,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#FDFBF7' },
      { name: 'Festive Mustard', hex: '#EAB308' },
      { name: 'Deep Teal', hex: '#168C78' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)', '46 (XXL)'],
    fabric: 'Raw Silk Blend with Cotton Lining',
    weave: 'Textured Slub Weave with Mandarin Zari Collar',
    occasion: 'Festive',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    description: 'A distinguished festive ensemble for the modern gentleman. Tailored in structured raw silk with subtle slub texture, accented with refined gold buttons and a comfortable cotton churidar.',
    details: [
      'Set contains: 1 Silk Kurta and 1 Drawstring Churidar',
      'Mandarin collar with subtle resham and zari detailing',
      'Two side inseam pockets for everyday convenience',
      'Pre-shrunk fabric ensuring consistent tailored fit'
    ],
    careInstructions: [
      'Dry Clean Recommended',
      'Low steam iron or use pressing cloth',
      'Hang on wide padded hangers'
    ]
  },
  {
    id: 'tulasi-006',
    name: 'Girls Festive Pattu Pavada Lehenga Set',
    slug: 'girls-festive-pattu-pavada-lehenga',
    category: 'kids-wear',
    categoryLabel: 'Kids’ Wear',
    price: 2699,
    originalPrice: 3500,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 41,
    images: [
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Tulasi Pink & Gold', hex: '#F50087' },
      { name: 'Emerald Teal & Yellow', hex: '#168C78' }
    ],
    sizes: ['2-3 Y', '4-5 Y', '6-7 Y', '8-9 Y', '10-12 Y'],
    fabric: 'Art Silk with 100% Cotton Lining',
    weave: 'South Indian Temple Zari Border',
    occasion: 'Festive',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 18,
    description: 'Traditional South Indian Pattu Pavada crafted with baby-soft inner cotton lining. Adorned with auspicious temple border zari weave and vibrant festive contrast.',
    details: [
      '2-Piece Set: Stitched Crop Blouse and Flared Skirt (Pavada)',
      '100% soft cotton inner lining to prevent itching or discomfort',
      'Adjustable drawstring waist with handmade tassels',
      'Back zipper for effortless dressing'
    ],
    careInstructions: [
      'Gentle dry clean or gentle hand wash',
      'Do not machine spin or tumble dry',
      'Iron with low heat'
    ]
  },
  {
    id: 'tulasi-007',
    name: 'Pure Tussar Ghicha Handloom Fabric (Per Metre)',
    slug: 'pure-tussar-ghicha-handloom-fabric',
    category: 'fabrics',
    categoryLabel: 'Handloom Fabrics',
    price: 850,
    originalPrice: 1100,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 37,
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Gold Tussar', hex: '#D4AF37' },
      { name: 'Raw Honey Silk', hex: '#C2843A' },
      { name: 'Dyed Rani Pink', hex: '#F50087' }
    ],
    sizes: ['1 Metre (Width: 44 inches)', '2.5 Metres (Kurta Length)', '5.5 Metres (Saree Length)'],
    fabric: '100% Handspun Tussar Ghicha Silk',
    weave: 'Organic Handloom Texture',
    occasion: 'Casual',
    isNewArrival: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 45,
    metersPerUnit: '1 Metre (Width 44")',
    description: 'Raw, tactile beauty of natural wild forest silk. Woven on village handlooms with characteristic uneven slubs, delivering a rich texture ideal for custom sarees, jackets, and bespoke kurtas.',
    details: [
      'Sold per linear metre (44 inch width)',
      '100% pure organic hand-reeled wild Tussar Ghicha silk',
      'Natural sheen that enriches with every wash',
      'Certified Handloom Mark product'
    ],
    careInstructions: [
      'Dry clean only for maintaining natural luster',
      'Store with neem leaves or silica gel sachets',
      'Do not expose to continuous direct sunlight'
    ]
  },
  {
    id: 'tulasi-008',
    name: 'Kalamkari Hand-Painted Cotton Saree with Zari Pattu',
    slug: 'kalamkari-hand-painted-cotton-saree',
    category: 'sarees',
    categoryLabel: 'Sarees',
    price: 3899,
    originalPrice: 4999,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Earthy Rust & Mustard', hex: '#B45309' },
      { name: 'Deep Indigo', hex: '#1E3A8A' },
      { name: 'Tulasi Green', hex: '#168C78' }
    ],
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    fabric: 'Handspun Srikalahasti Cotton',
    weave: 'Natural Dye Pen Kalamkari & Zari Border',
    occasion: 'Festive',
    isNewArrival: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 6,
    blouseIncluded: true,
    description: 'Masterpiece of Andhra Kalamkari artistry. Authentic pen-drawn mythological tree of life motifs using natural fermented dyes on soft breathable handspun cotton.',
    details: [
      '100% Organic Srikalahasti Pen Kalamkari Art',
      'Length: 5.5m Saree + 0.8m Hand-painted Blouse Piece',
      'Accented with a subtle woven golden zari pattu border',
      'Naturally hypoallergenic and skin friendly'
    ],
    careInstructions: [
      'Gentle hand wash in cold water with mild organic detergent',
      'Dry in shade',
      'Iron on medium setting'
    ]
  }
];

export const ALL_FABRICS = [
  'Pure Katan Silk',
  'Chanderi Silk-Cotton',
  'Pure Modal Silk',
  '100% Breathable Mulmul Cotton',
  'Raw Silk Blend',
  'Art Silk',
  '100% Handspun Tussar Ghicha Silk',
  'Handspun Srikalahasti Cotton'
];

export const ALL_OCCASIONS = [
  'Festive',
  'Bridal & Wedding',
  'Casual',
  'Daily Wear',
  'Work & Office',
  'Party'
];
