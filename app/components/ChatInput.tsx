"use client";

import { useTextProcessing } from "../hooks/useTextProcessing";
import { useState } from "react";

export default function ChatInterface() {
  const {
    outputText,
    setOutputText,
    language,
    detectLanguage,
    summary,
    summarizeText,
    translatedText,
    translateText,
  } = useTextProcessing();

  const [inputText, setInputText] = useState("");
  const [selectedLang, setSelectedLang] = useState("es");

  const handleSend = () => {
    setOutputText(inputText);
    detectLanguage(inputText);
    setInputText(""); 
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        God Abeg
      </h1>

    
      <div className="border p-4 min-h-[200px] bg-gray-100 rounded-lg">
        {outputText ? (
          <>
            <p className="text-lg">{outputText}</p>
            <p className="text-sm text-gray-500">Detected Language: {language}</p>

            {outputText.length > 150 && language === "en" && (
              <button
                onClick={summarizeText}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Summarize
              </button>
            )}

            <div className="mt-2">
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
              </select>
              <button
                onClick={() => translateText(selectedLang)}
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Translate
              </button>
            </div>

            {summary && <p className="mt-2 italic">Summary: {summary}</p>}
            {translatedText && <p className="mt-2 italic">Translated: {translatedText}</p>}
          </>
        ) : (
          <p className="text-gray-500">Enter text below to process.</p>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow border rounded-l px-4 py-2"
          placeholder="Type your text here..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
