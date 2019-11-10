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


export const getMetricData = async (metricName: any, after: any) => {
  const params = {
    query: getPastMetricsQuery,
    variables: { metricName, after }
  };

  const { data } = await Client.query(params);
  console.log('get{ data }', data.getMultipleMeasurements[0]);

  return data.getMultipleMeasurements[0];
}

export default Client;