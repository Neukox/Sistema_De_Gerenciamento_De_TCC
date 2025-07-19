import { useContext } from 'react';
import { TCCContext } from '../contexts/TCCContext';
import type { TCCContextType } from '../types/tcc';

export const useTCCContext = (): TCCContextType => {
  const context = useContext(TCCContext);
  if (context === undefined) {
    throw new Error('useTCCContext deve ser usado dentro de um TCCProvider');
  }
  return context;
};
