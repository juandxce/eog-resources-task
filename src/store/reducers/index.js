import { reducer as weatherReducer } from '../../Features/Weather/reducer';
import { metricsReducer } from './MetricsReducer';
import { chartReducer } from './ChartReducer';
import { colorsReducer } from './ColorsReducer';
import { latestMetricsValuesReducer } from './LatestMetricValuesReducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  chartData: chartReducer,
  colors: colorsReducer,
  latestMetricsValues: latestMetricsValuesReducer,
};
