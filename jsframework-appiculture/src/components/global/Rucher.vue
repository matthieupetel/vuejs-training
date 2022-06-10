<template>
    <el-col :span="20" :md="11" :lg="11">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ id }}</span>
                <div class="color" v-bind:style="{ backgroundColor:color }"></div>
                <el-button style="float: right; padding: 3px 10px" type="text" @click="$emit('editRucher')">
                    <i class="el-icon-edit"></i>
                </el-button>
                <el-button style="float: right; padding: 3px 10px" type="text" @click="$emit('removeRucher')">
                    <i class="el-icon-delete"></i>
                </el-button>
            </div>

            <div>
                <p>Nombre de ruches: {{nbRuches}}</p>
                <p>Fréquence de visite: {{frequency}}</p>
                <p v-if="lastVisiteDate">Dernière Visite: {{lastVisiteDate }}</p>
                <p v-else>Date de création: {{creationDate }}</p>
            </div>

            <div>
                <el-button class="btn-visite" @click="visite">
                    Information & Visite
                </el-button>
            </div>
            <!--<div v-for="history in history">-->
            <!--{{history}}-->
            <!--</div>-->
        </el-card>
    </el-col>
</template>

<script>

    export default {
        name: 'Rucher',
        props: {
            id: {
                type: String,
            },
            color: {
                type: String
            },
            nbRuches: {
                type: [String, Number],
            },
            frequency: {
                type: [String, Number],
            },
            coord: {
                type: Object
            },
            history: {
                type: Array
            },
            creationDate: {
                type: String
            },
            lastVisiteDate: {
                type: String
            }
        },
        methods: {
            visite() {
                this.$router.push({name: 'visite', params: {id: this.$props.id, rucher: this.$props}})
            }
        }
    }

</script>

<style scoped>
    .box-card {
        width: 100%;
        margin-bottom: 2em;
    }

    .color {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin-left: 10px;
    }
    .rucher-list .el-icon-edit,
    .rucher-list .el-icon-delete {
        display: none;
    }
    .rucher-list-admin .btn-visite {
        display: none;
    }
</style>