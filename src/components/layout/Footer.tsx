import React from 'react';
import { Phone, MapPin, Clock, Star, MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurant';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onOpenOrder }) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#062A20] text-[#F5EBD7] pt-16 pb-12 border-t border-[#C39A4A]/25 relative overflow-hidden"
    >
      {/* Subtle jaali background */}
      <div className="absolute inset-0 bg-jaali-faint pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-[#C39A4A] bg-[#0B3D2E] flex items-center justify-center p-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#C39A4A]">
                  <path
                    d="M12 2C8 6 5 9 5 14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14C19 9 16 6 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 6V17M9 13L12 10L15 13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <span className="block font-serif-display font-bold text-xl tracking-wider text-[#F5EBD7]">
                  KARACHI DARBAR
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-[0.2em] text-[#C39A4A]">
                  Premium Lounge • KL
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#CFC2A8] leading-relaxed max-w-sm font-sans">
              Authentic Pakistani Cuisine in Kuala Lumpur. Charcoal seekh kababs, aromatic slow-cooked dum biryanis, and searing iron wok karahis.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#D8BB72]">
              <div className="flex text-[#C39A4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C39A4A]" />
                ))}
              </div>
              <span className="font-semibold text-[#F5EBD7]">5.0 Rating</span>
              <span className="text-white/30">•</span>
              <span className="text-[#CFC2A8]">Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif-display font-bold text-sm tracking-wider uppercase text-[#C39A4A]">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-[#CFC2A8]">
              <li>
                <button
                  onClick={() => onNavigateTo('hero')}
                  className="hover:text-[#F5EBD7] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('menu')}
                  className="hover:text-[#F5EBD7] transition-colors cursor-pointer"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('craving')}
                  className="hover:text-[#F5EBD7] transition-colors cursor-pointer"
                >
                  What You&apos;re Craving
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('feast')}
                  className="hover:text-[#F5EBD7] transition-colors cursor-pointer"
                >
                  Feast Mode Platters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('story')}
                  className="hover:text-[#F5EBD7] transition-colors cursor-pointer"
                >
                  From Karachi to KL
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('visit')}
                  className="hover:text-[#F5EBD7] transition-colors cursor-pointer"
                >
                  Visit the Lounge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit Info */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif-display font-bold text-sm tracking-wider uppercase text-[#C39A4A]">
              Visit
            </h3>
            <div className="space-y-2 text-xs text-[#CFC2A8]">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C39A4A] shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address}, 51200 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia
                </span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <Clock className="w-4 h-4 text-[#C39A4A] shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-[#C39A4A] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-[#D8BB72] hover:underline font-mono"
                >
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Order & WhatsApp Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif-display font-bold text-sm tracking-wider uppercase text-[#C39A4A]">
              Order &amp; Inquiries
            </h3>
            <p className="text-xs text-[#CFC2A8] leading-relaxed">
              Place your table reservations, takeaway orders, or delivery queries directly with our staff.
            </p>
            <div className="space-y-2 pt-1">
              <button
                id="footer-open-dastarkhwan-btn"
                onClick={onOpenOrder}
                className="w-full py-2.5 px-4 rounded bg-[#C39A4A] text-[#15130F] font-bold text-xs uppercase tracking-wider hover:bg-[#D8BB72] transition-colors shadow cursor-pointer"
              >
                View Dastarkhwan (Cart)
              </button>
              <a
                id="footer-whatsapp-btn"
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Karachi Darbar Lounge, I would like to place an order / make an inquiry.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded border border-[#C39A4A]/60 bg-[#0B3D2E] text-[#F5EBD7] font-semibold text-xs flex items-center justify-center space-x-2 hover:border-[#C39A4A] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C39A4A]" />
                <span>Direct WhatsApp Hotline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#CFC2A8]/70 space-y-2 sm:space-y-0">
          <p className="font-serif-display italic text-sm text-[#D8BB72]">
            &ldquo;Authentic Pakistani Cuisine in Kuala Lumpur.&rdquo;
          </p>
          <p className="text-[11px] font-mono">
            © {new Date().getFullYear()} Karachi Darbar Premium Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
