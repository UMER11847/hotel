export type HeatLevel = 'Mild' | 'Warm' | 'Karachi Hot';

export type ProteinType = 'chicken' | 'beef' | 'mutton' | 'seafood' | 'vegetarian' | 'beverage';

export type TagType = 'Popular' | "Chef's Pick" | 'Karachi Favourite' | 'For Sharing' | 'Spicy';

export interface VariantOption {
  name: string; // e.g. "Half", "Full", "1 Plate"
  price: number;
}

export type Pricing =
  | {
      type: 'single';
      price: number;
    }
  | {
      type: 'variants';
      variants: VariantOption[];
    };

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: Pricing;
  pieces?: string | number; // e.g., 2, 3, 4, 5, "1 pc"
  heatLevel?: HeatLevel;
  protein: ProteinType;
  image?: string;
  tags?: TagType[];
  verificationNeeded?: boolean;
  verificationNotes?: string;
  includedComponents?: string[];
  isAvailable?: boolean;
}

export interface CartItem {
  cartItemId: string; // e.g. "chicken-karahi-half"
  item: MenuItem;
  selectedVariant?: VariantOption;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}

export type OrderType = 'takeaway' | 'dine-in' | 'delivery';

export interface CustomerOrderDetails {
  name: string;
  phone: string;
  orderType: OrderType;
  tableOrAddressNotes: string;
  generalNotes?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  positioning: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // e.g. "601121331789"
  googleRating: number;
  openingHours: string;
  currency: string;
}
