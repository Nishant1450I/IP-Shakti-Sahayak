import React from 'react';
import { Globe, Languages, ShieldCheck, Sparkles, Check, Info } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function SettingsScreen({ lang, setLang, jurisdiction, setJurisdiction }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const optionBase =
    'p-4 rounded-2xl border-2 text-left transition relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/30';

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F5C3D]/10 border border-[#1F5C3D]/20 text-[#1F5C3D] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Settings</span>
        </div>
        <h1 className="text-3xl font-black text-[#1F5C3D] tracking-tight">Settings</h1>
        <p className="text-sm text-[#5F5F5F] max-w-xl leading-relaxed">
          Configure language and jurisdiction preferences for your AI assistant.
        </p>
      </div>

      {/* Language Setting */}
      <section className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center shrink-0">
            <Languages className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2B2B2B]">Language</h3>
            <p className="text-xs text-[#5F5F5F]">Choose your preferred interface language</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Interface language">
          <button
            type="button"
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
            className={`${optionBase} ${
              lang === 'en'
                ? 'bg-[#EAF3EC] border-[#1F5C3D]'
                : 'bg-[#FAF7F0] border-[#E0D8C8] hover:border-[#1F5C3D]/40'
            }`}
          >
            {lang === 'en' && (
              <Check className="w-4 h-4 text-[#1F5C3D] absolute top-3 right-3" aria-hidden="true" />
            )}
            <p className="text-sm font-bold text-[#2B2B2B] mt-1">English</p>
            <p className="text-[11px] text-[#5F5F5F]">Default interface language</p>
          </button>

          <button
            type="button"
            onClick={() => setLang('hi')}
            aria-pressed={lang === 'hi'}
            className={`${optionBase} ${
              lang === 'hi'
                ? 'bg-[#EAF3EC] border-[#1F5C3D]'
                : 'bg-[#FAF7F0] border-[#E0D8C8] hover:border-[#1F5C3D]/40'
            }`}
          >
            {lang === 'hi' && (
              <Check className="w-4 h-4 text-[#1F5C3D] absolute top-3 right-3" aria-hidden="true" />
            )}
            <p className="text-sm font-bold text-[#2B2B2B] mt-1">हिंदी (Hindi)</p>
            <p className="text-[11px] text-[#5F5F5F]">हिंदी इंटरफ़ेस भाषा</p>
          </button>
        </div>
      </section>

      {/* Jurisdiction Setting */}
      <section className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#F7EEDD] text-[#B8860B] flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#2B2B2B]">Jurisdiction</h3>
            <p className="text-xs text-[#5F5F5F]">Select which legal corpus the assistant searches</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="group" aria-label="Legal jurisdiction">
          <button
            type="button"
            onClick={() => setJurisdiction('India')}
            aria-pressed={jurisdiction === 'India'}
            className={`${optionBase} ${
              jurisdiction === 'India'
                ? 'bg-[#EAF3EC] border-[#1F5C3D]'
                : 'bg-[#FAF7F0] border-[#E0D8C8] hover:border-[#1F5C3D]/40'
            }`}
          >
            {jurisdiction === 'India' && (
              <Check className="w-4 h-4 text-[#1F5C3D] absolute top-3 right-3" aria-hidden="true" />
            )}
            <p className="text-sm font-bold text-[#2B2B2B] mt-1">India</p>
            <p className="text-[11px] text-[#5F5F5F]">AYUSH / IPO / TKDL legal corpus (fully populated)</p>
            <span className="inline-block mt-2 text-[10px] font-black uppercase bg-[#1F5C3D] text-white px-2 py-0.5 rounded-md">
              Active
            </span>
          </button>

          <button
            type="button"
            onClick={() => setJurisdiction('International')}
            aria-pressed={jurisdiction === 'International'}
            className={`${optionBase} ${
              jurisdiction === 'International'
                ? 'bg-[#EFEAF7] border-[#6B4FA0]'
                : 'bg-[#FAF7F0] border-[#E0D8C8] hover:border-[#6B4FA0]/40'
            }`}
          >
            {jurisdiction === 'International' && (
              <Check className="w-4 h-4 text-[#6B4FA0] absolute top-3 right-3" aria-hidden="true" />
            )}
            <p className="text-sm font-bold text-[#2B2B2B] mt-1">International</p>
            <p className="text-[11px] text-[#5F5F5F]">WIPO / TRIPS / Nagoya (coming soon)</p>
            <span className="inline-block mt-2 text-[10px] font-black uppercase bg-[#E0D8C8] text-[#5F5F5F] px-2 py-0.5 rounded-md">
              Preview
            </span>
          </button>
        </div>

        <div className="p-3 bg-[#FAF7F0] border border-[#E0D8C8] rounded-xl flex items-start gap-2.5 text-[11px] text-[#5F5F5F] leading-snug">
          <Info className="w-4 h-4 text-[#1F5C3D] shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong>Note:</strong> The International legal corpus is currently unpopulated. Selecting International will return an insufficient-evidence response. Switch to India for active statutory evaluation.
          </span>
        </div>
      </section>

      {/* About / Disclaimer */}
      <div className="p-4 bg-[#FAF7F0] border border-[#E0D8C8] rounded-2xl flex items-center gap-3 text-xs text-[#5F5F5F]">
        <ShieldCheck className="w-5 h-5 text-[#1F5C3D] shrink-0" aria-hidden="true" />
        <span>
          <strong>Disclaimer:</strong> {t.disclaimer}
        </span>
      </div>
    </div>
  );
}