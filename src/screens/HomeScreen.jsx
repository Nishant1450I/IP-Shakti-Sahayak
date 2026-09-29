import React from 'react';
import { 
  Camera, 
  FileEdit, 
  Mic, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  BookCheck, 
  FileSpreadsheet, 
  Scale, 
  Award, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function HomeScreen({ onSelectInputMode, setActiveScreen, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero Section with Mortar & Pestle Botanical Visual */}
      <section className="bg-gradient-to-br from-white via-[#FAF7F0] to-[#EAF3EC] border border-[#E0D8C8] rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="lg:w-7/12 space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F5C3D]/10 border border-[#1F5C3D]/20 text-[#1F5C3D] text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#1F5C3D]" />
            <span>SIH 2026 Innovation MVP</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-black text-[#1F5C3D] tracking-tight leading-tight">
            IP-SAKTI <span className="text-[#8FBC94]">SAHAYAK</span>
          </h1>

          <p className="text-lg lg:text-xl font-bold text-[#2B2B2B] leading-snug">
            {t.tagline}
          </p>

          <p className="text-sm text-[#5F5F5F] max-w-xl leading-relaxed">
            {t.subtagline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelectInputMode('details')}
              className="px-6 py-3 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-sm font-bold rounded-2xl shadow-md transition flex items-center gap-2"
            >
              <span>Start Instant Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveScreen('knowledge')}
              className="px-5 py-3 bg-white border border-[#D5CEBF] hover:bg-[#FAF7F0] text-[#2B2B2B] text-sm font-semibold rounded-2xl transition"
            >
              Browse Legal Knowledge Base
            </button>
          </div>
        </div>

        {/* Right Hero Image Visual — Mortar & Pestle in Soft Green Circle */}
        <div className="lg:w-5/12 flex justify-center relative">
          <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-[#EAF3EC] border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden">
            {/* SVG Mortar & Pestle Botanical Line-Art Visual */}
            <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="85" fill="#8FBC94" fillOpacity="0.15" />
              {/* Botanical leaves background */}
              <path d="M60 70C60 70 80 40 110 50C140 60 130 90 130 90C130 90 100 100 80 85C70 77 60 70 60 70Z" fill="#8FBC94" fillOpacity="0.4" />
              <path d="M140 75C140 75 160 100 145 125C130 150 105 135 105 135C105 135 115 110 130 100C138 95 140 75 140 75Z" fill="#1F5C3D" fillOpacity="0.2" />
              {/* Brass Mortar Bowl */}
              <path d="M50 110C50 110 55 155 100 155C145 155 150 110 150 110H50Z" fill="#1F5C3D" />
              <rect x="45" y="105" width="110" height="10" rx="5" fill="#1F5C3D" />
              <path d="M80 155H120V165H80V155Z" fill="#1F5C3D" />
              {/* Pestle angled */}
              <path d="M125 50L85 125L95 130L135 55L125 50Z" fill="#B8860B" />
              <circle cx="130" cy="52" r="10" fill="#B8860B" />
              {/* Golden herb droplets */}
              <circle cx="70" cy="95" r="4" fill="#B8860B" />
              <circle cx="135" cy="85" r="5" fill="#8FBC94" />
            </svg>
          </div>
        </div>
      </section>

      {/* 2. Three Big Selectable Input Cards */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-[#2B2B2B]">Choose How to Check Your Product</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Accent 1: Scan Product Label (Green) */}
          <div className="bg-[#EAF3EC] border border-[#C8E0CE] rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#1F5C3D] flex items-center justify-center text-white shadow-sm">
                <Camera className="w-7 h-7 text-[#8FBC94]" />
              </div>
              <h4 className="text-xl font-bold text-[#1F5C3D]">{t.scanCardTitle}</h4>
              <p className="text-xs text-[#5F5F5F] leading-relaxed">{t.scanCardDesc}</p>
            </div>
            <button
              onClick={() => onSelectInputMode('scan')}
              className="w-full py-3 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2"
            >
              <span>Scan Package Label</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card Accent 2: Enter Product Details (Gold/Mustard) */}
          <div className="bg-[#F7EEDD] border border-[#E8DAB9] rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8DAB9] flex items-center justify-center text-[#B8860B] shadow-sm">
                <FileEdit className="w-7 h-7 text-[#B8860B]" />
              </div>
              <h4 className="text-xl font-bold text-[#2B2B2B]">{t.enterCardTitle}</h4>
              <p className="text-xs text-[#5F5F5F] leading-relaxed">{t.enterCardDesc}</p>
            </div>
            <button
              onClick={() => onSelectInputMode('details')}
              className="w-full py-3 bg-[#B8860B] hover:bg-[#966d09] text-white text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2"
            >
              <span>Type Formulation Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card Accent 3: Speak Your Question (Purple) */}
          <div className="bg-[#EFEAF7] border border-[#D9CEEA] rounded-3xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-[#D9CEEA] flex items-center justify-center text-[#6B4FA0] shadow-sm">
                <Mic className="w-7 h-7 text-[#6B4FA0]" />
              </div>
              <h4 className="text-xl font-bold text-[#6B4FA0]">{t.speakCardTitle}</h4>
              <p className="text-xs text-[#5F5F5F] leading-relaxed">{t.speakCardDesc}</p>
            </div>
            <button
              onClick={() => onSelectInputMode('speak')}
              className="w-full py-3 bg-[#6B4FA0] hover:bg-[#543d80] text-white text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2"
            >
              <span>Voice Query Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. "How It Works" 4-Step Horizontal Flow */}
      <section className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-[#2B2B2B] flex items-center gap-2">
          <span>{t.howItWorks}</span>
          <span className="text-xs bg-[#FAF7F0] text-[#5F5F5F] px-2.5 py-0.5 rounded-full border border-[#E0D8C8]">4 Simple Steps</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            { step: '01', title: 'Provide Input', desc: 'Scan label, type ingredients or speak query', icon: FileEdit },
            { step: '02', title: 'AI Analysis', desc: 'Classification Q&A & Ayurvedic feature extraction', icon: Sparkles },
            { step: '03', title: 'Knowledge Search', desc: 'Cross-checks Indian Acts, Rules & TKDL prior art', icon: Search },
            { step: '04', title: 'Get Results', desc: 'Clear answer, citations & IP facilitator advice', icon: BookCheck }
          ].map((item, idx) => {
            const StepIcon = item.icon;
            return (
              <div key={idx} className="bg-[#FAF7F0] border border-[#E8E2D5] rounded-2xl p-4 relative space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#1F5C3D] bg-[#EAF3EC] px-2 py-0.5 rounded-md">
                    {item.step}
                  </span>
                  <StepIcon className="w-5 h-5 text-[#1F5C3D]" />
                </div>
                <h4 className="text-sm font-bold text-[#2B2B2B]">{item.title}</h4>
                <p className="text-[11px] text-[#5F5F5F] leading-snug">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "What You Can Check" Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#2B2B2B]">{t.whatYouCanCheck}</h3>
          <button
            onClick={() => setActiveScreen('knowledge')}
            className="text-xs font-bold text-[#1F5C3D] hover:underline flex items-center gap-1"
          >
            <span>View all legal coverage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: 'Label Compliance', desc: 'Schedule T & AYUSH packaging rules', icon: BookCheck },
            { title: 'Ingredients Check', desc: 'Botanical species & TKDL prior art', icon: Sparkles },
            { title: 'Claims Review', desc: 'Therapeutic vs Cosmetic claims', icon: Scale },
            { title: 'IP Insights', desc: 'Patent Sec 3(p) & Trademark Sec 9', icon: Award },
            { title: 'Regulatory Rules', desc: 'Biological Diversity ABS & GI Tags', icon: ShieldCheck }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white border border-[#E0D8C8] rounded-2xl p-4 space-y-2 hover:border-[#1F5C3D] transition">
                <div className="w-9 h-9 rounded-xl bg-[#EAF3EC] flex items-center justify-center text-[#1F5C3D]">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-[#2B2B2B]">{item.title}</h4>
                <p className="text-[11px] text-[#5F5F5F] leading-tight">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Bottom Trust Banner */}
      <section className="bg-[#1F5C3D] text-white rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
            <CheckCircle className="w-5 h-5 text-[#8FBC94]" />
            <span>{t.trustedBanner}</span>
          </h4>
          <p className="text-xs text-[#8FBC94] max-w-xl">
            {t.trustedBannerSub}
          </p>
        </div>
        <button
          onClick={() => setActiveScreen('about')}
          className="px-5 py-2.5 bg-[#8FBC94] hover:bg-[#7aa77f] text-[#1F5C3D] text-xs font-black rounded-xl transition shadow-xs shrink-0"
        >
          Learn More About IP-SAKTI
        </button>
      </section>
    </div>
  );
}

