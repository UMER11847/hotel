import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { BiryaniSteam, LiveSpiceParticles } from '../animations/LiveFoodEffects';

interface SignatureBiryaniProps {
  onDiscoverBiryani: () => void;
}

export const SignatureBiryani: React.FC<SignatureBiryaniProps> = ({ onDiscoverBiryani }) => {
  const highlights = [
    'Aged extra long-grain sella & basmati rice',
    'Tender slow-simmered spiced cuts with bone marrow essence',
    'Infused with saffron, fried crisp onions, and fresh mint',
    'Available in 1 Plate single serving or Full Table feasts',
  ];

  return (
    <section
      id="signature-biryani"
      className="py-24 bg-[#062A20] text-[#F5EBD7] relative overflow-hidden border-y border-[#C39A4A]/20 bg-jaali-pattern"
    >
      {/* Background ambient accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0B3D2E] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#4B1118]/30 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Biryani Visual with Live Steam & Visual Callouts */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C39A4A]/40 shadow-2xl bg-[#15130F] group">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/videos/biryani.jpg"
                aria-label="Karachi Special Dum Biryani"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              >
                <source src="/videos/biryani.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              {/* Live Subtle Steam & Gold Spice Sparkles */}
              <BiryaniSteam />
              <LiveSpiceParticles />

              {/* Interactive Visual Pins */}
              <div className="absolute top-12 left-8 hidden sm:flex items-center space-x-2 bg-[#15130F]/90 backdrop-blur-md border border-[#C39A4A]/60 px-2.5 py-1 rounded-full text-[10px] text-[#F5EBD7] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C39A4A] animate-ping" />
                <span>Aged Long-Grain Basmati</span>
              </div>

              <div className="absolute top-28 right-8 hidden sm:flex items-center space-x-2 bg-[#15130F]/90 backdrop-blur-md border border-[#C39A4A]/60 px-2.5 py-1 rounded-full text-[10px] text-[#F5EBD7] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Saffron &amp; Crispy Onions</span>
              </div>

              {/* Floating Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-[#062A20]/90 backdrop-blur-md border border-[#C39A4A]/40 p-3 rounded-lg">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#C39A4A] tracking-wider block">
                    Authentic Dum Process
                  </span>
                  <span className="font-serif-display font-bold text-base text-[#F5EBD7]">
                    Chicken, Beef, Mutton & Prawn
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#CFC2A8] block">Starting at</span>
                  <span className="font-extrabold text-sm text-[#F5EBD7]">RM 20 / Plate</span>
                </div>
              </div>
            </div>

            {/* Subtle Desi Stamp Decoration */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border border-[#C39A4A]/30 bg-[#0B3D2E] flex items-center justify-center p-2 text-center rotate-[-12deg] shadow-lg hidden sm:flex">
              <span className="text-[9px] font-serif-display font-bold text-[#C39A4A] uppercase tracking-tighter">
                ORIGINAL RECIPE
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#C39A4A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Dastarkhwan Essential</span>
            </div>

            <h2 className="font-serif-display font-bold text-3xl sm:text-5xl text-[#F5EBD7] leading-tight">
              OUR BIRYANI
            </h2>

            <div className="w-16 h-0.5 bg-[#C39A4A]" />

            <blockquote className="font-cormorant italic text-xl sm:text-2xl text-[#D8BB72] leading-relaxed border-l-2 border-[#C39A4A]/50 pl-4 my-4">
              "Layers of basmati rice, aromatic spices, slow-cooked meat, and the unmistakable Karachi flavour."
            </blockquote>

            <p className="text-sm sm:text-base text-[#CFC2A8] leading-relaxed">
              Every handi of our biryani follows the centuries-old Karachi dum method: parboiled basmati is layered over a rich yakhni masala with golden onions, green chillies, and dried aloo bukhara (plums), then sealed to steam slowly until every grain is infused with fragrant oils.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-[#F5EBD7]">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C39A4A] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#CFC2A8]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                id="discover-biryani-cta-btn"
                onClick={onDiscoverBiryani}
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-md bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <span>Explore All Biryanis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-[#CFC2A8]">
                Choice of 1 Plate or Full Deg Platter
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
