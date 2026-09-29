import React from 'react';
import {
  BookOpen,
  Bookmark,
  UserCheck,
  Settings,
  ShieldCheck,
  Sparkles,
  MessageSquareText,
  Menu,
  X
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function Sidebar({ activeScreen, setActiveScreen, lang, onOpenFacilitator }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'assistant', label: 'Assistant', icon: MessageSquareText, primary: true },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: Bookmark },
    { id: 'facilitator', label: 'Facilitator', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleNavigate = (item) => {
    if (item.id === 'facilitator') {
      onOpenFacilitator();
    } else {
      setActiveScreen(item.id);
    }
    setMobileOpen(false);
  };

  const renderNavButton = (item, { compact = false } = {}) => {
    const Icon = item.icon;
    const isActive = activeScreen === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavigate(item)}
        aria-current={isActive ? 'page' : undefined}
        title={compact ? item.label : undefined}
        className={`w-full flex items-center gap-3.5 rounded-xl text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40 ${
          compact ? 'justify-center px-0 py-2.5' : 'px-4 py-3'
        } ${
          isActive
            ? 'bg-[#1F5C3D] text-white shadow-md font-semibold'
            : item.primary
              ? `font-semibold border border-[#C8E0CE] bg-[#EAF3EC]/60 text-[#1F5C3D] ${compact ? '' : 'hover:bg-[#EAF3EC]'}`
              : `font-medium text-[#2B2B2B] ${compact ? '' : 'hover:bg-[#EAF3EC] hover:text-[#1F5C3D]'}`
        }`}
      >
        <Icon
          className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : item.primary ? 'text-[#1F5C3D]' : 'text-[#5F5F5F]'}`}
          aria-hidden="true"
        />
        {!compact && <span className="truncate">{item.label}</span>}
        {!compact && (
          <span
            aria-hidden="true"
            className={`ml-auto w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#8FBC94]' : 'bg-transparent'}`}
          />
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile top bar with menu toggle */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E0D8C8] px-4 py-2.5 flex items-center justify-between no-print">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1F5C3D] flex items-center justify-center shadow-sm">
            <Sparkles className="w-4.5 h-4.5 text-[#8FBC94]" aria-hidden="true" />
          </div>
          <span className="font-extrabold text-[#1F5C3D] tracking-tight text-sm">
            IP-SAKTI <span className="text-[#8FBC94]">SAHAYAK</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="p-2 rounded-xl border border-[#E0D8C8] bg-white text-[#2B2B2B] hover:bg-[#FAF7F0] transition"
        >
          {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[#E0D8C8] bg-white px-4 py-3 space-y-1.5 shadow-md z-30 no-print">
          {navItems.map((item) => renderNavButton(item))}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 bg-white/80 backdrop-blur-md border-r border-[#E0D8C8] flex-col justify-between h-screen sticky top-0 z-30 p-5 shadow-sm no-print">
        <div>
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setActiveScreen('assistant')}>
            <div className="w-11 h-11 rounded-2xl bg-[#1F5C3D] flex items-center justify-center text-white shadow-md shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M12 2L4 6V12C4 17.5 7.4 21.8 12 23C16.6 21.8 20 17.5 20 12V6L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6C12 6 9 9 9 12C9 14.5 10.5 16 12 16C13.5 16 15 14.5 15 12C15 9 12 6 12 6Z" fill="#8FBC94"/>
                <path d="M12 12V18" stroke="#1F5C3D" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-xl tracking-tight text-[#1F5C3D] leading-none">
                IP-SAKTI <span className="text-[#8FBC94] font-bold">SAHAYAK</span>
              </h1>
              <p className="text-[11px] text-[#5F5F5F] font-medium tracking-wide uppercase mt-1 truncate">Ayurveda IP & Reg Co-Pilot</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5" aria-label="Primary">
            {navItems.map((item) => renderNavButton(item))}
          </nav>
        </div>

        {/* Footer: Trust Badge + Disclaimer */}
        <div className="space-y-4 pt-4 border-t border-[#E8E2D5]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EAF3EC] border border-[#C8E0CE] rounded-full text-[11px] font-bold text-[#1F5C3D]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>SIH MVP Live</span>
          </div>

          <div className="p-3 bg-[#EAF3EC] border border-[#C8E0CE] rounded-xl flex items-start gap-2.5 text-[11px] text-[#1F5C3D] leading-snug">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t.disclaimer}</span>
          </div>
        </div>
      </aside>
    </>
  );
}