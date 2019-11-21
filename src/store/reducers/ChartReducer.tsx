import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState: any = { data: [] };

const slice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    RECEIVED_CHART_METRICS: (state, action: PayloadAction<any>) => {
      console.log('RECEIVED_CHART_METRICS');

      state.data = action.payload;
    },
    REPLACE_LAST_CHART_VALUE: (state, action: PayloadAction<any>) => {
      const { at, metric, value } = action.payload;
      const measurementsArr = state.data;
      const newValue = Object.assign({}, measurementsArr[measurementsArr.length - 1], {
        at,
        [metric]: value,
      });
      measurementsArr.push(newValue);
      measurementsArr.shift();
    },
    UPDATED_METRIC_VALUE: (state, action: PayloadAction<any>) => {
      const { metric, value } = action.payload;
      state.data[state.data.length - 1][metric] = value;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
