# How to run:

1. app is deployed here: [https://ali4code.github.io/newsletter-app/](https://ali4code.github.io/newsletter-app/)
just be aware that newsapi.org will throw an CORS error if the location is not localhost (none commercial key)

2. docker:
navigate to root folder of the project in your terminal

```bash 
docker build . -t ali4code-newsletter
```

```bash 
docker run -db 8080:8080 ali4code-newsletter
```
then access app by navigating to [http://localhost:8080/](http://localhost:8080/)


3. local node: 

```bash 
nvm use
```
which will use node version 18

```bash 
npm run dev
```
then access app by navigating to [http://localhost:8080/](http://localhost:8080/)

# API keys

to avoid committing api keys to repo (bad practice) i added another tab (auth tab)
but at the end to avoid confusion i committed the keys, if those gets scrapped and invalidated by the time you are seeing this you can go to news api sites and get api keys and replace them in auth tab

Source used in this project is: 
1. [NewsApi.org](https://newsapi.org/)
2. [The Guardian](https://open-platform.theguardian.com/)
2. [New York Times](https://developer.nytimes.com/apis)


# project tree

```bash 
.
├── Dockerfile
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── news.svg
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── ArticleCard
│   │   │   ├── ArticleCard.module.css
│   │   │   ├── ArticleCard.skeleton.tsx
│   │   │   └── ArticleCard.tsx
│   │   ├── ArticleList
│   │   │   ├── ArticleList.module.css
│   │   │   └── ArticleList.tsx
│   │   ├── AuthenticationFrom
│   │   │   ├── AuthenticationFrom.module.css
│   │   │   └── AuthenticationFrom.tsx
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
│   │   │   ├── CategorySelect.tsx
│   │   │   ├── Preferences.module.css
│   │   │   ├── Preferences.tsx
│   │   │   ├── Preferences.types.ts
│   │   │   └── assets
│   │   │       └── FilterIcon.tsx
│   │   ├── SearchColumn
│   │   │   ├── SearchColumn.constants.ts
│   │   │   ├── SearchColumn.module.css
│   │   │   └── SearchColumn.tsx
│   │   ├── SearchFeed
│   │   │   └── SearchFeed.tsx
│   │   ├── SideBar
│   │   │   ├── SideBar.module.css
│   │   │   └── SideBar.tsx
│   │   ├── Tabs
│   │   │   ├── Tabs.module.css
│   │   │   └── Tabs.tsx
│   │   └── UI
│   │       ├── Button.module.css
│   │       ├── Button.tsx
│   │       ├── ButtonLink.module.css
│   │       └── ButtonLink.tsx
│   ├── constants.ts
│   ├── index.css
│   ├── main.tsx
│   ├── services
│   │   ├── NewYorkTimes
│   │   │   ├── NewYorkTimes.api.ts
│   │   │   ├── NewYorkTimes.constants.ts
│   │   │   └── NewYorkTimes.types.ts
│   │   ├── NewsApi
│   │   │   ├── NewsApi.api.ts
│   │   │   ├── NewsApi.constants.ts
│   │   │   └── NewsApi.types.ts
│   │   └── TheGuardian
│   │       ├── TheGuardian.api.ts
│   │       ├── TheGuardian.constants.ts
│   │       └── TheGuardian.types.ts
│   ├── store
│   │   ├── authSlice.ts
│   │   ├── store.ts
│   │   └── tabsSlice.ts
│   ├── utils
│   │   ├── aggregator.util.ts
│   │   ├── useAuthAlert.ts
│   │   └── useGetNewsFeed.ts
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```


# Stack

1. React.js
2. Redux
3. Redux-toolkit

in this project avoided any extra libraries and tried to work with pure TS + CSS