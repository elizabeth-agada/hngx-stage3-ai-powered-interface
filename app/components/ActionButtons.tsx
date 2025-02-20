"use client"

import { useState } from "react";

export default function ActionButtons({ text, language }: { text: string; language: string }) {
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    if (language === "en" && text.length > 150) {
      try {
        const summarizedText = await (window as any).chrome.ai.summarization.summarize(text);
        setSummary(summarizedText);
      } catch (error) {
        console.error("Error summarizing text:", error);
      }
    }
  };

  return (
    <div className="mt-4">
      {language === "en" && text.length > 150 && (
        <button
          onClick={handleSummarize}
          className="p-2 bg-green-500 text-white rounded-lg"
        >
          Summarize
        </button>
      )}
      {summary && <p className="mt-2">{summary}</p>}
    </div>
  );
}