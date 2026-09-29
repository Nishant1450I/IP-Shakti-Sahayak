import React, { useState } from 'react';
import { HelpCircle, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function ClassificationQAScreen({ inputData, onCompleteQA }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    q1: 'Formulation (Multi-herb blend)',
    q2: 'Topical application (Skin/Hair)',
    q3: 'Traditional / Classical Name',
    q4: 'Yes, sourced from specific GI region',
    q5: 'Yes, cited in classical literature'
  });

  const questions = [
    {
      id: 'q1',
      question: '1. Is this product a single herb extract or a multi-herb formulation?',
      options: [
        'Single Herb Extract (e.g. Pure Curcuma longa extract)',
        'Formulation (Multi-herb blend or herbal oil base)',
        'Combination of Herbal Extract + Modern Synthetic Active'
      ]
    },
    {
      id: 'q2',
      question: '2. Is the intended route of administration internal or topical?',
      options: [
        'Internal consumption (Vati, Churna, Swarasa, Syrup)',
        'Topical application (Ointment, Taila, Cream, Lepa)',
        'Inhalation / Oral Hygiene drops (Arka, Nasya)'
      ]
    },
    {
      id: 'q3',
      question: '3. Does it use a classical formula name or a new proprietary brand name?',
      options: [
        'Traditional / Classical Name (e.g. Haridra Kshatsadhana / Triphala)',
        'Invented Proprietary Brand Name (e.g. NIMBAKA Hair Shield)',
        'Combination of Brand Name + Classical Text Designation'
      ]
    },
    {
      id: 'q4',
      question: '4. Is any key raw ingredient sourced from a specific geographic region with GI tag?',
      options: [
        'Yes, sourced from specific GI region (e.g. Kandhamal, Vrindavan, Erode)',
        'No, standard commercial agricultural procurement across India',
        'Unsure / Sourced from wild forest biodiversity zone'
      ]
    },
    {
      id: 'q5',
      question: '5. Has this formulation procedure or recipe been published in classical texts or sold before?',
      options: [
        'Yes, cited in Charaka, Sushruta, or API Pharmacopoeia',
        'No, novel proprietary formulation created by our R&D',
        'Partial adaptation of classical recipe with new extraction process'
      ]
    }
  ];

  const handleSelectOption = (option) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onCompleteQA(answers);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Step Header & Progress Bar */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#EAF3EC] text-[#1F5C3D] flex items-center justify-center font-bold text-xs">
              {currentStep + 1}
            </span>
            <h3 className="text-base font-bold text-[#2B2B2B]">Product Classification Wizard</h3>
          </div>
          <span className="text-xs font-bold text-[#1F5C3D] bg-[#EAF3EC] px-3 py-1 rounded-full">
            Question {currentStep + 1} of {questions.length} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#FAF7F0] h-2.5 rounded-full overflow-hidden border border-[#E0D8C8]">
          <div
            className="bg-[#1F5C3D] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-[#E0D8C8] rounded-3xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#5F5F5F] tracking-wide uppercase">
            Evaluating Product: {inputData?.productName || 'Ayurvedic Formulation'}
          </span>
          <h2 className="text-xl lg:text-2xl font-extrabold text-[#1F5C3D] leading-snug">
            {questions[currentStep].question}
          </h2>
        </div>

        {/* Options Selection */}
        <div className="space-y-3 pt-2">
          {questions[currentStep].options.map((option, idx) => {
            const isSelected = answers[questions[currentStep].id] === option;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#EAF3EC] border-[#1F5C3D] text-[#1F5C3D] font-bold shadow-xs'
                    : 'bg-[#FAF7F0] border-[#E8E2D5] text-[#2B2B2B] hover:bg-[#F3EDE0]'
                }`}
              >
                <span className="text-xs lg:text-sm">{option}</span>
                {isSelected && <CheckCircle className="w-5 h-5 text-[#1F5C3D] shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E0D8C8]">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              currentStep === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-[#5F5F5F] hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          <button
            onClick={handleNext}
            className="px-7 py-3 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>{currentStep === questions.length - 1 ? 'Generate Classification' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4 text-[#8FBC94]" />
          </button>
        </div>
      </div>
    </div>
  );
}

