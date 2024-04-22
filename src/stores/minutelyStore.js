import { getAssetsFile } from "../utils/handleImgFile.js";
import { defineStore } from "pinia";

export const useMinutelyRainChartStore = defineStore('useMinutelyRainChartStore', {
    state: () => {
        return {
            options: {},
        }
    },
    actions: {
        getMinutelyData(datas) {
            const timeRegex = /T(\d{1,2}:\d{2})/;
            const hourXAxis = [];
            const topXAxis = [];
            const hourData = [];

            datas.forEach(item => {
                try {
                    const time = timeRegex.exec(item.fxTime)[1];

                    hourXAxis.push(time);
                    hourData.push(item.precip);
                    topXAxis.push(item.type);

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
                                const title = value === 'rain' ? '降雨' : '降雪';

                                return `${title}\n\n{icon_${value}|}`
                            },
                            rich: {
                                icon_rain: {
                                    backgroundColor: {
                                        image: getAssetsFile(`icons/306.svg`),
                                    },
                                    height: 16,
                                },
                                icon_snow: {
                                    backgroundColor: {
                                        image: getAssetsFile(`icons/401.svg`),
                                    },
                                    height: 16,
                                }
                            },
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