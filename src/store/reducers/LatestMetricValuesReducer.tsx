import { createSlice, PayloadAction } from 'redux-starter-kit';

const initialState = {};

const slice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    SET_NEW_LATEST_VALUE: (state, action: PayloadAction<any>) => {
      console.log('SETNEWLATESTVALUE', action.payload);
      // state = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
