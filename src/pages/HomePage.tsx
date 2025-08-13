import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function HomePage() {
  return (
    <>
    <section className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            Make your tests
            <strong className="font-extrabold text-green-600"> never fail </strong>
            during Executions
          </h1>

          <p className="mt-4 text-base text-gray-700 sm:text-lg md:text-xl dark:text-gray-200">
            Auto-heal the broken locators in your Playwright tests by logging locator failures and then using that data to intelligently select the best locator from a list of alternatives.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              to="/docs"
            >
              Get Started
            </Link>

            <Link
              className="inline-block rounded border border-gray-200 px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              to="httpshttps://www.npmjs.com/package/auto-heal-utility"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </section>
</>
  );
}
