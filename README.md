# How to run

1. Deployed app: [https://ali4code.github.io/news-aggregator/](https://ali4code.github.io/news-aggregator/)
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

   - Environment:
     - The app now reads API keys at runtime from the in-app Auth tab. Local development does not require `.env` files.
     - Free-tier `newsapi.org` applies CORS outside `localhost`; use local dev or Docker for full functionality.

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

An Auth tab in the UI is the single place to manage keys at runtime. If bundled demo keys expire, obtain new keys from the sources below and paste them into the Auth tab (no rebuild required).

Sources used:
1. [NewsApi.org](https://newsapi.org/)
2. [The Guardian](https://open-platform.theguardian.com/)
3. [New York Times](https://developer.nytimes.com/apis)

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

# Architecture (branch: address-issues)

This branch refactors the app following SOLID and introduces a service/registry architecture.

High-level flow:

```
Components → Custom Hooks → NewsAggregationService → INewsApiService (Interface)
                                                            ↓
                                              ServiceRegistry → Concrete Services → RTK Query
                                                                        ↓
                                                                   Redux Store
```

- News services live behind `INewsApiService` with concrete implementations for NewsAPI.org, NYTimes, and The Guardian.
- `NewsApiServiceRegistry` registers sources; add new sources without touching components.
- `NewsAggregationService` centralizes aggregation and normalization.
- Store bootstrap moved to `src/app/store/index.ts` (app layer owns store lifecycle).

Key files:
- `src/shared/api/abstractions/INewsApiService.ts`
- `src/shared/api/registry/NewsApiServiceRegistry.ts`
- `src/shared/services/NewsAggregationService.ts`
- `src/hooks/useNewsSearch.ts`, `src/hooks/usePreferences.ts`
- `src/app/store/index.ts`

# Extending

Add a new news source:
1) Implement `INewsApiService` in `src/shared/api/implementations/*Service.ts`.
2) Register it in `src/shared/api/registry/NewsApiServiceRegistry.ts`.

Add a new route:
1) Register the component in `src/shared/routing/routes.ts`.
2) `MainLayout` resolves routes via the registry—no component edits required.