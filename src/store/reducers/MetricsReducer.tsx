import { RECEIVED_METRICS_TAGS, TOGGLE_SELECTED_METRIC, RECEIVED_METRICS_LAST_MEASUREMENTS } from '../actions';

const initialState = {};

export const MetricsReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case RECEIVED_METRICS_TAGS:
        const hasMetrics = Object.keys(state.metrics || {}).length;
        const tags = hasMetrics ? state.metrics : action.payload.reduce((o: any, k: any) => ({...o, [k]: {active: true}}), {});
        const newstate =  Object.assign({}, state, { ...tags });

        return newstate;
        case TOGGLE_SELECTED_METRIC:
        const toggledTagState = Object.assign({}, state);
        toggledTagState[action.payload].active = !toggledTagState[action.payload].active;

      return toggledTagState;

      // only updates the metric units
        case RECEIVED_METRICS_LAST_MEASUREMENTS:
        const changedMetricUnitState = Object.assign({}, state);
          action.payload.map((lastMeasurement: any) => {
            if(changedMetricUnitState[lastMeasurement.metric].unit !== lastMeasurement.unit) {
              changedMetricUnitState[lastMeasurement.metric].unit = lastMeasurement.unit;
            }
            return lastMeasurement;
          })
          return changedMetricUnitState;

      default:
        return state;
  }
}
