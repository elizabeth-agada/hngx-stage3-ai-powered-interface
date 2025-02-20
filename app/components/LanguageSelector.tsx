"use client"

import { useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
  { code: "fr", name: "French" },
];

export default function LanguageSelector({ onTranslate }: { onTranslate: (language: string) => void }) {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleTranslate = async () => {
    onTranslate(selectedLanguage);
  };

  return (
    <div className="mt-4">
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="p-2 border rounded-lg"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleTranslate}
        className="ml-2 p-2 bg-[#5570F1] text-white rounded-lg"
      >
        Translate
      </button>
    </div>
  );
}