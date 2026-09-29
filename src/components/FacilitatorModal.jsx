import React, { useState, useEffect } from 'react';
import { X, UserCheck, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';

export default function FacilitatorModal({ isOpen, onClose, currentProduct }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Dr. Aarav Sharma',
    email: 'aarav@ayush-innovations.in',
    phone: '+91 98765 43210',
    preferredDate: '2026-09-10',
    notes: currentProduct ? `Seeking consultation regarding ${currentProduct.name} IP and TKDL compliance.` : 'Need guidance on Ayurvedic product patent & regulatory approval.'
  });

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full px-3.5 py-2.5 bg-white border border-[#D5CEBF] rounded-xl text-xs font-medium text-[#2B2B2B] focus:outline-none focus:border-[#1F5C3D] focus:ring-2 focus:ring-[#1F5C3D]/10';
  const labelClass = 'block text-xs font-bold text-[#2B2B2B] mb-1';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-3xl w-full max-w-lg shadow-2xl p-6 relative overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="facilitator-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close facilitator dialog"
          className="absolute top-5 right-5 text-[#5F5F5F] hover:text-[#2B2B2B] bg-white rounded-full p-1.5 shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/30"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="w-12 h-12 rounded-2xl bg-[#1F5C3D] flex items-center justify-center text-white shrink-0">
                <UserCheck className="w-6 h-6 text-[#8FBC94]" aria-hidden="true" />
              </div>
              <div>
                <h3 id="facilitator-modal-title" className="text-xl font-bold text-[#1F5C3D]">Consult AYUSH IP Facilitator</h3>
                <p className="text-xs text-[#5F5F5F]">Connect with certified Indian Patent Attorneys & AYUSH Experts</p>
              </div>
            </div>

            <p className="text-xs text-[#5F5F5F] bg-[#EAF3EC] border border-[#C8E0CE] p-3 rounded-xl mb-5 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1F5C3D] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Expert Facilitation Scheme:</strong> Under Ministry of AYUSH & DPIIT initiatives, registered startups and traditional practitioners receive subsidized IP filing support.
              </span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fac-name" className={labelClass}>Your Full Name / Business</label>
                <input
                  id="fac-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="fac-email" className={labelClass}>Email Address</label>
                  <input
                    id="fac-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="fac-phone" className={labelClass}>Phone Number</label>
                  <input
                    id="fac-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="fac-date" className={labelClass}>Preferred Consultation Date</label>
                <input
                  id="fac-date"
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="fac-notes" className={labelClass}>Product Details / Specific Query</label>
                <textarea
                  id="fac-notes"
                  rows="3"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1F5C3D] hover:bg-[#16452D] text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
              >
                <Calendar className="w-4 h-4 text-[#8FBC94]" aria-hidden="true" />
                <span>Schedule Free Consultation Session</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#EAF3EC] text-[#1F5C3D] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1F5C3D]">Consultation Scheduled!</h3>
            <p className="text-xs text-[#5F5F5F] max-w-sm mx-auto leading-relaxed">
              Your inquiry has been assigned to <strong>AYUSH Facilitation Cell (Ref #FC-2026-891)</strong>. An IP Facilitator will reach out via email within 24 business hours.
            </p>
            <button
              type="button"
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 bg-[#1F5C3D] text-white text-xs font-bold rounded-xl shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C3D]/40"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}