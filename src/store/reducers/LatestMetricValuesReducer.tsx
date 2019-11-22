import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState: any = {};

const slice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    SET_NEW_LATEST_VALUE: (state, action: PayloadAction<any>) => {
      console.log('SETNEWLATESTVALUE', action.payload);
      const metric: string = Object.keys(action.payload)[0]
      state[metric] = action.payload[metric];
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
