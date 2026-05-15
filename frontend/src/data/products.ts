export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  badge?: string;
  gradient: string;
  accentColor: string;
  weight?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  gradient: string;
  symbol: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
}

export interface AIPairing {
  id: string;
  title: string;
  items: string[];
  description: string;
  mood: string;
  gradient: string;
}

export const categories: Category[] = [
  {
    id: "rice",
    name: "Artisan Rice",
    count: 5,
    gradient: "linear-gradient(135deg, #D4A84B 0%, #8B6914 50%, #5C4108 100%)",
    symbol: "◈",
    description: "Himalayan Basmati & Exotic Varieties",
  },
  {
    id: "dry-fruits",
    name: "Dry Fruits",
    count: 6,
    gradient: "linear-gradient(135deg, #8B4513 0%, #5C2A0A 50%, #3A1A05 100%)",
    symbol: "❋",
    description: "Hand-Sorted Himalayan Treasures",
  },
  {
    id: "spices",
    name: "Whole Spices",
    count: 9,
    gradient: "linear-gradient(135deg, #C0392B 0%, #8B1A1A 50%, #5C0F0F 100%)",
    symbol: "✦",
    description: "Kashmir's Aromatic Heritage",
  },
  {
    id: "health",
    name: "Wellness",
    count: 3,
    gradient: "linear-gradient(135deg, #5B8A56 0%, #2E5F2A 50%, #1A3D17 100%)",
    symbol: "✿",
    description: "Superfoods & Breakfast Essentials",
  },
  {
    id: "pulses",
    name: "Heritage Pulses",
    count: 2,
    gradient: "linear-gradient(135deg, #B56E3F 0%, #7A3E1A 50%, #4D2409 100%)",
    symbol: "◉",
    description: "Bhaderwahi & Traditional Varieties",
  },
  {
    id: "gifts",
    name: "Gift Hampers",
    count: 4,
    gradient: "linear-gradient(135deg, #9E1D2F 0%, #6B1020 50%, #3D0712 100%)",
    symbol: "⬡",
    description: "Curated Luxury Food Gifts",
  },
];

export const bestsellerProducts: Product[] = [
  {
    id: "p1",
    name: "Jammu Basmati Rice",
    category: "Artisan Rice",
    price: 299,
    originalPrice: 349,
    description: "Long-grain, aromatic basmati aged 12 months",
    badge: "Bestseller",
    gradient: "linear-gradient(160deg, #D4A84B 0%, #C19A38 40%, #8B6914 100%)",
    accentColor: "#D4A84B",
    weight: "1 kg",
  },
  {
    id: "p2",
    name: "Kashmir Almonds",
    category: "Dry Fruits",
    price: 699,
    originalPrice: 849,
    description: "Wild-harvested, naturally sun-dried Himalayan almonds",
    badge: "Premium",
    gradient: "linear-gradient(160deg, #8B5E3C 0%, #6B4020 40%, #3A1F0A 100%)",
    accentColor: "#8B5E3C",
    weight: "500 g",
  },
  {
    id: "p3",
    name: "Green Cardamom",
    category: "Whole Spices",
    price: 449,
    description: "Hand-picked from Himalayan spice gardens",
    badge: "New",
    gradient: "linear-gradient(160deg, #4A7C59 0%, #2E5A3A 40%, #1A3A22 100%)",
    accentColor: "#4A7C59",
    weight: "200 g",
  },
  {
    id: "p4",
    name: "Bhaderwahi Rajmash",
    category: "Heritage Pulses",
    price: 389,
    description: "GI-tagged kidney beans from Bhaderwah valley",
    badge: "Heritage",
    gradient: "linear-gradient(160deg, #A0522D 0%, #7A3010 40%, #4D1A05 100%)",
    accentColor: "#A0522D",
    weight: "1 kg",
  },
  {
    id: "p5",
    name: "Kashmiri Noon Chai",
    category: "Traditional",
    price: 349,
    description: "Pink salt tea with rose petals, the original Kashmiri brew",
    badge: "Heritage",
    gradient: "linear-gradient(160deg, #C96A8A 0%, #9E3D5C 40%, #6B1A35 100%)",
    accentColor: "#C96A8A",
    weight: "100 g",
  },
  {
    id: "p6",
    name: "Biryani King Special",
    category: "Artisan Rice",
    price: 329,
    description: "Master blend of aged basmati for the perfect biryani",
    badge: "Chef's Pick",
    gradient: "linear-gradient(160deg, #E8C547 0%, #C9A62B 40%, #8B6914 100%)",
    accentColor: "#E8C547",
    weight: "1 kg",
  },
  {
    id: "p7",
    name: "Premium Pistachios",
    category: "Dry Fruits",
    price: 849,
    description: "Roasted & salted Himalayan pistachios, hand-selected",
    gradient: "linear-gradient(160deg, #7B9E5A 0%, #4E7030 40%, #2A4018 100%)",
    accentColor: "#7B9E5A",
    weight: "500 g",
  },
  {
    id: "p8",
    name: "Black Pepper Whole",
    category: "Whole Spices",
    price: 249,
    description: "Sun-dried whole peppercorns, intensely aromatic",
    gradient: "linear-gradient(160deg, #4A4040 0%, #2E2020 40%, #1A1010 100%)",
    accentColor: "#8B7355",
    weight: "250 g",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Jammu Basmati is unlike anything I've had before. Each grain stands apart perfectly, and the fragrance fills the entire kitchen. NEEKZ Special has transformed our family dinners.",
    product: "Jammu Basmati Rice",
  },
  {
    id: "t2",
    name: "Arjun Mehta",
    location: "Delhi",
    rating: 5,
    text: "I ordered the Noon Chai for my mother who grew up in Kashmir. She said it tasted exactly like home. That says everything. The packaging was also beautifully crafted.",
    product: "Kashmiri Noon Chai",
  },
  {
    id: "t3",
    name: "Riya Kapoor",
    location: "Bangalore",
    rating: 5,
    text: "The dry fruit gift hamper for Diwali was a showstopper. My clients were genuinely impressed. This is the kind of gifting that leaves a lasting impression.",
    product: "Festive Dry Fruit Hamper",
  },
  {
    id: "t4",
    name: "Vikram Nair",
    location: "Pune",
    rating: 5,
    text: "The Bhaderwahi Rajmash took me back to my grandmother's kitchen in Jammu. The quality is extraordinary — earthy, hearty, and genuinely from the source.",
    product: "Bhaderwahi Rajmash",
  },
];

