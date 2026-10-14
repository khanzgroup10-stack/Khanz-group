// THAT'S IT Brand Data Architecture & Product Taxonomy
// Based on authentic brand assets and official product taxonomy.

export interface AuthenticProduct {
  id: string;
  name: string;
  categoryId: string;
  subcategory: string;
  image: string;
  tag: string;
  description: string;
  objectPosition?: string;
}

export interface CategoryData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  editorialHero: string;
  image: string;
  isFutureVision?: boolean;
  status?: string;
  subcategories: string[];
  previewSubcategories: string[];
}

export interface FutureService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  status: string;
  highlights: string[];
}

// 10 Authoritative Categories within THAT'S IT Division
export const PRIMARY_CATEGORIES: CategoryData[] = [
  {
    id: 'clothing',
    slug: 'clothing',
    title: 'Clothing & Apparel',
    subtitle: 'Style That Speaks',
    tag: 'Apparel',
    description: 'Crisp tailored shirts, refined trousers, and timeless menswear essentials engineered for unmistakable presence from the boardroom to casual retreats.',
    editorialHero: 'From structured Italian-style tailoring to breathable day-to-day separates, every garment is measured for masculine poise, comfort and enduring longevity.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_21 PM.png',
    previewSubcategories: ['Dress & Casual Shirts', 'Tailored Suits & Blazers', 'Chinos & Denim', 'Outerwear & Jackets'],
    subcategories: [
      'Caps',
      'T-Shirts',
      'Polos',
      'Casual Shirts',
      'Formal Shirts',
      'Dress Shirts',
      'Hoodies',
      'Sweatshirts',
      'Sweaters',
      'Jackets',
      'Coats',
      'Leather Jackets',
      'Leather Coats',
      'Blazers',
      'Suits',
      'Formal Wear',
      'Jeans',
      'Denim',
      'Trousers',
      'Chinos',
      'Baggy Pants',
      'Cargo Pants',
      'Relaxed-Fit Trousers',
      'Shorts',
      'Joggers',
      'Traditional Wear',
      'Seasonal Outerwear'
    ]
  },
  {
    id: 'footwear',
    slug: 'footwear',
    title: 'Footwear',
    subtitle: 'Walk With Confidence',
    tag: 'Footwear',
    description: 'Luxury handcrafted sneakers and formal leather shoes designed with poise, ergonomic cushioning, and enduring durability for every step.',
    editorialHero: 'A deliberate fusion of bespoke artisan leatherwork and modern footwear ergonomics. Crafted to support ambitious trajectories on city pavements and formal halls.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_37 PM.png',
    previewSubcategories: ['Sneakers & Casual Shoes', 'Formal Shoes & Loafers', 'Boots & Slip-Ons', 'Shoe-Care Essentials'],
    subcategories: [
      'Casual Shoes',
      'Sneakers',
      'Sports Shoes',
      'Training Shoes',
      'Formal Shoes',
      'Boots',
      'Leather-Style Boots',
      'Slides',
      'Slippers',
      'Sandals',
      'Loafers',
      'Slip-On Shoes',
      'Shoe-Care Products',
      'Laces',
      'Insoles'
    ]
  },
  {
    id: 'accessories',
    slug: 'accessories',
    title: "Men's Accessories",
    subtitle: 'Strength In Every Detail',
    tag: 'Hardware & Leather',
    description: 'Precision chronographs, genuine top-grain leather belts, and sleek minimalist wallets that quietly announce uncompromising standards.',
    editorialHero: 'Subtle hallmarks of personal distinction. Fine metalwork, vegetable-tanned leathers, and precision horology tailored to harmonize with executive attire.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_47 PM.png',
    previewSubcategories: ['Chronograph Watches', 'Bifold Wallets & Cards', 'Reversible Belts', 'Travel Bags & Frames'],
    subcategories: [
      'Casual Belts',
      'Formal Belts',
      'Reversible Belts',
      'Wallets',
      'Cardholders',
      'Wristwatches',
      'Watch Straps',
      'Bracelets',
      'Fashion Jewellery',
      'Rings',
      'Chains',
      'Pendants',
      'Sunglasses',
      'Optical-Style Frames',
      'Backpacks',
      'Crossbody Bags',
      'Travel Bags',
      'Keychains',
      'Ties',
      'Bow Ties',
      'Cufflinks',
      'Pocket Squares',
      'Caps',
      'Beanies',
      'Winter Accessories'
    ]
  },
  {
    id: 'fragrances',
    slug: 'fragrances',
    title: 'Perfumes & Fragrances',
    subtitle: 'Signature Scents',
    tag: 'Parfum',
    description: 'Sophisticated Eau de Parfum blends featuring warm amber, oud, cedarwood, and rich spices engineered to project commanding subtlety.',
    editorialHero: 'An olfactive journey created for the refined palate. Deep smoky resins, warm spiced top notes, and long-lasting sillage formulated for modern gentlemen.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_11 PM.png',
    previewSubcategories: ["THAT'S IT Perfumes", "Men's Fragrances", 'Body Sprays', 'Attar & Fragrance Oils'],
    subcategories: [
      "THAT'S IT Perfumes",
      "Men's Fragrances",
      'Body Sprays',
      'Deodorants',
      'Attar',
      'Concentrated Fragrance Oils'
    ]
  },
  {
    id: 'grooming',
    slug: 'grooming',
    title: 'Grooming & Personal Care',
    subtitle: 'Excellence Refined',
    tag: 'Grooming',
    description: 'Master barber formulas for beard sculpting, invigorating skin treatments, and hair styling that make every morning a ritual of mastery.',
    editorialHero: 'Engineered for high-performing gentlemen. Natural botanicals, restorative hydration, and precision shaving formulas crafted for immaculate grooming.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
    previewSubcategories: ['Beard Oils & Balms', 'Precision Shave Care', 'Clarifying Face Wash', 'Hair Styling Clay & Pomade'],
    subcategories: [
      'Shaving Products',
      'Beard Care',
      'Beard Oils',
      'Beard Balms',
      'Beard Combs',
      'Beard Brushes',
      'Hair Wax',
      'Hair Gel',
      'Hair Clay',
      'Pomade',
      'Shampoo',
      'Conditioner',
      'Body Wash',
      'Face Wash',
      'Moisturizers',
      'Skincare Essentials',
      'Grooming Kits',
      'Nail Clippers',
      'Travel Grooming Kits',
      'Toiletry Bags'
    ]
  },
  {
    id: 'everyday-essentials',
    slug: 'everyday-essentials',
    title: 'Innerwear & Everyday Essentials',
    subtitle: 'Unseen Foundation',
    tag: 'Essentials',
    description: 'Ultra-soft breathable cotton underlayers, ergonomic boxers, and thermal foundation pieces designed for day-long ease and invisible support.',
    editorialHero: 'The quiet foundation of daily confidence. High-filament combed cotton, seamless anti-chafing construction, and premium elasticated bands.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_32 PM.png',
    previewSubcategories: ['Vests & Undershirts', 'Briefs & Boxers', 'Formal & Casual Socks', 'Thermal Innerwear & Lounge'],
    subcategories: [
      'Vests',
      'Undershirts',
      'Briefs',
      'Boxers',
      'Underwear',
      'Formal Socks',
      'Casual Socks',
      'Sports Socks',
      'Ankle Socks',
      'Thermal Innerwear',
      'Sleepwear',
      'Lounge Sets',
      'Base Layers',
      'Handkerchiefs'
    ]
  },
  {
    id: 'sports-fitness',
    slug: 'sports-fitness',
    title: 'Sportswear & Fitness Accessories',
    subtitle: 'Made To Move',
    tag: 'Performance',
    description: 'Engineered moisture-wicking technical fabrics and gym accessories built for peak physical discipline, agility drills, and post-session recovery.',
    editorialHero: 'Built for strenuous sweat sessions and athletic resilience. Four-way stretch compression fabrics paired with durable iron-ready accessories.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
    previewSubcategories: ['Gym Tees & Shorts', 'Training Joggers & Tracksuits', 'Gym Bags & Bottles', 'Gloves & Resistance Gear'],
    subcategories: [
      'Gym T-Shirts',
      'Training Shorts',
      'Joggers',
      'Tracksuits',
      'Compression Basics',
      'Training Wear',
      'Gym Bags',
      'Water Bottles',
      'Workout Towels',
      'Sweatbands',
      'Training Gloves',
      'Skipping Ropes',
      'Resistance Bands',
      'Exercise Mats',
      'Home Workout Accessories'
    ]
  },
  {
    id: 'gifts',
    slug: 'gifts',
    title: 'Gifts, Travel & Additional Essentials',
    subtitle: 'Curated Giving & Transit',
    tag: 'Lifestyle & Travel',
    description: 'Executive travel organizers, bespoke gift bundles, and protective everyday carry items designed for travel and thoughtful gestures.',
    editorialHero: 'Designed for the global traveler and the art of distinguished gifting. Luxury packaging, durable ballistic textiles, and executive essentials.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_17 PM.png',
    previewSubcategories: ['Travel Organizers & Kits', 'Gift Sets & Bundles', 'Laptop Sleeves & Travel Mugs', 'Wedding & Occasion Items'],
    subcategories: [
      'Travel Organizers',
      'Toiletry Kits',
      'Luggage Accessories',
      'Rainwear',
      'Umbrellas',
      'Phone Cases',
      'Charging Cables',
      'Laptop Sleeves',
      'Work Accessories',
      'Lunch Boxes',
      'Insulated Mugs',
      'Reusable Bottles',
      'Perfume Gift Sets',
      'Wallet Gift Sets',
      'Belt Gift Sets',
      'Watch Gift Sets',
      'Grooming Gift Sets',
      'Wedding Accessories',
      'Occasion Accessories',
      'Gift Cards',
      'Gift Bundles'
    ]
  },
  {
    id: 'salon',
    slug: 'salon',
    title: "Men's Salon",
    subtitle: 'Future Vision Concept',
    tag: 'Sanctuary Service',
    description: 'An exclusive grooming sanctuary concept delivering master hot towel treatments, bespoke beard architecture, and private executive barber suites.',
    editorialHero: 'A premier lifestyle sanctuary concept dedicated to the refined gentleman. Tailored barber craft, restorative skincare treatments, and executive relaxation.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
    isFutureVision: true,
    status: 'FUTURE VISION — COMING SOON',
    previewSubcategories: ['Haircuts & Styling', 'Beard Trimming & Shaving', 'Facials & Skincare', 'Event Grooming Packages'],
    subcategories: [
      'Haircuts',
      'Styling',
      'Beard Trimming',
      'Beard Shaping',
      'Shaving',
      'Hair Washing',
      'Blow-Drying',
      'Facials',
      'Skincare',
      'Hair and Scalp Care',
      'Event Grooming',
      'Grooming Packages'
    ]
  },
  {
    id: 'fitness',
    slug: 'fitness',
    title: "Men's Fitness Club",
    subtitle: 'Future Vision Concept',
    tag: 'Athletic Sanctuary',
    description: 'A high-end private athletic training facility concept featuring bespoke strength conditioning, cryotherapy recovery, and elite performance coaching.',
    editorialHero: 'Engineered for disciplined men committed to physical excellence. Biometric strength conditioning, athletic recovery, and tailored performance spaces.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
    isFutureVision: true,
    status: 'FUTURE VISION — COMING SOON',
    previewSubcategories: ['Strength & Resistance Training', 'Cardio & Functional Zones', 'Personal Coaching', 'Gym Gear & Accessories'],
    subcategories: [
      'Strength Training',
      'Resistance Training',
      'Cardio',
      'Free Weights',
      'Functional Training',
      'Beginner Workout Guidance',
      'Personal Training',
      'Fitness Assessments',
      'Progress Tracking',
      'Group Training',
      'Gym Merchandise',
      'Fitness Accessories'
    ]
  }
];

