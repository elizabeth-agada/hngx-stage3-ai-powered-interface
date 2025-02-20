// app/page.tsx
'use client'

import { useState } from "react";
import { Send, Type, Languages, FileText } from 'lucide-react';

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
    if (!inputText.trim()) return;
    setOutputText(inputText);
    detectLanguage(inputText);
    setInputText(""); 
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1B1E] text-gray-100">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#5570F1]">
            Clone Chat
          </h1>
          <p className="text-center text-gray-400 mt-2">
            Process, translate, and summarize text using AI
          </p>
        </div>

        <div className="bg-[#25262B] rounded-lg shadow-xl mb-4 min-h-[60vh] max-h-[60vh] overflow-y-auto">
          <div className="p-6">
            {outputText ? (
              <div className="space-y-4">
                <div className="bg-[#2C2D32] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Type size={16} className="text-[#5570F1]" />
                    <span className="text-sm font-medium text-[#5570F1]">Input Text</span>
                  </div>
                  <p className="text-gray-200">{outputText}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                    <Languages size={14} />
                    <span>Detected Language: {language}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="bg-[#2C2D32] text-gray-200 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#5570F1]"
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
                    className="px-4 py-2 bg-[#5570F1] text-white rounded-lg hover:bg-[#4560E1] transition-colors flex items-center gap-2"
                  >
                    <Languages size={16} />
                    Translate
                  </button>

                  {outputText.length > 150 && language === "en" && (
                    <button
                      onClick={() => summarizeText(outputText)}
                      className="px-4 py-2 bg-[#2C2D32] text-white rounded-lg hover:bg-[#34353A] transition-colors flex items-center gap-2"
                    >
                      <FileText size={16} />
                      Summarize
                    </button>
                  )}
                </div>

                {(summary || translatedText) && (
                  <div className="space-y-4 mt-4">
                    {translatedText && (
                      <div className="bg-[#2C2D32] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Languages size={16} className="text-green-400" />
                          <span className="text-sm font-medium text-green-400">Translation</span>
                        </div>
                        <p className="text-gray-200">{translatedText}</p>
                      </div>
                    )}

                    {summary && (
                      <div className="bg-[#2C2D32] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={16} className="text-blue-400" />
                          <span className="text-sm font-medium text-blue-400">Summary</span>
                        </div>
                        <p className="text-gray-200">{summary}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>Enter text below to begin processing</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#25262B] rounded-lg shadow-xl p-4">
          <div className="flex gap-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow bg-[#2C2D32] text-gray-200 p-4 rounded-lg border border-gray-700 focus:outline-none focus:border-[#5570F1] resize-none"
              placeholder="Type or paste your text here..."
              rows={3}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`p-4 rounded-lg flex items-center justify-center ${
                inputText.trim() 
                  ? 'bg-[#5570F1] hover:bg-[#4560E1] text-white' 
                  : 'bg-[#2C2D32] text-gray-500'
              } transition-colors`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
function useTextProcessing() {
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const detectLanguage = (text: string) => {
    const detectedLanguage = "en"; 
    setLanguage(detectedLanguage);
  };

  const summarizeText = (text: string) => {
    const summarized = text.split(" ").slice(0, 20).join(" ") + "..."; 
    setSummary(summarized);
  };

  const translateText = (targetLang: string) => {
    const translated = `Translated text to ${targetLang}`;
    setTranslatedText(translated);
  };

  return {
    outputText,
    setOutputText,
    language,
    detectLanguage,
    summary,
    summarizeText,
    translatedText,
    translateText,
  };
}
