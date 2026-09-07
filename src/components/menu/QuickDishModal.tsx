import React, { useState } from 'react';
import { X, Plus, Minus, Flame, Sparkles, Check, AlertCircle } from 'lucide-react';
import { MenuItem, VariantOption } from '../../types';
import { BiryaniSteam, BbqEmberGlow, KarahiSizzleHaze, DrinkColdCondensation } from '../animations/LiveFoodEffects';

interface QuickDishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, variant?: VariantOption, quantity?: number, specialNotes?: string) => void;
}

export const QuickDishModal: React.FC<QuickDishModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const hasVariants = item.pricing.type === 'variants';
  const variants = hasVariants ? item.pricing.variants : [];
  const [selectedVariant, setSelectedVariant] = useState<VariantOption | undefined>(
    hasVariants ? variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : item.pricing.type === 'single'
    ? item.pricing.price
    : 0;

  const totalPrice = currentPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, selectedVariant, quantity, specialNotes.trim() || undefined);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div
      id="quick-dish-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="quick-dish-modal-card"
        className="w-full max-w-lg bg-[#15130F] text-[#F5EBD7] border-t sm:border border-[#C39A4A]/50 rounded-t-2xl sm:rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quick-dish-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[#F5EBD7] hover:text-[#C39A4A] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Dish Photography Header if available */}
          {item.image ? (
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black/50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15130F] via-transparent to-black/40" />

              {/* Live animations depending on dish category */}
              {item.category === 'biryani' && <BiryaniSteam />}
              {item.category === 'bbq' && <BbqEmberGlow />}
              {item.category === 'chicken-special' && <KarahiSizzleHaze />}
              {(item.category === 'lassi' || item.category === 'milkshakes') && <DrinkColdCondensation />}
            </div>
          ) : (
            <div className="h-24 bg-gradient-to-r from-[#0B3D2E] via-[#062A20] to-[#15130F] p-6 border-b border-[#C39A4A]/20 flex items-center">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#C39A4A]">
                Karachi Darbar Premium Lounge
              </span>
            </div>
          )}

          <div className="p-6 space-y-5">
            {/* Title & Tags Row */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {item.pieces && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#C39A4A]/20 border border-[#C39A4A]/40 text-[#C39A4A]">
                    {item.pieces}
                  </span>
                )}
                {item.heatLevel && (
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                      item.heatLevel === 'Karachi Hot'
                        ? 'bg-red-950/50 border-red-500/40 text-red-300'
                        : item.heatLevel === 'Warm'
                        ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
                        : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>Karachi Heat: {item.heatLevel}</span>
                  </span>
                )}
                {item.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-[#CFC2A8]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h3 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#F5EBD7]">
                {item.name}
              </h3>

              {item.description && (
                <p className="text-xs sm:text-sm text-[#CFC2A8] mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {/* Platter included components breakdown */}
            {item.includedComponents && item.includedComponents.length > 0 && (
              <div className="p-3.5 rounded-lg bg-[#062A20]/80 border border-[#C39A4A]/30">
                <span className="block text-xs font-bold text-[#C39A4A] uppercase tracking-wider mb-2">
                  What&apos;s Included In This Feast:
                </span>
                <ul className="space-y-1 text-xs text-[#F5EBD7]">
                  {item.includedComponents.map((comp, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-[#C39A4A]">•</span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verification notice if applicable */}
            {item.verificationNeeded && (
              <div className="p-2.5 rounded bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>{item.verificationNotes || 'Special item specification flagged for menu confirmation.'}</span>
              </div>
            )}

            {/* Variants Selector (Half / Full or 1 Plate / Full) */}
            {hasVariants && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#C39A4A] uppercase tracking-wider">
                  Select Portion / Serving Size:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {variants.map((v) => {
                    const isSelected = selectedVariant?.name === v.name;
                    return (
                      <button
                        key={v.name}
                        type="button"
                        id={`variant-btn-${item.id}-${v.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setSelectedVariant(v)}
                        className={`py-3 px-4 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0B3D2E] border-[#C39A4A] text-[#F5EBD7] ring-1 ring-[#C39A4A]'
                            : 'bg-black/40 border-white/10 text-[#CFC2A8] hover:border-[#C39A4A]/40'
                        }`}
                      >
                        <div>
                          <span className="block font-semibold text-sm">{v.name}</span>
                          <span className="block text-xs text-[#C39A4A] font-bold mt-0.5">
                            RM {v.price}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#C39A4A] text-[#15130F] flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions Input */}
            <div className="space-y-1.5">
              <label htmlFor="dish-special-instructions" className="block text-xs text-[#CFC2A8]">
                Special Instructions (e.g. &ldquo;Less spicy&rdquo;, &ldquo;Extra mint chutney&rdquo;):
              </label>
              <textarea
                id="dish-special-instructions"
                rows={2}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="Note your preparation preference..."
                className="w-full bg-black/40 border border-white/15 rounded-lg px-3 py-2 text-xs text-[#F5EBD7] placeholder-white/30 focus:outline-none focus:border-[#C39A4A] resize-none"
              />
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs font-semibold text-[#CFC2A8] uppercase tracking-wider">
                Quantity:
              </span>
              <div className="flex items-center space-x-3 bg-black/50 border border-white/15 rounded-lg p-1">
                <button
                  type="button"
                  id="modal-decrement-qty"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#F5EBD7] hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-sm text-[#F5EBD7]">
                  {quantity}
                </span>
                <button
                  type="button"
                  id="modal-increment-qty"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded flex items-center justify-center text-[#F5EBD7] hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Add Action */}
        <div className="p-4 sm:p-5 bg-[#062A20] border-t border-[#C39A4A]/30 flex items-center justify-between gap-4">
          <div>
            <span className="block text-[11px] text-[#CFC2A8] uppercase">Total</span>
            <span className="font-serif-display font-extrabold text-xl sm:text-2xl text-[#D8BB72]">
              RM {totalPrice}
            </span>
          </div>

          <button
            type="button"
            id="modal-add-to-cart-submit"
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-6 rounded-md font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] hover:scale-[1.01]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Dastarkhwan ✓</span>
              </>
            ) : (
              <>
                <span>Add to Dastarkhwan</span>
                <span>• RM {totalPrice}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