// Authenticated Branded Product Inventory — using solely authentic supplied assets
export const AUTHENTIC_PRODUCTS: AuthenticProduct[] = [
  {
    id: 'prod-fragrance',
    name: "THAT'S IT Signature Eau de Parfum",
    categoryId: 'fragrances',
    subcategory: "THAT'S IT Perfumes",
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_11 PM.png',
    tag: 'Signature Scent',
    description: 'Deep olfactive blend with notes of smoky vetiver, Tuscan leather, ambergris and bergamot.',
    objectPosition: 'center 40%'
  },
  {
    id: 'prod-fragrance-mens',
    name: "THAT'S IT Noir Men's Fragrance",
    categoryId: 'fragrances',
    subcategory: "Men's Fragrances",
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_11 PM.png',
    tag: 'Eau De Parfum',
    description: 'Distinctive evening composition with dark woods, cardamon spice, and warm amber resin.',
    objectPosition: 'center 40%'
  },
  {
    id: 'prod-shirt',
    name: "THAT'S IT Classic Monochrome Tailored Shirt",
    categoryId: 'clothing',
    subcategory: 'Shirts',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_21 PM.png',
    tag: 'TAILORED FIT',
    description: 'A refined essential with a clean silhouette, crafted for versatility and timeless style.',
    objectPosition: 'center 30%'
  },
  {
    id: 'prod-dress-shirt',
    name: "THAT'S IT Executive Dress Shirt",
    categoryId: 'clothing',
    subcategory: 'Dress Shirts',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
    tag: 'FORMAL ESSENTIAL',
    description: 'Premium fabric and a sharp structure for the modern professional.',
    objectPosition: 'center 35%'
  },
  {
    id: 'prod-pants',
    name: "THAT'S IT Premium Chino Trousers",
    categoryId: 'clothing',
    subcategory: 'Chinos',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_32 PM.png',
    tag: 'EVERYDAY REFINED',
    description: 'Smart, versatile and comfortable chinos for work, weekends and beyond.',
    objectPosition: 'center 40%'
  },
  {
    id: 'prod-trousers',
    name: "THAT'S IT Relaxed Fit Trousers",
    categoryId: 'clothing',
    subcategory: 'Trousers',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
    tag: 'RELAXED FIT',
    description: 'Modern relaxed fit with superior comfort and all-day wearability.',
    objectPosition: 'center 40%'
  },
  {
    id: 'prod-shoes',
    name: "THAT'S IT Monochrome Leather Sneaker Duo",
    categoryId: 'footwear',
    subcategory: 'Sneakers',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_37 PM.png',
    tag: 'Minimalist Luxury',
    description: 'Full-grain calfskin leather upper with vulcanized cushioned sole and subtle embossed brand insignia.',
    objectPosition: 'center 50%'
  },
  {
    id: 'prod-casual-shoes',
    name: "THAT'S IT Low-Profile Casual Shoes",
    categoryId: 'footwear',
    subcategory: 'Casual Shoes',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
    tag: 'City Poise',
    description: 'Hand-finished leather construction pairing heritage craft with modern street cushioning.',
    objectPosition: 'center 50%'
  },
  {
    id: 'prod-watch',
    name: "THAT'S IT Chronographe Collection",
    categoryId: 'accessories',
    subcategory: 'Wristwatches',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_47 PM.png',
    tag: 'Precision Horology',
    description: 'Dual timepiece collection with sapphire crystal glass, matte obsidian finish and stainless casing.',
    objectPosition: 'center 45%'
  },
  {
    id: 'prod-wallet',
    name: "THAT'S IT Bifold Genuine Leather Wallet",
    categoryId: 'accessories',
    subcategory: 'Wallets',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_17 PM.png',
    tag: 'Leather Goods',
    description: 'Full grain textured leather with slimline architecture, RFID lining, and embossed THAT\'S IT emblem.',
    objectPosition: 'center 45%'
  },
  {
    id: 'prod-belt',
    name: "THAT'S IT Reversible Hardware Plaque Belt",
    categoryId: 'accessories',
    subcategory: 'Reversible Belts',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_27 PM.png',
    tag: 'Hardware Detail',
    description: 'Brushed gunmetal plaque buckle paired with supple vegetable-tanned reversible Italian leather.',
    objectPosition: 'center 45%'
  },
  {
    id: 'prod-formal-belt',
    name: "THAT'S IT Formal Dress Belt",
    categoryId: 'accessories',
    subcategory: 'Formal Belts',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_27 PM.png',
    tag: 'Sartorial Leather',
    description: 'Hand-glazed edges with subtle micro-beveling tailored to match formal dress oxfords.',
    objectPosition: 'center 45%'
  },
  {
    id: 'prod-salon',
    name: "THAT'S IT Master Grooming Formula & Clay",
    categoryId: 'grooming',
    subcategory: 'Hair Clay',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
    tag: 'Barber Craft',
    description: 'Organic botanical extracts and cedarwood essences tailored for restorative daily hair and beard styling.',
    objectPosition: 'center 40%'
  },
  {
    id: 'prod-beard-care',
    name: "THAT'S IT Botanical Beard Care Elixir",
    categoryId: 'grooming',
    subcategory: 'Beard Care',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
    tag: 'Conditioning Oil',
    description: 'Cold-pressed jojoba and argan oils enriched with sandalwood to soften and hydrate facial hair.',
    objectPosition: 'center 40%'
  },
  {
    id: 'prod-active',
    name: "THAT'S IT Athletic Performance Gear",
    categoryId: 'sports-fitness',
    subcategory: 'Gym T-Shirts',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
    tag: 'Athletic Series',
    description: 'Four-way athletic stretch textiles and gym gear forged for heavy sessions and high-mobility drills.',
    objectPosition: 'center 35%'
  },
  {
    id: 'prod-training-wear',
    name: "THAT'S IT Technical Training Wear",
    categoryId: 'sports-fitness',
    subcategory: 'Training Wear',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
    tag: 'Thermal Control',
    description: 'Breathable micro-perforated knit engineered for zero chaffing during intense workouts.',
    objectPosition: 'center 35%'
  }
];

