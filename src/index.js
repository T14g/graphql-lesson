import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

//Client
import { ApolloClient, gql } from 'apollo-boost';

//Caching for no-double fetchs
import { InMemoryCache } from 'apollo-cache-inmemory';

//If nothing changes it gives back the cached version and don't fetch again
import { ApolloProvider } from 'react-apollo';

//Let client connect to the endpoing /graphql
import { createHttpLink } from 'apollo-link-http';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';


//Making the connection

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
});

//The cache, like a top level reducer
const cache = new InMemoryCache();

//Ther client
const client = new ApolloClient({
  link: httpLink,
  cache,
  typeDefs,
  resolvers
});

client.writeData({
  data : {
    cartHidden: true,
    cartItems: [],
    itemCount: 0
  }
})



ReactDOM.render(
  <ApolloProvider client={client} >
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
