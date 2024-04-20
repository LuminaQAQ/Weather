import { computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useLocationStore = defineStore('getLocationStore', {
    state: () => {
        return {
            lng: null,
            lat: null,
            city: null,
        }
    },
    getters: {
        getLocation() {
            if (this.lng === null || this.lat === null || this.city === null)
                return "定位中"
            else
                return this.lng + ',' + this.lat;
        }
    },
    actions: {
        fetchLocation() {
            const that = this;

            let geolocation = new BMapGL.Geolocation();
            let myCity = new BMapGL.LocalCity();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    const lng = Number(r.point.lng).toFixed(2);
                    const lat = Number(r.point.lat).toFixed(2);

                    that.lng = lng;
                    that.lat = lat;
                }
                else {
                    alert('地址获取失败, Error Code: ' + this.getStatus());
                }
            });
            myCity.get(function (result) {
                const cityName = result.name;

                that.city = cityName;
            });
        }
    }
})
