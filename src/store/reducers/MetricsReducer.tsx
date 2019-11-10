import { RECEIVED_METRICS_TAGS, RECEIVED_CHART_METRICS } from '../actions';

const initialState = {};


export const getSelectedMetrics = (state: any) => {
  const metrics = state.metrics || {};
  return Object.keys(metrics).filter((metric: any) => metrics[metric].selected);
};

export const metricsReducer = (state: any = initialState, action: any) => {
  console.log('running MetricsReducer', action);

  switch (action.type) {
    case RECEIVED_CHART_METRICS:
      return Object.assign({}, state, {
        chartMetrics: action.payload,
      });
    case RECEIVED_METRICS_TAGS:
      const newstate =  Object.assign({}, state, {
        chartTags: action.payload,
      });
      console.log('NS,', newstate);

      return newstate;
    default:
      return state
  }

  return state
}