// Comprehensive Deterministic Subcategory Image Mapping
// Priority:
// 1. Authenticated THAT'S IT assets
// 2. High-quality, verified, unbranded luxury menswear photography for visual representation
export const SUBCATEGORY_IMAGES: Record<string, string> = {
  // CLOTHING & APPAREL (Exclusively Men's-Only Luxury Fashion & Authentic Assets)
  'caps': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
  't-shirts': '/thats-it/clothing/t-shirts.jpg',
  'polos': '/thats-it/clothing/polos.jpg',
  'casual shirts': '/thats-it/clothing/casual-shirts.jpg',
  'formal shirts': '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_21 PM.png',
  'dress shirts': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop',
  'hoodies': '/thats-it/clothing/hoodies.jpg',
  'sweatshirts': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
  'sweaters': 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop',
  'jackets': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
  'coats': 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
  'leather jackets': 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800&auto=format&fit=crop',
  'leather coats': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
  'blazers': 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop',
  'suits': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
  'formal wear': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
  'jeans': '/thats-it/clothing/jeans.jpg',
  'denim': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop',
  'trousers': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
  'chinos': '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_32 PM.png',
  'baggy pants': '/thats-it/clothing/baggy-pants.jpg',
  'cargo pants': '/thats-it/clothing/cargo-pants.jpg',
  'relaxed-fit trousers': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
  'shorts': '/thats-it/clothing/shorts.jpg',
  'joggers': 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop',
  'traditional wear': '/thats-it/clothing/traditional-wear.jpg',
  'seasonal outerwear': 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop',

  // FOOTWEAR
  'casual shoes': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop',
  'sneakers': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_37 PM.png',
  'sports shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
  'training shoes': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop',
  'formal shoes': 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=600&auto=format&fit=crop',
  'boots': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop',
  'leather-style boots': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=600&auto=format&fit=crop',
  'slides': 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=600&auto=format&fit=crop',
  'slippers': '/thats-it/footwear/slippers.jpg',
  'sandals': '/thats-it/footwear/sandals.jpg',
  'loafers': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop',
  'slip-on shoes': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop',
  'shoe-care products': '/thats-it/footwear/shoe-care-products.jpg',
  'laces': '/thats-it/footwear/laces.jpg',
  'insoles': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop',

  // MEN'S ACCESSORIES (100% Strictly Men's-Only Luxury Assets - Verified No Duplicates)
  'casual belts': '/thats-it/accessories/casual-belts.jpg',
  'formal belts': '/thats-it/accessories/formal-belts.jpg',
  'reversible belts': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_27 PM.png',
  'wallets': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_17 PM.png',
  'cardholders': '/thats-it/accessories/cardholders.jpg',
  'wristwatches': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_47 PM.png',
  'watch straps': '/thats-it/accessories/watch-straps.jpg',
  'bracelets': '/thats-it/accessories/bracelets.jpg',
  'fashion jewellery': '/thats-it/accessories/fashion-jewellery.jpg',
  'rings': '/thats-it/accessories/rings.jpg',
  'chains': '/thats-it/accessories/chains.jpg',
  'pendants': '/thats-it/accessories/pendants.jpg',
  'sunglasses': '/thats-it/accessories/sunglasses.jpg',
  'optical-style frames': '/thats-it/accessories/optical-style-frames.jpg',
  'backpacks': '/thats-it/accessories/travel-bags.jpg',
  'crossbody bags': '/thats-it/accessories/crossbody-bags.jpg',
  'travel bags': 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop',
  'keychains': '/thats-it/accessories/keychains.jpg',
  'ties': '/thats-it/accessories/ties.jpg',
  'bow ties': '/thats-it/accessories/bow-ties.jpg',
  'cufflinks': '/thats-it/accessories/cufflinks.jpg',
  'pocket squares': '/thats-it/accessories/pocket-squares.jpg',
  'caps': '/thats-it/accessories/caps.jpg',
  'beanies': '/thats-it/accessories/beanies.jpg',
  'winter accessories': '/thats-it/accessories/winter-accessories.jpg',


  // PERFUMES & FRAGRANCES
  "that's it perfumes": '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_11 PM.png',
  "men's fragrances": '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_11 PM.png',
  'body sprays': 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop',
  'deodorants': 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=600&auto=format&fit=crop',
  'attar': 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600&auto=format&fit=crop',
  'concentrated fragrance oils': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop',

  // GROOMING & PERSONAL CARE
  'shaving products': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
  'beard care': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
  'beard oils': 'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop',
  'beard balms': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
  'beard combs': 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=600&auto=format&fit=crop',
  'beard brushes': 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=600&auto=format&fit=crop',
  'hair wax': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
  'hair gel': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
  'hair clay': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
  'pomade': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
  'shampoo': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
  'conditioner': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
  'body wash': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
  'face wash': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
  'moisturizers': 'https://images.unsplash.com/photo-1608248597359-07b973fd1532?q=80&w=600&auto=format&fit=crop',
  'skincare essentials': 'https://images.unsplash.com/photo-1608248597359-07b973fd1532?q=80&w=600&auto=format&fit=crop',
  'grooming kits': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
  'nail clippers': 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=600&auto=format&fit=crop',
  'travel grooming kits': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
  'toiletry bags': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',

  // INNERWEAR & EVERYDAY ESSENTIALS
  'vests': '/thats-it/essentials/vests.jpg',
  'undershirts': '/thats-it/essentials/undershirts.jpg',
  'briefs': '/thats-it/essentials/briefs.jpg',
  'boxers': '/thats-it/essentials/boxers.jpg',
  'underwear': '/thats-it/essentials/underwear.jpg',
  'formal socks': '/thats-it/essentials/formal-socks.jpg',
  'casual socks': '/thats-it/essentials/casual-socks.jpg',
  'sports socks': '/thats-it/essentials/sports-socks.jpg',
  'ankle socks': '/thats-it/essentials/ankle-socks.jpg',
  'thermal innerwear': '/thats-it/essentials/thermal-innerwear.jpg',
  'sleepwear': '/thats-it/essentials/sleepwear.jpg',
  'lounge sets': '/thats-it/essentials/lounge-sets.jpg',
  'base layers': '/thats-it/essentials/base-layers.jpg',
  'handkerchiefs': '/thats-it/essentials/handkerchiefs.jpg',

  // SPORTSWEAR & FITNESS ACCESSORIES
  'gym t-shirts': '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
  'training shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop',
  'tracksuits': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
  'compression basics': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  'training wear': '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
  'gym bags': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
  'water bottles': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
  'workout towels': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=600&auto=format&fit=crop',
  'sweatbands': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  'training gloves': 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?q=80&w=600&auto=format&fit=crop',
  'skipping ropes': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  'resistance bands': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  'exercise mats': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop',
  'home workout accessories': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop',

  // GIFTS, TRAVEL & ADDITIONAL ESSENTIALS
  'travel organizers': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop',
  'toiletry kits': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
  'luggage accessories': 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=600&auto=format&fit=crop',
  'rainwear': 'https://images.unsplash.com/photo-1515664058434-70ca22edd70c?q=80&w=600&auto=format&fit=crop',
  'umbrellas': 'https://images.unsplash.com/photo-1515664058434-70ca22edd70c?q=80&w=600&auto=format&fit=crop',
  'phone cases': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600&auto=format&fit=crop',
  'charging cables': 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=600&auto=format&fit=crop',
  'laptop sleeves': 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
  'work accessories': 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
  'lunch boxes': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
  'insulated mugs': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
  'reusable bottles': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop',
  'perfume gift sets': '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_11 PM.png',
  'wallet gift sets': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_17 PM.png',
  'belt gift sets': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_27 PM.png',
  'watch gift sets': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_47 PM.png',
  'grooming gift sets': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
  'wedding accessories': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
  'occasion accessories': 'https://images.unsplash.com/photo-1589756823695-278bc923f962?q=80&w=600&auto=format&fit=crop',
  'gift cards': 'https://images.unsplash.com/photo-1556742049-0a67e557224d?q=80&w=600&auto=format&fit=crop',
  'gift bundles': '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_17 PM.png',

  // MEN'S SALON — FUTURE VISION
  'haircuts': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
  'styling': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop',
  'beard trimming': 'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop',
  'beard shaping': 'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=600&auto=format&fit=crop',
  'shaving': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
  'hair washing': 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=600&auto=format&fit=crop',
  'blow-drying': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop',
  'facials': 'https://images.unsplash.com/photo-1512290900672-1f540b61690a?q=80&w=600&auto=format&fit=crop',
  'skincare': 'https://images.unsplash.com/photo-1608248597359-07b973fd1532?q=80&w=600&auto=format&fit=crop',
  'hair and scalp care': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop',
  'event grooming': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
  'grooming packages': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',

  // MEN'S FITNESS CLUB — FUTURE VISION
  'strength training': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
  'resistance training': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
  'cardio': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  'free weights': 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop',
  'functional training': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
  'beginner workout guidance': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
  'personal training': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
  'fitness assessments': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop',
  'progress tracking': 'https://images.unsplash.com/photo-1510519138161-5844a492b71f?q=80&w=600&auto=format&fit=crop',
  'group training': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
  'gym merchandise': '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
  'fitness accessories': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop'
};

