/**
 * Gen-Young Emergency SOS & Safety Types
 * Path: src/types/sos.ts
 */

export interface EmergencyState {
  isTriggered: boolean;
  isCancelling: boolean;
  cancelSecondsLeft: number;
  erssTicketId?: string;
  coordinates: { lat: number; lng: number; accuracy: number; locality: string };
  dispatchedContacts: { name: string; relation: string; phone: string; status: 'sent' | 'pending' }[];
}
