import { motion, AnimatePresence } from 'framer-motion';
import { Product } from './AdminPanel';

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (cartId: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }: CartDrawerProps) {
  const generateWhatsAppMessage = () => {
    const itemsText = cartItems.map((item, index) => 
      `${index + 1}. ${item.name} (Size UK ${item.selectedSize}) - ${item.price}`
    ).join('\n');
    
    const text = `Hi Ansari Shoes! I'd like to order:\n\n${itemsText}\n\nPlease confirm availability.`;
    return encodeURIComponent(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-paper border-l border-ink/10 shadow-lift z-[201] flex flex-col"
          >
            <div className="p-6 border-b border-ink/10 flex items-center justify-between bg-card">
              <h2 className="font-anton text-2xl text-ink uppercase">Your Box</h2>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-ink/5 hover:bg-ink/10 rounded-full text-ink font-bold transition-colors">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="font-bold text-ink mb-2">Your box is empty</p>
                  <p className="text-sm text-ink-soft">Add some premium footwear to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex gap-4 border border-ink/10 p-3 rounded-xl bg-white relative pr-10">
                      <div className="w-20 h-20 bg-card rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.images && item.images.length > 0 ? (
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl">👞</span>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-ink text-sm leading-tight mb-1">{item.name}</h4>
                        <span className="font-mono text-[10px] text-ink-soft bg-ink/5 px-2 py-0.5 rounded-sm w-max mb-1">UK {item.selectedSize}</span>
                        <div className="font-mono font-bold text-sm">{item.price}</div>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.cartId)}
                        className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6 flex items-center justify-center bg-label-red text-white rounded-full text-[10px] hover:scale-110 transition-transform"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-ink/10 bg-card">
                <a 
                  href={`https://wa.me/916260137373?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-box-green text-white py-4 rounded-xl font-bold hover:bg-box-green-dark transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>💬</span> Checkout on WhatsApp
                </a>
                <p className="text-center text-[10px] text-ink-soft mt-3 uppercase tracking-widest font-mono">Payment on delivery / pickup</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
