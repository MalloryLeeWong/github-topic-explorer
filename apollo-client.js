import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    // You must add your own token for the GitHub API below
    authorization: `Bearer YOUR_GITHUB_API_KEY`,
  },
});

export default client;
