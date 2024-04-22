import rich_options from "@/utils/richPicOpt";
import { defineStore } from "pinia";

export const useAQIChartStore = defineStore('useAQIChartStore', {
    state: () => {
        return {
            options: {},
        }
    },
    actions: {
        getAQIData(data) {

            return {
                series: [
                    {
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        center: ['50%', '80%'],
                        radius: '85%',
                        min: 0,
                        max: 1,
                        splitNumber: 6,
                        axisLine: {
                            lineStyle: {
                                width: 12,
                                color: [
                                    [0.15, '#7CFFB2'],
                                    [0.30, '#FDDD60'],
                                    [0.45, '#FFAD21'],
                                    [0.60, '#FF6E76'],
                                    [0.90, '#F21583'],
                                    [1, '#AA1F46'],
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '12%',
                            width: 20,
                            offsetCenter: [0, '-40%'],
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {
                            length: 12,
                            lineStyle: {
                                color: 'auto',
                                width: 2
                            }
                        },
                        splitLine: {
                            length: 20,
                            lineStyle: {
                                color: 'auto',
                                width: 5
                            }
                        },
                        axisLabel: {
                            color: '#ffffff',
                            fontSize: 12,
                            distance: -60,
                            rotate: 'tangential',
                            formatter: function (value) {

                                if (value === 0) {
                                    return '优';
                                } else if (value === 0.1666666667) {
                                    return '良';
                                } else if (value === 0.3333333333) {
                                    return '轻度污染';
                                } else if (value === 0.5) {
                                    return '中度污染';
                                } else if (value === 0.6666666667) {
                                    return '重度污染';
                                } else if (value === 1) {
                                    return '严重污染';
                                }

                                return '';
                            }
                        },
                        title: {
                            fontSize: 0
                        },
                        detail: {
                            fontSize: 0,
                        },
                        data: [
                            {
                                value: data / 660.6666666666,
                                name: '空气质量'
                            }
                        ],
                    }
                ]
            };
            // -------  -------
            // #region

            // const timeRegex = /T(\d{1,2}:\d{2})/;
            // const hourXAxis = [];
            // const topXAxis = [];
            // const hourData = [];

            // datas.forEach(item => {
            //     try {
            //         const time = timeRegex.exec(item.fxTime)[1];

            //         hourXAxis.push(time);
            //         hourData.push(item[flag]);

            //         topXAxis.push(item.text + "|" + item.icon);


            //     } catch (error) { console.log(error); }
            // })

            // return {
            //     tooltip: {
            //         trigger: 'axis',
            //     },
            //     xAxis: [
            //         {
            //             type: 'category',
            //             data: hourXAxis,
            //             axisPointer: {
            //                 type: 'shadow'
            //             },
            //         },
            //         {
            //             type: 'category',
            //             data: topXAxis,
            //             axisPointer: {
            //                 type: 'shadow'
            //             },
            //             axisLabel: {
            //                 formatter: function (value) {
            //                     const arr = value.split('|');
            //                     const weather = arr[0];
            //                     const icon = arr[1];

            //                     return `${weather}\n\n{icon_${icon}|}`
            //                 },
            //                 rich: rich_options
            //             },
            //         },
            //     ],
            //     yAxis: {

            //     },

            //     series: [
            //         {
            //             data: hourData,
            //             type: 'line',
            //             smooth: true,
            //             areaStyle: {
            //                 type: 'shadow',
            //                 opacity: 0.5
            //             },
            //         },
            //     ],
            //     grid: {
            //         x: 40,
            //         x2: 20,
            //         y: 65,
            //         y2: 45,
            //     },
            //     dataZoom: [{
            //         type: 'inside',
            //         xAxisIndex: [0, 1],
            //         moveOnMouseMove: true,
            //         preventDefaultMouseMove: true,
            //         startValue: 0,
            //         endValue: 12,
            //     },],
            // };

            // #endregion
            // ------- end -------
        }
    }
})