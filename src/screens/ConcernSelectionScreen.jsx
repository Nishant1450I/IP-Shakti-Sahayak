import React from 'react';
import { Award, FileText, Globe, Scale, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function ConcernSelectionScreen({ onSelectConcern }) {
  const concerns = [
    {
      id: 'patent',
      title: 'Patent & Prior Art Check',
      badge: 'Section 3(p) Act',
      desc: 'Verify if your Ayurvedic formulation conflicts with Traditional Knowledge Digital Library (TKDL) or Indian Patent Act 1970 exclusions.',
      icon: Award,
      color: 'bg-[#EAF3EC] border-[#C8E0CE] text-[#1F5C3D] hover:bg-[#d8ebdC]'
    },
    {
      id: 'trademark',
      title: 'Trademark & Brand Protection',
      badge: 'Class 3 & Class 5',
      desc: 'Check brand name registrability under Trade Marks Act 1999, descriptive name disclaimers, and phonetic conflict avoidance.',
      icon: FileText,
      color: 'bg-[#F7EEDD] border-[#E8DAB9] text-[#B8860B] hover:bg-[#f2e2c4]'
    },
    {
      id: 'gi',
      title: 'Geographical Indication (GI)',
      badge: 'GI Act 1999',
      desc: 'Determine if regional ingredients (e.g. Kandhamal Haldi, Vrindavan Tulsi) require Authorized User registration under GI rules.',
      icon: Globe,
      color: 'bg-[#EFEAF7] border-[#D9CEEA] text-[#6B4FA0] hover:bg-[#e4d9f2]'
    },
    {
      id: 'regulatory',
      title: 'AYUSH Regulatory Approval',
      badge: 'Drugs & Cosmetics Act',
      desc: 'Evaluate Form 25D manufacturing licensing, Schedule T GMP compliance, and therapeutic vs cosmetic claim rules.',
      icon: Scale,
      color: 'bg-[#FAF7F0] border-[#E0D8C8] text-[#2B2B2B] hover:bg-[#F3EDE0]'
    },
    {
      id: 'abs',
      title: 'Access & Benefit Sharing (ABS)',
      badge: 'Biodiversity Act 2002',
      desc: 'Check National Biodiversity Authority (NBA) intimation requirements and State Biodiversity Board commercial utilization fees.',
      icon: ShieldCheck,
      color: 'bg-[#EAF3EC] border-[#C8E0CE] text-[#1F5C3D] hover:bg-[#d8ebdC]'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F5C3D]/10 border border-[#1F5C3D]/20 text-[#1F5C3D] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Screen 5 — Target Concern Focus</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold text-[#1F5C3D] tracking-tight">
          Select Your Area of Focus / Legal Concern
        </h2>
        <p className="text-xs text-[#5F5F5F]">
          Choose which specific legal, IP, or regulatory domain you want the AI RAG engine to evaluate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerns.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectConcern(item.id)}
              className={`border-2 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-6 ${item.color}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-white/80 rounded-full border border-black/10">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#2B2B2B]">{item.title}</h3>
                  <p className="text-xs text-[#5F5F5F] leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/10 text-xs font-extrabold">
                <span>Generate Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

