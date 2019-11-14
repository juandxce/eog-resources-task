import { SET_NEW_LATEST_VALUE } from '../actions';

const initialState = {};

export const latestMetricsValuesReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
      case SET_NEW_LATEST_VALUE:
        const changedMetricUnitState = Object.assign({}, state, action.payload);

        return changedMetricUnitState;

      default:
      return state;
  }
}
