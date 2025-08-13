import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
        Make your tests
        <strong className="text-green-600"> never fail </strong>
        during Executions
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
      Auto-heal the broken locators in your Playwright tests by logging locator failures and then using that data to intelligently select the best locator from a list of alternatives.
      </p>

        <div className="mt-4 flex justify-center items-center gap-4 sm:mt-6">
          <Link
            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            to="/docs"
          >
            Get Started
          </Link>

          <Link
            className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
            to="https://www.npmjs.com/package/auto-heal-utility"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Link>
        </div>
    </div>
  </div>
</section>
</>
  );
}
