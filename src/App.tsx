import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { LiveSensoryRibbon } from './components/hero/LiveSensoryRibbon';
import { CravingSection } from './components/discovery/CravingSection';
import { SignatureBiryani } from './components/spotlight/SignatureBiryani';
import { MenuSection } from './components/menu/MenuSection';
import { FeastModeSection } from './components/feast/FeastModeSection';
import { BrandStory } from './components/story/BrandStory';
import { VisitSection } from './components/location/VisitSection';
import { Footer } from './components/layout/Footer';
import { QuickDishModal } from './components/menu/QuickDishModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { FloatingOrderBar } from './components/cart/FloatingOrderBar';
import { MenuItem, VariantOption, CartItem } from './types';
import { MENU_ITEMS } from './data/menu';

const CART_STORAGE_KEY = 'karachi_darbar_lounge_cart_v1';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  // Cart state initialized from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [cartItems]);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter platters for the Feast Mode section
  const platterItems = MENU_ITEMS.filter((item) => item.category === 'platters');

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromDiscovery = (catId: string) => {
    setActiveCategory(catId);
    navigateToSection('menu');
  };

  // Cart Operations
  const handleAddToCart = (
    item: MenuItem,
    variant?: VariantOption,
    quantity: number = 1,
    specialNotes?: string
  ) => {
    const effectiveVariant =
      variant || (item.pricing.type === 'variants' ? item.pricing.variants[0] : undefined);
    const unitPrice = effectiveVariant
      ? effectiveVariant.price
      : item.pricing.type === 'single'
      ? item.pricing.price
      : 0;
    const cartItemId = `${item.id}-${effectiveVariant?.name || 'single'}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          specialInstructions: specialNotes || updated[existingIndex].specialInstructions,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            selectedVariant: effectiveVariant,
            quantity,
            unitPrice,
            specialInstructions: specialNotes,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.cartItemId === cartItemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#15130F] text-[#F5EBD7] font-sans selection:bg-[#C39A4A] selection:text-[#15130F]">
      {/* Sticky Header */}
      <Header
        cartItemCount={totalItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateTo={navigateToSection}
      />

      {/* Main Experience Flow */}
      <main>
        {/* 1. Hero Section (Deep Emerald) with Live Multi-Dish Showcase */}
        <HeroSection
          onExploreMenu={() => navigateToSection('menu')}
          onOpenOrder={() => setIsCartOpen(true)}
          onSelectCategory={handleSelectCategoryFromDiscovery}
        />

        {/* Live Culinary Highlights Continuous Ribbon */}
        <LiveSensoryRibbon />

        {/* 2. Craving Discovery (Warm Ivory) */}
        <CravingSection onSelectCategory={handleSelectCategoryFromDiscovery} />

        {/* 3. Signature Biryani Story (Deep Green) */}
        <SignatureBiryani
          onDiscoverBiryani={() => handleSelectCategoryFromDiscovery('biryani')}
        />

        {/* 4. Complete Menu Experience (Warm Charcoal) */}
        <MenuSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenDishModal={(item) => setModalItem(item)}
          onAddToCart={(item, variant) => handleAddToCart(item, variant)}
        />

        {/* 5. Feast Mode Sharing (Burgundy / Dark Charcoal) */}
        <FeastModeSection
          platterItems={platterItems}
          onOpenDishModal={(item) => setModalItem(item)}
          onAddToCart={(item) => handleAddToCart(item)}
        />

        {/* 6. Brand Journey "From Karachi to KL" (Warm Ivory) */}
        <BrandStory />

        {/* 7. Visit Us & Location (Deep Emerald) */}
        <VisitSection onOpenOrder={() => setIsCartOpen(true)} />
      </main>

      {/* Footer (Dark Forest Green) */}
      <Footer
        onNavigateTo={navigateToSection}
        onOpenOrder={() => setIsCartOpen(true)}
      />

      {/* Quick Dish Modal / Bottom Sheet */}
      <QuickDishModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer with WhatsApp Order Engine */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onExploreMenu={() => navigateToSection('menu')}
      />

      {/* Sticky Floating Mobile Order Bar */}
      <FloatingOrderBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}
