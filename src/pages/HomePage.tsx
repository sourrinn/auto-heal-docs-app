import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function HomePage() {
  return (
    <>
    <section className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl dark:text-white leading-tight">
            Make your tests
            <strong className="font-extrabold text-green-600 block sm:inline"> never fail </strong>
            during Executions
          </h1>

          <p className="mt-4 text-base text-gray-700 sm:text-lg md:text-xl dark:text-gray-200 leading-relaxed">
            Auto-heal the broken locators in your Playwright tests by logging locator failures and then using that data to intelligently select the best locator from a list of alternatives.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              className="w-full sm:w-auto rounded border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              to="/docs"
            >
              Get Started
            </Link>

            <Link
              className="w-full sm:w-auto rounded border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              to="https://www.npmjs.com/package/auto-heal-utility"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </Link>
            <div className="mt-4 sm:mt-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </section>
</>
  );
}
