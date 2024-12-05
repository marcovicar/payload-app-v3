'use client';

import React, { useEffect, useState } from 'react';

interface LanguageSelectorProps {
  availableLocales: { code: string; label: { [key: string]: string } }[];
  defaultLocale: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ availableLocales, defaultLocale }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLocale);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    } else {
      localStorage.setItem('language', defaultLocale);
    }
  }, [defaultLocale]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;

    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.cookie = `language=${language};path=/;max-age=31536000`; // Store for 1 year

      setSelectedLanguage(language);

      window.location.reload();
    }
  };

  return (
    <select
      className="bg-white p-2 border rounded"
      onChange={handleLanguageChange}
      value={selectedLanguage}
    >
      {availableLocales.map(({ code, label }) => (
        <option key={code} value={code}>
          {label[selectedLanguage] || label['en']}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
