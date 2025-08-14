import DocSection from '../components/DocSection';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'package-implementation', title: 'Package File Implementation', description: 'Includes Playwright BDD scripts and dependencies', filename: 'package.json' },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'auto' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 max-w-screen">
      {/* Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-800 shadow-lg' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Docs</h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
      )}

      <div className="lg:flex pt-16 lg:pt-0">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed top-0 left-0 h-full w-full lg:w-1/4 bg-white dark:bg-gray-800 shadow-xl max-h-screen
          transform transition-transform duration-300 ease-in-out z-50
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200 dark:lg:border-gray-700
          lg:sticky lg:top-0 scroll-auto overflow-y-auto
        `} style={{ scrollbarWidth: 'none' }}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white lg:pl-4">Automation Healer</h2>
              <button onClick={() => setIsMenuOpen(false)} className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200
                    ${activeSection === section.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                >
                  <div>{section.title}</div>
                  {section.description && <div className="text-xs opacity-75 mt-1">{section.description}</div>}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:w-3/4 px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Follow the instructions to implement auto-heal-utility and try the code behind it.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <DocSection
                  title={section.title}
                  description={section.description}
                  filename={
                    section.id === 'run-test' || section.id === 'run-commands' ? 'terminal' :
                      section.id === 'environment-variables' ? '.env' :
                        `${section.id.replace(/-/g, '.')}.ts`
                  }
                  code={getCodeForSection(section.id)}
                  language={getLanguageForSection(section.id)}
                />
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}


function getCodeForSection(sectionId: string): string {
  const codeMap: Record<string, string> = {
    'package-implementation': `{
  "name": "auto-healer-implementation",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "npx bddgen && npx playwright test --headed --project="Browser"",
    "test:headless": "npx bddgen && npx playwright test --project="Browser"",
    "test:debug": "npx bddgen && npx playwright test --headed --project="Browser" --debug",
    "test:tag": "npx bddgen && npx playwright test --grep "@feature-tag" --headed --project="Browser"",
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
}`,
    'run-commands': `npm install
npx playwright install`,
    'playwright-config': `import { defineConfig, devices } from "@playwright/test";
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
  reporter: [["html", { open: "always" }], ["junit", { outputFile: "test-results/e2e-junit-results.xml" }]],
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
});`,
    'typescript-config': `{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "noEmit": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "*": ["*"]
    },
    "types": ["playwright"],
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "**/*.ts",
    "**/*.json"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "playwright-report"
  ]
}`,
    'reusable-utility': `import { Page } from "@playwright/test";
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
}`,
    'example-page': `import { Locator, Page, expect } from "@playwright/test";
import { Metadata } from "auto-heal-utility";
import { Reusable } from "../utility/Reusable";

export class GooglePage extends Reusable {
  readonly page: Page;
  readonly googleSearchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.googleSearchInput = this.page.locator('xpath=//textarea[@aria-label="Search"]');
  }
  async goto() {
    await this.page.goto("https://www.google.com");
  }

  async search(keyword: string, metadata: Metadata) {
    await this.page.waitForLoadState("networkidle");
    (await this.waitHelper.waitForElementAndFill([this.googleSearchInput], keyword, metadata)).press("Enter");
  }

  async verifyTitle(keyword: string) {
    await expect(this.page).toHaveTitle(new RegExp(keyword));
  }
}`,
    'reusable-pages': `import { Page } from "@playwright/test";
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
}`,
    'feature-file': `Feature: Google Search Feature

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
    | Spiderman      |`,
    'fixtures': `import { test as base, createBdd } from "playwright-bdd";
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
      feature: testInfo.titlePath[0],
      scenario: testInfo.titlePath[1],
      step: "",
    };
    await use(metadata);
  },
});

export const { Given, When, Then, Before, After } = createBdd(test);`,
    'step-definitions': `import { Given, When, Then } from "../Fixtures/fixtures";

Given("User navigates to the Google homepage", async ({ metadata, pages }) => {
  metadata.step = "User navigates to the Google homepage";
  await pages.googlePage.goto();
});

When("User searches for {string}", async ({ metadata, pages }, keyword: string) => {
  metadata.step = "User searches for {string}";
  await pages.googlePage.search(keyword, metadata);
});

Then("User should see {string} in the title", async ({ metadata, pages }, keyword: string) => {
  metadata.step = "User should see {string} in the title";
  await pages.googlePage.verifyTitle(keyword);
});`,
    'environment-variables': `BROWSER=chrome
HEADLESS=false`,
    'run-test': `npm test`
  };

  return codeMap[sectionId] || '';
}

function getLanguageForSection(sectionId: string): string {
  const languageMap: Record<string, string> = {
    'package-implementation': 'json',
    'playwright-config': 'typescript',
    'typescript-config': 'json',
    'reusable-utility': 'typescript',
    'example-page': 'typescript',
    'reusable-pages': 'typescript',
    'step-definitions': 'typescript',
    'fixtures': 'typescript'
  };

  return languageMap[sectionId] || '';
}
