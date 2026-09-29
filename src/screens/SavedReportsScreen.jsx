import React from 'react';
import { Download, FileText, Sparkles, Inbox } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function SavedReportsScreen({ savedReports, onOpenReportModal, onDownloadPdf, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const hasReports = savedReports && savedReports.length > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1F5C3D]/10 border border-[#1F5C3D]/20 text-[#1F5C3D] text-xs font-bold rounded-full">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Saved Legal Dossiers</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#1F5C3D]">{t.navReports}</h2>
        <p className="text-xs text-[#5F5F5F] max-w-2xl leading-relaxed">
          Your saved assistant queries and compliance briefs, ready to review or export for patent attorneys and AYUSH licensing boards.
        </p>
      </div>

      {/* Empty State */}
      {!hasReports && (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-10 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center mx-auto">
            <Inbox className="w-7 h-7" aria-hidden="true" />
          </div>
          <h3 className="text-base font-bold text-[#2B2B2B]">No saved reports yet</h3>
          <p className="text-xs text-[#5F5F5F] max-w-sm mx-auto leading-relaxed">
            Ask the Assistant a question and press "Save Report" to keep a copy of the guidance here.
          </p>
        </div>
      )}

      {/* Reports Grid */}
      {hasReports && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedReports.map((report) => (
            <div
              key={report.id}
              className="bg-white border border-[#E0D8C8] rounded-3xl p-6 shadow-xs hover:shadow-md hover:border-[#1F5C3D]/40 transition space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase bg-[#EAF3EC] text-[#1F5C3D] px-2.5 py-1 rounded-md truncate">
                    {report.primaryConcern} Dossier
                  </span>
                  <span className="text-[11px] font-mono text-[#5F5F5F] shrink-0">{report.date}</span>
                </div>

                <h3 className="text-lg font-extrabold text-[#2B2B2B] break-words">{report.productName}</h3>
                <p className="text-xs text-[#5F5F5F] font-medium">{report.category}</p>

                <div className="flex items-center gap-2 text-xs font-bold text-[#1F5C3D]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"></span>
                  <span>Audit Confidence: {report.confidenceScore}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#E0D8C8]">
                <button
                  type="button"
                  onClick={() => onOpenReportModal(report)}
                  className="flex-1 py-2.5 bg-[#FAF7F0] border border-[#D5CEBF] hover:bg-[#F3EDE0] text-[#2B2B2B] text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/30"
                >
                  <FileText className="w-4 h-4 text-[#1F5C3D]" aria-hidden="true" />
                  <span>View Full Brief</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDownloadPdf(report)}
                  aria-label={`Download ${report.productName} as PDF`}
                  className="px-4 py-2.5 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
                >
                  <Download className="w-4 h-4 text-[#8FBC94]" aria-hidden="true" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}