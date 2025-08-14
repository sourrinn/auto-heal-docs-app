interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export default function RawCodeBlock({ 
  code, 
  // language = 'typescript', 
  filename, 
  showLineNumbers = true 
}: CodeBlockProps) {
  
  const lines = code.split('\n');
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {filename && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          Copy
        </button>
      </div>
      
      {/* Code block */}
      <div className="overflow-x-auto">
        <pre className={`p-4 text-sm leading-relaxed dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-800 font-mono`}>
          <code>
            {showLineNumbers ? (
              <div className="flex">
                <div className={`select-none pr-4 text-right dark:text-gray-500 text-gray-400`}>
                  {lines.map((_, index) => (
                    <div key={index} className="leading-relaxed">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  {lines.map((line, index) => (
                    <div key={index} className="leading-relaxed whitespace-pre">
                      {line || ' '}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {lines.map((line, index) => (
                  <div key={index} className="leading-relaxed whitespace-pre">
                    {line || ' '}
                  </div>
                ))}
              </div>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
