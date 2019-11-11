import { RECEIVED_METRICS_TAGS, TOGGLE_SELECTED_METRIC } from '../actions';

const initialState = {};

export const metricsReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case RECEIVED_METRICS_TAGS:
        const hasMetrics = Object.keys(state.metrics || {}).length;
        const tags = hasMetrics ? state.metrics : action.payload.reduce((o: any, k: any) => ({...o, [k]: {active: true}}), {});
        console.log('MET', tags);

        const newstate =  Object.assign({}, state, { ...tags });

        return newstate;
        case TOGGLE_SELECTED_METRIC:
        const toggledTagState = Object.assign({}, state);
        toggledTagState[action.payload].active = !toggledTagState[action.payload].active;

      return toggledTagState;
      default:
        return state;
  }
}
