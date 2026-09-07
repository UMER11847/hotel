import React from 'react';
import { Sparkles, ArrowDown, Utensils, Star, Flame, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurant';
import { HeroLiveShowcase } from './HeroLiveShowcase';
import { FloatingEmbers, LiveSpiceParticles } from '../animations/LiveFoodEffects';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenOrder: () => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOpenOrder,
  onSelectCategory,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center bg-[#0B3D2E] text-[#F5EBD7] pt-24 pb-14 overflow-hidden bg-jaali-pattern"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#062A20]/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-[420px] h-[420px] bg-[#4B1118]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[380px] h-[380px] bg-[#C39A4A]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle floating gold spice sparkles in ambient background */}
      <LiveSpiceParticles className="opacity-40" />
      <FloatingEmbers className="opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Kitchen & 5.0 Rated Crest */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#062A20]/90 border border-[#C39A4A]/40 text-xs font-semibold tracking-wider text-[#C39A4A] shadow-md">
                <Star className="w-3.5 h-3.5 fill-[#C39A4A] text-[#C39A4A]" />
                <span className="uppercase tracking-[0.15em]">5.0 Rated Authentic Pakistani Cuisine</span>
                <span className="text-white/40">•</span>
                <span className="text-[#F5EBD7] font-normal">Kuala Lumpur</span>
              </div>

              {/* Live Kitchen Pulsing Indicator */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#062A20]/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Woodfire &amp; Dum Active</span>
              </div>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif-display font-extrabold text-4xl sm:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-[#F5EBD7]">
              KARACHI,
              <br />
              <span className="italic font-cormorant font-normal text-[#D8BB72] pr-2">
                served in
              </span>
              <br />
              KUALA LUMPUR.
            </h1>

            {/* Supporting Appetite Copy */}
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-[#CFC2A8] font-sans leading-relaxed">
              Authentic Pakistani recipes, aromatic slow-dum biryani, smoky charcoal BBQ,
              and rich wok-tossed karahi cooked with genuine spices of Karachi.
            </p>

            {/* Information Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-[#CFC2A8] pt-1">
              <div className="flex items-center space-x-2 bg-[#062A20]/80 px-3 py-1.5 rounded border border-[#C39A4A]/25">
                <Clock className="w-3.5 h-3.5 text-[#C39A4A]" />
                <span>Opens Daily 12:00 PM – Late</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#062A20]/80 px-3 py-1.5 rounded border border-[#C39A4A]/25">
                <Utensils className="w-3.5 h-3.5 text-[#C39A4A]" />
                <span>100% Halal Kitchen</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#062A20]/80 px-3 py-1.5 rounded border border-[#C39A4A]/25">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Charcoal Sigri</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Explore The Menu
              </button>
              <button
                id="hero-order-now-btn"
                onClick={onOpenOrder}
                className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-[#062A20] hover:bg-[#062A20]/80 text-[#F5EBD7] border border-[#C39A4A] font-semibold text-sm tracking-wider transition-all hover:border-[#D8BB72] cursor-pointer"
              >
                Order Online (WhatsApp)
              </button>
            </div>

            {/* Fine Address Anchor */}
            <div className="pt-1 text-xs text-[#CFC2A8]/80 text-center lg:text-left font-mono">
              <span>{RESTAURANT_INFO.address}, 51200 Kuala Lumpur</span>
            </div>
          </div>

          {/* Right Column: Interactive Live Dish Showcase with cycling visuals & live effects */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-center">
            <HeroLiveShowcase onExploreDish={onSelectCategory} />
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <div className="pt-10 text-center">
          <button
            onClick={onExploreMenu}
            className="inline-flex flex-col items-center text-xs text-[#CFC2A8] hover:text-[#D8BB72] transition-colors focus:outline-none cursor-pointer"
            aria-label="Scroll to menu discovery"
          >
            <span className="tracking-widest uppercase mb-1.5 text-[10px] font-mono">Discover Culinary Highlights</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#C39A4A]" />
          </button>
        </div>
      </div>
    </section>
  );
};

