<template lang="html">
  <div class="trend-line">
    <div class="start"><p>12:00:00</p></div>
    <div class="highcharts-container" ref="highcharts"></div>
    <div class="end"><p>12:00:00</p></div>
  </div>
</template>

<script>
import Vue from 'vue'
import Trend from 'vuetrend'
import Highcharts from 'highcharts/highstock'
import { queryKChartData, queryGameInfo } from '@/service'
import findLastIndex from 'lodash.findlastindex'
import { toISOString } from '@/utils/toISOString'
// const date = new Date()
// const min = new Date(new Date().setUTCHours(3, 0, 0, 0))

export default {
  name: 'Chart',
  props: ['plotLines'],
  data() {
    return {
      chart: '',
      chartData: [],
      interval: '',
      chartOptions: {
        title: '',
        animation: true,
        chart: {
          marginLeft: 0, // Keep all charts left aligned
          marginRight: 0, // Keep all charts left aligned
          spacingTop: 0,
          spacingBottom: 0,
          height: '105',
        },
        credits: {
    			enabled: false
    		},
    		rangeSelector: {
    			enabled:false
    		},
    		navigator: {
    			enabled:false
    		},
    		scrollbar: {
    			enabled:false
    		},
    		legend: {
    			enabled: false
    		},
        tooltip: {
          enabled: false
        },
        xAxis: {
          crosshair: false,
          visible: false,
          label: {
            enabled: false
          }
        },
        yAxis: {
          crosshair: false,
          visible: true,
          gridLineWidth: 0,
          plotLines: []
        },
        plotOptions: {
          series: {
            duration: 2000,
            states: {
              hover: {
                enabled: false
              }
            }
          }
        },
        series: [{
          data: this.chartData,
          name: '',
          type: 'line',
          color: '#27378C',
          // lineWidth: 1,
        }]
      }
    }
  },
  components: {
    Trend
  },
  computed: {
    gameInfo() {
      return this.$store.state.gameInfo
    }
  },
  watch: {
    // chartData(curVal, oldVal) {
    //   if(curVal){
    //     this.chart.series[0].setData(curVal);
    //   }
    // },
    gameInfo:{
      immediate:true,
      deep: true,
      handler: function (newVal,oldVal){
        if(newVal){
          this.chartOptions.yAxis.plotLines.push({
            value: this.$options.filters.formatUSDAmount(newVal.opening_price),
            width: 1,
            color: 'green',
            dashStyle: 'dash',
          });
        }
      }
    }
  },
  created(){
    this.getBeforeChart()
    this.interval = setInterval(()=> {
      if(new Date().getUTCHours() === 4 && new Date().getMinutes() === 1){
        this.chartData = []
        this.createChart()
        this.chart.series[0].setData(this.chartData)
        this.getBeforeChart()
        this.$store.dispatch('fetchGameInfo')
      } else {
        this.fetchCoinBaseKchart(toISOString(new Date(new Date().setMinutes(new Date().getMinutes() - 1))), toISOString(new Date()), 0, true)
      }
    }, 60000)
    queryGameInfo().then(response => {
      this.chart.yAxis[0].addPlotLine({
        value: response.data.opening_price/100000000,
        color: '#9B9B9B',
        dashStyle: 'dash',
        width: 1,
      });
    })
  },
  destroyed() {
    clearInterval(this.interval)
  },
  mounted() {
    const refsChart = this.$refs.highcharts
    this.chart = new Highcharts.Chart(refsChart, this.chartOptions);
    this.createChart()
  },
  methods: {
    createChart() {
      let open = new Date(new Date().setUTCHours(4, 0, 0, 0)).getTime()
      let close = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setUTCHours(4,0,0,0)).getTime()
      let min = new Date(new Date().setUTCHours(3, 0, 0, 0)).getTime()
      let max = new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setUTCHours(5,0,0,0)).getTime()
      if(new Date() < new Date(new Date().setUTCHours(4, 0, 0, 0))){
        min = new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(3,0,0,0)).getTime()
        max = new Date(new Date().setUTCHours(5, 0, 0, 0)).getTime()
        open = new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(4,0,0,0)).getTime()
        close = new Date(new Date().setUTCHours(4, 0, 0, 0)).getTime()
      }
      this.chart.xAxis[0].setExtremes(min, max)
      this.chart.xAxis[0].addPlotLine({
        value: open,
        color: '#9B9B9B',
        width: 1,
      });
      this.chart.xAxis[0].addPlotLine({
        value: close,
        color: '#9B9B9B',
        width: 1,
      });
    },
    getBeforeChart() {
      let start = toISOString(new Date(new Date().setUTCHours(3, 0, 0, 0)))
      const now = toISOString(new Date())
      if(new Date() < new Date(new Date().setUTCHours(4, 0, 0, 0))){
        start = toISOString(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(3,0,0,0)))
      }
      const h = new Date().getUTCHours()
      if(4<=h && h <8){
        this.fetchCoinBaseKchart(start, now, 1, true)
      } else if(8<=h && h <13){
        const end1 = toISOString(new Date(new Date().setUTCHours(8, 0, 0, 0)))
        this.fetchCoinBaseKchart(start, end1, 1, false).then(() => {
          this.fetchCoinBaseKchart(end1, now, 2, true)
        })
      } else if(13<=h && h <18){
        const end1 = toISOString(new Date(new Date().setUTCHours(8, 0, 0, 0)))
        const end2 = toISOString(new Date(new Date().setUTCHours(13, 0, 0, 0)))
        this.fetchCoinBaseKchart(start, end1, 1, false).then(() => {
          this.fetchCoinBaseKchart(end1, end2, 2, false).then(() => {
            this.fetchCoinBaseKchart(end2, now, 3, true)
          })
        })
      } else if(18<=h && h <23){
        const end1 = toISOString(new Date(new Date().setUTCHours(8, 0, 0, 0)))
        const end2 = toISOString(new Date(new Date().setUTCHours(13, 0, 0, 0)))
        const end3 = toISOString(new Date(new Date().setUTCHours(18, 0, 0, 0)))
        this.fetchCoinBaseKchart(start, end1, 1, false).then(() => {
          this.fetchCoinBaseKchart(end1, end2, 2, false).then(() => {
            this.fetchCoinBaseKchart(end2, end3, 3, false).then(() => {
              this.fetchCoinBaseKchart(end3, now, 4, true)
            })
          })
        })
      } else if(23<=h && h < 24){
        const end1 = toISOString(new Date(new Date().setUTCHours(8, 0, 0, 0)))
        const end2 = toISOString(new Date(new Date().setUTCHours(13, 0, 0, 0)))
        const end3 = toISOString(new Date(new Date().setUTCHours(18, 0, 0, 0)))
        const end4 = toISOString(new Date(new Date().setUTCHours(23, 0, 0, 0)))
        this.fetchCoinBaseKchart(start, end1, 1, false).then(() => {
          this.fetchCoinBaseKchart(end1, end2, 2, false).then(() => {
            this.fetchCoinBaseKchart(end2, end3, 3, false).then(() => {
              this.fetchCoinBaseKchart(end3, end4, 4, false).then(() => {
                this.fetchCoinBaseKchart(end4, now, 5, true)
              })
            })
          })
        })
      } else if(24<=h || h<4){
        const end1 = toISOString(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(8, 0, 0, 0)))
        const end2 = toISOString(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(13, 0, 0, 0)))
        const end3 = toISOString(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(18, 0, 0, 0)))
        const end4 = toISOString(new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setUTCHours(23, 0, 0, 0)))
        this.fetchCoinBaseKchart(start, end1, 1, false).then(() => {
          this.fetchCoinBaseKchart(end1, end2, 2, false).then(() => {
            this.fetchCoinBaseKchart(end2, end3, 3, false).then(() => {
              this.fetchCoinBaseKchart(end3, end4, 4, false).then(() => {
                this.fetchCoinBaseKchart(end4, now, 5, true)
              })
            })
          })
        })
      }
    },
    async fetchCoinBaseKchart(start, end, step, redraw) {
      const response = await queryKChartData({start: start, end: end, granularity:60})
        // this.data = response
      if (response) {
        Highcharts.each(response, function(d) {
          d[0] = d[0]*1000
          d.splice(1, 2)
          d.splice(2, 2)
        });
        const arr = response.reverse()
        switch (step) {
          case 1:
            this.chartData = arr
            break
          case 2:
            arr.unshift(300, 0);
            Array.prototype.splice.apply(this.chartData, arr);
            break
          case 3:
            arr.unshift(600, 0);
            Array.prototype.splice.apply(this.chartData, arr);
            break
          case 4:
            arr.unshift(900, 0);
            Array.prototype.splice.apply(this.chartData, arr);
            break
          case 5:
            arr.unshift(1200, 0);
            Array.prototype.splice.apply(this.chartData, arr);
            break
          default:
            this.chartData = this.chartData.concat(arr)
           break;
        }
        if(redraw){
          this.chart.series[0].setData(this.chartData);
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.highcharts-container {
  height: 120px;
}
.trend-line{
  // height: 120px;
  position:relative;
  overflow: hidden;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 4px;
  margin-top: 5px;
  svg{
    position: relative;
    z-index: 10;
  }
}
.trend-line::after{
  // content: '';
  // height: 1px;
  // width: 100%;
  // background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
  // background-size: 8px 1px;
  // background-repeat: repeat-x;
  // position: absolute;
  // top: 50%;
  // left: 0;
}
.start,.end{
  height: 100%;
  display:table-cell;
  vertical-align:bottom;
  padding-top: 105px;
  line-height: 15px;
  font-size: 10px;
  position: absolute;
  top: 0;
  z-index: 1;
  // &:after{
  //   content: '';
  //   position: absolute;
  //   height: 130px;
  //   width: 1px;
  //   left: 50%;
  //   top:0;
  //   background: #9B9B9B;
  // }
}
.start{
  left: 0;
}
.end{
  right: 0;
}
</style>
