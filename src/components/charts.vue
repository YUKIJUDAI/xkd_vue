<template>
    <div class="charts">
        <div ref="myCharts" class="myCharts"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import echarts from 'echarts';
// import 'echarts/lib/chart/line';

@Component
export default class extends Vue {

    @Prop()
    readonly title!: string;

    @Prop()
    readonly data!: Array<string>;

    @Prop()
    readonly date!: Array<string>;

    @Prop()
    readonly value!: number;

    @Watch('value')
    draw() {
        !this.chart && (this.chart = echarts.init(this.$refs.myCharts as HTMLCanvasElement));
        this.chart.setOption(this.option);
    }

    chart: any = null;

    get option() {
        return {
            title: {
                text: this.title,
                textStyle: {
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: '16'
                }
            },
            dataZoom: [
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 50
                }
            ],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#999'
                    }
                },
                data: this.date
            },
            yAxis: {
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                type: 'value'
            },
            series: [{
                data: this.data,
                type: 'line',
                smooth: true
            }]
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./charts.less");
</style>