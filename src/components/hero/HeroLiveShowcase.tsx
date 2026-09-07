import React, { useState, useEffect } from 'react';
import {
  BiryaniSteam,
  BbqEmberGlow,
  KarahiSizzleHaze,
  FloatingEmbers,
  LiveSpiceParticles,
} from '../animations/LiveFoodEffects';

export interface LiveDishItem {
  id: string;
  tabLabel: string;
  name: string;
  subtitle: string;
  image: string;
  priceNote: string;
  heat: 'Mild' | 'Warm' | 'Karachi Hot';
  effectType: 'biryani' | 'bbq' | 'karahi' | 'broast';
  aromaNote: string;
  badge: string;
  tags: string[];
}

const LIVE_DISHES: LiveDishItem[] = [
  {
    id: 'biryani',
    tabLabel: 'Dum Biryani',
    name: 'Sindhi Dum Biryani',
    subtitle: 'Layered Basmati & Saffron Aroma',
    image: '/videos/biryani.jpg',
    heat: 'Warm',
    effectType: 'biryani',
    badge: '♨ Slow-Dum Steam',
    tags: ['Aged Basmati', 'Dum Cooked', 'Saffron'],
  },
  {
    id: 'bbq',
    tabLabel: 'Charcoal BBQ',
    name: 'Charcoal Seekh Kabab',
    subtitle: 'Charred Over Natural Hardwood Coals',
    image: '/assets/bbq.jpg',
    heat: 'Karachi Hot',
    effectType: 'bbq',
    badge: '🔥 Charcoal Grilled',
    tags: [,'Tender Cuts', 'Smoky'],
  },
  {
    id: 'karahi',
    tabLabel: 'Wok Karahi',
    name: 'Sizzling Desi Karahi',
    subtitle: 'High-Flame Iron Wok Reduction',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop',
    heat: 'Karachi Hot',
    effectType: 'karahi',
    badge: '⚡ Wok Sizzle',
    tags: ['Iron Wok', 'Fresh Tomato', 'Pure Spices'],
  },
  {
    id: 'broast',
    tabLabel: 'Crispy Broast',
    name: 'Karachi Quarter Broast',
    subtitle: 'Signature Golden Spice Crunch',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1000&auto=format&fit=crop',
    heat: 'Warm',
    effectType: 'broast',
    badge: '✨ Golden Crisp',
    tags: ['Crispy Crust', 'Garlic Sauce', 'Fries & Bun'],
  },
];

interface HeroLiveShowcaseProps {
  onExploreDish?: (dishId: string) => void;
}

export const HeroLiveShowcase: React.FC<HeroLiveShowcaseProps> = ({ onExploreDish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through dishes every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_DISHES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeDish = LIVE_DISHES[currentIndex];

  return (
    <div
      id="hero-live-showcase"
      className="relative w-full max-w-lg mx-auto flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live Interactive Dish Selector Tabs */}
      <div className="w-full flex items-center justify-center space-x-1.5 mb-4 p-1 rounded-full bg-[#062A20]/90 border border-[#C39A4A]/40 backdrop-blur-md shadow-xl z-20 overflow-x-auto no-scrollbar">
        {LIVE_DISHES.map((dish, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={dish.id}
              id={`hero-dish-tab-${dish.id}`}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1.5 ${
                isActive
                  ? 'bg-[#C39A4A] text-[#15130F] font-bold shadow-md scale-105'
                  : 'text-[#CFC2A8] hover:text-[#F5EBD7] hover:bg-white/5'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#15130F] animate-ping" />}
              <span>{dish.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Circular Stage with live overlays */}
      <div className="relative w-72 sm:w-96 lg:w-[410px] aspect-square flex items-center justify-center">
        {/* Outer Golden Geometric Orbit Ring */}
        <div className="absolute inset-0 rounded-full border border-[#C39A4A]/40 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-2.5 rounded-full border border-dashed border-[#C39A4A]/25 pointer-events-none" />

        {/* Ambient Backing Glow */}
        <div className="absolute inset-4 rounded-full blur-2xl transition-all duration-700 pointer-events-none bg-[#C39A4A]/20" />

        {/* Dish Circular Plate */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-[#C39A4A]/70 bg-[#15130F] group">
          {/* Main Visual Image with subtle transition */}
          <img
            key={activeDish.id}
            src={activeDish.image}
            alt={activeDish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out animate-in fade-in zoom-in-95"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />

          {/* Dynamic Live Visual Effects Depending on Selected Dish */}
          {activeDish.effectType === 'biryani' && (
            <>
              <BiryaniSteam />
              <LiveSpiceParticles />
            </>
          )}

          {activeDish.effectType === 'bbq' && (
            <>
              <BiryaniSteam className="opacity-40" />
              <BbqEmberGlow />
              <FloatingEmbers />
            </>
          )}

          {activeDish.effectType === 'karahi' && (
            <>
              <KarahiSizzleHaze />
              <BiryaniSteam />
            </>
          )}

          {activeDish.effectType === 'broast' && (
            <>
              <LiveSpiceParticles />
              <div className="animate-pulse absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            </>
          )}

          {/* Live Kitchen Status Overlay Pill */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#062A20]/90 backdrop-blur-md border border-[#C39A4A] px-3.5 py-1 rounded-full flex items-center space-x-2 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#D8BB72] font-semibold">
              {activeDish.badge}
            </span>
          </div>

          {/* Inner Bottom Dish Summary */}
          <div className="absolute bottom-5 inset-x-4 sm:inset-x-6 text-center z-10 pointer-events-none">
            <h3 className="font-serif-display font-bold text-lg sm:text-xl text-[#F5EBD7] drop-shadow-md">
              {activeDish.name}
            </h3>
            <p className="text-[11px] text-[#CFC2A8] drop-shadow line-clamp-1 mt-0.5 max-w-xs mx-auto">
              {activeDish.aromaNote}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="font-mono text-xs text-[#D8BB72] font-bold px-2.5 py-0.5 rounded-full bg-black/60 border border-[#C39A4A]/50 backdrop-blur-sm shadow">
                {activeDish.priceNote}
              </span>
              <span className="text-[10px] font-sans font-semibold text-[#F5EBD7] px-2 py-0.5 rounded-full bg-[#062A20]/85 border border-[#C39A4A]/40 backdrop-blur-sm">
                {activeDish.heat}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Dots Indicator */}
      <div className="flex items-center space-x-2 mt-6">
        {LIVE_DISHES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Show ${LIVE_DISHES[idx].name}`}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'w-7 bg-[#C39A4A]' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
        <span className="text-[10px] text-[#CFC2A8]/70 font-mono ml-2">
          {isPaused ? 'Paused' : 'Live cycling'}
        </span>
      </div>
    </div>
  );
};
