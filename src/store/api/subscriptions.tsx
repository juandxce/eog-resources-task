import gql from 'graphql-tag';

export const newMeasurementSubscription =  gql`
subscription measurement {
  newMeasurement {
    metric,
    at,
    value,
    unit
  }
}`;