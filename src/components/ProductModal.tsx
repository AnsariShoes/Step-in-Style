import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from './AdminPanel';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const availableSizes = product?.sizes || ['5', '6', '7', '8', '9', '10', '11'];
  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[0] || '8');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  if (!product) return null;

  const currentImage = product.images && product.images.length > 0 ? product.images[selectedImageIndex] : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm overflow-y-auto pt-16 pb-16">
        <button 
          onClick={onClose} 
          className="fixed top-4 right-4 z-[110] w-10 h-10 flex items-center justify-center bg-paper shadow-lift hover:bg-box-green hover:text-white rounded-full text-ink font-bold transition-colors border-2 border-ink"
        >
          ✕
        </button>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-paper border-2 border-ink rounded-3xl shadow-[8px_8px_0px_0px_rgba(30,27,22,1)] w-full max-w-[900px] flex flex-col md:flex-row relative mt-auto mb-auto"
        >
          <div className="w-full md:w-1/2 bg-card p-6 md:p-8 flex flex-col items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-ink rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            {product.isNew && (
              <span className="absolute top-6 left-6 z-10 bg-sticker-yellow text-ink font-mono text-[10px] font-bold tracking-wider px-2 py-1 uppercase border border-ink shadow-sm">New Arrival</span>
            )}
            <div className="aspect-square w-full max-w-[350px] flex items-center justify-center bg-paper border-2 border-ink rounded-2xl overflow-hidden mb-4">
              {currentImage ? (
                <img src={currentImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-9xl">👞</div>
              )}
            </div>
            
            {/* Image Gallery Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 w-full max-w-[350px] overflow-x-auto pb-2 custom-scrollbar">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImageIndex === idx ? 'border-ink opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <span className="font-mono text-[10px] text-ink-soft border border-ink/20 px-3 py-1 rounded-full w-max mb-4 uppercase tracking-widest">{product.category}</span>
            <h2 className="text-3xl md:text-4xl font-anton text-ink mb-2 uppercase leading-tight">{product.name}</h2>
            
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono font-bold text-3xl">{product.price}</span>
              {product.mrp && <span className="font-mono text-sm text-ink-soft line-through">{product.mrp}</span>}
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="font-mono text-xs text-ink-soft uppercase tracking-widest font-bold">Select Size (UK)</span>
                <a href="#sizes" onClick={onClose} className="text-xs text-box-green font-bold hover:underline">Size Guide</a>
              </div>
              <div className="flex flex-wrap gap-2">
                {['5', '6', '7', '8', '9', '10', '11'].map(size => {
                  const isAvailable = product.sizes ? product.sizes.includes(size) : true;
                  return (
                    <button 
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl font-mono text-sm font-bold border-2 transition-all ${
                        !isAvailable 
                          ? 'bg-transparent text-ink/20 border-ink/20 cursor-not-allowed line-through'
                          : selectedSize === size 
                            ? 'bg-ink text-paper border-ink shadow-soft' 
                            : 'bg-transparent text-ink border-ink hover:bg-ink/5'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-auto">
              <button 
                onClick={() => {
                  onAddToCart(product, selectedSize);
                  onClose();
                }}
                className="w-full bg-ink text-paper py-4 rounded-xl font-bold hover:bg-box-green hover:shadow-lift transition-all flex items-center justify-center gap-2 border-2 border-ink"
              >
                <span>🛒</span> Add to Box
              </button>
              <a 
                href={`https://wa.me/916260137373?text=Hi, I want to order the ${product.name} (Size UK ${selectedSize}) priced at ${product.price}. Is it available?`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-box-green text-white py-4 rounded-xl font-bold hover:bg-box-green-dark hover:shadow-lift transition-all flex items-center justify-center gap-2 text-center border-2 border-ink"
              >
                <span>💬</span> Order on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
