import React from 'react';
import { Flame, Sparkles, Soup, GlassWater, ArrowRight } from 'lucide-react';
import {
  BiryaniSteam,
  BbqEmberGlow,
  FloatingEmbers,
  KarahiSizzleHaze,
  DrinkColdCondensation,
} from '../animations/LiveFoodEffects';

interface CravingSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CravingSection: React.FC<CravingSectionProps> = ({ onSelectCategory }) => {
  const cravings = [
    {
      id: 'bbq',
      title: 'Something Smoky',
      dishPreview: 'Karachi Charcoal BBQ',
      description: 'Seekh Kababs, Malai Boti & Balochi Tikka charred over red-hot coals with onions and mint chutney.',
      icon: Flame,
      categoryId: 'bbq',
      video: '/videos/bbq.mp4',
      poster: '/videos/bbq_poster.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=600&auto=format&fit=crop',
      accentColor: 'from-[#4B1118]/85',
      effect: 'bbq',
      liveTag: 'Live Coals',
    },
    {
      id: 'biryani',
      title: 'Something Aromatic',
      dishPreview: 'Karachi Dum Biryani',
      description: 'Layers of fragrant basmati rice, tender spiced cuts, dried plum, and rich saffron steam.',
      icon: Sparkles,
      categoryId: 'biryani',
      video: '/videos/biryani.mp4',
      poster: '/videos/biryani.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop',
      accentColor: 'from-[#0B3D2E]/85',
      effect: 'biryani',
      liveTag: 'Live Dum',
    },
    {
      id: 'chicken-special',
      title: 'Something Rich',
      dishPreview: 'High-Wok Karahi',
      description: 'Cooked fresh in heavy iron wok with fresh tomatoes, ginger slivers, and cracked coriander.',
      icon: Soup,
      categoryId: 'chicken-special',
      video: '/videos/karahi.mp4',
      poster: '/videos/karahi_poster.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop',
      accentColor: 'from-[#062A20]/85',
      effect: 'karahi',
      liveTag: 'Live Wok',
    },
    {
      id: 'lassi',
      title: 'Something Refreshing',
      dishPreview: 'Lassi & Fresh Juices',
      description: 'Thick churned Mango Lassi, fresh fruit pressings, and chilled Mint Margarita.',
      icon: GlassWater,
      categoryId: 'lassi',
      video: '/videos/juices.mp4',
      poster: '/videos/juices_poster.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop',
      accentColor: 'from-[#0B3D2E]/85',
      effect: 'drink',
      liveTag: 'Fresh Pour',
    },
  ];

  return (
    <section
      id="craving"
      className="py-20 bg-[#F5EBD7] text-[#15130F] relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0B3D2E] block mb-2">
            Flavour Guidance
          </span>
          <h2 className="font-serif-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0B3D2E] tracking-tight">
            WHAT ARE YOU CRAVING?
          </h2>
          <div className="w-16 h-0.5 bg-[#C39A4A] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#15130F]/80 font-sans">
            Choose your mood. From slow-dum aromatics to smoky charcoal heat, let the flavours of Karachi guide your table.
          </p>
        </div>

        {/* Cravings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cravings.map((craving) => {
            const Icon = craving.icon;
            return (
              <button
                key={craving.id}
                id={`craving-card-${craving.id}`}
                onClick={() => onSelectCategory(craving.categoryId)}
                className="group relative rounded-xl overflow-hidden text-left bg-[#15130F] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none border border-[#C39A4A]/30 cursor-pointer flex flex-col h-[340px]"
              >
                {/* Live Video Background with Fallback Poster */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={craving.poster}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.75] group-hover:brightness-[0.9]"
                  >
                    <source src={craving.video} type="video/mp4" />
                    {/* Fallback image */}
                    <img
                      src={craving.poster || craving.fallbackImage}
                      alt={craving.dishPreview}
                      className="w-full h-full object-cover"
                    />
                  </video>

                  {/* Subtle Gradient Veil */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${craving.accentColor} via-black/45 to-black/20 opacity-90`}
                  />

                  {/* Live Visual Food Effects */}
                  {craving.effect === 'bbq' && (
                    <>
                      <BbqEmberGlow />
                      <FloatingEmbers className="opacity-70 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                  {craving.effect === 'biryani' && (
                    <BiryaniSteam className="opacity-75 group-hover:opacity-100 transition-opacity" />
                  )}
                  {craving.effect === 'karahi' && (
                    <KarahiSizzleHaze className="opacity-75 group-hover:opacity-100 transition-opacity" />
                  )}
                  {craving.effect === 'drink' && (
                    <DrinkColdCondensation className="opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                {/* Card Content Overlay */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full text-[#F5EBD7]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-[#C39A4A] uppercase flex items-center space-x-1.5">
                      <Icon className="w-4 h-4 text-[#C39A4A]" />
                      <span>{craving.title}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/40 border border-[#C39A4A]/40 text-[#D8BB72] backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                        {craving.liveTag}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs text-[#D8BB72] group-hover:bg-[#C39A4A] group-hover:text-[#15130F] transition-colors">
                        →
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif-display font-bold text-2xl text-[#F5EBD7] group-hover:text-[#D8BB72] transition-colors mb-2">
                      {craving.dishPreview}
                    </h3>
                    <p className="text-xs text-[#CFC2A8] line-clamp-3 leading-relaxed mb-4">
                      {craving.description}
                    </p>
                    <div className="inline-flex items-center space-x-1 text-xs font-bold text-[#C39A4A] group-hover:translate-x-1 transition-transform">
                      <span>Explore Dishes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
