import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const GITHUB_BASE_URL = "https://api.github.com/graphql";

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        authorization: `Bearer ${
            process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
        }`,
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        // do something with graphql error
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            )
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
})

const link = ApolloLink.from([errorLink, httpLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
    //link: httpLink, 
    link,
    cache,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);