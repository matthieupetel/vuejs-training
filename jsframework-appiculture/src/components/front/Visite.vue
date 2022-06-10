<template>
    <div class="viste">
        <Ruchers v-bind:ruchers="ruchers"/>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="20" :md="16" :lg="12">
                <el-button style="margin: 50px 0">
                    <router-link to="/"> Retour</router-link>
                </el-button>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <h2> Historiques des visites </h2>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="20" :md="16" :lg="12">

                <el-collapse>
                    <el-collapse-item v-for="history in rucher.history"
                                      :title="history._dateVisite | customDate"
                                      style="width:100%">

                        <div>
                            <p> Nombre de hausses récoltées : {{history._recolte}}</p>
                            <p> Dynamique de la ruche : <br> {{history._dynamique}}</p>
                            <p> Nouriture donnée : <br> {{history._nourriture}}</p>
                            <p> Commentaire : <br> {{history._commentaire}}</p>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-around">
            <h2> Visite de la ruche </h2>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="20" :md="16" :lg="12">
                <el-form ref="form" :model="formData" :label-position="labelPosition">
                    <el-form-item label="Date de la visite (par défaut aujourd'hui)">
                        <el-date-picker
                                v-model="formData.dateVisite"
                                type="date"
                                :placeholder="formData.dateVisite | customDate"
                                :default-value="formData.dateVisite">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="Nombre de Hausses récoltées">
                        <el-input type="number" v-model="formData.recolte"></el-input>
                    </el-form-item>

                    <el-form-item label="Dynamique de développement du rucher">
                        <el-input type="textarea" :rows="4" v-model="formData.dynamique"></el-input>
                    </el-form-item>

                    <el-form-item label="Nourriture apportée">
                        <el-input type="textarea" :rows="4" v-model="formData.nourriture"></el-input>
                    </el-form-item>

                    <el-form-item label="Autre commentaire">
                        <el-input type="textarea" :rows="4" v-model="formData.commentaire"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="addVisite">Enregistrer</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import Ruchers from "../global/Ruchers";
    import {eventBus} from '../../main';

    export default {
        name: "VisiteComponent",
        components: {
            Ruchers
        },
        data() {
            return {
                labelPosition: 'top',
                rucher: this.$route.params.rucher,
                ruchers: [],
                formData: {
                    recolte: '',
                    dateVisite: new Date(),
                    commentaire: '',
                    dynamique: '',
                    nourriture: ''
                }
            }
        },
        created() {
            eventBus.$on('ruchers', (serverData) => {
                this.$data.ruchers = serverData;
            });
        },
        methods: {
            addVisite() {
                let formData = this.$data.formData;
                let tmp = new Visite(formData.recolte, formData.dateVisite, formData.commentaire, formData.dynamique, formData.nourriture)
                this.$data.rucher.history.unshift(tmp);

                this.$data.ruchers.forEach((item) => {
                    if (item._id === this.$data.rucher.id) {
                        item._history.push(tmp);
                        item._lastVisiteDate = formData.dateVisite;
                    }
                });

                let result = Ruchers.methods.storeRuchers(this.$data.ruchers);
                this.$message({
                    message: result.message,
                    type: result.type
                })
            }
        }
    }

    export class Visite {
        constructor(recolte, dateVisite, commentaire, dynamique, nourriture) {
            this._recolte = recolte;
            this._dateVisite = dateVisite;
            this._commentaire = commentaire;
            this._dynamique = dynamique;
            this._nourriture = nourriture
        }

        get recolte() {
            return this._recolte;
        }

        set recolte(value) {
            this._recolte = value;
        }

        get dateVisite() {
            return this._dateVisite;
        }

        set dateVisite(value) {
            this._dateVisite = value;
        }

        get commentaire() {
            return this._commentaire;
        }

        set commentaire(value) {
            this._commentaire = value;
        }

        get dynamique() {
            return this._dynamique;
        }

        set dynamique(value) {
            this._dynamique = value;
        }

        get nourriture() {
            return this._nourriture;
        }

        set nourriture(value) {
            this._nourriture = value;
        }
    }
</script>

<style scoped>

</style>