import { RECEIVED_CHART_METRICS, UPDATED_METRIC_VALUE, REPLACE_LAST_CHART_VALUE } from '../actions';
import {statement} from '@babel/template';

const initialState: any = [];

export const chartReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case RECEIVED_CHART_METRICS:
      return  action.payload;

    case REPLACE_LAST_CHART_VALUE:
      const updatedValueState = [...state];
        updatedValueState.push({ at: action.payload.at, [action.payload.metric]: action.payload.value });
        updatedValueState.shift();

        return updatedValueState;

      case UPDATED_METRIC_VALUE:
        const valueStateToReplaceInto = [...state];
        valueStateToReplaceInto[valueStateToReplaceInto.length-1][action.payload.metric] = action.payload.value;

        return valueStateToReplaceInto;

    default:
      return state
  }
}
