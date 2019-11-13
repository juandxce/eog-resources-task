import ApolloClient from 'apollo-boost';
import { getMultipleMeasurementsQuery, getMetricsQuery, getLastKnownMeasurementQuery } from './queries';

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


export const getMetricData = async (metricKeys: any, after: any) => {
  const metrics = metricKeys.map((key: any) => {
    return { metricName: key, after };
  });
  const params = {
    query: getMultipleMeasurementsQuery,
    variables: { input: metrics }
  };

  const { data } = await Client.query(params);

  return data.getMultipleMeasurements;
}

export const getLastKnownMeasurement = async (metricName: any) => {
  const params = {
    query: getLastKnownMeasurementQuery,
    variables: { metricName }
  };

  const { data } = await Client.query(params);
  console.log('getLastKnownMeaturement', data.getLastKnownMeasurement);

  return data.getLastKnownMeasurement;
}

export default Client;