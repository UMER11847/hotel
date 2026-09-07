import React from 'react';
import { Users, Flame, Sparkles, Plus, Check } from 'lucide-react';
import { MenuItem } from '../../types';
import { BbqEmberGlow } from '../animations/LiveFoodEffects';

interface FeastModeSectionProps {
  onOpenDishModal: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  platterItems: MenuItem[];
}

export const FeastModeSection: React.FC<FeastModeSectionProps> = ({
  onOpenDishModal,
  onAddToCart,
  platterItems,
}) => {
  const [justAddedId, setJustAddedId] = React.useState<string | null>(null);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 900);
  };

  return (
    <section
      id="feast"
      className="py-20 bg-[#271313] text-[#F5EBD7] relative overflow-hidden border-t border-[#4B1118]/40"
    >
      {/* Ambient warm embers background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#C39A4A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#4B1118]/80 border border-[#C39A4A]/40 text-xs font-semibold text-[#D8BB72] mb-3">
            <Users className="w-3.5 h-3.5 text-[#C39A4A]" />
            <span className="uppercase tracking-widest">Table Sharing &amp; Gatherings</span>
          </div>
          <h2 className="font-serif-display font-extrabold text-3xl sm:text-5xl text-[#F5EBD7] tracking-tight">
            FEAST MODE
          </h2>
          <div className="w-16 h-0.5 bg-[#C39A4A] mx-auto my-3" />
          <p className="font-cormorant italic text-xl text-[#D8BB72] mb-2">
            &ldquo;Ordering for the whole table?&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-[#CFC2A8] font-sans">
            In Pakistani hospitality, food is meant to be shared from large copper platters and sizzling karahis. These curated table centrepieces are designed for 2 to 6 guests.
          </p>
        </div>

        {/* Featured Platters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platterItems.map((platter) => {
            const price =
              platter.pricing.type === 'single'
                ? platter.pricing.price
                : platter.pricing.variants[0]?.price || 0;
            const isAdded = justAddedId === platter.id;

            return (
              <div
                key={platter.id}
                id={`feast-platter-${platter.id}`}
                className="relative rounded-2xl overflow-hidden bg-[#15130F] border-2 border-[#C39A4A]/40 shadow-2xl flex flex-col justify-between group"
              >
                {/* Image Header with BBQ Embers */}
                <div className="relative h-60 w-full overflow-hidden bg-black/60">
                  <img
                    src={
                      platter.image ||
                      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
                    }
                    alt={platter.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15130F] via-transparent to-black/40" />
                  <BbqEmberGlow />

                  <div className="absolute top-4 left-4 bg-[#0B3D2E]/90 backdrop-blur-md border border-[#C39A4A] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#D8BB72]">
                    For Sharing
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-[#C39A4A]/50 px-3.5 py-1.5 rounded-lg text-right">
                    <span className="block text-[10px] text-[#CFC2A8] uppercase">Platter Price</span>
                    <span className="font-serif-display font-extrabold text-xl text-[#F5EBD7]">
                      RM {price}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-serif-display font-bold text-2xl text-[#F5EBD7] group-hover:text-[#D8BB72] transition-colors">
                      {platter.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CFC2A8] mt-2 leading-relaxed">
                      {platter.description}
                    </p>

                    {/* Included components bullet list */}
                    {platter.includedComponents && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="block text-xs font-bold text-[#C39A4A] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                          <Flame className="w-3 h-3 text-amber-500" />
                          <span>Includes for the Table:</span>
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#F5EBD7]">
                          {platter.includedComponents.map((comp, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <span className="text-[#C39A4A] font-bold">•</span>
                              <span className="truncate">{comp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      id={`feast-view-details-${platter.id}`}
                      onClick={() => onOpenDishModal(platter)}
                      className="text-xs text-[#CFC2A8] hover:text-[#F5EBD7] underline underline-offset-4 cursor-pointer"
                    >
                      View Full Details
                    </button>

                    <button
                      type="button"
                      id={`feast-add-btn-${platter.id}`}
                      onClick={() => handleQuickAdd(platter)}
                      className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] hover:scale-105'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Added to Table ✓</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add Platter — RM {price}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
