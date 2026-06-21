import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Product {
  id: string;
  name: string;
  price: string;
  mrp?: string;
  category: string;
  isNew: boolean;
  desc?: string;
  images?: string[];
  sizes?: string[];
}

const ALL_SIZES = ['5', '6', '7', '8', '9', '10', '11'];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (p: Product) => void;
}

export default function AdminPanel({ isOpen, onClose, products, onAddProduct, onDeleteProduct, onEditProduct }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({    id: '',
    name: '', price: '', mrp: '', category: 'Formal', isNew: false, desc: '', images: [], sizes: ALL_SIZES
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUploading(true);
      const files = Array.from(e.target.files);
      
      const compressToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 500; // Even more aggressive downscale
              const MAX_HEIGHT = 500;
              let width = img.width;
              let height = img.height;

              if (width > height && width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              } else if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                // Heavily compress to JPEG at 0.4 quality. 
                // We use JPEG because older iOS Safari silently falls back to massive lossless PNGs if WebP is requested!
                resolve(canvas.toDataURL('image/jpeg', 0.4));
              } else {
                resolve(event.target?.result as string);
              }
            };
          };
        });
      };

      Promise.all(files.map(f => compressToBase64(f)))
        .then(base64Images => {
          setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...base64Images]
          }));
        })
        .catch(err => console.error("Compression error:", err))
        .finally(() => setIsUploading(false));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'ansari2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.price) return;
    
    const productData: any = {
      id: formData.id || Date.now().toString(),
      name: formData.name,
      price: formData.price,
      category: formData.category || 'Formal',
      isNew: formData.isNew || false,
      images: formData.images || [],
      sizes: formData.sizes || ALL_SIZES,
    };
    
    // Firestore crashes if a field is explicitly set to 'undefined', so we only add them if they exist
    if (formData.mrp) productData.mrp = formData.mrp;
    if (formData.desc) productData.desc = formData.desc;

    if (formData.id) {
      onEditProduct(productData);
    } else {
      onAddProduct(productData);
    }
    
    setIsFormOpen(false);
    setFormData({ name: '', price: '', mrp: '', category: 'Formal', isNew: false, desc: '', images: [], sizes: ALL_SIZES });
  };

  const handleEditClick = (p: Product) => {
    setFormData(p);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setFormData({ name: '', price: '', mrp: '', category: 'Formal', isNew: false, desc: '', images: [], sizes: ALL_SIZES });
    setIsFormOpen(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-paper border border-ink/10 rounded-2xl shadow-lift w-full max-w-[800px] overflow-hidden relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-ink/5 hover:bg-ink/10 rounded-full text-ink font-bold transition-colors">✕</button>
          
          {!isAuthenticated ? (
            <div className="p-10 text-center max-w-[400px] mx-auto">
              <div className="w-12 h-12 mx-auto bg-box-green rounded-xl flex items-center justify-center text-white mb-4">
                <span className="font-anton text-xl">A</span>
              </div>
              <h2 className="font-anton text-2xl text-ink mb-2">Stockroom Access</h2>
              <p className="text-sm text-ink-soft mb-6">Staff access only. Please enter the passcode to manage inventory.</p>
              
              <form onSubmit={handleLogin}>
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full px-4 py-3 rounded-xl border border-ink/20 focus:border-box-green focus:outline-none mb-4 font-mono"
                />
                <button type="submit" className="w-full bg-ink text-paper py-3 rounded-xl font-bold hover:bg-box-green transition-colors">
                  Enter Stockroom
                </button>
                {error && <p className="text-label-red text-sm mt-3 font-medium">Wrong passcode. Please try again.</p>}
              </form>
            </div>
          ) : (
            <div className="flex flex-col h-[80vh] max-h-[700px]">
              <div className="p-6 border-b border-ink/10 flex justify-between items-center bg-card">
                <div>
                  <h2 className="font-anton text-2xl text-ink">Inventory</h2>
                  <p className="text-xs text-ink-soft font-mono uppercase tracking-widest">{products.length} Items Listed</p>
                </div>
                <button 
                  onClick={handleAddClick}
                  className="bg-box-green text-white px-5 py-2 rounded-lg font-bold text-sm shadow-soft hover:bg-box-green-dark transition-colors"
                >
                  + Add Product
                </button>
              </div>

              {isFormOpen ? (
                <div className="p-8 overflow-y-auto flex-1 bg-paper">
                  <h3 className="font-bold text-lg mb-6">{formData.id ? 'Edit Product Details' : 'New Product Details'}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-ink-soft uppercase mb-2">Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-ink/20 rounded-lg p-3 bg-white" placeholder="e.g. Classic Oxford" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-ink-soft uppercase mb-2">Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-ink/20 rounded-lg p-3 bg-white">
                        <option value="Formal">Formal</option>
                        <option value="Casual">Casual</option>
                        <option value="Sneakers">Sneakers</option>
                        <option value="Slides & Sandals">Slides & Sandals</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-ink-soft uppercase mb-2">Price (₹)</label>
                      <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-ink/20 rounded-lg p-3 bg-white" placeholder="₹999" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-ink-soft uppercase mb-2">Original MRP (Optional)</label>
                      <input type="text" value={formData.mrp || ''} onChange={e => setFormData({...formData, mrp: e.target.value})} className="w-full border border-ink/20 rounded-lg p-3 bg-white" placeholder="₹1299" />
                    </div>
                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({...formData, isNew: e.target.checked})} className="w-5 h-5 accent-box-green" />
                        <span className="font-bold text-sm text-ink">Mark 'New'</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-xs font-mono text-ink-soft uppercase mb-2">Product Images</label>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      onChange={handleImageUpload} 
                      className="w-full border border-ink/20 rounded-lg p-3 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-ink/5 file:text-ink hover:file:bg-ink/10 cursor-pointer" 
                    />
                    {formData.images && formData.images.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border border-ink/10 flex-shrink-0">
                            <img src={img} alt={`preview ${idx}`} className="w-full h-full object-cover" />
                            <button 
                              onClick={() => setFormData({...formData, images: formData.images?.filter((_, i) => i !== idx)})}
                              className="absolute top-1 right-1 bg-label-red text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {isUploading && <p className="text-sm text-box-green font-bold mt-2 animate-pulse">Compressing images...</p>}
                    <p className="text-xs text-ink-soft mt-1">Upload multiple images to showcase the product from different angles.</p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-ink-soft mb-2 uppercase tracking-widest">Available Sizes (UK)</label>
                    <div className="flex flex-wrap gap-2">
                      {ALL_SIZES.map(size => {
                        const isSelected = formData.sizes?.includes(size);
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              const currentSizes = formData.sizes || [];
                              const newSizes = isSelected 
                                ? currentSizes.filter(s => s !== size)
                                : [...currentSizes, size];
                              setFormData(prev => ({ ...prev, sizes: newSizes.sort((a,b) => parseInt(a) - parseInt(b)) }));
                            }}
                            className={`w-10 h-10 rounded-xl font-mono text-sm font-bold border-2 transition-all ${
                              isSelected 
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
                  
                  <div className="md:col-span-2 border-t-2 border-ink pt-6">
                    <button onClick={handleSave} disabled={isUploading} className="bg-ink text-white px-6 py-3 rounded-xl font-bold flex-1 hover:bg-box-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Save to Catalog</button>
                    <button onClick={() => setIsFormOpen(false)} className="bg-ink/5 text-ink px-6 py-3 rounded-xl font-bold hover:bg-ink/10 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="overflow-y-auto flex-1 p-6">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="font-mono text-xs text-ink-soft uppercase py-3 border-b border-ink/10">Product</th>
                        <th className="font-mono text-xs text-ink-soft uppercase py-3 border-b border-ink/10">Category</th>
                        <th className="font-mono text-xs text-ink-soft uppercase py-3 border-b border-ink/10">Price</th>
                        <th className="font-mono text-xs text-ink-soft uppercase py-3 border-b border-ink/10">Sizes</th>
                        <th className="font-mono text-xs text-ink-soft uppercase py-3 border-b border-ink/10 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-b border-ink/5 hover:bg-ink/5">
                          <td className="py-4 font-bold text-sm">
                            <div className="flex items-center gap-3">
                              {p.images && p.images.length > 0 ? (
                                <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-md object-cover border border-ink/10" />
                              ) : (
                                <div className="w-10 h-10 rounded-md bg-ink/5 flex items-center justify-center text-lg">👞</div>
                              )}
                              <span>{p.name} {p.isNew && <span className="ml-2 bg-sticker-yellow text-ink text-[10px] px-2 py-0.5 rounded-full">NEW</span>}</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-ink-soft">{p.category}</td>
                          <td className="py-4 font-mono text-sm">
                            {p.price}
                            {p.mrp && <span className="ml-2 text-xs text-ink-soft line-through">{p.mrp}</span>}
                          </td>
                          <td className="py-4 text-xs font-mono text-ink-soft">
                            {p.sizes ? p.sizes.join(', ') : 'All'}
                          </td>
                          <td className="py-4 text-right">
                            <button onClick={() => handleEditClick(p)} className="text-box-green text-xs font-bold hover:underline mr-4">Edit</button>
                            <button onClick={() => onDeleteProduct(p.id)} className="text-label-red text-xs font-bold hover:underline">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
