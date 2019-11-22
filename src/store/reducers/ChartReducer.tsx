import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ChartDataArrayType = Array<{ [key: string]: number }>;
export type ChartReducerState = {
  data: ChartDataArrayType;
};
export type NewMeasurementValue = { at?: number; metric: string; value: number };

const initialState: ChartReducerState = { data: [] };

const slice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    RECEIVED_CHART_METRICS: (state, action: PayloadAction<ChartDataArrayType>) => {
      state.data = action.payload;
    },
    REPLACE_LAST_CHART_VALUE: (state, action: PayloadAction<NewMeasurementValue>) => {
      const { at, metric, value } = action.payload;
      const measurementsArr = state.data;
      const newValue = Object.assign({}, measurementsArr[measurementsArr.length - 1], {
        at,
        [metric]: value,
      });
      measurementsArr.push(newValue);
      measurementsArr.shift();
    },
    UPDATED_METRIC_VALUE: (state, action: PayloadAction<NewMeasurementValue>) => {
      const { metric, value } = action.payload;
      state.data[state.data.length - 1][metric] = value;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
