<template>
    <div class="rucher-list">
        <Ruchers v-bind:ruchers="ruchers"/>

        <el-row type="flex" class="row-bg" justify="space-around">
        <h2>Listes des ruchers à visister</h2>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <Rucher v-for="rucher in ruchers"
                    v-bind:id="rucher._id"
                    v-bind:nbRuches="rucher._nbRuches"
                    v-bind:frequency="rucher._frequency"
                    v-bind:coord="rucher._position"
                    v-bind:history="rucher._history"
                    v-bind:creationDate="rucher._creationDate | customDate"
                    v-bind:lastVisiteDate="rucher._lastVisiteDate | customDate"
                    v-bind:color="rucher._color"
            />
        </el-row>
    </div>
</template>

<script>

    import Rucher from '../global/Rucher'
    import Ruchers from "../global/Ruchers";
    import { eventBus } from '../../main';

    export default {
        name: "Homepage",
        components: {
            Rucher,
            Ruchers
        },
        data() {
            return {
                ruchers: []
            };
        },
        created() {
            eventBus.$on('ruchers', (serverData) => {
                this.$data.ruchers = serverData;
            });
        },
    }
</script>

<style scoped>
    .row-bg {
        flex-wrap: wrap;
    }

</style>