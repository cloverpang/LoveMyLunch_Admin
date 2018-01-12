<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  name: 'highcharts',
  data() {
    return {
      chart: null,
	  chartType : 'bar',
	  chartYAxisTilte : '数量',
	  chartSeriesTile : '时间',
	  chartLineColor : '#F33',
	  chartSeriesColor : '#F33',
	  chartTitle : '数量图',
	  chartAxisTitle : [],
	  chartData : []
	}
  },
  mounted() {

  },
  methods: {
    initChart() {
      //console.log(this.$el);

      //this.chart = new Highcharts.Chart(this.$el, this.options);
	  this.chart = new Highcharts.Chart(this.$el,
      {
	             title: {
                    text: this.chartTitle
                 },
			     chart: {
                    type: this.chartType
                 },
                 xAxis: {
                    categories: this.chartAxisTitle
                 },
                  yAxis: {
                    title: {
                        text: this.chartYAxisTilte
                    },
                    lineWidth: 2,
                    lineColor: this.chartLineColor,
                    id: 'temperature-axis'
                 },
                 series: [{
                    name: this.chartSeriesTile,
                    data: this.chartData,
                    color: this.chartSeriesColor
                 }]
      }
	  );
    }
  }
}
</script>

<style>

</style>