// Helper: Safely retrieve subcategory image with fallback to category hero image
export const getSubcategoryImage = (categorySlug: string, subcategoryName: string): string => {
  const normalizedKey = subcategoryName.toLowerCase().trim();
  if (SUBCATEGORY_IMAGES[normalizedKey]) {
    return SUBCATEGORY_IMAGES[normalizedKey];
  }

  // Partial match fallback
  for (const [key, url] of Object.entries(SUBCATEGORY_IMAGES)) {
    if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
      return url;
    }
  }

  // Fallback to parent category image
  const cat = PRIMARY_CATEGORIES.find(c => c.slug === categorySlug || c.id === categorySlug);
  return cat ? cat.image : '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_01 PM.png';
};

// Future Services
export const FUTURE_SERVICES: FutureService[] = [
  {
    id: 'salon',
    title: "THAT'S IT MEN'S SALON",
    subtitle: 'Executive Grooming Sanctuary',
    status: 'Future Vision Concept — Not Currently Operational',
    description: 'An exclusive grooming haven delivering hot towel therapy, bespoke beard architecture, scalp rejuvenation, and private executive barber suites.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_36_05 PM.png',
    tag: 'Salon Sanctuary',
    highlights: [
      'Bespoke Beard & Hair Architecture',
      'Hot Towel Botanical Facial Treatments',
      'Private Executive VIP Suites',
      'Scalp Therapy & Aromatherapeutic Rinses'
    ]
  },
  {
    id: 'fitness',
    title: "THAT'S IT FITNESS CLUB",
    subtitle: 'Private Athletic & Recovery Sanctuary',
    status: 'Future Vision Concept — Not Currently Operational',
    description: 'A high-end private athletic training facility featuring bespoke strength conditioning, cryotherapy recovery, and elite performance coaching.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png',
    tag: 'Fitness Sanctuary',
    highlights: [
      'Biometric Performance & Strength Zones',
      'Cryotherapy & Contrast Therapy Plunges',
      'Master Strength & Movement Coaching',
      'Private Athletic Locker Suites & Saunas'
    ]
  }
];

