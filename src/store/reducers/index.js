import { reducer as weatherReducer } from '../../Features/Weather/reducer';
import { MetricsReducer } from './MetricsReducer';
import { ChartReducer } from './ChartReducer';
import { ColorsReducer } from './ColorsReducer';
import { LatestMetricsValuesReducer } from './LatestMetricValuesReducer';

export default {
  weather: weatherReducer,
  metrics: MetricsReducer,
  chartData: ChartReducer,
  colors: ColorsReducer,
  latestMetricsValues: LatestMetricsValuesReducer,
};
