import { createSlice, PayloadAction } from 'redux-starter-kit';

export const getActiveMetrics = (state: any) => {
  const metrics = state.metrics;
  return Object.keys(metrics).filter(metric => metrics[metric].active);
};

export type ApiErrorAction = {
  error: string;
};

const initialState: any = {};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    // only updates the metric units
    RECEIVED_METRICS_LAST_MEASUREMENTS: (state, action: PayloadAction<any>) => {
      console.log('RECEIVED_METRICS_LAST_MEASUREMENTS', action);
      action.payload.forEach((lastMeasurement: any) => {
        if (state[lastMeasurement.metric].unit !== lastMeasurement.unit) {
          state[lastMeasurement.metric].unit = lastMeasurement.unit;
        }
      });
    },
    TOGGLE_SELECTED_METRIC: (state, action: PayloadAction<any>) => {
      state[action.payload].active = !state[action.payload].active;
    },
    RECEIVED_METRICS_TAGS: (state, action: PayloadAction<any>) => {
      const hasMetrics = Object.keys(state.metrics || {}).length;
      console.log('hasMetrics', state.metrics);
      console.log('hasMetrics2', hasMetrics);
      console.log('action.payload', action.payload);
      if (!hasMetrics) {
        action.payload.forEach((metric: any, index: any) => {
          state[metric] = { active: true };
        });
      }
    },
    weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
