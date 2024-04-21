<style lang="scss" scoped>
@import "@/assets/style/index.scss";

.main-home-wrap {
  .first-screen-wrap {
    position: relative;
    height: 100vh;

    background-size: cover;
    background-position: 50% 50%;
    background-attachment: fixed;

    .simple-weather-information,
    .detailed-weather-information {
      position: absolute;
      bottom: 1rem;
      padding: 1rem;
    }

    /* ------- 左边 的 简略信息 ------- */
    /* #region  */
    .simple-weather-information {
      left: 1rem;
      color: $dark-text-color;
      text-shadow: 0 3px 4px rgba(0, 0, 0, 0.5);
      .temper-wrap {
        font-size: 2rem;
        margin-left: 0.5rem;

        .temper-text {
          font-size: 3.5rem;
        }
      }

      .location-wrap {
        display: flex;
        align-items: center;

        font-size: 2rem;

        .img-wrap {
          width: 4rem;
          height: 4rem;
          object-fit: cover;

          span {
            margin-left: 1rem;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .status {
        i {
          &::before {
            font-size: 4rem;
          }
        }

        span {
          margin-left: 1rem;
          font-size: 2rem;
        }
      }
    }
    /* #endregion */
    /* ------- end  ------- */

    /* ------- 右边 的 详细信息 ------- */
    /* #region  */
    .detailed-weather-information {
      right: 1rem;

      width: 15rem;

      font-size: 1.25rem;
      color: rgb(235, 235, 235);
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      font-size: 0.95rem;

      // 让 td 占据相同位置
      & > tr {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        & > td {
          flex: 1 0 calc(50% - 1rem);
          max-width: calc(50% - 1rem);
        }

        & > td:nth-child(1) {
          flex: 1 0 2rem;
          max-width: 2rem;
        }
      }

      // 去除 th 的 margin
      .table-th {
        margin: 0;
      }

      // 时间同行
      .date-wrap {
        td:nth-child(1) {
          flex: 1 0 calc(100% - 2rem);
          max-width: calc(100% - 2rem);
        }
      }

      // 预警信息同行
      .warning-status {
        margin-bottom: 0;

        td:nth-child(2) {
          flex: 1 0 calc(100% - 2rem);
          max-width: calc(100% - 2rem);
        }
      }
    }
    /* #endregion */
    /* ------- end  ------- */
  }

  .weather-information-wrap {
    background-color: $dark-bg-color;
    color: $dark-text-color;
    height: 100%;
    width: calc(100%);
    padding: 0.5rem;
    box-sizing: border-box;

    .weather-category-card {
      box-sizing: border-box;
      background-color: $dark-card-color;
      border-radius: 8px;
      padding: 1rem;
      margin: 2rem 1rem;

      .title {
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      .type-options-wrap {
        display: flex;
        font-size: 0.55rem;
        margin-top: 1rem;

        .sg-type-option {
          padding: 0.5rem;
          border-radius: 999px;
          background-color: #676767;
          margin: 0 0.25rem;
          cursor: pointer;

          &.active {
            background-color: #3ea1ee;
          }
        }
      }
    }

    #hourly-forecast-wrap,
    #days-forecast-wrap {
      width: 100%;

      height: 25rem;
    }
  }
}
</style>

<template>
  <section class="main-home-wrap">
    <!-- 首屏 -->
    <section
      class="first-screen-wrap"
      ref="firstScreen"
    >
      <!------- 左边 的 简略信息 ------->
      <!-- #region  -->
      <section class="simple-weather-information">
        <section class="temper-wrap">
          <span class="temper-text">{{weatherData.obj.temp}}</span> ℃
        </section>
        <section class="location-wrap">
          <section class="img-wrap">
            <img src="@/assets/img/Nav/location.png" />
          </section>
          <span class="temper-text">{{getLocationStore.city}}</span>
        </section>
        <section class="status">
          <i :class="`qi-${weatherData.obj.icon}`"></i>
          <span>{{weatherData.obj.text}}</span>
        </section>
      </section>
      <!-- #endregion  -->
      <!------- end ------->

      <!------- 右边 的 详细信息 ------->
      <!-- #region  -->
      <table class="detailed-weather-information">

        <!-- 时间 -->
        <tr class="date-wrap">
          <td class="today-date">{{today}}</td>
        </tr>

        <!-- th 占位 -->
        <tr class="table-th">
          <th hidden></th>
          <th hidden></th>
          <th hidden></th>
        </tr>

        <!-- 风速 -->
        <tr class="wind-wrap">
          <td><i class="qi-2105"></i></td>
          <td>{{weatherData.obj.windDir}}</td>
          <td>{{weatherData.obj.windScale }} 级</td>
        </tr>

        <!-- 降水量 -->
        <tr class="precip-wrap">
          <td><i class="qi-2120"></i></td>
          <td>降水量</td>
          <td>{{weatherData.obj.precip  }} mm</td>
        </tr>

        <!-- 湿度 -->
        <tr class="humidity-wrap">
          <td><i class="qi-2120"></i></td>
          <td>空气湿度</td>
          <td>{{weatherData.obj.humidity }} %</td>
        </tr>

        <!-- 空气质量 -->
        <tr class="air-wrap">
          <td><i class="qi-2202"></i></td>
          <td>空气质量</td>
          <td>{{airData.obj.category}}</td>
        </tr>

        <!-- 预警 -->
        <tr class="warning-status">
          <td><i :class="`qi-${warningData.obj.type}`"></i></td>
          <td>{{warningData.obj.title}}</td>
        </tr>
      </table>
      <!-- #endregion  -->
      <!------- end ------->

    </section>

    <!-- 主体 -->
    <section class="weather-information-wrap">

      <!------- 每小时天气预报 ------->
      <!-- #region  -->
      <sg-weather-card
        title="24小时预报"
        :tab="hourlyObj.hourlyCardTab"
        @changeChart="hourlyObj.setData"
      >
        <template v-slot:chart>
          <div id="hourly-forecast-wrap"></div>
        </template>
      </sg-weather-card>
      <!-- #endregion  -->
      <!------- end ------->

      <!------- 未来N天天气预报 ------->
      <!-- #region  -->
      <sg-weather-card
        title="未来预报"
        :tab="daysForecastObj.tab"
        @changeChart="daysForecastObj.setData"
      >
        <template v-slot:chart>
          <div id="days-forecast-wrap"></div>
        </template>

        <!-- <template v-slot:link>
          7日天气获取
        </template> -->
      </sg-weather-card>
      <!-- #endregion  -->
      <!------- end ------->

    </section>

  </section>
</template>

<script>
import { inject, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts';

import SgWeatherCard from '@/components/SgWeatherCard.vue';

import date from '@/utils/date.js';

import { useLocationStore } from "@/stores/location.js";
import { useHourlyChartStore } from "@/stores/hourlyStore.js";
import { useDaysChartStore } from "@/stores/daysChartStore.js";
import { getAssetsFile } from '@/utils/handleImgFile';

export default {
  components: { SgWeatherCard },
  setup() {
    const $axios = inject('$axios');

    const today = date();
    const firstScreen = ref(null);
    const getLocationStore = useLocationStore();



    // ------- 预警信息获取 -------
    // #region
    let warningData = reactive({
      obj: {
        startTime: "2024-04-19T21:38+08:00", // 开始时间
        endTime: "2024-04-20T21:38+08:00", // 结束时间

        pubTime: "2024-04-19T21:38+08:00",  // 发布时间

        sender: "福建省水文水资源勘测中心", // 预警发布单位，可能为空

        severity: "Moderate", // 预警严重等级

        // 预警详细文字描述
        text: "福建省水文水资源勘测中心于2024年04月19日21时38分发布山洪灾害风险黄色预警 ：根据省气象台降雨数值预报，预计,04月19日21时至04月20日21时，以下区域可能出现山洪灾害风险：宁化县发生山洪灾害可能性较大（黄色预警）；明溪县、建宁县、光泽县、长汀县、武平县可能发生山洪灾害（蓝色预警）。其它地区也可能因局地短历时强降水引发山洪灾害，请各地注意做好实时监测、防汛预警和转移避险等防范工作。",
        // 预警信息标题
        title: "福建省水文水资源勘测中心发布山洪灾害风险黄色预警",

        type: "1214",  // 图片
        typeName: "山洪灾害事件", // 预警类型名称
      },
      init() {
        $axios.get('/v7/warning/now', {
          params: {
            location: getLocationStore.getLocation
          }
        }).then(res => {
          const { warning } = res.data;

          warningData.obj = warning;
        }).catch(e => console.log(e))
      }
    });

    // #endregion
    // ------- end -------

    // ------- 空气质量获取 -------
    // #region
    let airData = reactive({
      obj: {
        "aqi": "28", // 空气质量指数
        "level": "1", // 空气质量指数等级
        "category": "优", // 空气质量指数级别
        "primary": "NA", // 空气质量的主要污染物，空气质量为优时，返回值为NA
        "pm10": "28",  // PM10
        "pm2p5": "5",  // PM2.5
        "no2": "3",  // 二氧化氮
        "so2": "2",  // 二氧化硫
        "co": "0.2",  // 一氧化碳
        "o3": "76",  // 臭氧
      },
      init() {
        $axios.get('/v7/air/now', {
          params: {
            location: getLocationStore.getLocation
          }
        }).then(res => {
          airData.obj = res.data.now;
        }).catch(e => console.log(e))
      }
    });
    // #endregion
    // ------- end -------

    // ------- 实时天气获取 -------
    // #region
    let weatherData = reactive({
      obj: {
        "obsTime": "2020-06-30T21:40+08:00",
        "temp": "24",
        "feelsLike": "26",
        "icon": "101",
        "text": "多云",
        "wind360": "123",
        "windDir": "东南风",
        "windScale": "1",
        "windSpeed": "3",
        "humidity": "72",
        "precip": "0.0",
        "pressure": "1003",
        "vis": "16",
        "cloud": "10",
        "dew": "21"
      },
    })
    // #endregion
    // ------- end -------

    // ------- 24小时天气预测 -------
    // #region
    const hourlyChartStore = useHourlyChartStore();
    let hourlyChartInstance = null;
    const hourlyObj = reactive({
      // 当前显示的tab
      activeTab: 0,
      // tab的分类
      hourlyCardTab: [
        {
          text: '温度 °C',
          flag: 'temp',
        },
        {
          text: '降水 mm',
          flag: 'precip',
        },
        {
          text: '风速 km/h',
          flag: 'windSpeed',
        },
        {
          text: '气压 hPa',
          flag: 'pressure',
        },
      ],
      // 数据
      hourlyData: [
        {
          "fxTime": "2021-02-16T15:00+08:00",
          "temp": "2",
          "icon": "100",
          "text": "晴",
          "wind360": "335",
          "windDir": "西北风",
          "windScale": "3-4",
          "windSpeed": "20",
          "humidity": "11",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1025",
          "cloud": "0",
          "dew": "-25"
        },
        {
          "fxTime": "2021-02-16T16:00+08:00",
          "temp": "1",
          "icon": "100",
          "text": "晴",
          "wind360": "339",
          "windDir": "西北风",
          "windScale": "3-4",
          "windSpeed": "24",
          "humidity": "11",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1025",
          "cloud": "0",
          "dew": "-26"
        },
        {
          "fxTime": "2021-02-16T17:00+08:00",
          "temp": "0",
          "icon": "100",
          "text": "晴",
          "wind360": "341",
          "windDir": "西北风",
          "windScale": "4-5",
          "windSpeed": "25",
          "humidity": "11",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1026",
          "cloud": "0",
          "dew": "-26"
        },
        {
          "fxTime": "2021-02-16T18:00+08:00",
          "temp": "0",
          "icon": "150",
          "text": "晴",
          "wind360": "344",
          "windDir": "西北风",
          "windScale": "4-5",
          "windSpeed": "25",
          "humidity": "12",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1025",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-16T19:00+08:00",
          "temp": "-2",
          "icon": "150",
          "text": "晴",
          "wind360": "349",
          "windDir": "西北风",
          "windScale": "3-4",
          "windSpeed": "24",
          "humidity": "13",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1025",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-16T20:00+08:00",
          "temp": "-3",
          "icon": "150",
          "text": "晴",
          "wind360": "353",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "22",
          "humidity": "14",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1025",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-16T21:00+08:00",
          "temp": "-3",
          "icon": "150",
          "text": "晴",
          "wind360": "355",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "20",
          "humidity": "14",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1026",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-16T22:00+08:00",
          "temp": "-4",
          "icon": "150",
          "text": "晴",
          "wind360": "356",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "18",
          "humidity": "16",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1026",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-16T23:00+08:00",
          "temp": "-4",
          "icon": "150",
          "text": "晴",
          "wind360": "356",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "18",
          "humidity": "16",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1026",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-17T00:00+08:00",
          "temp": "-4",
          "icon": "150",
          "text": "晴",
          "wind360": "354",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "16",
          "humidity": "16",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1027",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-17T01:00+08:00",
          "temp": "-4",
          "icon": "150",
          "text": "晴",
          "wind360": "351",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "16",
          "humidity": "16",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1028",
          "cloud": "0",
          "dew": "-27"
        },
        {
          "fxTime": "2021-02-17T02:00+08:00",
          "temp": "-4",
          "icon": "150",
          "text": "晴",
          "wind360": "350",
          "windDir": "北风",
          "windScale": "3-4",
          "windSpeed": "16",
          "humidity": "16",
          "pop": "0",
          "precip": "0.0",
          "pressure": "1028",
          "cloud": "0",
          "dew": "-27"
        },
      ],
      // 随着tab变更data
      setData(flag = 'temp', index = 0) {
        hourlyObj.activeTab = index;

        if (hourlyChartInstance !== null) {
          hourlyChartInstance.dispose();
        }

        hourlyChartInstance = echarts.init(document.querySelector('#hourly-forecast-wrap'));

        window.addEventListener('resize', function () {
          hourlyChartInstance.resize();
        });

        const result = hourlyChartStore.getHourlyData(hourlyObj.hourlyData, flag);
        hourlyChartInstance.setOption(result);
      },
      // 从api获取data
      init() {
        $axios.get('/v7/weather/24h', {
          params: {
            location: getLocationStore.getLocation
          }
        }).then(res => {
          hourlyObj.hourlyData = res.data.hourly;
          weatherData.obj = res.data.hourly[0];

          hourlyObj.setData('temp', 0);
        }).catch(e => console.log(e))
      }
    });
    // #endregion
    // ------- end -------

    // ------- 未来n天天气预测 -------
    // #region
    const daysChartStore = useDaysChartStore();
    let dayChartInstance = null;
    const daysForecastObj = reactive({
      // 当前显示的tab
      activeTab: 0,
      // tab的分类
      tab: [
        {
          text: '温度 °C',
          flag: 'temp',
        },
        {
          text: '风速 级',
          flag: 'windSpeed',
        },
        {
          text: '气压 hPa',
          flag: 'pressure',
        },
      ],
      // 数据
      data: [
        {
          "fxDate": "2024-04-21",
          "sunrise": "05:44",
          "sunset": "18:44",
          "moonrise": "16:24",
          "moonset": "04:13",
          "moonPhase": "盈凸月",
          "moonPhaseIcon": "803",
          "tempMax": "23",
          "tempMin": "19",
          "iconDay": "307",
          "textDay": "大雨",
          "iconNight": "305",
          "textNight": "小雨",
          "wind360Day": "0",
          "windDirDay": "北风",
          "windScaleDay": "1-3",
          "windSpeedDay": "3",
          "wind360Night": "0",
          "windDirNight": "北风",
          "windScaleNight": "1-3",
          "windSpeedNight": "3",
          "humidity": "96",
          "precip": "31.1",
          "pressure": "953",
          "vis": "24",
          "cloud": "77",
          "uvIndex": "3"
        },
        {
          "fxDate": "2024-04-22",
          "sunrise": "05:43",
          "sunset": "18:45",
          "moonrise": "17:15",
          "moonset": "04:41",
          "moonPhase": "盈凸月",
          "moonPhaseIcon": "803",
          "tempMax": "25",
          "tempMin": "20",
          "iconDay": "306",
          "textDay": "中雨",
          "iconNight": "307",
          "textNight": "大雨",
          "wind360Day": "0",
          "windDirDay": "北风",
          "windScaleDay": "1-3",
          "windSpeedDay": "3",
          "wind360Night": "0",
          "windDirNight": "北风",
          "windScaleNight": "1-3",
          "windSpeedNight": "3",
          "humidity": "99",
          "precip": "22.4",
          "pressure": "953",
          "vis": "12",
          "cloud": "97",
          "uvIndex": "4"
        },
        {
          "fxDate": "2024-04-23",
          "sunrise": "05:42",
          "sunset": "18:45",
          "moonrise": "18:06",
          "moonset": "05:08",
          "moonPhase": "盈凸月",
          "moonPhaseIcon": "803",
          "tempMax": "25",
          "tempMin": "17",
          "iconDay": "101",
          "textDay": "多云",
          "iconNight": "150",
          "textNight": "晴",
          "wind360Day": "0",
          "windDirDay": "北风",
          "windScaleDay": "1-3",
          "windSpeedDay": "3",
          "wind360Night": "0",
          "windDirNight": "北风",
          "windScaleNight": "1-3",
          "windSpeedNight": "3",
          "humidity": "97",
          "precip": "0.0",
          "pressure": "954",
          "vis": "24",
          "cloud": "25",
          "uvIndex": "9"
        },
      ],
      // 随着tab变更data
      setData(flag = 'temp', index = 0) {
        daysForecastObj.activeTab = index;

        if (dayChartInstance !== null) {
          dayChartInstance.dispose();
        }

        dayChartInstance = echarts.init(document.querySelector('#days-forecast-wrap'));

        window.addEventListener('resize', function () {
          dayChartInstance.resize();
        });

        const result = daysChartStore.getDaysData(daysForecastObj.data, flag);
        dayChartInstance.setOption(result);
      },
      // 从api获取data
      init() {
        $axios.get('/v7/weather/7d', {
          params: {
            location: getLocationStore.getLocation
          }
        }).then(res => {
          daysForecastObj.data = res.data.daily;

          daysForecastObj.setData('temp', 0);
        }).catch(e => console.log(e))
      }
    })
    // #endregion
    // ------- end -------


    // ==============================================
    // ==============================================
    // ==============================================


    onMounted(async () => {
      // 首屏的背景图片
      const firstScreen = document.querySelector('.first-screen-wrap');

      firstScreen.style.backgroundImage = 'url(' + getAssetsFile('FirstScreen/' + weatherData.obj.icon + '.jpg');

      // 24小时天气预报
      hourlyObj.init();
      daysForecastObj.init();
      airData.init();
      warningData.init();
    })


    // ==============================================
    // ==============================================
    // ==============================================

    return {
      today,
      firstScreen,
      getLocationStore,

      hourlyObj,
      daysForecastObj,

      weatherData,
      warningData,
      airData,
    }
  }
}
</script>

