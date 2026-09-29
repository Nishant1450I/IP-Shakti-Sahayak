import React, { useMemo } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Layers, Award } from 'lucide-react';
import { classifyProduct } from '../services/classificationEngine';

export default function ClassificationResultScreen({ inputData, qaAnswers, onProceedToConcerns }) {
  // Compute preliminary product classification
  const classification = useMemo(() => {
    return classifyProduct(qaAnswers, inputData || {});
  }, [qaAnswers, inputData]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-[#1F5C3D] text-white rounded-3xl p-6 lg:p-8 shadow-md space-y-2 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8FBC94]/20 border border-[#8FBC94]/30 text-[#8FBC94] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preliminary Classification Guidance</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
          Product Classification & TKDL Prior Art Check
        </h2>
        <p className="text-xs text-[#8FBC94] max-w-xl">
          Automated evaluation against Ayurvedic Pharmacopoeia (API) standards and Traditional Knowledge Digital Library (TKDL) archives.
        </p>
      </div>

      {/* PRIOR ART ALERT BADGE */}
      {classification.tkdlPriorArtMatch ? (
        <div className="bg-[#F7EEDD] border-2 border-[#B8860B] rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#B8860B] text-white flex items-center justify-center shadow-sm shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase bg-[#B8860B] text-white px-2.5 py-0.5 rounded-full">
                  PRIOR ART ALERT — TKDL MATCH DETECTED
                </span>
                <h3 className="text-lg font-extrabold text-[#2B2B2B] mt-1">
                  Classical Herbal Composition Match
                </h3>
              </div>
            </div>
            <span className="text-xs font-bold text-[#B8860B] bg-white px-3 py-1 rounded-full border border-[#E8DAB9]">
              Section 3(p) Applicable
            </span>
          </div>

          <p className="text-xs text-[#2B2B2B] font-medium leading-relaxed bg-white/80 border border-[#E8DAB9] p-3.5 rounded-xl">
            CRITICAL: Formulation components (such as Turmeric, Neem, Aloe Vera) are documented in classical Ayurvedic texts (Charaka Samhita / TKDL). Product claims face high non-patentability barriers under Section 3(p) of the Patents Act 1970 unless non-obvious clinical synergy is demonstrated.
          </p>
        </div>
      ) : (
        <div className="bg-[#EAF3EC] border-2 border-[#1F5C3D] rounded-3xl p-6 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1F5C3D] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7 text-[#8FBC94]" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-[#1F5C3D] text-white px-2.5 py-0.5 rounded-full">
              PROPRIETARY CANDIDATE
            </span>
            <h3 className="text-lg font-bold text-[#1F5C3D] mt-1">
              Novel Formulation R&D Opportunity
            </h3>
          </div>
        </div>
      )}

      {/* Main Classification Summary Card */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-[#2B2B2B] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#1F5C3D]" />
          <span>Preliminary Category Assignment</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#FAF7F0] border border-[#E0D8C8] p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#5F5F5F]">Assigned Preliminary Category</span>
            <p className="text-base font-extrabold text-[#1F5C3D]">{classification.category}</p>
          </div>

          <div className="bg-[#FAF7F0] border border-[#E0D8C8] p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#5F5F5F]">Formulation Nature</span>
            <p className="text-base font-extrabold text-[#2B2B2B]">
              {classification.isClassical ? 'Classical Ayurvedic Medicine' : 'Proprietary Herbal Blend'}
            </p>
          </div>
        </div>

        {/* Key Detected Attributes */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#2B2B2B] uppercase tracking-wide">Detected Attributes</h4>
          <div className="flex flex-wrap gap-2">
            {classification.attributes.map((attr, idx) => (
              <span key={idx} className="px-3.5 py-1.5 bg-[#EAF3EC] border border-[#C8E0CE] text-[#1F5C3D] text-xs font-bold rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5C3D]" />
                <span>{attr}</span>
              </span>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-[#5F5F5F] italic bg-[#FAF7F0] p-3 rounded-xl border border-[#E8E2D5]">
          * {classification.disclaimer}
        </p>
      </div>

      {/* CTA Footer */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onProceedToConcerns}
          className="px-8 py-4 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-sm font-bold rounded-2xl shadow-lg transition flex items-center gap-3"
        >
          <span>Select Concern & Run Knowledge Retrieval</span>
          <ArrowRight className="w-5 h-5 text-[#8FBC94]" />
        </button>
      </div>
    </div>
  );
}
