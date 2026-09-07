import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Flame, Sparkles, Eye, Filter } from 'lucide-react';
import { MenuItem, VariantOption, ProteinType } from '../../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../data/menu';
import { BiryaniSteam, BbqEmberGlow, KarahiSizzleHaze, DrinkColdCondensation } from '../animations/LiveFoodEffects';

interface MenuSectionProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  onOpenDishModal: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem, variant?: VariantOption) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenDishModal,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [proteinFilter, setProteinFilter] = useState<string>('all');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  // Local state to track selected variant on cards
  const [selectedVariantsMap, setSelectedVariantsMap] = useState<Record<string, VariantOption>>({});

  const filterProteins: { id: string; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'chicken', label: 'Chicken' },
    { id: 'beef', label: 'Beef' },
    { id: 'mutton', label: 'Mutton' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'vegetarian', label: 'Vegetarian / Sides' },
    { id: 'beverage', label: 'Drinks & Shakes' },
  ];

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;

      // Protein match
      const matchesProtein =
        proteinFilter === 'all' || item.protein === proteinFilter;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesProtein && matchesSearch;
    });
  }, [activeCategory, proteinFilter, searchQuery]);

  const handleCardAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    let variant: VariantOption | undefined = undefined;
    if (item.pricing.type === 'variants') {
      variant = selectedVariantsMap[item.id] || item.pricing.variants[0];
    }

    onAddToCart(item, variant);

    const key = `${item.id}-${variant?.name || 'single'}`;
    setAddedItemMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [key]: false }));
    }, 900);
  };

  const handleVariantSelect = (
    e: React.MouseEvent,
    itemId: string,
    variant: VariantOption
  ) => {
    e.stopPropagation();
    setSelectedVariantsMap((prev) => ({ ...prev, [itemId]: variant }));
  };

  return (
    <section
      id="menu"
      className="py-20 bg-[#15130F] text-[#F5EBD7] relative overflow-hidden bg-jaali-faint"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C39A4A] block mb-2">
            The Authoritative Menu
          </span>
          <h2 className="font-serif-display font-extrabold text-3xl sm:text-5xl text-[#F5EBD7] tracking-tight">
            KARACHI DARBAR MENU
          </h2>
          <div className="w-16 h-0.5 bg-[#C39A4A] mx-auto my-4" />
          <p className="text-xs sm:text-sm text-[#CFC2A8] font-sans">
            Prepared to order using authentic Pakistani techniques, whole spices, and halal ingredients. All prices in Malaysian Ringgit (RM).
          </p>
        </div>

        {/* Search & Protein Filter Controls */}
        <div className="space-y-4 mb-8">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C39A4A]" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search biryani, kebab, karahi, lassi..."
              className="w-full bg-[#062A20]/80 border border-[#C39A4A]/30 rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F5EBD7] placeholder-[#CFC2A8]/50 focus:outline-none focus:border-[#C39A4A] focus:ring-1 focus:ring-[#C39A4A] shadow-inner transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#CFC2A8] hover:text-[#F5EBD7]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Protein Quick Filter Chips */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-semibold text-[#C39A4A] uppercase flex items-center space-x-1 mr-1">
              <Filter className="w-3 h-3" />
              <span>Filter:</span>
            </span>
            {filterProteins.map((p) => (
              <button
                key={p.id}
                id={`protein-filter-${p.id}`}
                onClick={() => setProteinFilter(p.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  proteinFilter === p.id
                    ? 'bg-[#C39A4A] text-[#15130F] font-bold shadow'
                    : 'bg-[#062A20] text-[#CFC2A8] border border-white/10 hover:border-[#C39A4A]/50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky Horizontal Category Rail */}
        <div className="sticky top-[60px] z-30 bg-[#15130F]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0 border-y border-[#C39A4A]/20 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2 min-w-max">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-category-tab-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0B3D2E] text-[#D8BB72] border border-[#C39A4A] shadow-md'
                      : 'bg-black/30 text-[#CFC2A8] border border-white/5 hover:border-[#C39A4A]/40 hover:text-[#F5EBD7]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#062A20]/40 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="font-serif-display text-xl text-[#F5EBD7]">
              No dishes found matching your selection.
            </p>
            <p className="text-xs text-[#CFC2A8] mt-2 mb-4">
              Try clearing your search term or adjusting the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setProteinFilter('all');
                onSelectCategory('all');
              }}
              className="px-4 py-2 bg-[#C39A4A] text-[#15130F] font-bold text-xs uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const hasVariants = item.pricing.type === 'variants';
              const activeVariant =
                hasVariants
                  ? selectedVariantsMap[item.id] || item.pricing.variants[0]
                  : undefined;
              const displayPrice = activeVariant
                ? activeVariant.price
                : item.pricing.type === 'single'
                ? item.pricing.price
                : 0;

              const addKey = `${item.id}-${activeVariant?.name || 'single'}`;
              const isJustAdded = !!addedItemMap[addKey];

              return (
                <div
                  key={item.id}
                  id={`menu-item-card-${item.id}`}
                  onClick={() => onOpenDishModal(item)}
                  className="group relative rounded-xl overflow-hidden bg-[#062A20]/60 hover:bg-[#062A20] border border-[#C39A4A]/25 hover:border-[#C39A4A]/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Image (if item has photo) or Brand Ornament Banner */}
                  {item.image ? (
                    <div className="relative h-48 w-full overflow-hidden bg-black/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#062A20] via-transparent to-black/20" />

                      {/* Live Steam / Ember animations */}
                      {item.category === 'biryani' && <BiryaniSteam />}
                      {item.category === 'bbq' && <BbqEmberGlow />}
                      {item.category === 'chicken-special' && <KarahiSizzleHaze />}
                      {(item.category === 'lassi' || item.category === 'milkshakes') && <DrinkColdCondensation />}

                      {/* Top floating quick view icon */}
                      <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-[#F5EBD7] opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="h-14 bg-gradient-to-r from-[#0B3D2E]/60 to-[#062A20] px-4 pt-3 flex items-center justify-between border-b border-white/5">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#C39A4A]">
                        Karachi Heritage
                      </span>
                      <Eye className="w-3.5 h-3.5 text-[#C39A4A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tags & Pieces badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        {item.pieces && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#C39A4A]/20 border border-[#C39A4A]/40 text-[#D8BB72]">
                            {item.pieces}
                          </span>
                        )}
                        {item.heatLevel && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/40 border border-white/10 text-[#CFC2A8] flex items-center space-x-1">
                            <Flame className="w-2.5 h-2.5 text-amber-500" />
                            <span>{item.heatLevel}</span>
                          </span>
                        )}
                        {item.tags?.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[9px] font-semibold bg-[#0B3D2E] text-[#D8BB72] border border-[#C39A4A]/30"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Dish Name */}
                      <h3 className="font-serif-display font-bold text-lg text-[#F5EBD7] group-hover:text-[#D8BB72] transition-colors">
                        {item.name}
                      </h3>

                      {/* Concise description */}
                      {item.description && (
                        <p className="text-xs text-[#CFC2A8] line-clamp-2 mt-1.5 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Pricing & Variant Action Area */}
                    <div className="pt-4 mt-3 border-t border-white/10">
                      {/* Variants Toggle (Half / Full or 1 Plate / Full) */}
                      {hasVariants && (
                        <div className="mb-3">
                          <span className="block text-[10px] uppercase font-bold text-[#C39A4A] tracking-wider mb-1.5">
                            Portion:
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {item.pricing.variants.map((v) => {
                              const isSelected = activeVariant?.name === v.name;
                              return (
                                <button
                                  key={v.name}
                                  type="button"
                                  id={`card-variant-${item.id}-${v.name.toLowerCase().replace(/\s+/g, '-')}`}
                                  onClick={(e) => handleVariantSelect(e, item.id, v)}
                                  className={`py-1.5 px-2 rounded text-xs text-center border font-medium transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#0B3D2E] border-[#C39A4A] text-[#F5EBD7] font-bold shadow'
                                      : 'bg-black/30 border-white/10 text-[#CFC2A8] hover:border-white/30'
                                  }`}
                                >
                                  <span>{v.name}</span>
                                  <span className="block text-[10px] text-[#C39A4A] font-bold">
                                    RM {v.price}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Price & Add To Cart Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] text-[#CFC2A8] uppercase">
                            {hasVariants ? 'Selected' : 'Price'}
                          </span>
                          <span className="font-serif-display font-bold text-xl text-[#F5EBD7]">
                            RM {displayPrice}
                          </span>
                        </div>

                        <button
                          type="button"
                          id={`card-add-btn-${item.id}`}
                          onClick={(e) => handleCardAdd(e, item)}
                          className={`py-2 px-3.5 rounded text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] hover:scale-105 active:scale-95'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Added ✓</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add +</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
