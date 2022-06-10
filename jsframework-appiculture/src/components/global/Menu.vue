<template>
    <el-menu
            :default-active="$route.meta.activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-menu-item index="1">
            <router-link to="/">Homepage</router-link>
        </el-menu-item>

        <el-menu-item index="2">
            <router-link to="/carte">Carte</router-link>
        </el-menu-item>

        <el-submenu index="3" class="menu-admin">
            <template slot="title">Admin</template>
            <el-menu-item index="3-1">
                <router-link to="/admin/configuration">Configuration</router-link>
            </el-menu-item>

            <el-menu-item index="3-2">
                <router-link to="/admin/ruchers">Ruches et ruchers</router-link>
            </el-menu-item>

        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                activeIndex: '',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.debug(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-item {
        padding: 0;
    }

    .el-menu--horizontal > .el-submenu.menu-admin {
        float: right;
    }

    a, a:link, a:visited, a:focus, a:hover, a:active{
        color: white;
        text-decoration:none;
        display: block;
        padding:  0 20px;
    }
</style>