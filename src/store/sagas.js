import { spawn } from 'redux-saga/effects';

export default function* root() {
  yield spawn(weatherSaga);
}
