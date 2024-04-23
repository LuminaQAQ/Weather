<style lang="scss" scoped>
@import "@/assets/style/index.scss";

.main-home-wrap {
  // 首屏
  .first-screen-wrap {
    position: relative;
    height: 100vh;

    background-image: url("../assets/img/FirstScreen/100.jpg");
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
        display: flex;
        justify-content: space-between;
        align-items: center;

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
        margin-left: 1rem;
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

      .warning-text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
      }
    }
    /* #endregion */
    /* ------- end  ------- */
  }

  // 主体
  .weather-information-wrap {
    background-color: $dark-bg-color;
    color: $dark-text-color;
    height: 100%;
    width: calc(100%);
    padding: 0.5rem;
    box-sizing: border-box;

    display: flex;
    justify-content: center;

    .weather-information-left {
      width: 60%;
      flex: 1 0 60%;
      max-width: 43.2rem;
    }

    .weather-information-right {
      width: 40%;
      flex: 1 0 40%;
      max-width: 28.8rem;

      .weather-info-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &.row {
          display: block;
        }
      }
    }

    #hourly-forecast-wrap,
    #days-forecast-wrap,
    #minutely-rain-wrap {
      width: 100%;

      height: 25rem;
    }

    #AQI-wrap,
    #sunrise-sunset-wrap {
      width: 100%;
      height: 13rem;
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
          <span class="temper-text">{{weatherData.obj.temp}} ℃</span>
          <section class="status">
            <i :class="`qi-${weatherData.obj.icon}`"></i>
            <span>{{weatherData.obj.text}}</span>
          </section>
        </section>
        <section class="location-wrap">
          <section class="img-wrap">
            <img src="@/assets/img/Nav/location.png" />
          </section>
          <span class="temper-text">{{getLocationStore.city}}</span>
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
          <td><i :class="`qi-${warningData.obj[0].type || ''}`"></i></td>
          <td class="warning-text">{{warningData.obj[0].text || ''}}</td>
        </tr>
      </table>
      <!-- #endregion  -->
      <!------- end ------->

    </section>

    <!-- 主体 -->
    <section class="weather-information-wrap">

      <!------- 左侧 ------->
      <!-- #region  -->
      <div class="weather-information-left">

        <!------- 分钟级降水 ------->
        <!-- #region  -->
        <sg-weather-card title="降雨概率">
          <template v-slot:icon>
            <i class="qi-306"></i>
          </template>

          <template v-slot:desc>
            <p>{{minutelyRainData.obj.summary}}</p>
          </template>

          <template v-slot:chart>
            <div id="minutely-rain-wrap"></div>
          </template>
        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

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
        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

        <!------- 天气指数 ------->
        <!-- #region  -->
        <sg-weather-card title="天气指数">
          <template v-slot:information>
            <template v-if="weatherIndexData.data">
              <sg-weather-index-item
                v-for="(item, index) in weatherIndexData.data"
                :key="index"
                :value="item"
                :type="weatherIndexData.indexLevelType[item.type]"
              />
            </template>
            <template v-else>
              暂无数据
            </template>
          </template>
        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

      </div>
      <!-- #endregion  -->
      <!------- end ------->

      <!------- 右侧 ------->
      <!-- #region  -->
      <div class="weather-information-right">

        <!------- 当前天气 ------->
        <!-- #region  -->
        <sg-weather-card title="当前天气">

          <template v-slot:icon>
            <i class="qi-104"></i>
          </template>

          <template v-slot:information>
            <section class="weather-info-wrap">
              <sg-info-card
                v-for="(item, index) in weatherInfoBoard"
                :key="index"
                :item="item"
                :weatherData="weatherData.obj"
              />
            </section>
          </template>

        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

        <!------- 空气质量 ------->
        <!-- #region  -->
        <sg-weather-card title="空气质量">

          <template v-slot:icon>
            <i class="qi-2202"></i>
          </template>

          <template v-slot:chart>
            <div id="AQI-wrap"></div>
          </template>

          <template v-slot:information>
            <section class="weather-info-wrap">
              <sg-info-card
                v-for="(item, index) in airQualityBoard"
                :key="index"
                :item="item"
                :weatherData="airData.obj"
              />
            </section>
          </template>

        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

        <!------- 天气预警 ------->
        <!-- #region  -->
        <sg-weather-card title="天气预警">

          <template v-slot:icon>
            <i class="qi-2212"></i>
          </template>

          <template v-slot:information>
            <sg-warning-info-item
              class="warning-wrap"
              v-for="(item, index) in warningData.obj"
              :key="index"
              :value="item"
            />
          </template>

        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

        <!------- 日出日落 ------->
        <!-- #region  -->
        <sg-weather-card title="">

          <template v-slot:icon> {{}} </template>

          <template v-slot:information>
            <h5 style="text-align: center;">太阳</h5>
            <sunrise-sunset-item
              :data="sunriseSunsetData.data"
              :desc="sunriseSunsetData.desc.day"
            />
            <hr>

            <h5 style="text-align: center;">月亮</h5>
            <sunrise-sunset-item
              :data="sunriseSunsetData.data"
              :desc="sunriseSunsetData.desc.night"
            />
            <hr>
          </template>

        </sg-weather-card>
        <!-- #endregion  -->
        <!------- end ------->

      </div>
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
import { useAQIChartStore } from '@/stores/AQIStore.js';
import { useMinutelyRainChartStore } from '../stores/minutelyStore.js';

