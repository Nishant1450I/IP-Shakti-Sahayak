import React, { useState, useEffect } from 'react';
import { Camera, FileEdit, Mic, Upload, Sparkles, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';

export default function InputCaptureScreen({ defaultMode = 'details', onSubmitInput }) {
  const [activeTab, setActiveTab] = useState(defaultMode);

  // Form State
  const [productName, setProductName] = useState('Herbal Wound Care Formulation');
  const [ingredients, setIngredients] = useState('Turmeric, Neem, Aloe Vera');
  const [intendedUse, setIntendedUse] = useState('Topical wound care and antiseptic healing');
  const [description, setDescription] = useState('Herbal wound healing ointment combining natural extracts of Turmeric, Neem, and Aloe Vera in a soothing base.');

  // Scan State
  const [scannedImage, setScannedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Voice State
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('Is my herbal wound care ointment containing Turmeric, Neem and Aloe Vera patentable under Indian Patent Law?');

  useEffect(() => {
    setActiveTab(defaultMode);
  }, [defaultMode]);

  // Demo Shortcuts
  const applyDemoScenario = (type) => {
    if (type === 'wound') {
      setProductName('Herbal Wound Care Formulation');
      setIngredients('Turmeric, Neem, Aloe Vera');
      setIntendedUse('Topical wound care');
      setDescription('Natural topical herbal ointment formulated with Turmeric, Neem, and Aloe Vera for antiseptic wound healing.');
    } else if (type === 'cosmetic') {
      setProductName('Nimbaka Kesh Taila (Neem Hair Oil)');
      setIngredients('Azadirachta indica (Neem), Eclipta alba (Bhringraj), Sesame Oil');
      setIntendedUse('Hair growth care and anti-dandruff scalp nourishment');
      setDescription('Ayurvedic herbal hair oil blending cold-pressed Neem and Bhringraj extracts.');
    } else if (type === 'regional') {
      setProductName('Vrindavan Tulsi Arka');
      setIngredients('Ocimum sanctum (Krishna Tulsi), Ocimum gratissimum (Ram Tulsi)');
      setIntendedUse('Immunity booster drops and respiratory wellness');
      setDescription('Steam-distilled pure Tulsi hydro-extract harvested in the Vrindavan bio-region.');
    }
  };

  const handleScanMock = (type) => {
    setIsScanning(true);
    setTimeout(() => {
      applyDemoScenario(type);
      setIsScanning(false);
      setScannedImage('mock-label-preview');
    }, 1000);
  };

  const toggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };
        recognition.onend = () => setIsRecording(false);
        recognition.start();
      } else {
        setTimeout(() => setIsRecording(false), 2500);
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleProceedToQA = () => {
    onSubmitInput({
      productName,
      ingredients,
      intendedUse,
      description,
      inputMethod: activeTab
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Mode Switcher Tabs */}
      <div className="bg-white border border-[#E0D8C8] rounded-2xl p-1.5 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            activeTab === 'details'
              ? 'bg-[#F7EEDD] text-[#B8860B] border border-[#E8DAB9] shadow-xs'
              : 'text-[#5F5F5F] hover:text-[#2B2B2B]'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span>1. Enter Product Details</span>
        </button>

        <button
          onClick={() => setActiveTab('scan')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            activeTab === 'scan'
              ? 'bg-[#EAF3EC] text-[#1F5C3D] border border-[#C8E0CE] shadow-xs'
              : 'text-[#5F5F5F] hover:text-[#2B2B2B]'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>2. Scan Product Label</span>
        </button>

        <button
          onClick={() => setActiveTab('speak')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
            activeTab === 'speak'
              ? 'bg-[#EFEAF7] text-[#6B4FA0] border border-[#D9CEEA] shadow-xs'
              : 'text-[#5F5F5F] hover:text-[#2B2B2B]'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>3. Speak Question</span>
        </button>
      </div>

      {/* Demo Seeded Products Bar */}
      <div className="bg-[#FAF7F0] border border-[#E0D8C8] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1F5C3D]">
          <Sparkles className="w-4 h-4 text-[#B8860B]" />
          <span>Seeded Demo Products:</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => applyDemoScenario('wound')}
            className="px-3.5 py-1.5 bg-white border-2 border-[#1F5C3D] text-[#1F5C3D] text-[11px] font-bold rounded-xl hover:bg-[#EAF3EC] transition shadow-xs"
          >
            1. Herbal Wound Care (Turmeric, Neem, Aloe)
          </button>
          <button
            onClick={() => applyDemoScenario('cosmetic')}
            className="px-3 py-1.5 bg-white border border-[#B8860B] text-[#B8860B] text-[11px] font-bold rounded-xl hover:bg-[#F7EEDD] transition"
          >
            2. Neem Hair Cosmetic
          </button>
          <button
            onClick={() => applyDemoScenario('regional')}
            className="px-3 py-1.5 bg-white border border-[#6B4FA0] text-[#6B4FA0] text-[11px] font-bold rounded-xl hover:bg-[#EFEAF7] transition"
          >
            3. Vrindavan Tulsi Arka
          </button>
        </div>
      </div>

      {/* Tab 1: Enter Details */}
      {activeTab === 'details' && (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <h3 className="text-xl font-bold text-[#2B2B2B] flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-[#B8860B]" />
            <span>Product & Ingredient Inputs</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Herbal Wound Care Formulation"
                className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1F5C3D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Ingredients List</label>
              <textarea
                rows="2"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g. Turmeric, Neem, Aloe Vera"
                className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1F5C3D]"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Intended Use / Claim</label>
                <input
                  type="text"
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  placeholder="e.g. Topical wound care"
                  className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1F5C3D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B2B2B] mb-1">Formulation Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Topical herbal wound healing cream"
                  className="w-full px-4 py-3 bg-[#FAF7F0] border border-[#D5CEBF] rounded-xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#1F5C3D]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Scan */}
      {activeTab === 'scan' && (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
          <h3 className="text-xl font-bold text-[#1F5C3D] flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#1F5C3D]" />
            <span>Scan Product Package Label</span>
          </h3>

          <div className="border-2 border-dashed border-[#C8E0CE] bg-[#EAF3EC]/40 rounded-3xl p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#1F5C3D] text-white flex items-center justify-center mx-auto shadow-md">
              <Upload className="w-7 h-7 text-[#8FBC94]" />
            </div>
            <p className="text-sm font-bold text-[#1F5C3D]">Upload product label photo for OCR text parsing</p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => handleScanMock('wound')}
                className="px-4 py-2 bg-white border border-[#1F5C3D] rounded-xl text-xs font-bold text-[#1F5C3D] shadow-xs hover:bg-[#EAF3EC]"
              >
                Scan Demo 1: Herbal Wound Care Label
              </button>
            </div>
          </div>

          {isScanning && (
            <div className="p-4 bg-[#F7EEDD] border border-[#E8DAB9] rounded-2xl flex items-center gap-3 text-xs font-bold text-[#B8860B] animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Extracting ingredients via local OCR...</span>
            </div>
          )}

          {scannedImage && !isScanning && (
            <div className="p-4 bg-[#EAF3EC] border border-[#C8E0CE] rounded-2xl flex items-center justify-between text-xs text-[#1F5C3D] font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Extracted: "{productName}" ({ingredients})</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Speak */}
      {activeTab === 'speak' && (
        <div className="bg-white border border-[#E0D8C8] rounded-3xl p-6 lg:p-8 shadow-xs space-y-6 text-center">
          <h3 className="text-xl font-bold text-[#6B4FA0]">Voice Query Input</h3>

          <div className="py-4 space-y-4">
            <button
              onClick={toggleMic}
              className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-lg transition-all ${
                isRecording ? 'bg-red-500 animate-bounce' : 'bg-[#6B4FA0] hover:bg-[#543d80]'
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <p className="text-xs text-[#5F5F5F] font-bold">
              {isRecording ? 'Listening...' : 'Tap mic or review live transcript'}
            </p>
            <div className="max-w-md mx-auto bg-[#EFEAF7] border border-[#D9CEEA] p-3 rounded-2xl text-xs font-semibold text-[#2B2B2B]">
              "{transcript}"
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleProceedToQA}
          className="px-8 py-4 bg-[#1F5C3D] hover:bg-[#16452D] text-white text-sm font-bold rounded-2xl shadow-lg transition flex items-center gap-3"
        >
          <span>Proceed to Classification Wizard</span>
          <ArrowRight className="w-5 h-5 text-[#8FBC94]" />
        </button>
      </div>
    </div>
  );
}
