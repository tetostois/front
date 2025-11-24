/**
 * Script pour forcer la visibilité du texte dans tous les champs de saisie
 * À exécuter après chaque rendu pour garantir que le texte reste visible
 */

export const forceInputTextVisibility = () => {
  // Trouver tous les inputs et textarea
  const inputs = document.querySelectorAll('input, textarea');
  
  inputs.forEach((input) => {
    // Ignorer les checkboxes et radio buttons
    if (input.type === 'checkbox' || input.type === 'radio') {
      return;
    }
    
    // Forcer la couleur du texte - utiliser la même couleur que le textarea QRO qui fonctionne
    input.style.color = '#374151';
    input.style.webkitTextFillColor = '#374151';
    input.style.caretColor = '#667eea';
    
    // Écouter les changements de style pour maintenir la couleur
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const currentColor = window.getComputedStyle(input).color;
          // Si la couleur n'est pas celle qu'on veut, la forcer - utiliser la même couleur que le textarea QRO
          if (currentColor !== 'rgb(55, 65, 81)' && currentColor !== '#374151') {
            input.style.color = '#374151';
            input.style.webkitTextFillColor = '#374151';
          }
        }
      });
    });
    
    observer.observe(input, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  });
  
  // Trouver tous les éléments avec des classes Material-UI
  const muiInputs = document.querySelectorAll(
    '.MuiInputBase-input, .MuiOutlinedInput-input, .MuiFilledInput-input, .MuiInputBase-inputMultiline'
  );
  
  muiInputs.forEach((input) => {
    input.style.color = '#374151';
    input.style.webkitTextFillColor = '#374151';
    input.style.caretColor = '#667eea';
  });
};

// Exécuter immédiatement et après un délai pour capturer les éléments chargés dynamiquement
if (typeof window !== 'undefined') {
  // Exécuter immédiatement
  forceInputTextVisibility();
  
  // Exécuter après le chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceInputTextVisibility);
  } else {
    forceInputTextVisibility();
  }
  
  // Exécuter après un court délai pour capturer les éléments chargés dynamiquement
  setTimeout(forceInputTextVisibility, 100);
  setTimeout(forceInputTextVisibility, 500);
  setTimeout(forceInputTextVisibility, 1000);
  
  // Observer les changements dans le DOM
  const domObserver = new MutationObserver(() => {
    forceInputTextVisibility();
  });
  
  domObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
}

