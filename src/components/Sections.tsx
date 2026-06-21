import React from 'react';
import { motion } from 'framer-motion';

export function Categories({ onSelectCategory }: { onSelectCategory?: (category: string) => void }) {
  const categories = [
    { name: 'Formal', icon: '👞' },
    { name: 'Casual', icon: '👟' },
    { name: 'Sneakers', icon: '🏃' },
    { name: 'Slides & Sandals', icon: '🩴' },
  ];

  return (
    <section id="categories" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono text-sticker-yellow uppercase text-xs font-bold tracking-widest mb-2 block">Pick A Shelf</span>
          <h2 className="text-4xl md:text-5xl font-anton text-ink">SHOP BY CATEGORY</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory?.(cat.name)}
              className="bg-card border border-ink/10 rounded-2xl p-6 shadow-soft cursor-pointer hover:shadow-lift transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-ink/5 border border-ink/10 mb-4 flex items-center justify-center text-sticker-yellow">
                {cat.icon}
              </div>
              <h3 className="font-bold text-ink">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShopGrid({ 
  products, 
  activeCategory = 'All',
  onCategoryChange,
  onSelectProduct 
}: { 
  products: any[], 
  activeCategory?: string,
  onCategoryChange?: (category: string) => void,
  onSelectProduct?: (p: any) => void 
}) {
  const filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory);

  return (
    <section id="shop" className="py-24 relative z-10 bg-card">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <span className="font-mono text-sticker-yellow uppercase text-xs font-bold tracking-widest mb-2 block">The Shop Floor</span>
            <h2 className="text-4xl md:text-5xl font-anton text-ink">ON THE SHELF</h2>
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {['All', 'Formal', 'Casual', 'Sneakers', 'Slides & Sandals'].map((filter, i) => (
              <button 
                key={i} 
                onClick={() => onCategoryChange?.(filter)}
                className={`px-5 py-2 rounded-full font-bold text-sm border-2 transition-all cursor-pointer ${
                  filter === activeCategory 
                    ? 'bg-ink text-paper border-ink shadow-soft pointer-events-auto' 
                    : 'bg-transparent text-ink border-ink hover:bg-ink/5 pointer-events-auto'
                }`}
              >
                {filter}
              </button>
            ))}
            <div className="ml-auto flex items-center border-2 border-ink rounded-full px-4 py-2 bg-white">
              <span className="text-ink-soft mr-2">🔍</span>
              <input type="text" placeholder="Search the shelf..." className="bg-transparent border-none outline-none text-sm font-medium w-48" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <div 
              key={i} 
              onClick={() => onSelectProduct?.(product)}
              className="bg-card border-2 border-ink rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer group shadow-[4px_4px_0px_0px_rgba(30,27,22,1)] hover:shadow-[6px_6px_0px_0px_rgba(30,27,22,1)]"
            >
              <div className="aspect-[4/3] border-b-2 border-ink p-6 flex items-center justify-center relative bg-paper">
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-sticker-yellow text-ink font-mono text-[10px] font-bold tracking-wider px-2 py-1 uppercase border border-ink shadow-sm">New</span>
                )}
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="text-6xl group-hover:scale-110 transition-transform duration-300">👞</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-ink-soft border border-ink/20 px-2 py-0.5 rounded-full">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-lg">{product.price}</span>
                    {product.mrp && <span className="font-mono text-xs text-ink-soft line-through">{product.mrp}</span>}
                  </div>
                  <button className="bg-box-green text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold group-hover:bg-box-green-dark transition-colors">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SizeChart() {
  return (
    <section id="sizes" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="mb-12">
          <span className="font-mono text-sticker-yellow uppercase text-xs font-bold tracking-widest mb-2 block">Find Your Fit</span>
          <h2 className="text-4xl md:text-5xl font-anton text-ink uppercase mb-4">Size chart, UK 5–11</h2>
          <p className="text-ink-soft text-sm max-w-md">Every pair in the shop runs true to UK sizing. Use this to convert from EU, US or your foot length.</p>
        </div>
        
        <div className="bg-card border-2 border-dashed border-ink rounded-2xl p-8 relative">
          <div className="absolute left-[-11px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-paper border-2 border-dashed border-ink rounded-full"></div>
          <div className="absolute right-[-11px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] bg-paper border-2 border-dashed border-ink rounded-full"></div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr>
                  <th className="font-mono text-xs uppercase tracking-widest text-ink-soft py-3 border-b-2 border-ink">UK</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-ink-soft py-3 border-b-2 border-ink">EU</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-ink-soft py-3 border-b-2 border-ink">US (Men)</th>
                  <th className="font-mono text-xs uppercase tracking-widest text-ink-soft py-3 border-b-2 border-ink">Foot length</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { uk: '5', eu: '38', us: '6', cm: '24.1 cm' },
                  { uk: '6', eu: '39', us: '7', cm: '24.8 cm' },
                  { uk: '7', eu: '40', us: '8', cm: '25.4 cm' },
                  { uk: '8', eu: '41', us: '9', cm: '26.0 cm' },
                  { uk: '9', eu: '42', us: '10', cm: '26.7 cm' },
                  { uk: '10', eu: '43', us: '11', cm: '27.3 cm' },
                  { uk: '11', eu: '44', us: '12', cm: '27.9 cm' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-box-green/5">
                    <td className="py-4 border-b border-ink/10 font-mono text-sm">{row.uk}</td>
                    <td className="py-4 border-b border-ink/10 font-mono text-sm">{row.eu}</td>
                    <td className="py-4 border-b border-ink/10 font-mono text-sm">{row.us}</td>
                    <td className="py-4 border-b border-ink/10 font-mono text-sm">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-ink-soft text-sm mt-6">Tip: stand on a sheet of paper, mark your heel and longest toe, and measure the gap in centimetres — that's your foot length. When in between two sizes, size up for sneakers and casual shoes, size down for slides.</p>
        </div>
      </div>
    </section>
  );
}

export function VisitUs() {
  return (
    <section id="about" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-[1180px] mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div className="bg-ink text-paper rounded-2xl p-8 relative overflow-hidden shadow-lift">
          <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-label-red shadow-[0_0_0_4px_rgba(200,57,43,0.25)]"></div>
          
          <span className="inline-block bg-sticker-yellow text-ink font-mono text-xs font-bold tracking-widest px-3 py-1 rounded-full uppercase mb-4">Visit The Shop</span>
          <h3 className="text-3xl font-anton uppercase mb-6">Ansari Shoes, Korba</h3>
          
          <div className="space-y-4 mb-8">
            <div>
              <span className="block font-mono text-[10px] text-sticker-yellow uppercase tracking-widest mb-1">Address</span>
              <p className="text-sm">SH 4, Purani Basti, Korba, Chhattisgarh 495677 — near the Old bus stand, in front of Jaiswal Medical</p>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-sticker-yellow uppercase tracking-widest mb-1">Hours</span>
              <p className="text-sm">10:00 AM – 9:00 PM · Open all days</p>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-sticker-yellow uppercase tracking-widest mb-1">Call / WhatsApp</span>
              <p className="text-sm">+91 62601 37373</p>
            </div>
            <div>
              <span className="block font-mono text-[10px] text-sticker-yellow uppercase tracking-widest mb-1">Instagram</span>
              <a href="https://www.instagram.com/ansari__shoe_" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">@ansari__shoe_</a>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <a href="tel:+916260137373" className="bg-white text-ink font-bold text-sm px-5 py-3 rounded-xl hover:bg-box-green hover:text-white transition-colors flex items-center gap-2">
              Call Shop
            </a>
            <a href="https://maps.app.goo.gl/vkoMruU3M2KRC1Nj7" target="_blank" rel="noopener noreferrer" className="bg-white text-ink font-bold text-sm px-5 py-3 rounded-xl hover:bg-box-green hover:text-white transition-colors flex items-center gap-2">
              Get Directions
            </a>
          </div>
        </div>
        
        <div className="rounded-2xl border-2 border-ink overflow-hidden min-h-[300px] shadow-soft bg-card">
          <iframe 
            src="https://maps.google.com/maps?q=Ansari+Shoe,+SH+4,+Purani+Basti,+Korba,+Chhattisgarh+495677&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0, minHeight: '300px' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ansari Shoes Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  return (
    <footer className="bg-transparent border-t border-ink/10 py-12 relative z-10">
      <div className="max-w-[1180px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-ink-soft text-sm">
          <div className="w-8 h-8 rounded-lg bg-box-green flex items-center justify-center text-white">
            <span className="font-anton text-sm">A</span>
          </div>
          <span>© {new Date().getFullYear()} Ansari Shoes, Korba. Premium Quality.</span>
        </div>
        <div className="font-mono text-xs text-ink-soft flex gap-6">
          <button onClick={onOpenAdmin} className="hover:text-ink transition-colors font-bold text-box-green">Stockroom Admin</button>
        </div>
      </div>
    </footer>
  );
}
