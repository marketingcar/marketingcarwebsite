import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setIsOpen(false);
    // Force a re-render by updating the page
    window.location.reload();
  };

  const currentLanguage = i18n.language?.split('-')[0] || 'en';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-white bg-primary/20 hover:bg-primary/30 rounded-lg border-2 border-primary/40 hover:border-primary/60 transition-all duration-200"
        aria-label="Select Language"
      >
        <Globe size={20} className="text-primary" />
        <span className="text-foreground font-bold uppercase tracking-wide">
          {currentLanguage === 'es' ? 'ES' : 'EN'}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-card rounded-lg shadow-xl border-2 border-primary/30 z-50">
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-3 text-base font-medium hover:bg-primary/10 rounded-t-lg transition-colors ${
              currentLanguage === 'en' ? 'text-primary font-bold bg-primary/5' : 'text-foreground'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`block w-full text-left px-4 py-3 text-base font-medium hover:bg-primary/10 rounded-b-lg transition-colors ${
              currentLanguage === 'es' ? 'text-primary font-bold bg-primary/5' : 'text-foreground'
            }`}
          >
            Español
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
