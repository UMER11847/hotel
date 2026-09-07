import React from 'react';
import { Flame, Utensils, HeartHandshake, Compass } from 'lucide-react';
import { BRAND_STORY_STEPS } from '../../data/restaurant';

export const BrandStory: React.FC = () => {
  const icons = [Compass, Utensils, Flame, HeartHandshake];

  return (
    <section
      id="story"
      className="py-24 bg-[#F5EBD7] text-[#15130F] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0B3D2E] block mb-2">
            The Culinary Heritage
          </span>
          <h2 className="font-serif-display font-extrabold text-3xl sm:text-5xl text-[#0B3D2E] tracking-tight">
            FROM KARACHI TO KUALA LUMPUR
          </h2>
          <div className="w-16 h-0.5 bg-[#C39A4A] mx-auto my-4" />
          <p className="font-cormorant italic text-xl sm:text-2xl text-[#0B3D2E] mb-3">
            &ldquo;The flavours of Karachi, now at your table in Kuala Lumpur.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#15130F]/80 font-sans leading-relaxed max-w-2xl mx-auto">
            Karachi is a legendary melting pot of culinary traditions—where aromatic Sindh biryanis meet Afghan charcoal grills and searing Lahori iron woks. We bring those exact tastes to Kuala Lumpur without shortcuts.
          </p>
        </div>

        {/* Visual Journey Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_STORY_STEPS.map((stepItem, idx) => {
            const Icon = icons[idx] || Utensils;
            return (
              <div
                key={stepItem.step}
                className="relative bg-[#FAF5ED] p-7 rounded-xl border border-[#C39A4A]/30 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#C39A4A] tracking-wider">
                      PHASE {stepItem.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#F5EBD7] flex items-center justify-center shadow">
                      <Icon className="w-5 h-5 text-[#C39A4A]" />
                    </div>
                  </div>

                  <h3 className="font-serif-display font-bold text-xl text-[#0B3D2E] mb-3 group-hover:text-[#062A20] transition-colors">
                    {stepItem.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#15130F]/75 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#C39A4A]/20 flex items-center justify-between text-[11px] font-semibold text-[#0B3D2E]">
                  <span>Authentic Method</span>
                  <span className="text-[#C39A4A]">✓</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Traditional Atmosphere Quote */}
        <div className="mt-16 bg-[#0B3D2E] text-[#F5EBD7] p-8 sm:p-12 rounded-2xl shadow-xl text-center max-w-4xl mx-auto relative overflow-hidden border border-[#C39A4A]/40 bg-jaali-faint">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C39A4A] block mb-2">
            The Dastarkhwan Philosophy
          </span>
          <p className="font-serif-display text-xl sm:text-2xl text-[#F5EBD7] leading-relaxed max-w-2xl mx-auto">
            &ldquo;In our culture, the dastarkhwan is not merely a dining table—it is an invitation to warmth, generosity, and community.&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-[#CFC2A8]">
            <span>Karachi Darbar Premium Lounge</span>
            <span>•</span>
            <span className="text-[#C39A4A]">Kuala Lumpur</span>
          </div>
        </div>
      </div>
    </section>
  );
};
