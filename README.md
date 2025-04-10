# 🧪 Suber Tests

A comprehensive test suite for API and E2E testing using Playwright.

## 🚀 Features

- 📡 API Testing
- 🌐 E2E Testing
- 📊 HTML Reports
- 🧩 Modular Structure

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

```bash
# Install dependencies
npm install
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
├── playwright.config.ts
└── package.json
```

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Run API tests
npx playwright test --project=api-tests

# Run E2E tests
npx playwright test --project=e2e-tests

# Generate report
npx playwright show-report
```

## ⚙️ Configuration

Environment variables:
- `API_BASE_URL`: Base URL for API tests (default: http://localhost:3030)
- `UI_BASE_URL`: Base URL for E2E tests (default: http://localhost:3000)

## 📊 Reports

Test reports are generated in the `playwright-report` directory. To view them:

```bash
npx playwright show-report
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