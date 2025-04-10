# 🧪 Suber Tests

A comprehensive test suite for API and E2E testing using Playwright.

## 🚀 Features

- 📡 API Testing
- 🌐 E2E Testing
- 📊 HTML Reports
- 🔄 Retry Mechanism
- 🧩 Modular Structure
- 🧹 Code Formatting (Prettier)
- 🔍 Code Linting (ESLint)
- �� Git Hooks (Husky)
- 🤖 CI/CD (GitHub Actions)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation

```bash
# Install dependencies
npm install
# or
yarn install

# Initialize Git hooks
npm run prepare
```

## 🏗️ Project Structure

```
suber-tests/
├── src/
│   ├── api/           # API-specific code
│   │   ├── factories.ts
│   │   └── users.ts
│   ├── e2e/          # E2E-specific code
│   └── core/         # Shared code
│       └── user.ts
├── tests/            # Test files
│   ├── api/
│   └── e2e/
├── .github/          # GitHub Actions workflows
├── .husky/          # Git hooks
├── playwright.config.ts
├── .eslintrc.json    # ESLint configuration
├── .prettierrc       # Prettier configuration
└── package.json
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run API tests
npm run test:api

# Run E2E tests
npm run test:e2e

# Generate report
npm run report
```

## 🧹 Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 🔒 Git Hooks

The project uses Husky and lint-staged to ensure code quality before commits:

- Pre-commit hook runs linting and formatting on staged files
- Automatically fixes formatting issues
- Prevents commits with linting errors

## 🤖 CI/CD

The project uses GitHub Actions to ensure code quality:

- Runs on every Pull Request to master branch
- Checks for linting errors
- Verifies code formatting
- Fails if code doesn't meet quality standards

## ⚙️ Configuration

Environment variables:

- `API_BASE_URL`: Base URL for API tests (default: http://localhost:3030)
- `UI_BASE_URL`: Base URL for E2E tests (default: http://localhost:3000)

## 📊 Reports

Test reports are generated in the `playwright-report` directory. To view them:

```bash
npm run report
```

## 🔧 Development

### Adding New Tests

1. For API tests: Add files in `tests/api/`
2. For E2E tests: Add files in `tests/e2e/`

### Adding New Utilities

- API-specific utilities: `src/api/`
- E2E-specific utilities: `src/e2e/`
- Shared utilities: `src/core/`

## 📝 License

This project is licensed under the ISC License.
