/**
 * Gen-Young Accessibility & Privacy Types
 * Path: src/types/accessibility.ts
 */

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  speechRate: number; // 0.75, 1.0, 1.25
  locationSharing: boolean;
  partnerPersonalization: boolean;
}

export interface PrivacyAuditLog {
  id: string;
  timestamp: string;
  category: string;
  action: string;
  partner: string;
  dataShared: string;
  purpose: string;
  retentionDays: number;
}

export interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xl') => void;
  setSpeechRate: (rate: number) => void;
  toggleLocationSharing: () => void;
  togglePartnerPersonalization: () => void;
  auditLogs: PrivacyAuditLog[];
}
