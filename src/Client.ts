import { ApolloClient } from '@apollo/client';
import cache from './graphql/cache';

const Client = new ApolloClient({
  cache,
  connectToDevTools: true,
});

export default Client;