import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FacilitatorModal from './components/FacilitatorModal';
import ReportDetailModal from './components/ReportDetailModal';

// Active Screens
import AssistantScreen from './screens/AssistantScreen';
import KnowledgeBaseScreen from './screens/KnowledgeBaseScreen';
import SavedReportsScreen from './screens/SavedReportsScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('assistant');
  const [lang, setLang] = useState('en');
  const [jurisdiction, setJurisdiction] = useState('India');

  // Saved Reports
  const [savedReports, setSavedReports] = useState([
    {
      id: 'rep-901',
      date: new Date().toISOString().split('T')[0],
      productName: 'Herbal Wound Care Formulation',
      category: 'Ayurvedic Proprietary Medicine',
      primaryConcern: 'PATENT (SECTION 3p)',
      confidenceScore: 92
    }
  ]);

  // Modals
  const [facilitatorOpen, setFacilitatorOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState(null);

  const handleSaveReport = (newReport) => {
    setSavedReports([newReport, ...savedReports]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAF7F0] text-[#2B2B2B]">
      {/* Sidebar (desktop) / top bar + menu (mobile) */}
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        lang={lang}
        setLang={setLang}
        onOpenFacilitator={() => setFacilitatorOpen(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          lang={lang}
          setLang={setLang}
          activeScreen={activeScreen}
          jurisdiction={jurisdiction}
          onOpenFacilitator={() => setFacilitatorOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
          {activeScreen === 'assistant' && (
            <AssistantScreen
              lang={lang}
              jurisdiction={jurisdiction}
              onOpenFacilitator={() => setFacilitatorOpen(true)}
              onSaveReport={handleSaveReport}
            />
          )}

          {activeScreen === 'knowledge' && (
            <KnowledgeBaseScreen lang={lang} />
          )}

          {activeScreen === 'reports' && (
            <SavedReportsScreen
              savedReports={savedReports}
              onOpenReportModal={(report) => setReportModalData(report)}
              onDownloadPdf={(report) => setReportModalData(report)}
              lang={lang}
            />
          )}

          {activeScreen === 'settings' && (
            <SettingsScreen
              lang={lang}
              setLang={setLang}
              jurisdiction={jurisdiction}
              setJurisdiction={setJurisdiction}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <FacilitatorModal
        isOpen={facilitatorOpen}
        onClose={() => setFacilitatorOpen(false)}
        currentProduct={null}
      />

      <ReportDetailModal
        report={reportModalData}
        onClose={() => setReportModalData(null)}
      />
    </div>
  );
}