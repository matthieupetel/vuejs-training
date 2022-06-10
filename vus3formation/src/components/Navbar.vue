<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <router-link class="navbar-item" :to="{ name: 'movies' }">
                {{title}}
            </router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" :to="{ name: 'favorites' }">Favorites</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        }
    },

    // props: ['title']
}
</script>
