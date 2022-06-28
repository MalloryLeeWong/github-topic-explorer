## Welcome to the GitHub Topic Explorer!

The GitHub Topic Explorer is a web application where you can search for and discover GitHub topics. Search for a term using the search bar and view a list of related topics and the number of stargazers for each of those related topics. You can also click on the name of a related topic to see related topics for that topic. By default the page displays results for the topic 'react'.

## Technologies used

- [Next.js](https://nextjs.org/)
- React (functional components and hooks)
- TypeScript
- CSS modules
- [Apollo GraphQL](https://www.apollographql.com/) (client and hooks)
- [GitHub GraphQL API](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#the-graphql-endpoint)
- [Jest](https://jestjs.io/)
- [React Test Renderer](https://reactjs.org/docs/test-renderer.html)
- [Lodash](https://lodash.com/)
- ES Lint
- Babel

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Create Next App was utilized to create the initial basic web application skeleton using Next.js, TypeScript, React, CSS modules, and ESLint. Next.js was chosen as the framework to build a React application because it comes with easy-to-use built-in page routing, as well as more flexible options for configuration and improving performance, which could be helpful if the application is extended or scaled in the future.

Apollo GraphQL Client was used to fetch and cache data about GitHub topics from the GitHub GraphQL API. The cache management helps to reduce the number of API network calls needed.

Lodash was used to create logic that debounces a user's search input to wait until a user is likely done entering a search term before querying for new search results to minimize the number of API calls made.

Jest was used to write unit tests for the core functional requirements. A few babel presets and plugins were also added to what comes by default with the Next.js app in order to run the Jest tests on React components with TypesCript and JSX.

To support web accessibility, semantic HTML elements (JSX) were used where possible for each feature. To provide additional screen reader support, the `aria-label` attribute was added to the input element, and a label element was added above the input for a screen reader to first read (although it the element is visually hidden in the UI for aesthetic purposes). Elements were also styled with significant color contrast. A user can use a keyboard instead of a mouse for all of the core functionalities of the application.

## How to run the app

1. Clone this repository

2. To authenticate with the GitHub GraphQL server:

- create a personal access token with the scopes specified in the [GitHub API docs](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).
- Pass the key you created to the `authorization` header of the Apollo Client instance created in the file `apollo-client.js`.

3. From the root of the project, install all dependencies

```bash
npm i
# or
yarn
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000/topic](http://localhost:3000/topic) with your browser to run the app.

Note: This application is also accessible and can be navigated by tabbing through elements on the page. If using Safari on a Mac, please first enable keyboard accessibility support [https://dequeuniversity.com/mac/keyboard-access-mac](https://dequeuniversity.com/mac/keyboard-access-mac))

## How to test the app

To run unit tests:

```bash
npm run test
# or
yarn test
```

## Future improvements

In the future, additional improvements could be made to enhance features in this application, such as:

- Add a query parameter for the search term to the page URL, so a user could navigate to a version of the explore topics page by query parameter and on page load see results for that specific term
- Replace default clear search button that comes with the default input element with a clear search button that can be focused and selected via tabbing on a keyboard (currently the default behavior doesn't allow this so a user has to manually delete the search text entered)
- If additional features were to be added to the application that also used a list and input, once confirming the product and design requirements, create global reusable components for a list, basic input, and search input (or use a third party library)
- Replace the simple loading message with progressive loading indicators, so for example each list row shows a gray rectangle for the content loading, so the user can see more of the list items that should be loading.
- Enhance API error handling by replacing the simple error alert message with a nicer looking modal or error page to improve the user experience
