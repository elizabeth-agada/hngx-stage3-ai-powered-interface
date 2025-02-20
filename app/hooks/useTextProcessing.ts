"use client";

import { useState, useEffect } from "react";

const API_TOKEN =
  "Aoeg49e8gXziww8aMaciOT3ocfAg14TCdd6srBr0/ENCVaog72otR4Or4Qjz9qByZNGl2mbK/pxvft9j0jf8sw0AAABReyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9";

export function useTextProcessing() {
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [detector, setDetector] = useState(null);
  const [summarizer, setSummarizer] = useState(null);
  const [translator, setTranslator] = useState(null);

  useEffect(() => {
    async function initializeAPIs() {
      try {
        
        const langCapabilities = await self.ai.languageDetector.capabilities();
        if (langCapabilities.available !== "no") {
          const newDetector = await self.ai.languageDetector.create();
          setDetector(newDetector);
        }

        const summarizerOptions = {
          sharedContext: "This is a scientific article",
          type: "key-points",
          format: "markdown",
          length: "medium",
        };
        const summarizerAvailable = (await self.ai.summarizer.capabilities()).available;
        if (summarizerAvailable !== "no") {
          const newSummarizer = await self.ai.summarizer.create(summarizerOptions);
          setSummarizer(newSummarizer);
        }

       
        const newTranslator = await self.ai.translator.create({
          sourceLanguage: "en",
          targetLanguage: "fr",
        });
        setTranslator(newTranslator);
      } catch (error) {
        console.error("Error initializing APIs:", error);
      }
    }

    initializeAPIs();
  }, []);

  const detectLanguage = async (text) => {
    if (!detector) {
      console.error("Language Detector not initialized.");
      return;
    }
    try {
      const detected = await detector.detect(text);
      setLanguage(detected.language);
    } catch (error) {
      console.error("Error detecting language:", error);
    }
  };

  const summarizeText = async (text) => {
    if (!summarizer) {
      console.error("Summarizer API not initialized.");
      return;
    }
    try {
      const summaryResult = await summarizer.summarize(text);
      setSummary(summaryResult);
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  };

  const translateText = async (text, targetLang) => {
    if (!translator) {
      console.error("Translator API not initialized.");
      return;
    }
    try {
      const translationResult = await translator.translate(text, { targetLanguage: targetLang });
      setTranslatedText(translationResult);
    } catch (error) {
      console.error("Error translating text:", error);
    }
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
