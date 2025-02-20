import { useState, useCallback, useEffect } from 'react';


const detectBrowserLanguage = (text: string): string => {
  try {
    
    if ('Intl' in window && 'Segmenter' in Intl) {
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
      const iterator = segmenter.segment(text);
      const firstWord = Array.from(iterator)[0];
      if (firstWord) {
        return navigator.language || 'en';
      }
    }
    
    return navigator.language || 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en';
  }
};

export function useTextProcessing() {
  const [outputText, setOutputText] = useState("");
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAPIAvailable, setIsAPIAvailable] = useState(false);

  useEffect(() => {
    const checkAPIAvailability = async () => {
      try {
       
        const hasRequiredFeatures = 
          'Intl' in window && 
          'Segmenter' in Intl &&
          'navigator' in window &&
          'language' in navigator;

        setIsAPIAvailable(hasRequiredFeatures);
      } catch (error) {
        console.error('API availability check failed:', error);
        setIsAPIAvailable(false);
      }
    };

    checkAPIAvailability();
  }, []);

  const detectLanguage = useCallback(async (text: string) => {
    if (!text.trim()) {
      setLanguage('');
      return null;
    }

    try {
      setIsProcessing(true);
      const detectedLang = detectBrowserLanguage(text);
      setLanguage(detectedLang);
      return detectedLang;
    } catch (error) {
      console.error('Language detection error:', error);
      setLanguage('unknown');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const summarizeText = useCallback(async (text: string) => {
    try {
      setIsProcessing(true);
      const words = text.split(' ');
      const summaryWords = words.slice(0, Math.min(30, words.length));
      const simpleSummary = summaryWords.join(' ') + (words.length > 30 ? '...' : '');
      setSummary(simpleSummary);
    } catch (error) {
      console.error('Summarization error:', error);
      setSummary('Error generating summary');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const translateText = useCallback(async (text: string, targetLang: string) => {
    try {
      setIsProcessing(true);
      
      setTranslatedText(`[Translation to ${targetLang}] ${text}`);
      
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error translating text');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    outputText,
    setOutputText,
    language,
    detectLanguage,
    summary,
    summarizeText,
    translatedText,
    translateText,
    isProcessing,
    isAPIAvailable,
  };
}