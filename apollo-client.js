import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    /* You must add your own token for the GitHub API below
     * Docs: https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql
     */
    authorization: `Bearer YOUR_GITHUB_API_KEY`,
  },
});

export default client;
