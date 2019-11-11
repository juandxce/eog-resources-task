import gql from 'graphql-tag';

export const getPastMetricsQuery = gql`
query($metricName: String! $after: Timestamp!) {
  getMultipleMeasurements(input: {metricName: $metricName after: $after}) {
    metric,
    measurements {
      at,
      value,
    }
  }
}`;

export const getLastKnownMeasurementQuery = gql`
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric,
    value,
    unit,
  }
}`;

  export const getMetricsQuery = gql`{ getMetrics }`;