import React, { useState } from 'react';
import { Search, ExternalLink, Sparkles, X, ShieldCheck, FileSearch } from 'lucide-react';
import { KNOWLEDGE_BASE_DOCS, TRANSLATIONS } from '../data/mockData';

export default function KnowledgeBaseScreen({ lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDocModal, setSelectedDocModal] = useState(null);

  const categories = ['All', 'Patent Law', 'Trademark Law', 'GI Protection', 'Access & Benefit Sharing (ABS)', 'AYUSH Regulatory', 'Prior Art Database', 'Classical Texts'];

  const filteredDocs = KNOWLEDGE_BASE_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Banner */}
      <div className="bg-[#1F5C3D] text-white rounded-3xl p-6 lg:p-8 shadow-md space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8FBC94]/20 border border-[#8FBC94]/30 text-[#8FBC94] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Verified RAG Corpus</span>
        </div>
        <h2 className="text-2xl font-extrabold">{t.navKnowledge}</h2>
        <p className="text-xs text-[#8FBC94] max-w-2xl leading-relaxed">
          Search and inspect official Indian statutes, IP regulations, AYUSH notifications, and classical Ayurvedic pharmacopoeial references.
        </p>

        {/* Search Input */}
        <div className="pt-2">
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-[#5F5F5F] absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <label htmlFor="kb-search" className="sr-only">Search the knowledge base</label>
            <input
              id="kb-search"
              type="text"
              placeholder="Search legal statutes, sections, TKDL codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white text-[#2B2B2B] rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#8FBC94]/60 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/30 ${
              selectedCategory === cat
                ? 'bg-[#1F5C3D] text-white shadow-xs'
                : 'bg-white border border-[#D5CEBF] text-[#5F5F5F] hover:bg-[#FAF7F0]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Document Cards Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-10 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center mx-auto">
            <FileSearch className="w-7 h-7" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B]">No matching documents</h3>
          <p className="text-xs text-[#5F5F5F]">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDocModal(doc)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedDocModal(doc);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open document: ${doc.title}`}
              className="bg-white border border-[#E0D8C8] hover:border-[#1F5C3D] rounded-3xl p-6 shadow-xs hover:shadow-md transition cursor-pointer space-y-4 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
            >
              <div className="space-y-3 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase bg-[#EAF3EC] text-[#1F5C3D] px-2.5 py-1 rounded-md truncate">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#5F5F5F] shrink-0">{doc.type}</span>
                </div>

                <h3 className="text-base font-extrabold text-[#2B2B2B] group-hover:text-[#1F5C3D] transition break-words">
                  {doc.title}
                </h3>
                <p className="text-xs text-[#5F5F5F] leading-relaxed line-clamp-3">{doc.summary}</p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D5] flex items-center justify-between gap-2 text-xs font-bold text-[#1F5C3D]">
                <span className="truncate">Authority: {doc.authority}</span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  <span className="hidden sm:inline">Official source</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedDocModal(null)}>
          <div
            className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-3xl w-full max-w-xl shadow-2xl p-6 lg:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedDocModal.title}
          >
            <div className="flex items-start justify-between border-b border-[#E8E2D5] pb-4 gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase bg-[#EAF3EC] text-[#1F5C3D] px-2.5 py-1 rounded-md">
                  {selectedDocModal.category}
                </span>
                <h3 className="text-xl font-extrabold text-[#1F5C3D] mt-2 break-words">{selectedDocModal.title}</h3>
                <p className="text-xs text-[#5F5F5F]">{selectedDocModal.authority} ({selectedDocModal.year})</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocModal(null)}
                aria-label="Close document viewer"
                className="bg-white text-[#5F5F5F] hover:text-[#2B2B2B] rounded-full p-2 shadow-xs shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/30"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-[#2B2B2B]">Summary Overview</h4>
              <p className="text-xs text-[#2B2B2B] leading-relaxed bg-white p-4 border border-[#E0D8C8] rounded-2xl">
                {selectedDocModal.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-[#1F5C3D]">Key Cited Sections & Provisions</h4>
              <div className="space-y-2">
                {selectedDocModal.keyClauses.map((clause, idx) => (
                  <div key={idx} className="p-3 bg-[#EAF3EC] border border-[#C8E0CE] rounded-xl text-xs font-bold text-[#1F5C3D] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{clause}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setSelectedDocModal(null)}
                className="px-6 py-2.5 bg-[#1F5C3D] text-white text-xs font-bold rounded-xl shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}