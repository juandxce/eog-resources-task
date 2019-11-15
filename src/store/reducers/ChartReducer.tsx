import { RECEIVED_CHART_METRICS, UPDATED_METRIC_VALUE, REPLACE_LAST_CHART_VALUE } from '../actions';

const initialState: any = [];

export const ChartReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case RECEIVED_CHART_METRICS:
      return action.payload;

    case REPLACE_LAST_CHART_VALUE:
      const updatedValueState = [...state];
      const newValue = Object.assign({}, state[state.length - 1], {
        at: action.payload.at,
        [action.payload.metric]: action.payload.value,
      });
      updatedValueState.push(newValue);
      updatedValueState.shift();

      return updatedValueState;

    case UPDATED_METRIC_VALUE:
      const valueStateToReplaceInto = [...state];
      valueStateToReplaceInto[valueStateToReplaceInto.length - 1][action.payload.metric] = action.payload.value;

      return valueStateToReplaceInto;

    default:
      return state;
  }
};
