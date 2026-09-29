import React, { useState } from 'react';
import { FileText, Search, ArrowRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/mockData';

export default function MyAnalysesScreen({ analysesList, onReopenAnalysis, lang }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnalyses = analysesList.filter(a =>
    a.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.primaryConcern.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAF3EC] text-[#1F5C3D] text-xs font-bold rounded-full border border-[#C8E0CE] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Screen 7 — Product Audit History</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1F5C3D]">{t.navAnalyses}</h2>
          <p className="text-xs text-[#5F5F5F]">
            Review all previously evaluated Ayurvedic formulations and reopen legal insights.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#5F5F5F] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1F5C3D]"
          />
        </div>
      </div>

      {/* Past Analyses Table */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F0] border-b border-[#E0D8C8] text-[11px] font-black uppercase text-[#5F5F5F]">
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Product Name</th>
                <th className="py-3.5 px-6">Formulation Category</th>
                <th className="py-3.5 px-6">Primary Focus</th>
                <th className="py-3.5 px-6">Confidence</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0D8C8] text-xs font-medium">
              {filteredAnalyses.length > 0 ? (
                filteredAnalyses.map((item) => (
                  <tr key={item.id} className="hover:bg-[#EAF3EC]/40 transition group">
                    <td className="py-4 px-6 text-[#5F5F5F] font-mono text-[11px]">{item.date}</td>
                    <td className="py-4 px-6 font-bold text-[#1F5C3D]">{item.productName}</td>
                    <td className="py-4 px-6 text-[#5F5F5F]">{item.category}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-[#FAF7F0] border border-[#D5CEBF] rounded-lg text-[10px] font-bold text-[#2B2B2B]">
                        {item.primaryConcern}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full">
                        {item.confidenceScore}% High
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onReopenAnalysis(item)}
                        className="px-3.5 py-1.5 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Reopen</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8FBC94]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-[#5F5F5F]">
                    No past analyses match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

