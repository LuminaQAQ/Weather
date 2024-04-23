import { computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useLocationStore = defineStore('getLocationStore', {
    state: () => {
        return {
            loc: null,
            city: null,
        }
    },
    getters: {
        getLocation() {
            const loc = window.localStorage.getItem('loc');
            const city = window.localStorage.getItem('city');

            if (loc && city) {
                this.loc = loc;
                this.city = city;

                return { loc, city }
            };



            if (this.lng === null || this.lat === null || this.city === null) {
                return false;
            }
            else {
                const i_loc = this.lng + ',' + this.lat;
                const i_city = this.city;
                return { i_loc, i_city };
            }
        }
    },
    actions: {
        fetchLocation() {
            const that = this;

            const loc = window.localStorage.getItem('loc');
            const city = window.localStorage.getItem('city');
            if (loc && city) return;

            let geolocation = new BMapGL.Geolocation();
            let myCity = new BMapGL.LocalCity();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    const lng = Number(r.point.lng).toFixed(2);
                    const lat = Number(r.point.lat).toFixed(2);

                    that.lng = lng;
                    that.lat = lat;
                    that.loc = lng + ',' + lat;
                    window.localStorage.setItem('loc', lng + ',' + lat)
                }
                else {
                    alert('地址获取失败, Error Code: ' + this.getStatus());

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            });
            myCity.get(function (result) {
                const cityName = result.name;

                that.city = cityName;
                window.localStorage.setItem('city', cityName)
            });
        }
    }
})
