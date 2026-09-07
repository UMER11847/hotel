import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Flame } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurant';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onNavigateTo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Craving', target: 'craving' },
    { label: 'Menu', target: 'menu' },
    { label: 'Feast Mode', target: 'feast' },
    { label: 'Our Story', target: 'story' },
    { label: 'Visit Us', target: 'visit' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigateTo(target);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#062A20]/95 backdrop-blur-md py-3 border-b border-[#C39A4A]/25 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#0B3D2E]/90 via-[#0B3D2E]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <button
          id="header-brand-logo"
          onClick={() => handleLinkClick('hero')}
          className="text-left group flex items-center space-x-3 cursor-pointer focus:outline-none"
          aria-label="Karachi Darbar Home"
        >
          {/* Ornate Arch / Crest Icon */}
          <div className="w-10 h-10 rounded-full border border-[#C39A4A] bg-[#062A20] flex items-center justify-center p-1.5 shadow-md shadow-black/30 group-hover:border-[#D8BB72] transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-[#C39A4A] group-hover:text-[#D8BB72] transition-colors"
            >
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
            <span className="block font-serif-display font-bold text-lg sm:text-xl tracking-wider text-[#F5EBD7] group-hover:text-[#D8BB72] transition-colors leading-none">
              KARACHI DARBAR
            </span>
            <span className="block text-[10px] sm:text-xs font-sans tracking-[0.2em] text-[#C39A4A] uppercase mt-0.5 font-medium">
              Premium Lounge • KL
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center space-x-7 text-sm font-medium tracking-wide"
        >
          {navLinks.map((link) => (
            <button
              key={link.target}
              id={`nav-link-${link.target}`}
              onClick={() => handleLinkClick(link.target)}
              className="text-[#CFC2A8] hover:text-[#F5EBD7] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#C39A4A] after:absolute after:bottom-0 after:left-0 after:transition-all cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Phone Call Quick Link */}
          <a
            id="header-phone-button"
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="hidden lg:flex items-center space-x-2 text-xs text-[#CFC2A8] hover:text-[#F5EBD7] transition-colors py-1.5 px-3 rounded border border-[#C39A4A]/30 bg-[#062A20]/60 hover:border-[#C39A4A]"
            title="Call Restaurant"
          >
            <Phone className="w-3.5 h-3.5 text-[#C39A4A]" />
            <span className="font-sans font-medium">{RESTAURANT_INFO.phoneDisplay}</span>
          </a>

          {/* Cart Icon & Badge */}
          <button
            id="header-cart-button"
            onClick={onOpenCart}
            className="relative flex items-center space-x-2 bg-[#062A20] hover:bg-[#0B3D2E] text-[#F5EBD7] border border-[#C39A4A] px-3.5 py-2 rounded-md transition-all shadow-md hover:border-[#D8BB72] group cursor-pointer"
            aria-label={`Open Cart (${cartItemCount} items)`}
          >
            <ShoppingBag className="w-4 h-4 text-[#C39A4A] group-hover:text-[#D8BB72] transition-colors" />
            <span className="hidden sm:inline text-xs font-semibold tracking-wider text-[#F5EBD7]">
              DASTARKHWAN
            </span>
            {cartItemCount > 0 && (
              <span
                id="header-cart-badge"
                className="bg-[#C39A4A] text-[#15130F] text-xs font-extrabold px-1.5 py-0.2 rounded-full min-w-[20px] text-center"
              >
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5EBD7] hover:text-[#D8BB72] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden bg-[#062A20] border-b border-[#C39A4A]/30 px-6 py-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200"
        >
          <div className="flex flex-col space-y-3 font-medium text-base">
            {navLinks.map((link) => (
              <button
                key={link.target}
                id={`mobile-nav-link-${link.target}`}
                onClick={() => handleLinkClick(link.target)}
                className="text-left py-2 text-[#CFC2A8] hover:text-[#F5EBD7] border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#C39A4A] text-xs font-mono">→</span>
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col space-y-2.5">
            <a
              id="mobile-call-button"
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded bg-[#0B3D2E] text-[#F5EBD7] text-xs font-semibold border border-[#C39A4A]/40"
            >
              <Phone className="w-3.5 h-3.5 text-[#C39A4A]" />
              <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <button
              id="mobile-explore-menu-btn"
              onClick={() => handleLinkClick('menu')}
              className="w-full py-2.5 rounded bg-[#C39A4A] text-[#15130F] text-xs font-bold uppercase tracking-wider shadow"
            >
              Explore Full Menu
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
