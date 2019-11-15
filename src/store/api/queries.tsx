import gql from 'graphql-tag';

export const getMultipleMeasurementsQuery = gql`
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
      }
    }
  }
`;

export const getLastKnownMeasurementQuery = gql`
  query($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
      metric
      value
      unit
    }
  }
`;

export const getMetricsQuery = gql`
  {
    getMetrics
  }
`;
