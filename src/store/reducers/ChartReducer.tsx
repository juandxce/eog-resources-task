import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ChartDataArrayType = Array<{ [key: string]: number }>;

export type NewMeasurementValue = { at?: number; metric: string; value: number };

const initialState: ChartDataArrayType = [];

const slice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    RECEIVED_CHART_METRICS: (state, action: PayloadAction<ChartDataArrayType>) => {
      return action.payload;
    },
    REPLACE_LAST_CHART_VALUE: (state, action: PayloadAction<NewMeasurementValue>) => {
      const { at, metric, value } = action.payload;
      const newValue = Object.assign({}, state[state.length - 1], {
        at,
        [metric]: value,
      });
      state.push(newValue);
      state.shift();
    },
    UPDATED_METRIC_VALUE: (state, action: PayloadAction<NewMeasurementValue>) => {
      const { metric, value } = action.payload;
      state[state.length - 1][metric] = value;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
