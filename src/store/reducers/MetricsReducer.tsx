import { createSlice, PayloadAction } from 'redux-starter-kit';
import { IState } from '../';

export const getActiveMetrics = (state: IState) => {
  const metrics = state.metrics;
  return Object.keys(metrics).filter((metric: string) => metrics[metric].active);
};

export type MetricTogglerAction = string;
export type MetricsTags = Array<string>;
export type LastMeasurement = {
  unit?: string;
  value?: number;
  metric: string;
};
export type MetricMeasurementUpdate = Array<LastMeasurement>;
export type ApiErrorAction = {
  error: string;
};
export interface KeyValuePairs {
  [key: string]: number;
}

export type Metric = {
  active: boolean;
  unit?: string;
};
export interface Metrics {
  [key: string]: Metric;
}

const initialState: Metrics = {};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    // only updates the metric units
    RECEIVED_METRICS_LAST_MEASUREMENTS: (state, action: PayloadAction<MetricMeasurementUpdate>) => {
      action.payload.forEach(lastMeasurement => {
        if (!state[lastMeasurement.metric]) return;
        if (state[lastMeasurement.metric].unit !== lastMeasurement.unit) {
          state[lastMeasurement.metric].unit = lastMeasurement.unit;
        }
      });
    },
    TOGGLE_SELECTED_METRIC: (state, action: PayloadAction<MetricTogglerAction>) => {
      state[action.payload].active = !state[action.payload].active;
    },
    RECEIVED_METRICS_TAGS: (state, action: PayloadAction<MetricsTags>) => {
      const hasMetrics = Object.keys(state.metrics || {}).length;
      if (!hasMetrics) {
        action.payload.forEach(metric => {
          state[metric] = { active: true };
        });
      }
    },
    apiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
