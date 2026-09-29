import React, { useState, useRef, useEffect } from 'react';
import { Languages, UserCheck, ChevronDown, MapPin } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function Header({ lang, setLang, activeScreen, jurisdiction, onOpenFacilitator }) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const screenTitles = {
    assistant: 'AI Assistant',
    knowledge: t.navKnowledge,
    reports: t.navReports,
    facilitator: 'Facilitator',
    settings: 'Settings'
  };

  // Close the language menu on outside click / Escape
  useEffect(() => {
    if (!langMenuOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setLangMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [langMenuOpen]);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#E0D8C8] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sticky top-0 z-20 shadow-xs no-print">
      {/* Active Screen Title */}
      <div className="flex items-center gap-3 min-w-0">
        <h2 className="text-base sm:text-lg font-bold text-[#2B2B2B] truncate">
          {screenTitles[activeScreen] || 'IP-SAKTI SAHAYAK'}
        </h2>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-[#EAF3EC] text-[#1F5C3D] px-2.5 py-1 rounded-full font-semibold border border-[#C8E0CE] shrink-0">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          <span>{jurisdiction || 'India'}</span>
        </span>
      </div>

      {/* Right Tools: Language Selector & Facilitator Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Language Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            aria-haspopup="listbox"
            aria-expanded={langMenuOpen}
            aria-label="Select interface language"
            className="flex items-center gap-2 px-3 py-2 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-bold text-[#1F5C3D] hover:bg-[#F3EDE0] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/30"
          >
            <Languages className="w-4 h-4 text-[#1F5C3D]" aria-hidden="true" />
            <span>{lang === 'hi' ? 'हिंदी' : 'English'}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#5F5F5F] transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white border border-[#E0D8C8] rounded-xl shadow-lg py-1 z-50 text-xs font-medium" role="listbox">
              <button
                type="button"
                onClick={() => { setLang('en'); setLangMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 hover:bg-[#EAF3EC] ${lang === 'en' ? 'text-[#1F5C3D] font-bold' : 'text-[#2B2B2B]'}`}
              >
                English (EN)
              </button>
              <button
                type="button"
                onClick={() => { setLang('hi'); setLangMenuOpen(false); }}
                className={`w-full text-left px-3 py-2 hover:bg-[#EAF3EC] ${lang === 'hi' ? 'text-[#1F5C3D] font-bold' : 'text-[#2B2B2B]'}`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          )}
        </div>

        {/* IP Facilitator Consultation Button */}
        <button
          type="button"
          onClick={onOpenFacilitator}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-xs font-bold rounded-xl shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
        >
          <UserCheck className="w-4 h-4 text-[#8FBC94]" aria-hidden="true" />
          <span className="hidden sm:inline">{t.consultFacilitator}</span>
          <span className="sm:hidden">Facilitator</span>
        </button>
      </div>
    </header>
  );
}