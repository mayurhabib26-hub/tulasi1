import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const womenKurtiSizes = [
    { size: 'XS', bust: unit === 'inches' ? '34"' : '86 cm', waist: unit === 'inches' ? '30"' : '76 cm', hip: unit === 'inches' ? '38"' : '96 cm', length: unit === 'inches' ? '44"' : '112 cm' },
    { size: 'S', bust: unit === 'inches' ? '36"' : '91 cm', waist: unit === 'inches' ? '32"' : '81 cm', hip: unit === 'inches' ? '40"' : '101 cm', length: unit === 'inches' ? '44"' : '112 cm' },
    { size: 'M', bust: unit === 'inches' ? '38"' : '96 cm', waist: unit === 'inches' ? '34"' : '86 cm', hip: unit === 'inches' ? '42"' : '106 cm', length: unit === 'inches' ? '45"' : '114 cm' },
    { size: 'L', bust: unit === 'inches' ? '40"' : '101 cm', waist: unit === 'inches' ? '36"' : '91 cm', hip: unit === 'inches' ? '44"' : '112 cm', length: unit === 'inches' ? '45"' : '114 cm' },
    { size: 'XL', bust: unit === 'inches' ? '42"' : '106 cm', waist: unit === 'inches' ? '38"' : '96 cm', hip: unit === 'inches' ? '46"' : '117 cm', length: unit === 'inches' ? '46"' : '117 cm' },
    { size: 'XXL', bust: unit === 'inches' ? '44"' : '112 cm', waist: unit === 'inches' ? '40"' : '101 cm', hip: unit === 'inches' ? '48"' : '122 cm', length: unit === 'inches' ? '46"' : '117 cm' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-pink-100 relative">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#F50087]" />
            <h3 className="font-bold text-base text-[#191919]">Tulasi Size & Fit Chart</h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-[#191919]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end my-3">
          <div className="bg-neutral-100 p-1 rounded-xl flex text-xs font-semibold">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-lg transition-colors ${unit === 'inches' ? 'bg-[#F50087] text-white' : 'text-neutral-600'}`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-lg transition-colors ${unit === 'cm' ? 'bg-[#F50087] text-white' : 'text-neutral-600'}`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#FFF2F8] text-[#191919] font-bold">
              <tr>
                <th className="p-2.5 rounded-l-lg">Size</th>
                <th className="p-2.5">Bust</th>
                <th className="p-2.5">Waist</th>
                <th className="p-2.5">Hips</th>
                <th className="p-2.5 rounded-r-lg">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {womenKurtiSizes.map((row) => (
                <tr key={row.size} className="hover:bg-neutral-50">
                  <td className="p-2.5 font-bold text-[#F50087]">{row.size}</td>
                  <td className="p-2.5">{row.bust}</td>
                  <td className="p-2.5">{row.waist}</td>
                  <td className="p-2.5">{row.hip}</td>
                  <td className="p-2.5">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed bg-[#FFF2F8] p-3 rounded-xl border border-pink-100">
          💡 <strong>Tip for Sarees & Dress Materials:</strong> Sarees come in standard 5.5m length with 0.8m blouse piece (Free Size). Unstitched dress materials provide 2.5m for custom tailor fitting.
        </p>
      </div>
    </div>
  );
};
