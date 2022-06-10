<template>
    <div class="map">
        <Ruchers v-bind:ruchers="ruchers"/>
        <Position v-bind:position="position"/>

        <el-row type="flex" class="row-bg" justify="space-around">
            <h2>Carte des ruchers</h2>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :sm="20" :md="16" :lg="14">
                <div style="height: 100%; width: 100%">
                    <l-map ref="myMap"
                           style="height: 500px; width: 100%"
                           :zoom="mapParameters.zoom"
                           :center="mapParameters.center"
                    >
                        <l-tile-layer :url="mapParameters.url"></l-tile-layer>

                        <l-marker v-for="marker in markers"
                                  :lat-lng="marker.position"
                                  :icon="marker.icon"
                                  @click="goToRucher(marker.ref.itemID, marker.ref.item)">
                        </l-marker>
                    </l-map>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

    import { eventBus } from '../../main';
    import Position from '../global/Position';
    import Ruchers from "../global/Ruchers";

    export default {
        name: "Map.vue",
        components: {
            Position,
            Ruchers,
            LMap,
            LTileLayer,
            LMarker,
        },
        data() {
            return {
                mapParameters: {
                    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    zoom: 3,
                    center: [47.413220, -1.219482], //default centering (somwhere in France)
                    bounds: null
                },
                position: {},
                ruchers: [],
                markers: [],
            };
        },
        created() {
            eventBus.$on('position', (serverData) => {
                this.$data.position = serverData;
                this.init();
            });
            eventBus.$on('ruchers', (serverData) => {
                this.$data.ruchers = serverData;
            });
        },
        methods: {
            init() {
                let position = this.$data.position;
                if (position.longitude !== null && position.latitude !== null) {
                    this.$data.mapParameters.center = [position.latitude, position.longitude];
                    this.$data.mapParameters.zoom = 12;
                }

                this.$data.ruchers.forEach((item) => {
                    this.putMarker(item, item._id, item._position, item._color);
                })
            },
            goToRucher(rucherID, rucher) {
                this.$router.push({name: 'visite', params: {id: rucherID, rucher: rucher}})
            },
            putMarker(item, itemID, position, color) {
                let customIcon = L.icon({
                    iconUrl: './img/' + color + '-marker.png',
                    iconSize: [20, 35],
                    iconAnchor: [position.latitude, position.longitude],
                });
                let marker = {
                    position: [position.latitude, position.longitude],
                    ref: {item, itemID},
                    icon: customIcon
                };
                this.$data.markers.push(marker);
            },
        }
    }
</script>

<style scoped>

</style>