import { getAssetsFile } from '@/utils/handleImgFile';
import SgInfoCard from '@/components/SgInfoCard.vue';
import SgWarningInfoItem from '../components/SgWarningInfoItem.vue';
import SgWeatherIndexItem from '../components/SgWeatherIndexItem.vue';
import SunriseSunsetItem from '../components/SunriseSunset.vue';
import LoadingStatus from '../components/LoadingStatus.vue'

export default {
  components: { SgWeatherCard, SgInfoCard, SgWarningInfoItem, SgWeatherIndexItem, SunriseSunsetItem, LoadingStatus },
  setup() {

    const $axios = inject('$axios');

    const today = date();
    const firstScreen = ref(null);
    const getLocationStore = useLocationStore();

    const errorCodeRegex = /^[4][0-9]{2}$/;

    // ------- 空气质量获取 -------
    // #region
    const AQIChartStore = useAQIChartStore();
    let AQIChartInstance = null;

    const airQualityBoard = [
      {
        icon: 'qi-2202',
        desc: 'aqi',
        title: 'AQI',
        unit: '',
      },
      {
        icon: 'qi-2202',
        desc: 'category',
        title: '空气质量',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'primary',
        title: '主要污染物',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'pm10',
        title: 'PM10',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'pm2p5',
        title: 'PM2.5',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'so2',
        title: '二氧化硫',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'no2',
        title: '二氧化氮',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'co',
        title: '一氧化碳',
        unit: '',
      },
      {
        icon: 'qi-1273',
        desc: 'o3',
        title: '臭氧',
        unit: '',
      },
    ];
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

      // 随着tab变更data
      setData() {
        if (AQIChartInstance !== null) {
          AQIChartInstance.dispose();
        }

        AQIChartInstance = echarts.init(document.querySelector('#AQI-wrap'));

        window.addEventListener('resize', function () {
          AQIChartInstance.resize();
        });
        const result = AQIChartStore.getAQIData(airData.obj.aqi);
        AQIChartInstance.setOption(result);
      },

      // 从api获取data
      init() {
        $axios.get('/v7/air/now', {
          params: {
            location: getLocationStore.loc
          }
        }).then(res => {

          if (errorCodeRegex.test(res.data.code)) {
            airData.setData();

            return;
          }

          airData.obj = res.data.now;
          airData.setData();
        }).catch(e => console.log(e))
      },
    });

    // #endregion
    // ------- end -------

    // ------- 实时天气获取 -------
    // #region
    const weatherInfoBoard = [
      {
        icon: 'qi-2205',
        desc: 'temp',
        title: '温度',
        unit: '°C',
      },
      {
        icon: 'qi-900',
        desc: 'feelsLike',
        title: '体感温度',
        unit: '°C',
      },
      {
        icon: 'qi-306',
        desc: 'precip',
        title: '降水',
        unit: 'mm/h',
      },
      {
        icon: 'qi-104',
        desc: 'cloud',
        title: '云量',
        unit: '%',
      },
      {
        icon: 'qi-2105',
        desc: 'windSpeed',
        title: '风速',
        unit: 'km/h',
      },
      {
        icon: 'qi-1001',
        desc: 'pressure',
        title: '气压',
        unit: 'hPa',
      },
      {
        icon: 'qi-399',
        desc: 'humidity',
        title: '湿度',
        unit: '%',
      },
      {
        icon: 'qi-399',
        desc: 'dew',
        title: '露点',
        unit: '%',
      },
      {
        icon: 'qi-2111',
        desc: 'vis',
        title: '能见度',
        unit: 'km',
      },
    ];
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

    // ------- 分钟级降水获取 -------
    // #region
    const minutelyRainChartStore = useMinutelyRainChartStore();
    let minutelyRainChartInstance = null;

    let minutelyRainData = reactive({
      obj: {
        summary: '',
        data: [
          {
            "fxTime": "2021-12-16T18:55+08:00",
            "precip": "0.15",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:00+08:00",
            "precip": "0.23",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:05+08:00",
            "precip": "0.21",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:10+08:00",
            "precip": "0.17",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:15+08:00",
            "precip": "0.18",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:20+08:00",
            "precip": "0.24",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:25+08:00",
            "precip": "0.31",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:30+08:00",
            "precip": "0.37",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:35+08:00",
            "precip": "0.41",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:40+08:00",
            "precip": "0.43",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:45+08:00",
            "precip": "0.41",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:50+08:00",
            "precip": "0.36",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T19:55+08:00",
            "precip": "0.32",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:00+08:00",
            "precip": "0.27",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:05+08:00",
            "precip": "0.22",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:10+08:00",
            "precip": "0.17",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:15+08:00",
            "precip": "0.11",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:20+08:00",
            "precip": "0.06",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:25+08:00",
            "precip": "0.0",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:30+08:00",
            "precip": "0.0",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:35+08:00",
            "precip": "0.0",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:40+08:00",
            "precip": "0.0",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:45+08:00",
            "precip": "0.0",
            "type": "rain"
          },
          {
            "fxTime": "2021-12-16T20:50+08:00",
            "precip": "0.0",
            "type": "rain"
          }
        ],
      },

      // 随着tab变更data
      setData() {
        if (minutelyRainChartInstance !== null) {
          minutelyRainChartInstance.dispose();
        }

        minutelyRainChartInstance = echarts.init(document.querySelector('#minutely-rain-wrap'));

        window.addEventListener('resize', function () {
          minutelyRainChartInstance.resize();
        });
        const result = minutelyRainChartStore.getMinutelyData(minutelyRainData.obj.data);
        minutelyRainChartInstance.setOption(result);
      },

      // 从api获取data
      init() {
        $axios.get('/v7/minutely/5m', {
          params: {
            location: getLocationStore.loc
          }
        }).then(res => {
          if (errorCodeRegex.test(res.data.code)) {
            minutelyRainData.setData();

            return;
          }

          minutelyRainData.obj.summary = res.data.summary || '';
          minutelyRainData.obj.data = res.data.minutely || [];
          minutelyRainData.setData();
        }).catch(e => console.log(e))
      },
    });

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
            location: getLocationStore.loc
          }
        }).then(res => {
          if (errorCodeRegex.test(res.data.code)) {
            hourlyObj.setData();

            return;
          }

          hourlyObj.hourlyData = res.data.hourly;
          weatherData.obj = res.data?.hourly[0] || [];

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
            location: getLocationStore.loc
          }
        }).then(res => {
          if (errorCodeRegex.test(res.data.code)) {
            daysForecastObj.setData();

            return;
          }

          daysForecastObj.data = res.data.daily;
          sunriseSunsetData.data = res.data.daily[0] || [];

          daysForecastObj.setData('temp', 0);
        }).catch(e => console.log(e))
      }
    })
    // #endregion
    // ------- end -------

    // ------- 天气指数预报 -------
    // #region
    let isInit = ref(false);
    const weatherIndexData = reactive({
      data: [{
        "date": "2021-12-16",
        "type": "1",
        "name": "运动指数",
        "level": "3",
        "category": "较不宜",
        "text": "天气较好，但考虑天气寒冷，风力较强，推荐您进行室内运动，若户外运动请注意保暖并做好准备活动。"
      },
      {
        "date": "2021-12-16",
        "type": "2",
        "name": "洗车指数",
        "level": "3",
        "category": "较不宜",
        "text": "较不宜洗车，未来一天无雨，风力较大，如果执意擦洗汽车，要做好蒙上污垢的心理准备。"
      }],
      indexLevelType: {
        1: {
          1: '适宜',
          2: '较适宜',
          3: '较不宜',
        },
        2: {
          1: '适宜',
          2: '较适宜',
          3: '较不宜',
          4: '不宜',
        },
        3: {
          1: '寒冷',
          2: '冷',
          3: '较冷',
          4: '较舒适',
          5: '舒适',
          6: '热',
          7: '炎热',
        },
        5: {
          1: '最弱',
          2: '弱',
          3: '中等',
          4: '强',
          5: '很强',
        },
        6: {
          1: '适宜',
          2: '较适宜',
          3: '一般',
          4: '较不宜',
          5: '不适宜',
        },
        9: {
          1: '少发',
          2: '较易发',
          3: '易发',
          4: '极易发',
        },
      },
      init() {
        $axios.get('/v7/indices/1d', {
          params: {
            location: getLocationStore.loc,
            type: '1,2,3,5,6,9',
          }
        }).then(res => {
          if (errorCodeRegex.test(res.data.code)) {
            return;
          }
          weatherIndexData.data = res.data.daily;

          isInit.value = true;
        }).catch(e => console.log(e))
      }
    });
    // #endregion
    // ------- end -------

    // ------- 日出/日落/月出/月落 -------
    // #region
    const sunriseSunsetData = reactive({
      // 数据
      data: {
        "fxDate": "2021-11-15",
        "sunrise": "06:58",
        "sunset": "16:59",
        "moonrise": "15:16",
        "moonset": "03:40",
        "moonPhase": "盈凸月",
        "moonPhaseIcon": "803",
        "tempMax": "12",
        "tempMin": "-1",
        "iconDay": "101",
        "textDay": "多云",
        "iconNight": "150",
        "textNight": "晴",
        "wind360Day": "45",
        "windDirDay": "东北风",
        "windScaleDay": "1-2",
        "windSpeedDay": "3",
        "wind360Night": "0",
        "windDirNight": "北风",
        "windScaleNight": "1-2",
        "windSpeedNight": "3",
        "humidity": "65",
        "precip": "0.0",
        "pressure": "1020",
        "vis": "25",
        "cloud": "4",
        "uvIndex": "3"
      },
      desc: {
        day: {
          start: {
            sign: 'day',
            icon: 'qi-103',
            desc: '日出',
            time: 'sunrise',
          },
          end: {
            sign: 'day',
            icon: 'qi-151',
            desc: '日落',
            time: 'sunset',
          },
        },
        night: {
          start: {
            sign: 'night',
            icon: 'qi-151',
            desc: '月出',
            time: 'moonrise',
          },
          end: {
            sign: 'night',
            icon: 'qi-103',
            desc: '月落',
            time: 'moonset',
          },
        },
      },
    });
    // #endregion
    // ------- end -------

    // ------- 预警信息获取 -------
    // #region
    let warningData = reactive({
      obj: [
        {
          "id": "10102010020230403103000500681616",
          "sender": "上海中心气象台",
          "pubTime": "2023-04-03T10:30+08:00",
          "title": "上海中心气象台发布大风蓝色预警[Ⅳ级/一般]",
          "startTime": "2023-04-03T10:30+08:00",
          "endTime": "2023-04-04T10:30+08:00",
          "status": "active",
          "level": "",
          "severity": "Minor",
          "severityColor": "Blue",
          "type": "1006",
          "typeName": "大风",
          "urgency": "",
          "certainty": "",
          "text": "上海中心气象台2023年04月03日10时30分发布大风蓝色预警[Ⅳ级/一般]：受江淮气旋影响，预计明天傍晚以前本市大部地区将出现6级阵风7-8级的东南大风，沿江沿海地区7级阵风8-9级，请注意防范大风对高空作业、交通出行、设施农业等的不利影响。",
          "related": ""
        },
      ],
      init() {
        $axios.get('/v7/warning/now', {
          params: {
            location: getLocationStore.loc
          }
        }).then(res => {
          if (errorCodeRegex.test(res.data.code)) {
            return;
          }

          warningData.obj = res.data.warning;
        }).catch(e => console.log(e))
      }
    });

    // #endregion
    // ------- end -------

    // ==============================================
    // ==============================================
    // ==============================================


    onMounted(async () => {

      setTimeout(() => {

        hourlyObj.init();
        daysForecastObj.init();
        airData.init();
        minutelyRainData.init();
        weatherIndexData.init();
        warningData.init();
      }, 100)
    })

    // ==============================================
    // ==============================================
    // ==============================================

    return {
      today,
      firstScreen,
      getLocationStore,

      weatherInfoBoard,
      airQualityBoard,

      hourlyObj,
      daysForecastObj,
      minutelyRainData,
      weatherIndexData,

      weatherData,
      warningData,
      airData,
      sunriseSunsetData,


      isInit,
    }
  }
}
</script>

