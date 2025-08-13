import CodeBlock from './CodeBlock';
// import { useTheme } from '../hooks/useTheme';

interface DocSectionProps {
  title: string;
  description: string;
  filename: string;
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export default function DocSection({ 
  title, 
  description, 
  filename, 
  code, 
  language = 'typescript',
  showLineNumbers = true 
}: DocSectionProps) {
  // const { isDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-x-auto">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <CodeBlock
            code={code}
            language={language}
            filename={filename}
            showLineNumbers={showLineNumbers}
          />
        </div>
      </div>
    </div>
  );
}
