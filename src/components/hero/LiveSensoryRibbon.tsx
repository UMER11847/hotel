import React from 'react';
import { Flame, Sparkles, Utensils, Award, Star, Compass, Wind } from 'lucide-react';

export const LiveSensoryRibbon: React.FC = () => {
  const sensoryItems = [
    { icon: Flame, text: 'Live Charcoal Sigri Grilling', highlight: 'Smoky & Tender' },
    { icon: Sparkles, text: 'Slow-Dum Sindhi Biryani', highlight: 'Saffron & Basmati' },
    { icon: Utensils, text: 'Sizzling Desi Ghee Karahi', highlight: 'High Flame Iron Wok' },
    { icon: Wind, text: 'Tandoor Fired Fresh Naans', highlight: 'Garlic, Butter & Roghani' },
    { icon: Star, text: 'Crispy Golden Karachi Broast', highlight: 'Signature Spice Crumb' },
    { icon: Award, text: '100% Halal Certified Kitchen', highlight: 'Finest Hand-Slaughtered Cuts' },
    { icon: Compass, text: 'Authentic Karachi Recipes', highlight: 'Zero Compromise' },
  ];

  // Repeat array twice for seamless continuous infinite marquee
  const items = [...sensoryItems, ...sensoryItems];

  return (
    <div
      id="live-sensory-ribbon"
      className="relative z-20 bg-[#062A20] border-y border-[#C39A4A]/30 py-3.5 overflow-hidden select-none bg-jaali-faint"
      aria-label="Live culinary highlights ticker"
    >
      {/* Side gradient fades for seamless visual edge */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#062A20] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#062A20] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee items-center">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 px-6 sm:px-8 border-r border-[#C39A4A]/20 shrink-0"
            >
              <div className="w-6 h-6 rounded-full bg-[#0B3D2E] border border-[#C39A4A]/50 flex items-center justify-center text-[#C39A4A] shadow-sm">
                <Icon className="w-3.5 h-3.5 text-[#C39A4A]" />
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-[#F5EBD7] whitespace-nowrap">
                <span className="font-serif-display font-semibold tracking-wide text-[#F5EBD7]">
                  {item.text}
                </span>
                <span className="text-[#C39A4A]">•</span>
                <span className="text-[11px] font-mono tracking-wider uppercase text-[#D8BB72] px-1.5 py-0.5 rounded bg-black/40 border border-[#C39A4A]/30">
                  {item.highlight}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
