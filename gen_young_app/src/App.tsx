import React, { useState } from 'react';
import { PersonaProvider } from './context/PersonaContext';
import { BankingProvider } from './context/BankingContext';
import { BenefitsProvider } from './context/BenefitsContext';
import { DemoProvider } from './context/DemoContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { ToastProvider } from './context/ToastContext';
import { TopHeader } from './components/common/TopHeader';
import { BottomNav, NavTabId } from './components/common/BottomNav';
import { PersonaSwitcherModal } from './components/common/PersonaSwitcherModal';
import { ToastContainer } from './components/common/Toast';
import { HomeView } from './views/HomeView';
import { BenefitsView } from './views/BenefitsView';
import { LearnView } from './views/LearnView';
import { DropsView } from './views/DropsView';
import { SosView } from './views/SosView';
import { ProfileView } from './views/ProfileView';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'benefits':
        return <BenefitsView />;
      case 'learn':
        return <LearnView />;
      case 'drops':
        return <DropsView />;
      case 'safety':
        return <SosView />;
      case 'profile':
        return <ProfileView onOpenPersonaModal={() => setIsPersonaModalOpen(true)} />;
      default:
        return <HomeView onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="app-container min-h-screen bg-surface-0 text-ink-strong flex flex-col">
      {/* Top Persistent App Header */}
      <TopHeader onOpenPersonaSwitcher={() => setIsPersonaModalOpen(true)} />

      {/* Main Dynamic Viewport Container */}
      <div className="flex-1 w-full max-w-md mx-auto relative overflow-y-auto">
        {renderActiveView()}
      </div>

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        dropBadgeCount={1}
      />

      {/* Global Interactive Persona Switcher Modal */}
      <PersonaSwitcherModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
      />

      {/* App-Wide Floating Feedback Toasts */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <PersonaProvider>
        <BankingProvider>
          <ToastProvider>
            <BenefitsProvider>
              <DemoProvider>
                <AppContent />
              </DemoProvider>
            </BenefitsProvider>
          </ToastProvider>
        </BankingProvider>
      </PersonaProvider>
    </AccessibilityProvider>
  );
};

export default App;
