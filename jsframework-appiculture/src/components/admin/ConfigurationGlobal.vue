<template>
    <div>
        <el-row>
            <el-col :span="12" :offset="2">
                <h1>configuration</h1>

                <el-form ref="form" :model="conf" :label-position="labelPosition">
                    <el-form-item label="Votre nom">
                        <el-input v-model="conf.name"></el-input>
                    </el-form-item>

                    <el-form-item label="Fréquence de visite des ruches en jour (7 par défaut)">
                        <el-input type="number" v-model="conf.frequency"></el-input>
                    </el-form-item>

                    <el-form-item label="Liste des environements">
                        <el-input type="texte" v-model="conf.environement">
                            <el-button slot="append" icon="el-icon-plus" @click="addEnvironement"></el-button>
                        </el-input>
                        <ul>
                            <li v-for="env in conf.environements">
                                <p>{{env}} <span class="el-icon-close" @click="removeEnviroment(env)"></span></p>
                            </li>
                        </ul>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Enregistrer</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ConfigurationGlobalComponent",
        data() {
            return {
                labelPosition: 'top',
                conf: {
                    name: '',
                    frequency: 7,
                    environement: '',
                    environements: [],
                }
            }
        },
        beforeMount() {
            this.onLoad();
        },
        methods: {
            onLoad() {
                let formData = this.$data.conf;
                let storedData = JSON.parse(localStorage.getItem('configuration'));
                if(storedData) {
                    formData.name = storedData.name;
                    formData.frequency = storedData.frequency;
                    storedData.environements.forEach((item) => {
                        formData.environements.push(item)
                    });
                }
            },
            onSubmit() {
                let formData = this.$data.conf;

                try {
                    if (formData.name.length === 0 || formData.environements.length === 0 || formData.frequency === 0) {
                        this.$message({
                            message: 'Certains champs ne sont pas remplis',
                            type: 'error'
                        });
                        return;
                    }
                    localStorage.setItem('configuration', JSON.stringify(formData));
                    this.$message({
                        message: 'Configuration enregistrée',
                        type: 'success'
                    });

                } catch (error) {
                    this.$message({
                        message: error,
                        type: 'error'
                    });
                }
            },
            addEnvironement() {
                let formData = this.$data.conf;

                if (formData.environement.length > 0) {
                    formData.environements.push(formData.environement);
                    formData.environement = '';
                }
            },
            removeEnviroment(env) {
                let formData = this.$data.conf;
                formData.environements.splice(formData.environements.indexOf(env), 1);
            }
        }
    }
</script>

<style scoped>

</style>