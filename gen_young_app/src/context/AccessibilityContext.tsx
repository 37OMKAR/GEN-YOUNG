/**
 * Gen-Young Accessibility & Privacy Context
 * Manages WCAG AAA high-contrast mode, font sizes, TTS speech rate,
 * location sharing, partner personalization, and privacy audit trails.
 * Path: src/context/AccessibilityContext.tsx
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  AccessibilitySettings,
  PrivacyAuditLog,
  AccessibilityContextType,
} from '../types/accessibility';

const A11Y_STORAGE_KEY = 'gen_young_a11y_settings';

const initialSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'normal',
  speechRate: 1.0,
  locationSharing: true,
  partnerPersonalization: true,
};

const sampleAuditLogs: PrivacyAuditLog[] = [
  {
    id: 'audit_01',
    timestamp: '2026-09-08T10:00:00.000Z',
    category: 'Consent',
    action: 'Zero-Balance Youth Account Activation',
    partner: 'Gen-Young Internal',
    dataShared: 'Age, College Verification',
    purpose: 'Zero-fee youth banking eligibility verification',
    retentionDays: 180,
  },
  {
    id: 'audit_02',
    timestamp: '2026-09-07T14:30:00.000Z',
    category: 'Benefits Match',
    action: 'Google AI Plus Eligibility Evaluation',
    partner: 'myScheme India & Google for Education',
    dataShared: 'Age (21), Student Cohort',
    purpose: 'Deterministic scholarship verification without third-party tracker sharing',
    retentionDays: 90,
  },
  {
    id: 'audit_03',
    timestamp: '2026-09-05T09:15:00.000Z',
    category: 'Local Hazard Alert',
    action: 'IMD Coastal Weather Alert Match',
    partner: 'IMD India Emergency Warning',
    dataShared: 'City (Mumbai), Geolocation',
    purpose: 'Emergency high tide and heavy rain alert routing',
    retentionDays: 30,
  },
];

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(A11Y_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (err) {
        console.warn('Error reading accessibility settings:', err);
      }
    }
    return initialSettings;
  });

  const [auditLogs] = useState<PrivacyAuditLog[]>(sampleAuditLogs);

  // Sync high-contrast class to document element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (settings.highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  }, [settings.highContrast]);

  const persistSettings = useCallback((newSettings: AccessibilitySettings) => {
    setSettings(newSettings);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(newSettings));
      } catch (err) {
        console.warn('Error saving accessibility settings:', err);
      }
    }
  }, []);

  const toggleHighContrast = useCallback(() => {
    persistSettings({
      ...settings,
      highContrast: !settings.highContrast,
    });
  }, [settings, persistSettings]);

  const setFontSize = useCallback(
    (fontSize: 'normal' | 'large' | 'xl') => {
      persistSettings({
        ...settings,
        fontSize,
      });
    },
    [settings, persistSettings]
  );

  const setSpeechRate = useCallback(
    (speechRate: number) => {
      persistSettings({
        ...settings,
        speechRate,
      });
    },
    [settings, persistSettings]
  );

  const toggleLocationSharing = useCallback(() => {
    persistSettings({
      ...settings,
      locationSharing: !settings.locationSharing,
    });
  }, [settings, persistSettings]);

  const togglePartnerPersonalization = useCallback(() => {
    persistSettings({
      ...settings,
      partnerPersonalization: !settings.partnerPersonalization,
    });
  }, [settings, persistSettings]);

  const value: AccessibilityContextType = {
    settings,
    toggleHighContrast,
    setFontSize,
    setSpeechRate,
    toggleLocationSharing,
    togglePartnerPersonalization,
    auditLogs,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
