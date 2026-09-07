import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Navigation, Star, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurant';

interface VisitSectionProps {
  onOpenOrder: () => void;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ onOpenOrder }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${RESTAURANT_INFO.name} 139, Jln Sultan Azlan Shah, 51200 Kuala Lumpur`
  )}`;

  return (
    <section
      id="visit"
      className="py-24 bg-[#0B3D2E] text-[#F5EBD7] relative overflow-hidden bg-jaali-pattern border-t border-[#C39A4A]/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Details & Actions */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#062A20] border border-[#C39A4A]/40 text-xs text-[#D8BB72] mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#C39A4A]" />
                <span className="uppercase tracking-widest">Wilayah Persekutuan Kuala Lumpur</span>
              </div>
              <h2 className="font-serif-display font-extrabold text-3xl sm:text-5xl text-[#F5EBD7] tracking-tight">
                VISIT THE LOUNGE
              </h2>
              <div className="w-16 h-0.5 bg-[#C39A4A] mx-auto lg:mx-0 my-3" />
              <p className="text-xs sm:text-sm text-[#CFC2A8] font-sans leading-relaxed">
                Join us for lunch, dinner, or late-night Pakistani dining in our welcoming lounge on Jalan Sultan Azlan Shah.
              </p>
            </div>

            {/* Honest 5.0 Google Rating Display */}
            <div className="p-4 rounded-xl bg-[#062A20]/90 border border-[#C39A4A]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-[#0B3D2E] border border-[#C39A4A]/50 flex items-center justify-center text-[#D8BB72] font-serif-display font-extrabold text-xl shadow">
                  5.0
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-[#C39A4A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C39A4A]" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#F5EBD7] block mt-0.5">
                    Google Review Rating
                  </span>
                </div>
              </div>

              <a
                id="google-reviews-btn"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#C39A4A] hover:text-[#D8BB72] flex items-center space-x-1 transition-colors underline underline-offset-4"
              >
                <span>Read Google Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Address & Hours List */}
            <div className="space-y-4 text-xs sm:text-sm text-[#F5EBD7]">
              <div className="flex items-start space-x-3 text-left">
                <MapPin className="w-5 h-5 text-[#C39A4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-serif-display text-base text-[#F5EBD7]">
                    {RESTAURANT_INFO.name}
                  </strong>
                  <span className="text-[#CFC2A8]">
                    {RESTAURANT_INFO.address}, 51200 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-left">
                <Clock className="w-5 h-5 text-[#C39A4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#F5EBD7]">Operating Hours</strong>
                  <span className="text-[#CFC2A8]">{RESTAURANT_INFO.openingHours}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-left">
                <Phone className="w-5 h-5 text-[#C39A4A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#F5EBD7]">Direct Inquiries &amp; Table Booking</strong>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-[#D8BB72] hover:underline font-mono text-sm"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                id="get-directions-button"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-md bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                id="call-restaurant-button"
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-5 py-3 rounded-md bg-[#062A20] hover:bg-[#062A20]/80 text-[#F5EBD7] border border-[#C39A4A]/50 font-semibold text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#C39A4A]" />
                <span>Call Restaurant</span>
              </a>

              <a
                id="whatsapp-enquiry-button"
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Karachi Darbar Lounge, I would like to inquire about a table / reservation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-md bg-[#062A20] hover:bg-[#062A20]/80 text-[#F5EBD7] border border-[#C39A4A]/50 font-semibold text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C39A4A]" />
                <span>WhatsApp Lounge</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Stylized Map Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C39A4A]/40 shadow-2xl bg-[#062A20] h-[360px] sm:h-[420px]">
              {/* Stylized Google Maps Embed */}
              <iframe
                title="Karachi Darbar Lounge Location"
                src="https://maps.google.com/maps?q=139%20Jln%20Sultan%20Azlan%20Shah%2051200%20Kuala%20Lumpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale contrast-125 opacity-85 hover:opacity-100 hover:filter-none transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlay location pin badge */}
              <div className="absolute top-4 left-4 bg-[#15130F]/90 backdrop-blur-md border border-[#C39A4A] p-3 rounded-lg shadow-xl max-w-xs pointer-events-none">
                <span className="text-[10px] font-mono uppercase text-[#C39A4A] block">
                  Karachi Darbar Premium Lounge
                </span>
                <span className="text-xs font-bold text-[#F5EBD7]">
                  Jln Sultan Azlan Shah, KL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
