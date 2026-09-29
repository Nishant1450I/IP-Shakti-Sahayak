import React from 'react';
import { X, Printer, Download, Award } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ReportDetailModal({ report, onClose }) {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    const element = document.getElementById('printable-report-area');
    if (!element) return;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${report.productName.replace(/\s+/g, '_')}_IP_Brief.pdf`);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl p-6 lg:p-8 flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#1F5C3D]" aria-hidden="true" />
            <h3 className="text-lg font-extrabold text-[#1F5C3D]">Legal Brief & Compliance Report</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white border border-[#D5CEBF] text-xs font-bold text-[#2B2B2B] rounded-xl hover:bg-[#FAF7F0] flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print</span>
            </button>
            <button
              onClick={handleExportPdf}
              className="px-3 py-1.5 bg-[#1F5C3D] text-white text-xs font-bold rounded-xl hover:bg-[#16452D] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#8FBC94]" aria-hidden="true" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="bg-white text-[#5F5F5F] hover:text-[#2B2B2B] rounded-full p-1.5 shadow-xs ml-2"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-report-area" className="flex-1 overflow-y-auto p-6 space-y-6 bg-white border border-[#E0D8C8] rounded-2xl my-4">
          <div className="border-b border-[#E8E2D5] pb-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-[#1F5C3D]">IP-SAKTI SAHAYAK</h1>
              <p className="text-[10px] text-[#5F5F5F] font-bold uppercase tracking-wider">Official Ayurvedic Product Audit Dossier</p>
            </div>
            <div className="text-right text-xs font-mono text-[#5F5F5F]">
              <p>Ref: #{report.id}</p>
              <p>Date: {report.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase text-[#5F5F5F]">Target Product</span>
            <h2 className="text-xl font-extrabold text-[#2B2B2B]">{report.productName}</h2>
            <p className="text-xs text-[#1F5C3D] font-bold">{report.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#FAF7F0] p-4 rounded-xl text-xs font-semibold border border-[#E0D8C8]">
            <div>
              <span className="text-[10px] text-[#5F5F5F] block uppercase">Evaluated Concern</span>
              <span className="text-[#1F5C3D] font-extrabold">{report.primaryConcern}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#5F5F5F] block uppercase">AI Audit Score</span>
              <span className="text-emerald-700 font-extrabold">{report.confidenceScore}% High Confidence</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase text-[#1F5C3D]">Statutory Findings Summary</h4>
            <p className="text-xs text-[#2B2B2B] leading-relaxed bg-[#EAF3EC]/40 border border-[#C8E0CE] p-4 rounded-xl">
              This product has been cross-referenced against the Indian Patents Act 1970 (Section 3p), Trade Marks Act 1999, Biological Diversity Act 2002, and TKDL databases. Key recommendation: Ensure proper TM brand prefix disclaimers and SBB intimation prior to commercial release.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8E2D5] text-[10px] text-[#5F5F5F] italic">
            * Generated automatically by IP-SAKTI SAHAYAK for educational and preliminary compliance assessment.
          </div>
        </div>

        <div className="pt-2 text-right shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1F5C3D] text-white text-xs font-bold rounded-xl"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}

