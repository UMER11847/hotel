import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, AlertCircle, ArrowRight } from 'lucide-react';
import { CartItem, CustomerOrderDetails, OrderType } from '../../types';
import { RESTAURANT_INFO } from '../../data/restaurant';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreMenu,
}) => {
  const [orderDetails, setOrderDetails] = useState<CustomerOrderDetails>({
    name: '',
    phone: '',
    orderType: 'takeaway',
    tableOrAddressNotes: '',
    generalNotes: '',
  });

  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const handleCheckoutWhatsApp = () => {
    // Generate clean WhatsApp message
    let message = `*Karachi Darbar Premium Lounge Order*\n\n`;

    cartItems.forEach((cartItem) => {
      const variantStr = cartItem.selectedVariant
        ? ` — ${cartItem.selectedVariant.name}`
        : '';
      const pieceStr = cartItem.item.pieces
        ? ` (${cartItem.item.pieces})`
        : '';
      const lineTotal = cartItem.unitPrice * cartItem.quantity;

      message += `${cartItem.quantity} × ${cartItem.item.name}${pieceStr}${variantStr} — RM ${lineTotal}\n`;
      if (cartItem.specialInstructions) {
        message += `   _Note: ${cartItem.specialInstructions}_\n`;
      }
    });

    message += `\n*Subtotal: RM ${subtotal}*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${orderDetails.name.trim() || 'Not specified'}\n`;
    message += `Phone: ${orderDetails.phone.trim() || 'Not specified'}\n`;
    message += `Order Type: ${
      orderDetails.orderType === 'dine-in'
        ? 'Dine-In Pre-Order / Enquiry'
        : orderDetails.orderType === 'takeaway'
        ? 'Takeaway / Self-Pickup'
        : 'Delivery Enquiry'
    }\n`;

    if (orderDetails.tableOrAddressNotes.trim()) {
      message += `Table / Address: ${orderDetails.tableOrAddressNotes.trim()}\n`;
    }
    if (orderDetails.generalNotes?.trim()) {
      message += `Special Request: ${orderDetails.generalNotes.trim()}\n`;
    }

    message += `\n_Sent via Karachi Darbar Online Lounge_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-[#15130F] text-[#F5EBD7] h-full shadow-2xl flex flex-col border-l border-[#C39A4A]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#062A20] border-b border-[#C39A4A]/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C39A4A]" />
            <div>
              <h2 className="font-serif-display font-bold text-lg text-[#F5EBD7] leading-tight">
                YOUR DASTARKHWAN
              </h2>
              <span className="text-[11px] text-[#CFC2A8] font-mono">
                {totalItemsCount} {totalItemsCount === 1 ? 'dish' : 'dishes'} selected
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {cartItems.length > 0 && (
              <button
                type="button"
                id="cart-clear-all-btn"
                onClick={onClearCart}
                className="text-[11px] text-[#CFC2A8] hover:text-red-400 transition-colors mr-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[#F5EBD7] hover:text-[#C39A4A] cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            /* Empty State as explicitly instructed */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full border border-[#C39A4A]/40 bg-[#062A20] flex items-center justify-center text-[#C39A4A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-2xl text-[#F5EBD7]">
                  Your dastarkhwan is waiting.
                </h3>
                <p className="text-xs sm:text-sm text-[#CFC2A8] mt-2 max-w-xs mx-auto leading-relaxed">
                  Add something from the menu to begin your order.
                </p>
              </div>
              <button
                type="button"
                id="cart-empty-explore-btn"
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="px-6 py-2.5 rounded bg-[#C39A4A] text-[#15130F] font-bold text-xs uppercase tracking-wider shadow hover:bg-[#D8BB72] transition-colors cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  id={`cart-line-item-${cartItem.cartItemId}`}
                  className="p-3.5 rounded-lg bg-[#062A20]/60 border border-[#C39A4A]/25 flex flex-col justify-between space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-serif-display font-bold text-sm text-[#F5EBD7]">
                        {cartItem.item.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        {cartItem.selectedVariant && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#0B3D2E] text-[#D8BB72] border border-[#C39A4A]/40">
                            {cartItem.selectedVariant.name}
                          </span>
                        )}
                        {cartItem.item.pieces && (
                          <span className="text-[10px] text-[#CFC2A8]">
                            • {cartItem.item.pieces}
                          </span>
                        )}
                        <span className="text-[10px] text-[#C39A4A] font-mono">
                          RM {cartItem.unitPrice} each
                        </span>
                      </div>
                      {cartItem.specialInstructions && (
                        <p className="text-[11px] text-[#CFC2A8]/80 italic mt-1">
                          Note: {cartItem.specialInstructions}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      className="text-white/40 hover:text-red-400 p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity and Line Subtotal Controls */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/10">
                    <div className="flex items-center space-x-2 bg-black/40 rounded border border-white/10 px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                        }
                        className="text-xs text-[#CFC2A8] hover:text-[#F5EBD7] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center font-mono">
                        {cartItem.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                        }
                        className="text-xs text-[#CFC2A8] hover:text-[#F5EBD7] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-serif-display font-bold text-sm text-[#F5EBD7]">
                        RM {cartItem.unitPrice * cartItem.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Order Form Settings */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="block text-xs font-bold text-[#C39A4A] uppercase tracking-wider">
                  Order Setup (WhatsApp Direct)
                </span>

                {/* Order Type Selector */}
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { id: 'takeaway', label: 'Takeaway' },
                    { id: 'dine-in', label: 'Dine-In' },
                    { id: 'delivery', label: 'Delivery' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          orderType: type.id as OrderType,
                        }))
                      }
                      className={`py-1.5 px-2 rounded border font-medium text-center transition-colors cursor-pointer ${
                        orderDetails.orderType === type.id
                          ? 'bg-[#0B3D2E] border-[#C39A4A] text-[#D8BB72] font-bold'
                          : 'bg-black/30 border-white/10 text-[#CFC2A8]'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Name & Phone Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="customer-name-input" className="block text-[10px] text-[#CFC2A8] mb-0.5">
                      Your Name
                    </label>
                    <input
                      id="customer-name-input"
                      type="text"
                      placeholder="e.g. Tariq"
                      value={orderDetails.name}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full bg-black/40 border border-white/15 rounded p-2 text-xs text-[#F5EBD7] placeholder-white/30 focus:outline-none focus:border-[#C39A4A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="customer-phone-input" className="block text-[10px] text-[#CFC2A8] mb-0.5">
                      Contact Phone
                    </label>
                    <input
                      id="customer-phone-input"
                      type="text"
                      placeholder="e.g. +6012..."
                      value={orderDetails.phone}
                      onChange={(e) =>
                        setOrderDetails((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className="w-full bg-black/40 border border-white/15 rounded p-2 text-xs text-[#F5EBD7] placeholder-white/30 focus:outline-none focus:border-[#C39A4A]"
                    />
                  </div>
                </div>

                {/* Address or Table Notes */}
                <div>
                  <label htmlFor="customer-location-input" className="block text-[10px] text-[#CFC2A8] mb-0.5">
                    {orderDetails.orderType === 'dine-in'
                      ? 'Table Number or Estimated Arrival'
                      : orderDetails.orderType === 'delivery'
                      ? 'Delivery Address in KL'
                      : 'Pickup Time Note'}
                  </label>
                  <input
                    id="customer-location-input"
                    type="text"
                    placeholder={
                      orderDetails.orderType === 'dine-in'
                        ? 'e.g. Table 4 / Arriving at 7:30 PM'
                        : orderDetails.orderType === 'delivery'
                        ? 'e.g. Sentul / Mont Kiara'
                        : 'e.g. Ready in 25 mins'
                    }
                    value={orderDetails.tableOrAddressNotes}
                    onChange={(e) =>
                      setOrderDetails((prev) => ({
                        ...prev,
                        tableOrAddressNotes: e.target.value,
                      }))
                    }
                    className="w-full bg-black/40 border border-white/15 rounded p-2 text-xs text-[#F5EBD7] placeholder-white/30 focus:outline-none focus:border-[#C39A4A]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Subtotal & Action */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#062A20] border-t border-[#C39A4A]/30 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#CFC2A8]">Subtotal:</span>
              <span className="font-serif-display font-extrabold text-2xl text-[#D8BB72]">
                RM {subtotal}
              </span>
            </div>

            <div className="text-[11px] text-[#CFC2A8] flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5 text-[#C39A4A] shrink-0" />
              <span>Sends itemised order straight to Karachi Darbar staff via WhatsApp.</span>
            </div>

            <button
              type="button"
              id="cart-whatsapp-checkout-btn"
              onClick={handleCheckoutWhatsApp}
              className="w-full py-3.5 px-4 rounded-md bg-[#C39A4A] hover:bg-[#D8BB72] text-[#15130F] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Order via WhatsApp • RM {subtotal}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
