import React from 'react';
import { Info, ShieldCheck, Award, Users, HeartHandshake, Sparkles, UserCheck } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function AboutScreen({ onOpenFacilitator, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="bg-[#1F5C3D] text-white rounded-3xl p-8 lg:p-10 shadow-md space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8FBC94]/20 border border-[#8FBC94]/30 text-[#8FBC94] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Screen 11 — About IP-SAKTI SAHAYAK</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight">
          Empowering Ayurvedic Innovators & Safeguarding India's Heritage
        </h2>

        <p className="text-sm text-[#8FBC94] max-w-2xl leading-relaxed">
          IP-SAKTI SAHAYAK is an intelligent decision-support assistant designed for the Smart India Hackathon (SIH 2026). It bridges ancient Ayurvedic knowledge with modern intellectual property and regulatory compliance.
        </p>
      </div>

      {/* Core Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B]">Prevent Biopiracy</h3>
          <p className="text-xs text-[#5F5F5F] leading-relaxed">
            Automated cross-referencing against TKDL prevents unlawful monopolization of public domain traditional formulations.
          </p>
        </div>

        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F7EEDD] text-[#B8860B] flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B]">Accelerate AYUSH IP</h3>
          <p className="text-xs text-[#5F5F5F] leading-relaxed">
            Empowers grassroot Ayurvedic practitioners and startups with clear, plain-language legal guidance in seconds.
          </p>
        </div>

        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EFEAF7] text-[#6B4FA0] flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B]">Facilitator Bridge</h3>
          <p className="text-xs text-[#5F5F5F] leading-relaxed">
            Connects users directly with certified Indian Patent Facilitators whenever low confidence or legal nuances arise.
          </p>
        </div>
      </div>

      {/* Full Educational Disclaimer Box */}
      <div className="bg-[#FAF7F0] border-2 border-[#E0D8C8] rounded-3xl p-6 lg:p-8 space-y-3">
        <h3 className="text-sm font-extrabold text-[#1F5C3D] uppercase tracking-wide flex items-center gap-2">
          <Info className="w-4 h-4 text-[#1F5C3D]" />
          <span>Full Educational Disclaimer</span>
        </h3>
        <p className="text-xs text-[#5F5F5F] leading-relaxed">
          IP-SAKTI SAHAYAK is designed solely for educational, preliminary research, and decision-support purposes. It does not constitute formal legal representation or binding statutory advice. Always consult a certified Indian Patent Attorney, Registered Trade Mark Agent, or State Licensing Authority (AYUSH) prior to commercial manufacturing or patent submission.
        </p>
      </div>

      {/* SIH Team Credits & Facilitator CTA */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#1F5C3D] uppercase tracking-widest">Built for Smart India Hackathon 2026</span>
          <h4 className="text-lg font-bold text-[#2B2B2B]">Team IP-SAKTI Engineers</h4>
          <p className="text-xs text-[#5F5F5F]">Ministry of AYUSH & DPIIT Innovation Challenge</p>
        </div>

        <button
          onClick={onOpenFacilitator}
          className="px-6 py-3 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-xs font-bold rounded-2xl shadow-md transition flex items-center gap-2"
        >
          <UserCheck className="w-4 h-4 text-[#8FBC94]" />
          <span>Connect with IP Facilitator</span>
        </button>
      </div>
    </div>
  );
}