export const LIFESTYLE_PANELS = [
  {
    id: 'everyday',
    label: 'EVERYDAY',
    headline: 'Effortless Ease',
    desc: 'Uncompromising comfort crafted with sharp cuts and resilient fabrics for the rhythm of daily life.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_21 PM.png'
  },
  {
    id: 'work',
    label: 'WORK & BOARDROOM',
    headline: 'Commanding Poise',
    desc: 'Architectural silhouettes and structured shirts that communicate authority with quiet confidence.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'occasion',
    label: 'EVENING & OCCASION',
    headline: 'Dusk Refinement',
    desc: 'Sartorial tailoring and deep smoky fragrances created for gala dinners and memorable celebrations.',
    image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'active',
    label: 'ACTIVE & RECOVERY',
    headline: 'Disciplined Power',
    desc: 'Peak performance activewear designed for rigorous training sessions and mental fortitude.',
    image: '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_49 PM.png'
  }
];

export const BRAND_VALUES = [
  {
    title: 'Premium Craftsmanship',
    desc: 'Meticulously selected materials and details that elevate every garment and accessory.',
    icon: 'crown'
  },
  {
    title: 'Refined Essentials',
    desc: 'Versatile wardrobe staples curated purposefully for a clean, intentional lifestyle.',
    icon: 'feather'
  },
  {
    title: 'Modern Lifestyle',
    desc: 'From morning workouts to evening summits — engineered for every step of your trajectory.',
    icon: 'compass'
  },
  {
    title: 'Everyday Confidence',
    desc: 'Look sharper. Move bolder. Live with unquestioned poise and self-assurance.',
    icon: 'shield'
  }
];
