import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Download, 
  Bookmark, 
  UserCheck, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Scale, 
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { fetchQueryGuidance } from '../services/apiClient';
import { TRANSLATIONS } from '../data/mockData';

export default function AIAnswerScreen({ 
  inputData, 
  selectedConcern, 
  jurisdiction = 'India',
  onOpenFacilitator, 
  onSaveReport, 
  onDownloadPdf,
  onBackToConcerns,
  lang 
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [saved, setSaved] = useState(false);
  const [selectedSourceModal, setSelectedSourceModal] = useState(null);

  const [ragResult, setRagResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Execute RAG Retrieval via Backend API (POST /api/query)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchQueryGuidance({
      productName: inputData?.productName || '',
      ingredients: inputData?.ingredients || '',
      intendedUse: inputData?.intendedUse || '',
      description: inputData?.description || '',
      concern: selectedConcern || 'patent',
      jurisdiction: jurisdiction || 'India',
      language: lang || 'en'
    }).then(res => {
      if (isMounted) {
        setRagResult(res);
        setLoading(false);
      }
    }).catch(err => {
      if (isMounted) {
        setRagResult({
          isInsufficient: true,
          answerSummary: "Retrieval query execution failed.",
          sources: [],
          confidenceScore: 0,
          confidenceLevel: 'Low / Insufficient',
          recommendations: ['Please check server status.']
        });
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [inputData, selectedConcern, jurisdiction, lang]);

  const handleSave = () => {
    if (!ragResult) return;
    setSaved(true);
    onSaveReport({
      id: `rep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      productName: inputData?.productName || 'Ayurvedic Product',
      category: inputData?.classificationCategory || 'Ayurvedic Formulation',
      primaryConcern: (selectedConcern || 'patent').toUpperCase(),
      confidenceScore: ragResult.confidenceScore,
      scenarioId: inputData?.matchedScenarioId || 'custom'
    });
  };

  // Confidence color styling
  const getConfidenceBadge = (score = 0) => {
    if (score >= 80) return { label: 'High Confidence', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', bar: 'bg-emerald-600' };
    if (score >= 50) return { label: 'Medium Confidence', color: 'bg-amber-100 text-amber-800 border-amber-300', bar: 'bg-amber-500' };
    return { label: 'Low Confidence', color: 'bg-rose-100 text-rose-800 border-rose-300', bar: 'bg-rose-600' };
  };

  if (loading || !ragResult) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center mx-auto animate-pulse">
          <Sparkles className="w-8 h-8 animate-spin text-[#1F5C3D]" />
        </div>
        <h3 className="text-xl font-extrabold text-[#1F5C3D]">Querying Backend API & Legal RAG Corpus...</h3>
        <p className="text-xs text-[#5F5F5F]">POST /api/query → Filtering jurisdiction ({jurisdiction}) & ranking statutory evidence</p>
      </div>
    );
  }

  const conf = getConfidenceBadge(ragResult.confidenceScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Navigation & Action Bar */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBackToConcerns}
          className="px-4 py-2 bg-white border border-[#D5CEBF] rounded-xl text-xs font-bold text-[#5F5F5F] hover:bg-[#FAF7F0] flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Concern Focus</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              saved
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-white border border-[#1F5C3D] text-[#1F5C3D] hover:bg-[#EAF3EC]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{saved ? 'Saved to Reports!' : t.saveReport}</span>
          </button>

          <button
            onClick={() => onDownloadPdf(inputData, selectedConcern, ragResult)}
            className="px-4 py-2 bg-[#1F5C3D] hover:bg-[#16452D] text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* RAG Insufficient Evidence Banner */}
      {ragResult.isInsufficient ? (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-8 shadow-md space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl font-black text-rose-900">
              {ragResult.answerSummary}
            </h3>
            <p className="text-xs text-rose-700 leading-relaxed">
              Our retrieval engine searched verified Indian IP & AYUSH statutes but did not find sufficient high-confidence matches for your specific prompt. No law or citation was fabricated.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={onOpenFacilitator}
              className="px-6 py-3 bg-[#1F5C3D] text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#8FBC94]" />
              <span>Consult AYUSH IP Facilitator</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Main AI RAG Answer Card */}
          <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex items-start justify-between border-b border-[#E8E2D5] pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF3EC] text-[#1F5C3D] text-[11px] font-bold rounded-full border border-[#C8E0CE]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RAG Engine Retrieval — {selectedConcern?.toUpperCase()}</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-extrabold text-[#1F5C3D] mt-2">
                  {inputData?.productName || 'Ayurvedic Formulation'}
                </h2>
                <p className="text-xs text-[#5F5F5F]">
                  Ingredients: {inputData?.ingredients || 'Herbal Blend'}
                </p>
              </div>

              {/* Confidence Gauge */}
              <div className="text-right space-y-1">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${conf.color}`}>
                  {conf.label} ({ragResult.confidenceScore}%)
                </span>
                <div className="w-32 bg-[#FAF7F0] h-2 rounded-full overflow-hidden border border-[#D5CEBF] ml-auto">
                  <div className={`h-full ${conf.bar} rounded-full`} style={{ width: `${ragResult.confidenceScore}%` }}></div>
                </div>
              </div>
            </div>

            {/* 1. Answer */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#5F5F5F]">
                1. Plain-Language Statutory Assessment
              </h3>
              <p className="text-sm lg:text-base text-[#2B2B2B] leading-relaxed font-medium bg-[#FAF7F0] border border-[#E8E2D5] p-5 rounded-2xl">
                {ragResult.answerSummary}
              </p>
            </div>

            {/* Actionable Recommendations */}
            {ragResult.recommendations && ragResult.recommendations.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#1F5C3D]">
                  Compliance Guidance Steps
                </h4>
                <ul className="space-y-2">
                  {ragResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2B2B2B] font-medium bg-[#EAF3EC]/60 border border-[#C8E0CE] p-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-[#1F5C3D] shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 2 & 3 & 4. Retrieved Sources, Section/Clause & Relevant Snippet Chips */}
          <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#2B2B2B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1F5C3D]" />
                <span>Retrieved Statutory Sources ({ragResult.sources.length})</span>
              </h3>
              <span className="text-xs text-[#5F5F5F] font-semibold">Verified Legal Corpus</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ragResult.sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => setSelectedSourceModal(src)}
                  className="bg-[#FAF7F0] border border-[#E0D8C8] hover:border-[#1F5C3D] rounded-2xl p-4 transition cursor-pointer space-y-3 group shadow-xs hover:shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase bg-[#EAF3EC] text-[#1F5C3D] px-2 py-0.5 rounded-md">
                        {src.section}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5F5F5F] group-hover:text-[#1F5C3D]" />
                    </div>

                    <h4 className="text-xs font-bold text-[#2B2B2B] group-hover:text-[#1F5C3D] line-clamp-1">
                      {src.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#1F5C3D]">{src.clause}</p>
                    <p className="text-[11px] text-[#5F5F5F] line-clamp-3 italic bg-white p-2 rounded-lg border border-[#E8E2D5]">
                      "{src.snippet}"
                    </p>
                  </div>

                  {/* Verification Status Badge */}
                  <div className="pt-2 border-t border-[#E8E2D5] text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="truncate">{src.verification_status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Legal Disclaimer */}
          <div className="p-4 bg-[#FAF7F0] border border-[#E0D8C8] rounded-2xl flex items-center gap-3 text-xs text-[#5F5F5F]">
            <ShieldCheck className="w-5 h-5 text-[#1F5C3D] shrink-0" />
            <span>
              <strong>Disclaimer:</strong> {t.disclaimer} This decision-support information is retrieved directly from our local verified Indian legal corpus for preliminary evaluation.
            </span>
          </div>
        </>
      )}

      {/* Source Citation Modal */}
      {selectedSourceModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-3xl w-full max-w-xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
              <div>
                <span className="text-[10px] font-black uppercase bg-[#EAF3EC] text-[#1F5C3D] px-2.5 py-0.5 rounded-md">
                  {selectedSourceModal.section}
                </span>
                <h4 className="text-base font-bold text-[#1F5C3D] mt-1">{selectedSourceModal.title}</h4>
              </div>
              <button
                onClick={() => setSelectedSourceModal(null)}
                className="text-xs bg-white px-3 py-1 rounded-full border text-[#5F5F5F]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-[#2B2B2B]">{selectedSourceModal.clause}</div>
              
              <div className="p-4 bg-white border border-[#E0D8C8] rounded-2xl text-xs text-[#2B2B2B] font-mono leading-relaxed">
                "{selectedSourceModal.snippet}"
              </div>

              <div className="p-3 bg-[#EAF3EC] border border-[#C8E0CE] rounded-xl text-xs font-bold text-[#1F5C3D] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1F5C3D]" />
                  <span>{selectedSourceModal.verification_status}</span>
                </span>
                <a
                  href={selectedSourceModal.source_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#1F5C3D] underline flex items-center gap-1"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedSourceModal(null)}
                className="px-5 py-2 bg-[#1F5C3D] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
