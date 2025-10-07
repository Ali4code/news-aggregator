# How to run

1. Deployed app: [https://ali4code.github.io/newsletter-app/](https://ali4code.github.io/newsletter-app/)
   - Note: `newsapi.org` free tier enforces CORS; calls may fail outside `localhost`.

2. Docker
   - From the project root:

```bash
docker build -t ali4code-newsletter .
```

```bash
docker run -d -p 8080:8080 ali4code-newsletter
```

   - Open [http://localhost:8080/](http://localhost:8080/)

3. Local (Node)

```bash
nvm use
```
   - Uses Node 18

```bash
npm run dev
```
   - Open [http://localhost:8080/](http://localhost:8080/)

4. Build and preview

```bash
npm run build
npm run preview
```

5. Deploy to GitHub Pages

```bash
npm run deploy
```

# API keys

To avoid committing API keys, an auth tab exists in the UI. Keys were committed temporarily for convenience; if they become invalid, obtain new keys from the sources below and update them in the auth tab.

Sources used:
1. [NewsApi.org](https://newsapi.org/)
2. [The Guardian](https://open-platform.theguardian.com/)
3. [New York Times](https://developer.nytimes.com/apis)

# Project tree

```bash
.
├── Dockerfile
├── README.md
├── dist
│   ├── assets
│   │   ├── index-*.css
│   │   └── index-*.js
│   ├── index.html
│   └── news.svg
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── news.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   └── baseApi.ts
│   │   └── store
│   │       ├── index.ts
│   │       └── slices
│   │           ├── authSlice.test.ts
│   │           ├── authSlice.ts
│   │           ├── tabsSlice.test.ts
│   │           └── tabsSlice.ts
│   ├── App.tsx
│   ├── components
│   │   ├── ArticleCard
│   │   │   ├── ArticleCard.module.css
│   │   │   ├── ArticleCard.skeleton.tsx
│   │   │   └── ArticleCard.tsx
│   │   ├── ArticleList
│   │   │   ├── ArticleList.module.css
│   │   │   └── ArticleList.tsx
│   │   ├── AuthenticationForm
│   │   │   ├── AuthenticationForm.module.css
│   │   │   └── AuthenticationForm.tsx
│   │   ├── MainLayout
│   │   │   └── MainLayout.tsx
│   │   ├── Navbar
│   │   │   ├── Navbar.constants.ts
│   │   │   ├── Navbar.module.css
│   │   │   ├── Navbar.tsx
│   │   │   ├── Navbar.types.ts
│   │   │   ├── NavbarContainer.tsx
│   │   │   └── icons
│   │   │       ├── CloseIcon.tsx
│   │   │       ├── HamburgerIcon.tsx
│   │   │       └── NewsIcon.tsx
│   │   ├── NewsFeed
│   │   │   └── NewsFeed.tsx
│   │   ├── Preferences
│   │   │   ├── assets
│   │   │   │   └── FilterIcon.tsx
│   │   │   ├── CategorySelect.tsx
│   │   │   ├── Preferences.module.css
│   │   │   ├── Preferences.tsx
│   │   │   └── Preferences.types.ts
│   │   ├── SearchColumn
│   │   │   ├── SearchColumn.constants.ts
│   │   │   ├── SearchColumn.module.css
│   │   │   └── SearchColumn.tsx
│   │   ├── SearchFeed
│   │   │   └── SearchFeed.tsx
│   │   ├── SideBar
│   │   │   ├── SideBar.module.css
│   │   │   └── SideBar.tsx
│   │   └── Tabs
│   │       ├── Tabs.module.css
│   │       └── Tabs.tsx
│   ├── entities
│   │   ├── article
│   │   │   └── index.ts
│   │   └── preferences
│   │       └── Preferences.types.ts
│   ├── index.css
│   ├── main.tsx
│   ├── shared
│   │   ├── api
│   │   │   ├── newsApi
│   │   │   │   ├── NewsApi.api.ts
│   │   │   │   ├── NewsApi.constants.ts
│   │   │   │   └── NewsApi.types.ts
│   │   │   ├── nyTimes
│   │   │   │   ├── NewYorkTimes.api.ts
│   │   │   │   ├── NewYorkTimes.constants.ts
│   │   │   │   └── NewYorkTimes.types.ts
│   │   │   └── theGuardian
│   │   │       ├── TheGuardian.api.ts
│   │   │       ├── TheGuardian.constants.ts
│   │   │       └── TheGuardian.types.ts
│   │   ├── config
│   │   │   ├── apiSources.ts
│   │   │   └── constants.ts
│   │   ├── hooks
│   │   │   └── useAuthAlert.ts
│   │   ├── lib
│   │   │   ├── aggregator.util.test.ts
│   │   │   ├── aggregator.util.ts
│   │   │   ├── useGetNewsFeed.test.ts
│   │   │   └── useGetNewsFeed.ts
│   │   └── ui
│   │       ├── Button.module.css
│   │       ├── Button.tsx
│   │       ├── ButtonLink.module.css
│   │       └── ButtonLink.tsx
│   ├── store
│   │   ├── authSlice.ts
│   │   ├── store.ts
│   │   └── tabsSlice.ts
│   ├── utils
│   │   ├── aggregator.util.ts
│   │   └── useGetNewsFeed.ts
│   ├── vite-env.d.ts
│   └── widgets
│       ├── main-layout
│       │   └── MainLayout.tsx
│       └── navbar
│           ├── Navbar.types.ts
│           └── NavbarContainer.tsx
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── vitest.config.ts
```

# Tests

Run the test suite with Vitest:

```bash
npm run test
```

Watch mode for local development:

```bash
npm run test:watch
```

Generate coverage (HTML + text) using the configured V8 provider:

```bash
npm run test -- --coverage
```

- The HTML report is written to `coverage/index.html`.
- JSDOM environment and path aliases are configured in `vitest.config.ts`.
- To run a single file:

```bash
npx vitest run src/shared/lib/aggregator.util.test.ts
```

# Tech stack

1. React
2. Redux + Redux Toolkit
3. TypeScript + CSS Modules

Aliases configured in `vite.config.ts`:
- `@app` → `src/app`
- `@widgets` → `src/widgets`
- `@features` → `src/features`
- `@entities` → `src/entities`
- `@shared` → `src/shared`