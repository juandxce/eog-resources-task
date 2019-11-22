import { spawn } from 'redux-saga/effects';
import metricsSaga from './reducers/metricsSagas';

export default function* root() {
  yield spawn(metricsSaga);
}
