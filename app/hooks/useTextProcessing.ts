import { useState, useCallback, useEffect } from 'react';

declare global {
  interface Window {
    ai: {
      languageDetector: {
        create: () => Promise<{ detect: (text: string) => Promise<{ confidence: number, detectedLanguage: string }> }>;
      };
      summarizer: {
        create: (options: {
          type: string;
          format: string;
          length: string;
        }) => Promise<{ summarize: (text: string) => Promise<string> }>;
      };
      translator: {
        create: (options: {
          sourceLanguage: string;
          targetLanguage: string;
          monitor: (m: {
            addEventListener: (event: string, listener: (e: ProgressEvent) => void) => void;
          }) => void;
        }) => Promise<{ translate: (text: string) => Promise<string> }>;
      };
    };
  }
}

export function useTextProcessing() {
  const [outputText, setOutputText] = useState('');
  const [language, setLanguage] = useState('');
  const [summary, setSummary] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAPIAvailable, setIsAPIAvailable] = useState(false);

  useEffect(() => {
    const checkAPIAvailability = async () => {
      try {
        if (typeof window !== 'undefined' && 'ai' in window && window.ai !== undefined) {
          setIsAPIAvailable(true);
        } else {
          setIsAPIAvailable(false);
        }
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

      if (typeof window !== 'undefined' && window.ai) {
        const languageDetector = await window.ai.languageDetector.create();
        const result = await languageDetector.detect(text);
       
        const detectedLang = typeof result === 'object' ? result.detectedLanguage : result;
        setLanguage(detectedLang);
        return detectedLang;
      } else {
        throw new Error('Chrome AI API is not available.');
      }
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

      if (typeof window !== 'undefined' && window.ai) {
        const summarizer = await window.ai.summarizer.create({
          type: 'key-points',
          format: 'markdown',
          length: 'medium',
        });
        const summarizedText = await summarizer.summarize(text);
        setSummary(summarizedText);
      } else {
        throw new Error('Chrome AI API is not available.');
      }
    } catch (error) {
      console.error('Summarization error:', error);
      setSummary('Error generating summary');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const translateText = useCallback(async (text: string, sourceLang: string, targetLang: string) => {
    try {
      setIsProcessing(true);

      if (typeof window !== 'undefined' && window.ai) {
        const translator = await window.ai.translator.create({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          monitor(m) {
            m.addEventListener('downloadprogress', (e: ProgressEvent) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        const translated = await translator.translate(text);
        setTranslatedText(translated);
      } else {
        throw new Error('Chrome AI API is not available.');
      }
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