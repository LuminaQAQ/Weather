import rich_options from "@/utils/richPicOpt";
import { defineStore } from "pinia";

export const useHourlyChartStore = defineStore('useHourlyChartStore', {
    state: () => {
        return {
            options: {},
        }
    },
    actions: {
        getHourlyData(datas, flag) {
            const timeRegex = /T(\d{1,2}:\d{2})/;
            const hourXAxis = [];
            const topXAxis = [];
            const hourData = [];

            datas.forEach(item => {
                try {
                    const time = timeRegex.exec(item.fxTime)[1];

                    hourXAxis.push(time);
                    hourData.push(item[flag]);

                    topXAxis.push(item.text + "|" + item.icon);


                } catch (error) { console.log(error); }
            })

            return {
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: hourXAxis,
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    {
                        type: 'category',
                        data: topXAxis,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            formatter: function (value) {
                                const arr = value.split('|');
                                const weather = arr[0];
                                const icon = arr[1];

                                return `${weather}\n\n{icon_${icon}|}`
                            },
                            rich: rich_options
                        },
                    },
                ],
                yAxis: {

                },

                series: [
                    {
                        data: hourData,
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            type: 'shadow',
                            opacity: 0.5
                        },
                    },
                ],
                grid: {
                    x: 40,
                    x2: 20,
                    y: 65,
                    y2: 45,
                },
                dataZoom: [{
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    moveOnMouseMove: true,
                    preventDefaultMouseMove: true,
                    startValue: 0,
                    endValue: 12,
                },],
            };
        }
    }
})