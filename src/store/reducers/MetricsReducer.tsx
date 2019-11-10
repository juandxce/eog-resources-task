import { RECEIVED_METRICS_TAGS, RECEIVED_CHART_METRICS } from '../actions';

const initialState = {};


export const getSelectedMetrics = (state: any) => {
  const metrics = state.metrics || {};
  return Object.keys(metrics).filter((metric: any) => metrics[metric].selected);
};

export const metricsReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case RECEIVED_CHART_METRICS:
      return Object.assign({}, state, {
        chartMetrics: action.payload,
      });
    case RECEIVED_METRICS_TAGS:
      const hasMetrics = Object.keys(state.metrics || {}).length;
      const metrics = hasMetrics ? state.metrics : action.payload.reduce((o: any, k: any) => ({...o, [k]: {}}), {});
      console.log('MET', metrics);

      const newstate =  Object.assign({}, state, {
        chartTags: action.payload,
        metrics,
      });
      console.log('NS,', newstate);

      return newstate;
    default:
      return state
  }
}
