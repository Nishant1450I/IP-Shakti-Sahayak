import React from 'react';
import { Globe, ShieldCheck, Clock, ArrowRight, Sparkles, Building, Landmark } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function CountryGuideScreen({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F5C3D]/10 border border-[#1F5C3D]/20 text-[#1F5C3D] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Screen 10 — Regulatory Framework & Jurisdiction Guide</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1F5C3D]">{t.navGuide}</h2>
        <p className="text-xs text-[#5F5F5F]">
          Understand how Ayurvedic product classification and intellectual property protection differ between Indian law and global jurisdictions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* India Jurisdiction (Fully Active) */}
        <div className="bg-white border-2 border-[#1F5C3D] rounded-3xl p-6 lg:p-8 shadow-md space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🇮🇳</span>
              <div>
                <h3 className="text-xl font-extrabold text-[#1F5C3D]">India Jurisdiction</h3>
                <p className="text-xs text-[#5F5F5F]">Active MVP Engine</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#EAF3EC] text-[#1F5C3D] text-xs font-extrabold rounded-full border border-[#C8E0CE]">
              Fully Built
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#2B2B2B]">
            <div className="p-3 bg-[#EAF3EC] border border-[#C8E0CE] rounded-xl space-y-1">
              <span className="font-bold text-[#1F5C3D] flex items-center gap-1.5">
                <Landmark className="w-4 h-4" />
                <span>Patent Authority: Indian Patent Office (CGPDTM)</span>
              </span>
              <p className="text-[#5F5F5F]">Enforces Section 3(p) TKDL exclusions to prevent traditional knowledge biopiracy.</p>
            </div>

            <div className="p-3 bg-[#EAF3EC] border border-[#C8E0CE] rounded-xl space-y-1">
              <span className="font-bold text-[#1F5C3D] flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                <span>Regulatory Authority: Ministry of AYUSH & State Licensing</span>
              </span>
              <p className="text-[#5F5F5F]">Form 25D license under Drugs & Cosmetics Act 1940 following Schedule T GMP.</p>
            </div>

            <div className="p-3 bg-[#EAF3EC] border border-[#C8E0CE] rounded-xl space-y-1">
              <span className="font-bold text-[#1F5C3D] flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>Biodiversity & GI: NBA & GI Registry Chennai</span>
              </span>
              <p className="text-[#5F5F5F]">Access & Benefit Sharing (ABS) intimation and GI authorized user compliance.</p>
            </div>
          </div>
        </div>

        {/* International Jurisdiction (Coming Soon) */}
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6 relative opacity-85">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌐</span>
              <div>
                <h3 className="text-xl font-extrabold text-[#2B2B2B]">International (US / EU / WIPO)</h3>
                <p className="text-xs text-[#5F5F5F]">Global Expansion Roadmap</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full border border-gray-300">
              Coming Soon
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#5F5F5F]">
            <div className="p-3 bg-[#FAF7F0] border border-[#E0D8C8] rounded-xl space-y-1">
              <span className="font-bold text-[#2B2B2B] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>United States (US FDA & USPTO)</span>
              </span>
              <p>Botanical Drug Development Guidance & Dietary Supplement (DSHEA) classification.</p>
            </div>

            <div className="p-3 bg-[#FAF7F0] border border-[#E0D8C8] rounded-xl space-y-1">
              <span className="font-bold text-[#2B2B2B] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>European Union (EMA & EPO)</span>
              </span>
              <p>Traditional Herbal Medicinal Products Directive (THMPD) registration.</p>
            </div>

            <div className="p-3 bg-[#FAF7F0] border border-[#E0D8C8] rounded-xl space-y-1">
              <span className="font-bold text-[#2B2B2B] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>WIPO PCT International Filings</span>
              </span>
              <p>Patent Cooperation Treaty international search report integration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

