import DocSection from '../components/DocSection';
import { useState } from 'react';

const sections = [
  { id: 'package-implementation', title: 'Package File Implementation', description: 'Includes Playwright BDD scripts and dependencies' },
  { id: 'run-commands', title: 'Run the commands', description: '' },
  { id: 'playwright-config', title: 'Playwright Config', description: 'Provides configurations for Playwright Tests' },
  { id: 'typescript-config', title: 'Typescript Config', description: 'Configures typescript variables' },
  { id: 'reusable-utility', title: 'Reusable Utility', description: 'The auto-healer is imported and used' },
  { id: 'example-page', title: 'Example Page', description: 'Contains locators and actions' },
  { id: 'reusable-pages', title: 'Reusable Page Implementation', description: 'All the pages are to be contained in a single page' },
  { id: 'feature-file', title: 'Example Feature File (Gherkin)', description: 'Contains the feature and scenarios' },
  { id: 'fixtures', title: 'Fixtures', description: 'Contains the fixtures for Playwright BDD' },
  { id: 'step-definitions', title: 'Step Definitions', description: 'Contains the step definitions for the feature file' },
  { id: 'environment-variables', title: 'Environment Variables', description: 'Contains the environment variables for the project' },
  { id: 'run-test', title: 'Run the Test', description: '' }
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex">
        {/* Side Menu */}
        <aside className="hidden lg:block w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pl-3 border-b border-gray-200 dark:border-gray-700 pb-4">General Walkthrough</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Follow the instructions to implement auto-heal-utility and try the code behind it.
              </p>
            </div>
            
            <div className="space-y-8">
              <div id="package-implementation">
                <DocSection
                  title="Package File Implementation"
                  description="Includes Playwright BDD scripts and dependencies"
                  filename="package.json"
                  code={`{
  "name": "auto-healer-implementation",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "npx bddgen && npx playwright test --headed --project=\"Browser\"",
    "test:headless": "npx bddgen && npx playwright test --project=\"Browser\"",
    "test:debug": "npx bddgen && npx playwright test --headed --project=\"Browser\" --debug",
    "test:tag": "npx bddgen && npx playwright test --grep \"@feature-tag\" --headed --project=\"Browser\"",
    "report": "npx playwright show-report"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "@playwright/test": "^1.54.2",
    "playwright-bdd": "^8.3.1"
  },
  "dependencies": {
    "@types/node": "^24.1.0",
    "auto-heal-utility": "^1.0.3",
    "dotenv": "^17.2.1"
  }
}
`}
                />
              </div>

              <div id="run-commands">
                <DocSection
                  title="Run the commands"
                  description=""
                  filename="terminal"
                  code={`npm install
npx playwright install`}
                />
              </div>

              <div id="playwright-config">
                <DocSection
                  title="Playwright Config"
                  description="Provides configurations for Playwright Tests"
                  filename="playwright.config.ts"
                  language="typescript"
                  code={`import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import dotenv from "dotenv";

dotenv.config();

const browsers = {
  chrome: {
    name: "Google Chrome",
    device: "Desktop Chrome",
    channel: "chrome",
  },
  edge: {
    name: "Microsoft Edge",
    device: "Desktop Edge",
    channel: "ms-edge",
  },
};

const currentBrowser = process.env.BROWSER || "chrome";
export const browserConfig = currentBrowser === "chrome" ? browsers.chrome : browsers.edge;

const testDir = defineBddConfig({
  features: ["Features/**/*.feature"],
  steps: ["Steps/**/*.ts", "Fixtures/**/*.ts"],
  outputDir: "Tests",
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [["html", { open: "always" }], ["junit", { outputFile: "test-results/e2e-junit-results.xml" }], ["./reporter/CustomReporter.ts"]],
  timeout: 15 * 60 * 1000,
  expect: { timeout: 15 * 1000 },
  use: {
    actionTimeout: 60 * 1000,
    navigationTimeout: 3.5 * 60 * 1000,
    launchOptions: {
      args: ["--allow-scripts", "--start-maximized"],
    },
    permissions: ["microphone", "camera", "clipboard-read", "clipboard-write"],
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
    video: "retain-on-failure",
    headless: Boolean(process.env.HEADLESS) || false,
    screenshot: "on",
  },
  projects: [
    {
      name: "Browse",
      use: {
        ...devices[browserConfig.device],
        channel: browserConfig.channel,
      },
    },
  ],
});
`}
                />
              </div>

              <div id="typescript-config">
                <DocSection
                  title="Typescript Config"
                  description="Configures typescript variables"
                  filename="tsconfig.json"
                  code={`{
  "compilerOptions": {
    "target": "esnext", // Use the latest JavaScript features
    "module": "esnext", // Use ES modules for compatibility with Playwright
    "strict": true, // Enable all strict type-checking options
    "noEmit": true, // Prevent emitting JavaScript files (useful for Playwright projects)
    "resolveJsonModule": true, // Allow importing JSON files
    "esModuleInterop": true, // Enable compatibility with CommonJS and ES modules
    "allowSyntheticDefaultImports": true, // Allow default imports from modules without default exports
    "moduleResolution": "node", // Use Node.js-style module resolution
    "baseUrl": "./", // Set the base URL for module resolution
    "paths": {
      "*": ["*"] // Allow resolving modules without extensions
    },
    "types": ["playwright"], // Include Playwright types globally
    "skipLibCheck": true, // Skip type checking of declaration files for faster builds
    "forceConsistentCasingInFileNames": true // Ensure consistent file name casing
  },
  "include": [
    "**/*.ts", // Include all TypeScript files
    "**/*.json" // Include JSON files
  ],
  "exclude": [
    "node_modules", // Exclude dependencies
    "dist", // Exclude build output
    "playwright-report" // Exclude Playwright reports
  ]
}`}
                />
              </div>

              <div id="reusable-utility">
                <DocSection
                  title="Reusable Utility"
                  description="The auto-healer is imported and used"
                  filename="utility/Reusable.ts"
                  code={`import { Page } from "@playwright/test";
import { AutoHeal, WaitHelper } from "auto-heal-utility";

export class Reusable {
  readonly page: Page;
  readonly waitHelper: WaitHelper;
  readonly autoHeal: AutoHeal;

  timeout: number = 15 * 1000;

  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page, this.timeout);
    this.autoHeal = new AutoHeal(page, this.timeout);
  }
}
`}
                />
              </div>

              <div id="example-page">
                <DocSection
                  title="Example Page"
                  description="Contains locators and actions"
                  filename="Pages/GooglePage.ts"
                  code={`import { Locator, Page, expect } from "@playwright/test";
import { Metadata } from "auto-heal-utility";
import { Reusable } from "../utility/Reusable";

export class GooglePage extends Reusable {
  readonly page: Page;
  readonly googleSearchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.googleSearchInput = this.page.locator('xpath=//textarea[@aria-label="SearchPQRT"]');
  }
  async goto() {
    await this.page.goto("https://www.google.com");
  }

  async search(keyword: string, metadata: Metadata) {
    await this.page.waitForLoadState("networkidle");
    (await this.waitHelper.waitForElementAndFill([this.googleSearchInput, this.page.getByTitle("SearchABCD").last()], keyword, metadata)).press("Enter");
  }

  async verifyTitle(keyword: string) {
    await expect(this.page).toHaveTitle(new RegExp(keyword));
  }
}
`}
                />
              </div>

              <div id="reusable-pages">
                <DocSection
                  title="Reusable Page Implementation"
                  description="All the pages are to be contained in a single page"
                  filename="Pages/ReusablePages.ts"
                  code={`import { Page } from "@playwright/test";
import { GooglePage } from "./GooglePage";
import { Reusable } from "../utility/Reusable";

export class ReusablePages extends Reusable {
  readonly page: Page;
  readonly googlePage: GooglePage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.googlePage = new GooglePage(page);
  }
}
`}
                />
              </div>

              <div id="feature-file">
                <DocSection
                  title="Example Feature File (Gherkin)"
                  description="Contains the feature and scenarios"
                  filename="Features/Example/GoogleSearch.feature"
                  code={`Feature: Google Search Feature

  Scenario Outline: TC01 - Search Google and Verify Title
    Given User navigates to the Google homepage
    When User searches for "<Keyword>"
    Then User should see "<Keyword>" in the title

    Examples:
    | Keyword        |
    | Playwright BDD |
    | LinkedIn       |
    | Buggati        |
    | Pencil         |
    | Spiderman      |`}
                />
              </div>

              <div id="fixtures">
                <DocSection
                  title="Fixtures"
                  description="Contains the fixtures for Playwright BDD"
                  filename="Fixtures/fixtures.ts"
                  code={`import { test as base, createBdd } from "playwright-bdd";
import { ReusablePages } from "../Pages/ReusablePages";
import { Metadata } from "auto-heal-utility";

type TestPages = {
  pages: ReusablePages;
  metadata: Metadata;
};

export const test = base.extend<TestPages>({
  pages: async ({ page }, use) => {
    const pages = new ReusablePages(page);
    await use(pages);
  },
  metadata: async ({}, use, testInfo) => {
    const metadata: Metadata = {
      feature: testInfo.titlePath[0], // Feature name
      scenario: testInfo.titlePath[1], // Scenario name
      step: "", // Step will be updated dynamically
    };
    await use(metadata);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);
`}
                />
              </div>

              <div id="step-definitions">
                <DocSection
                  title="Step Definitions"
                  description="Contains the step definitions for the feature file"
                  filename="Steps/GoogleSearch.steps.ts"
                  code={`import { Given, When, Then } from "../Fixtures/fixtures";

Given("User navigates to the Google homepage", async ({ metadata, pages }) => {
  metadata.step = "User navigates to the Google homepage";
  await pages.googlePage.goto();
});

When("User searches for {string}", async ({ metadata, pages }, keyword: string) => {
  metadata.step = "User searches for {string}"; // Step doesn't include data
  await pages.googlePage.search(keyword, metadata);
});

Then("User should see {string} in the title", async ({ metadata, pages }, keyword: string) => {
  metadata.step = "User should see {string} in the title"; // Step doesn't include data
  await pages.googlePage.verifyTitle(keyword);
});
`}
                />
              </div>

              <div id="environment-variables">
                <DocSection
                  title="Environment Variables"
                  description="Contains the environment variables for the project"
                  filename=".env"
                  code={`BROWSER=chrome
HEADLESS=false`}
                />
              </div>

              <div id="run-test">
                <DocSection
                  title="Run the Test using the command"
                  description=""
                  filename="terminal"
                  code={`npm test`}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
