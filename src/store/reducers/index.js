import { reducer as MetricsReducer } from './MetricsReducer';
import { reducer as ChartReducer } from './ChartReducer';
import { reducer as LatestMetricsValuesReducer } from './LatestMetricValuesReducer';
import { ColorsReducer } from './ColorsReducer';

export default {
  metrics: MetricsReducer,
  chartData: ChartReducer,
  colors: ColorsReducer,
  latestMetricsValues: LatestMetricsValuesReducer,
};
