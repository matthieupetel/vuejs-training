<template>
    <div class="form-rucher">

        <Position v-bind:position="position"/>
        <Ruchers v-bind:ruchers="ruchers"/>

        <el-row type="flex" class="row-bg" justify="space-around">
            <h1> Configuration des Ruches et Ruchers</h1>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <h2>Ajouter des ruchers</h2>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="20" :md="14" :lg="10">
                <el-form ref="form" :model="rucherData" :label-position="labelPosition">
                    <el-form-item label="Identifiant du rucher">
                        <el-input v-model="rucherData.id"></el-input>
                    </el-form-item>

                    <el-form-item
                            label="Fréquence de visite des ruches en jour (garder vide pour applique la configuration global)">
                        <el-input type="number" v-model="rucherData.frequency"></el-input>
                    </el-form-item>

                    <el-form-item label="Nombre de ruches dans ce rucher">
                        <el-input type="number" v-model="rucherData.nbRuches"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addRucher">Enregistrer</el-button>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>

        <div class="rucher-list-admin">
            <el-row type="flex" class="row-bg" justify="space-around">
                <h2>Listes de ruchers</h2>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <Rucher v-for="rucher in ruchers"
                        v-bind:id="rucher._id"
                        v-bind:nbRuches="rucher._nbRuches"
                        v-bind:frequency="rucher._frequency"
                        v-bind:coord="rucher._position"
                        v-bind:history="rucher._history"
                        v-bind:creationDate="rucher._creationDate | customDate"
                        @removeRucher="removeRucher(rucher)"
                        @editRucher="editRucher(rucher)"
                />
            </el-row>


        </div>
    </div>
</template>

<script>

    import {eventBus} from '../../main'
    import Rucher from '../global/Rucher';
    import Ruchers from '../global/Ruchers';
    import Position from '../global/Position'

    export default {
        name: "ConfigurationRucher",
        components: {
            Rucher,
            Ruchers,
            Position
        },
        data() {
            return {
                labelPosition: 'top',
                ruchers: [],
                position: Object,
                rucherData: {
                    id: null,
                    nbRuches: null,
                    frequency: null,
                    creationDate: null,
                    history: []
                }
            }
        },
        created() {
            eventBus.$on('position', (serverData) => {
                this.$data.position = serverData;
            });
            eventBus.$on('ruchers', (serverData) => {
                this.$data.ruchers = serverData;
            });
        },
        methods: {
            addRucher() {
                let rucher = this.$data.rucherData;

                if (rucher.id === null || rucher.nbRuches === null) {
                    this.$message({
                        message: 'Certains champs ne sont pas remplis',
                        type: 'error'
                    });
                    return;
                }

                if (rucher.frequency === null) {
                    if (localStorage.getItem('configuration')) {
                        rucher.frequency = JSON.parse(localStorage.getItem('configuration')).frequency
                    } else {
                        this.$message({
                            message: 'Aucune configuration globale détectée, à défaut merci d\'indiquer la fréquence',
                            type: 'error'
                        });
                        return;
                    }
                }

                let existant = this.$data.ruchers.find(function(element) {
                    return element._id === rucher.id;
                });
                if (existant) {
                    this.$message({
                        message: 'Un rucher avec ce nom exist déjà',
                        type: 'error'
                    });
                    return;
                }

                let tmp = Ruchers.methods.createRucher(rucher, this.$data.position);
                this.$data.ruchers.push(tmp);
                this.storeRuchers();

                this.$data.rucherData.frequency = null;
                this.$data.rucherData.id = null;
                this.$data.rucherData.nbRuches = null;

            },
            storeRuchers() {
                let result = Ruchers.methods.storeRuchers(this.$data.ruchers);
                this.$message({
                    message: result.message,
                    type: result.type
                })
            },
            removeRucher(item) {
                let ruchers = this.$data.ruchers;
                ruchers.splice(ruchers.indexOf(item), 1);
                this.storeRuchers();
            },
            editRucher(item) {
                this.$data.rucherData.frequency = item._frequency;
                this.$data.rucherData.id = item._id;
                this.$data.rucherData.nbRuches = item._nbRuches;

                this.removeRucher(item);
                window.scrollTo(0,0)

            }
        }
    }

</script>

<style scoped>
    .row-bg {
        flex-wrap: wrap;
    }

    .rucher-list-admin {
        margin-top: 5em;
    }
</style>