import React from 'react';
import { TulasiLogo } from './TulasiLogo';
import { useShop } from '../context/ShopContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  ShieldCheck, 
  Award,
  CreditCard
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateToCategory, navigateToShop, setIsTrackOrderOpen, setIsReturnsModalOpen, setActiveView } = useShop();

  return (
    <footer id="main-footer" className="bg-[#121212] text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1 & 2: About Tulasi */}
          <div className="lg:col-span-2 space-y-4">
            <TulasiLogo size="md" />
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mt-3">
              Tulasi is a celebration of authentic Indian textiles, bridging centuries-old weaving traditions from Varanasi, Kanchipuram, Kutch, and Bengal with modern family festive wear.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-neutral-400">Follow our story:</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#F50087] text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#168C78] text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-red-600 text-white flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-[#168C78]">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Silk Mark & Handloom India Partner</span>
            </div>
          </div>

          {/* Col 3: Shop Collections */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-heading tracking-wide">Shop Collections</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateToCategory('sarees')} className="hover:text-[#F50087] transition-colors">
                  Banarasi & Silk Sarees
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('kurtis')} className="hover:text-[#F50087] transition-colors">
                  Cotton & Chanderi Kurtis
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('dress-materials')} className="hover:text-[#F50087] transition-colors">
                  Ajrakh Dress Materials
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('mens-wear')} className="hover:text-[#F50087] transition-colors">
                  Men’s Raw Silk Wear
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('kids-wear')} className="hover:text-[#F50087] transition-colors">
                  Kids Festive Pattu Pavada
                </button>
              </li>
              <li>
                <button onClick={() => navigateToCategory('fabrics')} className="hover:text-[#F50087] transition-colors">
                  Handloom Fabrics by Metre
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-heading tracking-wide">Customer Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setIsTrackOrderOpen(true)} className="hover:text-[#F50087] transition-colors">
                  Track Your Shipment
                </button>
              </li>
              <li>
                <button onClick={() => setIsReturnsModalOpen(true)} className="hover:text-[#F50087] transition-colors">
                  Easy 7-Day Returns & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => navigateToShop({ category: 'all' })} className="hover:text-[#F50087] transition-colors">
                  Silk Mark Verification
                </button>
              </li>
              <li>
                <button onClick={() => setIsTrackOrderOpen(true)} className="hover:text-[#F50087] transition-colors">
                  Shipping & Pan-India Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setIsReturnsModalOpen(true)} className="hover:text-[#F50087] transition-colors">
                  Privacy Policy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Flagship Store */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm font-heading tracking-wide">Tulasi Flagship</h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F50087] flex-shrink-0 mt-0.5" />
                <span>#42, 100 Feet Heritage Road, Indiranagar, Bengaluru, Karnataka 560038</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#168C78] flex-shrink-0" />
                <span>+91 80 2345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F50087] flex-shrink-0" />
                <span>care@tulasifashions.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                <span>Mon – Sun: 10:00 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Tulasi Indian Textiles & Ethnic Fashions Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[11px] text-neutral-400 mr-1">Accepted Payments:</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold text-[10px]">UPI / QR</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold text-[10px]">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold text-[10px]">Visa</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold text-[10px]">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold text-[10px]">NetBanking</span>
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-bold text-[10px]">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
