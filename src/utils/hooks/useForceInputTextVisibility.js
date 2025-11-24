import { useEffect } from 'react';
import { forceInputTextVisibility } from '../forceInputTextVisibility';

/**
 * Hook React pour forcer la visibilité du texte dans tous les champs de saisie
 * S'exécute après chaque rendu
 */
export const useForceInputTextVisibility = () => {
  useEffect(() => {
    // Exécuter immédiatement
    forceInputTextVisibility();
    
    // Exécuter après un court délai pour capturer les éléments chargés dynamiquement
    const timeout1 = setTimeout(forceInputTextVisibility, 100);
    const timeout2 = setTimeout(forceInputTextVisibility, 500);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  });
  
  // Exécuter aussi après chaque mise à jour du DOM
  useEffect(() => {
    const interval = setInterval(forceInputTextVisibility, 1000);
    return () => clearInterval(interval);
  }, []);
};


