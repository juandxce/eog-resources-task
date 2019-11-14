import gql from 'graphql-tag';

export const NewMeasurementSubscription =  gql`
subscription measurement {
  newMeasurement {
    metric,
    at,
    value,
    unit
  }
}`;