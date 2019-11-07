import ApolloClient from 'apollo-boost';
import { getPastMetricsQuery, getMetricsQuery } from './queries';

const Client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql'
});


export const getMetricTags = async () => {
  const params = {
    query: getMetricsQuery
  };

  const metricTags = await Client.query(params);
  console.log('metricTags', metricTags);

  return metricTags;
}


export default Client;
