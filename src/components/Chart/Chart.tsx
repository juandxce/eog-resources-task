import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import ChartTooltip from './Tooltip';
import { newMeasurementSubscription } from '../../store/api/subscriptions';
import { UPDATED_METRIC_VALUE } from '../../store/actions';
import { REPLACE_LAST_CHART_VALUE, SET_NEW_LATEST_VALUE } from '../../store/actions';
import { Subscription } from 'react-apollo';

class Chart extends React.Component <any, any> {

shouldComponentUpdate(nextprops: any, nextState: any) {
  const hasChartData = !!this.props.chartData[this.props.chartData.length-1];
  const receivedNewChartData = this.props.chartData.length != nextprops.chartData.length;
  const shouldComponentUpdate = receivedNewChartData || hasChartData && (this.props.chartData[this.props.chartData.length-1].at !== nextprops.chartData[nextprops.chartData.length-1].at);
  return shouldComponentUpdate;
}

formatDateToTime = (time: any) => {
  return new Date(time).toLocaleTimeString();
}

render() {
  const data = this.props.chartData;
  return (
    <div className={'classes.card'}>
      <LineChart width={800} height={800} data={data}>
        <YAxis label={{ angle: -90, value: 'values' }} />
        <XAxis tickFormatter={this.formatDateToTime} label={{ value: 'time' }} dataKey="at" interval="preserveStartEnd" minTickGap={20} />
        <Tooltip content={<ChartTooltip metrics={this.props.metrics} />} />
        <Legend />
        {this.props.metrics && Object.keys(this.props.metrics).map((metric: any, index: number) => (
        <Line type="monotone" dot={false} key={metric} dataKey={metric} stroke={this.props.colors[index] || 'orange'} />
        ))}
      </LineChart>

      {/* Handle the subscriptions incoming data */}
      <Subscription subscription={newMeasurementSubscription}>
      {({error, data: newInfo }: any) => {
        if(error || !newInfo) return null;
        if(newInfo.newMeasurement) {
          const measurementUpdate = newInfo.newMeasurement;
          const hasData = data.length;
          const lastDataItem = (!!hasData && data[data.length-1]) || {};
          const haveDifferentValues = measurementUpdate.value !== lastDataItem[measurementUpdate.metric];
          const haveSameTime = measurementUpdate.at === lastDataItem.at;
          const isActive = this.props.metrics[measurementUpdate.metric].active;

          if(!isActive || !hasData) return null;
          this.props.dispatch({ type: SET_NEW_LATEST_VALUE, payload: { [measurementUpdate.metric]: measurementUpdate.value }});
          if(haveSameTime && haveDifferentValues ) {
            // update last chart points value
            this.props.dispatch({ type: UPDATED_METRIC_VALUE, payload: measurementUpdate });
          } else if(measurementUpdate.at > lastDataItem.at) {
            // create a new chart points value obj at the end
            this.props.dispatch({ type: REPLACE_LAST_CHART_VALUE, payload: measurementUpdate });
          }
        }
        return(null);
      }}
      </Subscription>
    </div>
  );
}
};
export default Chart;