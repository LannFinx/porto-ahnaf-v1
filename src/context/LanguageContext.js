'use client';
// context/LanguageContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('id');

  // Opsional: Menyimpan pilihan bahasa di localStorage agar tidak reset saat refresh
  useEffect(() => {
    const savedLang = localStorage.getItem('portfolio_lang');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook agar pemanggilan di komponen lain jauh lebih bersih
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage harus digunakan di dalam LanguageProvider');
  }
  return context;
}