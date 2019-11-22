import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getLastKnownMeasurementQuery } from './queries';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'https://react.eogresources.com/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'wss://react.eogresources.com/graphql',
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export const Client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export const getLastKnownMeasurement = async (metricName: string) => {
  const params = {
    query: getLastKnownMeasurementQuery,
    variables: { metricName },
  };

  const { data } = await Client.query(params);

  return data.getLastKnownMeasurement;
};

export default Client;
