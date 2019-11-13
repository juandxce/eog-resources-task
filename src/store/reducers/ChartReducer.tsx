import { RECEIVED_CHART_METRICS } from '../actions';

const initialState: any = [];

export const chartReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case RECEIVED_CHART_METRICS:
      return  action.payload;
    default:
      return state
  }
}
