import { weekFormat } from "@/utils/date";
import rich_options from "@/utils/richPicOpt";

import { defineStore } from "pinia";

export const useDaysChartStore = defineStore('useDaysChartStore', {
    state: () => {
        return {
            options: {},
        }
    },
    actions: {
        getDaysData(datas, flag) {
            const xAxis = [];
            const topXAxis = [];

            const highest = [];
            const lowest = [];

            const windDay = [];
            const windNight = [];

            const pressure = [];

            datas.forEach(item => {
                const date = new Date(item.fxDate);
                xAxis.push(date.getDate() + '日|' + weekFormat[date.getDay()]);

                topXAxis.push(item.textDay + "|" + item.iconDay);

                highest.push(item.tempMax);
                lowest.push(item.tempMin);

                windDay.push(item.windSpeedDay)
                windNight.push(item.windSpeedNight)

                pressure.push(item.pressure);
            });

            const flagOption = {
                temp: {
                    series: [
                        {
                            name: 'Highest',
                            type: 'line',
                            data: highest,
                            smooth: true,
                        },
                        {
                            name: 'Lowest',
                            type: 'line',
                            data: lowest,
                            smooth: true,
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} °C'
                        }
                    },
                },
                windSpeed: {
                    series: [
                        {
                            name: 'windDay',
                            type: 'line',
                            data: windDay,
                            smooth: true,
                        },
                        {
                            name: 'windNight',
                            type: 'line',
                            data: windNight,
                            smooth: true,
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} 级'
                        }
                    },
                },
                pressure: {
                    series: [
                        {
                            name: 'pressure',
                            type: 'line',
                            data: pressure,
                            smooth: true,
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value} hPa'
                        }
                    },
                },

            };

            const chartOptions = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLabel: {
                            formatter: function (value) {
                                const arr = value.split('|');
                                const date = arr[0];
                                const day = arr[1]

                                return `${day}\n\n${date}`;
                            }
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

                grid: {
                    x: 65,
                    x2: 20,
                    y: 65,
                    y2: 65,
                },
                dataZoom: [{
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    startValue: 0,
                    endValue: 2,
                }],
            };

            for (const key in flagOption[flag]) {
                chartOptions[key] = flagOption[flag][key];
            }


            return chartOptions;
        }
    }
})