import React from 'react';

/**
 * Subtle steam animation for Biryani and Karahi dishes.
 * Uses SVG wisps and CSS translation/fade to keep it lightweight, performant,
 * and compliant with prefers-reduced-motion.
 */
export const BiryaniSteam: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* Steam Strand 1 */}
      <svg
        className="animate-steam-1 absolute bottom-4 left-1/4 h-24 w-12 text-white/30"
        viewBox="0 0 30 100"
        fill="none"
      >
        <path
          d="M15 95 C 10 75, 20 50, 12 30 C 6 15, 20 5, 14 0"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          filter="blur(3px)"
        />
      </svg>

      {/* Steam Strand 2 */}
      <svg
        className="animate-steam-2 absolute bottom-6 right-1/3 h-28 w-14 text-white/25"
        viewBox="0 0 30 100"
        fill="none"
      >
        <path
          d="M14 95 C 22 70, 8 45, 18 25 C 24 10, 10 5, 16 0"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          filter="blur(4px)"
        />
      </svg>

      {/* Steam Strand 3 (Central gentle drift) */}
      <svg
        className="animate-steam-1 absolute bottom-3 left-1/2 -translate-x-1/2 h-26 w-14 text-amber-100/20"
        viewBox="0 0 30 100"
        fill="none"
      >
        <path
          d="M15 90 C 8 65, 22 40, 13 20 C 6 8, 18 2, 15 0"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="blur(3.5px)"
        />
      </svg>
    </div>
  );
};

/**
 * BBQ Ember Glow effect for charcoal grilled dishes
 */
export const BbqEmberGlow: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="animate-ember-glow absolute -bottom-4 right-2 h-24 w-24 rounded-full bg-gradient-to-t from-amber-600/30 via-orange-500/15 to-transparent blur-xl" />
      <div className="animate-ember-glow absolute -bottom-2 left-4 h-20 w-20 rounded-full bg-gradient-to-t from-red-600/25 via-amber-500/10 to-transparent blur-lg" />
    </div>
  );
};

/**
 * Karahi Sizzle heat effect
 */
export const KarahiSizzleHaze: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="animate-steam-1 absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-500/10 to-transparent blur-md opacity-40" />
      <svg
        className="animate-steam-2 absolute bottom-2 left-1/3 h-20 w-10 text-amber-50/20"
        viewBox="0 0 24 80"
        fill="none"
      >
        <path
          d="M12 75 C 8 55, 16 35, 10 20 C 6 10, 14 3, 12 0"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="blur(2.5px)"
        />
      </svg>
    </div>
  );
};

/**
 * Frost and Condensation sheen for chilled Lassi and Shakes
 */
export const DrinkColdCondensation: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-2 right-2 h-16 w-8 bg-gradient-to-br from-white/20 via-white/5 to-transparent rotate-12 blur-[1px] rounded-full pointer-events-none" />
      <div className="absolute bottom-4 left-3 h-2 w-2 rounded-full bg-white/40 blur-[0.5px]" />
      <div className="absolute bottom-7 left-4 h-1.5 w-1.5 rounded-full bg-white/30 blur-[0.5px]" />
    </div>
  );
};

/**
 * Floating glowing ember sparks for BBQ and Charcoal Grill dishes
 */
export const FloatingEmbers: React.FC<{ count?: number; className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <span className="animate-float-1 absolute bottom-6 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
      <span className="animate-float-2 absolute bottom-8 left-1/2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#ea580c]" />
      <span className="animate-float-3 absolute bottom-5 right-1/3 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_#ef4444]" />
      <span className="animate-float-1 absolute bottom-12 right-1/4 w-1 h-1 rounded-full bg-yellow-300 shadow-[0_0_6px_#fde047]" />
      <span className="animate-float-2 absolute bottom-4 left-1/3 w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
    </div>
  );
};

/**
 * Saffron & Gold Spice sparkles drifting over signature dishes
 */
export const LiveSpiceParticles: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <span className="animate-float-1 absolute top-1/3 left-1/4 w-1 h-1 rounded-full bg-[#D8BB72] shadow-[0_0_6px_#C39A4A]" />
      <span className="animate-float-2 absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-[#C39A4A] shadow-[0_0_8px_#D8BB72]" />
      <span className="animate-float-3 absolute bottom-1/3 left-1/2 w-1 h-1 rounded-full bg-amber-200 shadow-[0_0_6px_#fef08a]" />
      <span className="animate-float-1 absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-yellow-400/80 shadow-[0_0_8px_#eab308]" />
    </div>
  );
};
