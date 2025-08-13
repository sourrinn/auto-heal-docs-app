interface DocSectionProps {
  title: string;
  description: string;
  filename: string;
  code: string;
  language?: string;
}

export default function DocSection({ title, description, filename, code }: DocSectionProps) {
  return (
    <div className="mb-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-700 px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all">{filename}</span>
      </div>
      
      <pre className="m-0 p-4 bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 overflow-x-auto text-sm">
        <code className="block whitespace-pre-wrap break-words">{code}</code>
      </pre>
    </div>
  );
}
