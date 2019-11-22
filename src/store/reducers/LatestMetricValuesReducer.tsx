import { createSlice, PayloadAction } from 'redux-starter-kit';
import { KeyValuePairs } from './MetricsReducer';

const initialState: KeyValuePairs = {};

export type Metric = {
  metric: string;
  value: number;
};
export type NewLatestValueAction = Metric;

const slice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    SET_NEW_LATEST_VALUE: (state, action: PayloadAction<Metric>) => {
      const metric = action.payload.metric;
      state[metric] = action.payload.value;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
