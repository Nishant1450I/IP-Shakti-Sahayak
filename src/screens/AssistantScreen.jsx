import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Send,
  ShieldCheck,
  BookOpen,
  AlertTriangle,
  Loader2,
  UserCheck,
  ExternalLink,
  CheckCircle2,
  Scale,
  Award,
  Globe,
  FileText,
  HeartHandshake,
  MessageCircleQuestion,
  Layers,
  ChevronDown,
  Info,
  Pencil
} from 'lucide-react';
import MarkdownContent from '../components/MarkdownContent';
import { fetchQueryGuidance } from '../services/apiClient';
import { classifyProduct } from '../services/classificationEngine';
import { TRANSLATIONS } from '../data/mockData';

const CONCERN_CHIPS = [
  { id: 'patent', label: 'Patent', icon: Award },
  { id: 'trademark', label: 'Trademark', icon: FileText },
  { id: 'gi', label: 'GI', icon: Globe },
  { id: 'regulatory', label: 'AYUSH Regulation', icon: Scale },
  { id: 'abs', label: 'Biodiversity / ABS', icon: HeartHandshake }
];

const EXAMPLE_PROMPTS = [
  'Can a classical Ayurveda formulation be patented in India?',
  'Can I trademark the brand name of my Ayurveda product in India?'
];

// Visual tone per existing classificationEngine category (exact categories, no new ones)
function getClassificationTone(category) {
  switch (category) {
    case 'Classical Ayurvedic medicine':
      return { dot: 'bg-emerald-500', card: 'bg-[#EAF3EC] border-[#C8E0CE]', text: 'text-[#1F5C3D]' };
    case 'Cosmetic':
      return { dot: 'bg-[#6B4FA0]', card: 'bg-[#EFEAF7] border-[#D9CEEA]', text: 'text-[#6B4FA0]' };
    case 'Food/nutraceutical':
      return { dot: 'bg-[#B8860B]', card: 'bg-[#F7EEDD] border-[#E8DAB9]', text: 'text-[#B8860B]' };
    default:
      // 'Proprietary medicine' and 'New/non-classical formulation'
      return { dot: 'bg-amber-500', card: 'bg-[#F7EEDD] border-[#E8DAB9]', text: 'text-[#B8860B]' };
  }
}

