import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './src/Client';
import AppNavigation from './src/AppNavigation';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  );
}