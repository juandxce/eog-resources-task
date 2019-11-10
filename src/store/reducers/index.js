import { reducer as weatherReducer } from '../../Features/Weather/reducer';
import { metricsReducer } from './MetricsReducer';

export default {
  weather: weatherReducer,
  dashboard: metricsReducer,
};