export default function AssistantScreen({
  lang,
  jurisdiction,
  onOpenFacilitator,
  onSaveReport
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const [question, setQuestion] = useState('');
  const [selectedConcern, setSelectedConcern] = useState('patent');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const sourcesRef = useRef(null);

  // Optional product context (feeds classification + targeted guidance)
  const [productOpen, setProductOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [description, setDescription] = useState('');
  const [classification, setClassification] = useState(null);

  const hasProductInput = Boolean(
    productName.trim() || ingredients.trim() || intendedUse.trim() || description.trim()
  );

  const updateProductField = (setter) => (e) => {
    setter(e.target.value);
    setClassification(null); // stale after edits — reclassify to refresh
  };

  const handleClassify = () => {
    if (!hasProductInput) return;
    setClassification(classifyProduct({}, { productName, ingredients, intendedUse, description }));
  };

  const isClassified = classification && classification.status === 'classified';

  const handleCitationClick = (sourceNumber) => {
    const el = document.getElementById(`source-card-${sourceNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (sourcesRef.current) {
      sourcesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAsk = async () => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setSaved(false);

    try {
      const res = await fetchQueryGuidance({
        query: trimmed,
        concern: selectedConcern,
        jurisdiction,
        language: lang,
        // Only send a category when it is actually established — an
        // uncertain classification is never sent as a guess.
        classification: isClassified ? classification.category : '',
        productName,
        ingredients,
        intendedUse,
        description
      });
      setResult(res);
    } catch (err) {
      setError('Unable to reach the assistant service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!result || saved) return;
    setSaved(true);
    onSaveReport({
      id: `rep-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      productName: productName.trim() || question.slice(0, 60) || 'Ayurvedic Product',
      category: isClassified ? classification.category : 'AI Assistant Query',
      primaryConcern: selectedConcern.toUpperCase(),
      confidenceScore: result.confidenceScore || 0
    });
  };

  const getConfidenceBadge = (score = 0) => {
    if (score >= 80) return { label: 'High Confidence', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', bar: 'bg-emerald-600' };
    if (score >= 50) return { label: 'Medium Confidence', color: 'bg-amber-100 text-amber-800 border-amber-300', bar: 'bg-amber-500' };
    return { label: 'Low Confidence', color: 'bg-rose-100 text-rose-800 border-rose-300', bar: 'bg-rose-600' };
  };

  const getGeneratedByLabel = (generatedBy) => {
    switch (generatedBy) {
      case 'gemini':
        return {
          text: 'Answer generated with Gemini using retrieved sources',
          className: 'bg-[#EAF3EC] text-[#1F5C3D] border-[#C8E0CE]'
        };
      case 'template-fallback':
        return {
          text: 'Answer used fallback response (AI service unavailable)',
          className: 'bg-[#F7EEDD] text-[#B8860B] border-[#E8DAB9]'
        };
      case 'retrieval-only':
        return {
          text: 'Insufficient evidence — no AI generation',
          className: 'bg-[#FAF7F0] text-[#5F5F5F] border-[#E0D8C8]'
        };
      default:
        return {
          text: 'Answer generated from retrieved sources',
          className: 'bg-[#FAF7F0] text-[#5F5F5F] border-[#E0D8C8]'
        };
    }
  };

  const conf = result ? getConfidenceBadge(result.confidenceScore) : null;
  const genLabel = result ? getGeneratedByLabel(result.generatedBy) : null;
  const hasResult = Boolean(result);
  const clsTone = classification && isClassified ? getClassificationTone(classification.category) : null;

  const productInputClass =
    'w-full px-3.5 py-2.5 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-medium text-[#2B2B2B] placeholder:text-[#9A9384] focus:outline-none focus:border-[#1F5C3D] focus:ring-2 focus:ring-[#1F5C3D]/10';
  const productLabelClass = 'block text-[11px] font-bold text-[#5F5F5F] mb-1';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* 1. Page title / explanation */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F5C3D]/10 border border-[#1F5C3D]/20 text-[#1F5C3D] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>AI Assistant</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-[#1F5C3D] tracking-tight">
          How can IP-SAKTI <span className="text-[#8FBC94]">Sahayak</span> help you?
        </h1>
        <p className="text-sm text-[#5F5F5F] max-w-xl leading-relaxed">
          Ask about intellectual property, traditional knowledge, biodiversity or AYUSH regulatory requirements — grounded in verified legal sources.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        {/* 2. Concern selection */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#5F5F5F] mr-1">Focus:</span>
          {CONCERN_CHIPS.map((chip) => {
            const Icon = chip.icon;
            const isActive = selectedConcern === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedConcern(chip.id)}
                aria-pressed={isActive}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1F5C3D] text-white border-[#1F5C3D] shadow-xs'
                    : 'bg-white text-[#5F5F5F] border-[#D5CEBF] hover:bg-[#FAF7F0] hover:text-[#2B2B2B]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Product context (optional, collapsible) */}
        <div className="border border-[#E8E2D5] rounded-2xl bg-[#FCFAF5]">
          <button
            type="button"
            onClick={() => setProductOpen(!productOpen)}
            aria-expanded={productOpen}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <span className="flex items-center gap-2 min-w-0">
              <Layers className="w-4 h-4 text-[#1F5C3D] shrink-0" aria-hidden="true" />
              <span className="text-xs font-bold text-[#2B2B2B]">
                Add product details <span className="font-medium text-[#5F5F5F]">(optional)</span>
              </span>
              {hasProductInput && !productOpen && (
                <span className="text-[10px] font-bold text-[#1F5C3D] bg-[#EAF3EC] border border-[#C8E0CE] px-2 py-0.5 rounded-full shrink-0">
                  Details added
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#5F5F5F] shrink-0 transition-transform ${productOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {productOpen && (
            <div className="px-4 pb-4 space-y-4">
              <p className="text-[11px] text-[#5F5F5F] leading-relaxed flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#1F5C3D] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Adding product details allows Sahayak to classify the product and provide more targeted IP/regulatory guidance.
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pc-name" className={productLabelClass}>Product name</label>
                  <input
                    id="pc-name"
                    type="text"
                    value={productName}
                    onChange={updateProductField(setProductName)}
                    placeholder="e.g. Haridra Antiseptic Taila"
                    className={productInputClass}
                  />
                </div>
                <div>
                  <label htmlFor="pc-use" className={productLabelClass}>Intended use</label>
                  <input
                    id="pc-use"
                    type="text"
                    value={intendedUse}
                    onChange={updateProductField(setIntendedUse)}
                    placeholder="e.g. Topical wound care"
                    className={productInputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pc-ing" className={productLabelClass}>Ingredients / formulation</label>
                  <input
                    id="pc-ing"
                    type="text"
                    value={ingredients}
                    onChange={updateProductField(setIngredients)}
                    placeholder="e.g. Curcuma longa, Azadirachta indica, Coconut oil base"
                    className={productInputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pc-desc" className={productLabelClass}>Additional description</label>
                  <textarea
                    id="pc-desc"
                    rows="2"
                    value={description}
                    onChange={updateProductField(setDescription)}
                    placeholder="Classical reference, preparation method, or anything relevant"
                    className={`${productInputClass} resize-none`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleClassify}
                  disabled={!hasProductInput}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                    hasProductInput
                      ? 'bg-white border-[#1F5C3D] text-[#1F5C3D] hover:bg-[#EAF3EC]'
                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Classify Product
                </button>
                <span className="text-[10px] text-[#5F5F5F]">Preliminary, automated — official classification is decided by AYUSH authorities.</span>
              </div>

              {/* 6. Classification result card */}
              {classification && isClassified && clsTone && (
                <div className={`rounded-2xl border p-4 space-y-3 ${clsTone.card}`} role="status">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-wide text-[#5F5F5F]">
                        Product classification
                      </p>
                      <p className={`text-sm font-extrabold mt-1 flex items-center gap-2 ${clsTone.text}`}>
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${clsTone.dot}`} aria-hidden="true"></span>
                        <span className="truncate">{classification.category}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductOpen(true)}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/80 border border-[#D5CEBF] text-[10px] font-bold text-[#5F5F5F] hover:text-[#2B2B2B] hover:bg-white transition"
                    >
                      <Pencil className="w-3 h-3" aria-hidden="true" />
                      <span>Edit details</span>
                    </button>
                  </div>

                  {classification.attributes && classification.attributes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {classification.attributes.map((attr, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/80 border border-[#D5CEBF] text-[10px] font-bold text-[#5F5F5F]">
                          {attr}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-[10px] text-[#5F5F5F] italic leading-snug">
                    {classification.disclaimer}
                  </p>
                </div>
              )}

              {/* More information needed / ambiguous */}
              {classification && !isClassified && (
                <div className="rounded-2xl border border-[#E8DAB9] bg-[#F7EEDD] p-4 space-y-3" role="status">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-wide text-[#5F5F5F]">
                        Product classification
                      </p>
                      <p className="text-sm font-extrabold mt-1 flex items-center gap-2 text-[#B8860B]">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-amber-500" aria-hidden="true"></span>
                        <span>
                          {classification.status === 'ambiguous'
                            ? 'Classification ambiguous'
                            : 'More information needed'}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductOpen(true)}
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/80 border border-[#D5CEBF] text-[10px] font-bold text-[#5F5F5F] hover:text-[#2B2B2B] hover:bg-white transition"
                    >
                      <Pencil className="w-3 h-3" aria-hidden="true" />
                      <span>Edit details</span>
                    </button>
                  </div>

                  {classification.status === 'ambiguous' && classification.conflicts && (
                    <p className="text-[11px] text-[#5F5F5F] leading-snug">
                      The details provided could fit more than one category ({classification.conflicts.join(' or ')}).
                    </p>
                  )}

                  {classification.missing && classification.missing.length > 0 && (
                    <ol className="space-y-1.5 list-decimal pl-4">
                      {classification.missing.map((m) => (
                        <li key={m.key} className="text-[11px] text-[#2B2B2B] font-medium leading-snug">
                          {m.question}
                        </li>
                      ))}
                    </ol>
                  )}

                  <p className="text-[10px] text-[#5F5F5F] italic leading-snug">
                    {classification.disclaimer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. User question */}
        <div className="space-y-2">
          <label htmlFor="sahayak-question" className="block text-sm font-bold text-[#2B2B2B]">
            Describe your IP or AYUSH question
          </label>
          <textarea
            id="sahayak-question"
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAsk();
              }
            }}
            placeholder="Can my classical Ayurveda formulation be patented in India?"
            className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D5CEBF] rounded-2xl text-sm font-medium text-[#2B2B2B] placeholder:text-[#9A9384] focus:outline-none focus:border-[#1F5C3D] focus:ring-2 focus:ring-[#1F5C3D]/10 resize-none"
          />
          {/* Example prompts — secondary */}
          {!hasResult && !loading && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#5F5F5F] mr-1">Try:</span>
              {EXAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setQuestion(prompt)}
                  className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#FAF7F0] border border-[#E0D8C8] text-[#5F5F5F] hover:border-[#1F5C3D] hover:text-[#1F5C3D] transition text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 5. Analyze button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-[#5F5F5F]">
            Jurisdiction: <strong>{jurisdiction}</strong>
          </span>
          <button
            type="button"
            onClick={handleAsk}
            disabled={!question.trim() || loading}
            className={`px-6 py-3 rounded-2xl text-sm font-bold transition flex items-center gap-2 shadow-md ${
              !question.trim() || loading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1F5C3D] hover:bg-[#16452D] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#8FBC94]" aria-hidden="true" />
                <span>Analyzing your question...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#8FBC94]" aria-hidden="true" />
                <span>Ask Sahayak</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-8 text-center space-y-3 shadow-sm" role="status" aria-live="polite">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-7 h-7 animate-spin text-[#1F5C3D]" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-bold text-[#1F5C3D]">Searching verified sources and preparing your answer...</h3>
          <p className="text-xs text-[#5F5F5F]">
            Retrieving legal sources and generating a grounded answer
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 text-center space-y-3" role="alert">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-rose-900">Something went wrong</h3>
          <p className="text-xs text-rose-700">{error}</p>
          <button
            type="button"
            onClick={() => setError(null)}
            className="px-4 py-2 bg-white border border-rose-300 text-rose-700 text-xs font-bold rounded-xl"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 7. Answer Display (working renderer preserved) */}
      {result && !loading && (
        <div className="space-y-6">
          {/* Insufficient Evidence */}
          {result.isInsufficient ? (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-8 shadow-md space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" aria-hidden="true" />
              </div>
              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="text-xl font-black text-rose-900">
                  {result.answerSummary}
                </h3>
                <p className="text-xs text-rose-700 leading-relaxed">
                  Our retrieval engine searched verified legal sources but did not find sufficient high-confidence matches for your specific prompt. No law or citation was fabricated.
                </p>
              </div>
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="max-w-md mx-auto space-y-2 text-left">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-rose-800 bg-white/70 border border-rose-200 p-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="pt-2 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={onOpenFacilitator}
                  className="px-6 py-3 bg-[#1F5C3D] text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#8FBC94]" aria-hidden="true" />
                  <span>Consult AYUSH IP Facilitator</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Main Answer Card */}
              <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap items-start justify-between border-b border-[#E8E2D5] pb-4 gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF3EC] text-[#1F5C3D] text-[11px] font-bold rounded-full border border-[#C8E0CE]">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>AI Assistant — {selectedConcern.toUpperCase()}</span>
                    </div>
                    <h2 className="text-lg font-extrabold text-[#1F5C3D] break-words">
                      {question.slice(0, 80)}{question.length > 80 ? '...' : ''}
                    </h2>
                    {isClassified && (
                      <p className="text-[11px] font-semibold text-[#5F5F5F]">
                        Product context: {classification.category}
                      </p>
                    )}
                  </div>

                  {/* Confidence Gauge */}
                  {conf && (
                    <div className="text-right space-y-1 shrink-0">
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${conf.color}`}>
                        {conf.label} ({result.confidenceScore}%)
                      </span>
                      <div className="w-32 bg-[#FAF7F0] h-2 rounded-full overflow-hidden border border-[#D5CEBF] ml-auto">
                        <div className={`h-full ${conf.bar} rounded-full`} style={{ width: `${result.confidenceScore}%` }}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* generatedBy indicator */}
                {genLabel && (
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-bold ${genLabel.className}`}>
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{genLabel.text}</span>
                  </div>
                )}

                {/* Answer — Markdown with clickable [Source N] citations */}
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wide text-[#5F5F5F]">
                    Answer
                  </h3>
                  <div className="bg-[#FAF7F0] border border-[#E8E2D5] p-5 rounded-2xl">
                    <MarkdownContent
                      content={result.answerSummary}
                      onCitationClick={handleCitationClick}
                      sourceCount={(result.sources || []).length}
                    />
                  </div>
                </div>

                {/* 8. Recommendations */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#1F5C3D]">
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2B2B2B] font-medium bg-[#EAF3EC]/60 border border-[#C8E0CE] p-3 rounded-xl">
                          <CheckCircle2 className="w-4 h-4 text-[#1F5C3D] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#E8E2D5]">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saved}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      saved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white border border-[#1F5C3D] text-[#1F5C3D] hover:bg-[#EAF3EC]'
                    }`}
                  >
                    {saved ? 'Saved to Reports!' : 'Save Report'}
                  </button>
                  <button
                    type="button"
                    onClick={onOpenFacilitator}
                    className="px-4 py-2 bg-white border border-[#D5CEBF] text-[#5F5F5F] hover:bg-[#FAF7F0] text-xs font-bold rounded-xl transition flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-[#1F5C3D]" aria-hidden="true" />
                    <span>Consult IP Facilitator</span>
                  </button>
                </div>
              </div>

              {/* 9. Sources */}
              {result.sources && result.sources.length > 0 && (
                <div ref={sourcesRef} className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#2B2B2B] flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#1F5C3D]" aria-hidden="true" />
                      <span>Retrieved Sources ({result.sources.length})</span>
                    </h3>
                    <span className="text-xs text-[#5F5F5F] font-semibold">Verified Legal Corpus</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {result.sources.map((src, srcIdx) => (
                      <div
                        key={src.id}
                        id={`source-card-${srcIdx + 1}`}
                        className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-2xl p-4 space-y-3 flex flex-col justify-between scroll-mt-24"
                      >
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-black uppercase bg-[#EAF3EC] text-[#1F5C3D] px-2 py-0.5 rounded-md">
                              Source {srcIdx + 1} — {src.section}
                            </span>
                            {src.source_url && (
                              <a
                                href={src.source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#5F5F5F] hover:text-[#1F5C3D] shrink-0"
                                aria-label={`Open official source: ${src.title}`}
                              >
                                <span>Official source</span>
                                <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-[#2B2B2B]">{src.title}</h4>
                          <p className="text-[11px] font-semibold text-[#1F5C3D]">{src.clause}</p>
                          <p className="text-[11px] text-[#5F5F5F] line-clamp-3 italic bg-white p-2 rounded-lg border border-[#E8E2D5]">
                            "{src.snippet}"
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[#E8E2D5] text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                          <span className="truncate">{src.verification_status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* 10. Disclaimer */}
          <div className="p-4 bg-[#FAF7F0] border border-[#E0D8C8] rounded-2xl flex items-center gap-3 text-xs text-[#5F5F5F]">
            <ShieldCheck className="w-5 h-5 text-[#1F5C3D] shrink-0" aria-hidden="true" />
            <span>
              <strong>Disclaimer:</strong> {result.disclaimer || t.disclaimer}
            </span>
          </div>
        </div>
      )}

      {/* Empty state hint */}
      {!hasResult && !loading && !error && (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 flex items-start gap-3 text-xs text-[#5F5F5F]">
          <MessageCircleQuestion className="w-5 h-5 text-[#1F5C3D] shrink-0" aria-hidden="true" />
          <span>
            Answers are generated with Gemini and grounded in the verified legal corpus. Every claim links back to its retrieved source — nothing is fabricated.
          </span>
        </div>
      )}
    </div>
  );
}