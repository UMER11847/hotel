import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';

interface FloatingOrderBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const FloatingOrderBar: React.FC<FloatingOrderBarProps> = ({
  cartItems,
  onOpenCart,
}) => {
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  if (itemCount === 0) return null;

  return (
    <div
      id="floating-mobile-order-bar"
      className="md:hidden fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#062A20] border-2 border-[#C39A4A] rounded-xl p-3.5 shadow-2xl flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#0B3D2E] border border-[#C39A4A]/60 flex items-center justify-center text-[#D8BB72]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-xs font-bold text-[#F5EBD7]">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in Dastarkhwan
            </span>
            <span className="font-serif-display font-extrabold text-sm text-[#D8BB72]">
              RM {subtotal}
            </span>
          </div>
        </div>

        <button
          type="button"
          id="floating-bar-view-cart-btn"
          onClick={onOpenCart}
          className="py-2.5 px-4 rounded-lg bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
