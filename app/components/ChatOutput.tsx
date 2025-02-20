interface ChatOutputProps {
    text: string;
    language: string;
    translation?: string;
    summary?: string;
  }
  
  export default function ChatOutput({ 
    text, 
    language, 
    translation, 
    summary 
  }: ChatOutputProps) {
    return (
      <div className="p-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>{text}</p>
          <p className="text-sm text-gray-500">
            Detected Language: {language}
          </p>
          {translation && (
            <div className="mt-2 p-2 bg-blue-50 rounded">
              <p className="text-sm font-medium">Translation:</p>
              <p>{translation}</p>
            </div>
          )}
          {summary && (
            <div className="mt-2 p-2 bg-green-50 rounded">
              <p className="text-sm font-medium">Summary:</p>
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    );
  }