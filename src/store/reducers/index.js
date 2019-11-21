import { reducer as MetricsReducer } from './MetricsReducer';
import { reducer as ChartReducer } from './ChartReducer';
import { ColorsReducer } from './ColorsReducer';
import { LatestMetricsValuesReducer } from './LatestMetricValuesReducer';

export default {
  metrics: MetricsReducer,
  chartData: ChartReducer,
  colors: ColorsReducer,
  latestMetricsValues: LatestMetricsValuesReducer,
};
