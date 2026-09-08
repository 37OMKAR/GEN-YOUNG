/**
 * Gen-Young Persona Context & Provider
 * Manages active youth persona state with localStorage persistence.
 * Path: src/context/PersonaContext.tsx
 */

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { UserPersona, PersonaContextType, PersonaId } from '../types/persona';
import { mockPersonas, defaultPersonaId, personasList } from '../data/mockPersonas';

const PERSONA_STORAGE_KEY = 'gen_young_active_persona_id';

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export interface PersonaProviderProps {
  children: ReactNode;
  initialPersonaId?: PersonaId;
}

export const PersonaProvider: React.FC<PersonaProviderProps> = ({
  children,
  initialPersonaId,
}) => {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>(() => {
    if (initialPersonaId && mockPersonas[initialPersonaId]) {
      return initialPersonaId;
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(PERSONA_STORAGE_KEY) as PersonaId;
        if (saved && mockPersonas[saved]) {
          return saved;
        }
      } catch (err) {
        console.warn('Unable to access localStorage for persona:', err);
      }
    }
    return defaultPersonaId;
  });

  const activePersona = useMemo<UserPersona>(() => {
    return mockPersonas[activePersonaId] || mockPersonas[defaultPersonaId];
  }, [activePersonaId]);

  const switchPersona = (personaId: string) => {
    const validId = personaId as PersonaId;
    if (mockPersonas[validId]) {
      setActivePersonaId(validId);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(PERSONA_STORAGE_KEY, validId);
        } catch (err) {
          console.warn('Unable to persist persona selection:', err);
        }
      }
    } else {
      console.warn(`Persona with id "${personaId}" not found in mockPersonas.`);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === PERSONA_STORAGE_KEY && event.newValue) {
          const newId = event.newValue as PersonaId;
          if (mockPersonas[newId]) {
            setActivePersonaId(newId);
          }
        }
      };
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, []);

  const value = useMemo<PersonaContextType>(() => {
    return {
      activePersona,
      availablePersonas: personasList,
      activePersonaId,
      switchPersona,
      isMinor: activePersona.isMinor,
    };
  }, [activePersona, activePersonaId]);

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = (): PersonaContextType => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
};
