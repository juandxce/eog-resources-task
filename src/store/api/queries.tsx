import gql from 'graphql-tag';

export const getPastMetricsQuery = gql`
query($metricName: String! $after: Timestamp!) {
  getMultipleMeasurements(input: {metricName: $metricName after: $after}) {
    metric,
    measurements {
      at,
      metric,
      unit
      value,
    }
  }
}`;

export const getLastMeasurementQuery = gql`
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    at,
    metric,
    value,
  }
}`;

  export const getMetricsQuery = gql`{ getMetrics }`;