export const aiPairings: AIPairing[] = [
  {
    id: "ai1",
    title: "The Royal Biryani",
    items: ["Biryani King Rice", "Green Cardamom", "Black Pepper", "Bay Leaves"],
    description: "An orchestrated symphony of spices and aged basmati for the most aromatic biryani.",
    mood: "Festive & Rich",
    gradient: "linear-gradient(135deg, #D4A84B22 0%, #C9A66B11 100%)",
  },
  {
    id: "ai2",
    title: "The Kashmiri Morning",
    items: ["Kashmiri Noon Chai", "Dried Apricots", "Almonds", "Chia Seeds"],
    description: "Start your morning with the ritual of Kashmir — warming, nourishing, and deeply comforting.",
    mood: "Calm & Nourishing",
    gradient: "linear-gradient(135deg, #C96A8A22 0%, #9E3D5C11 100%)",
  },
  {
    id: "ai3",
    title: "The Himalayan Feast",
    items: ["Bhaderwahi Rajmash", "Jammu Basmati Rice", "Cumin Seeds", "Cinnamon"],
    description: "A complete dal-chawal experience elevated with authentic Himalayan spices.",
    mood: "Rustic & Hearty",
    gradient: "linear-gradient(135deg, #8B451322 0%, #A0522D11 100%)",
  },
];

export const giftBoxes = [
  {
    id: "g1",
    title: "Himalayan Essentials",
    subtitle: "Premium Rice & Spice Collection",
    items: ["Jammu Basmati", "Green Cardamom", "Black Pepper", "Cinnamon"],
    price: 1299,
    occasion: "Corporate Gifting",
  },
  {
    id: "g2",
    title: "Festive Grand Hamper",
    subtitle: "The Complete Artisan Collection",
    items: ["Basmati Rice", "Mixed Dry Fruits", "Whole Spices", "Noon Chai", "Rajmash"],
    price: 2499,
    occasion: "Wedding & Festival",
  },
  {
    id: "g3",
    title: "Dry Fruit Elegance",
    subtitle: "Curated Premium Dry Fruits",
    items: ["Almonds", "Cashews", "Pistachios", "Dried Apricots", "Raisins"],
    price: 1899,
    occasion: "All Occasions",
  },
];
