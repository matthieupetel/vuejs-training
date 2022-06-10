<template>
    <div>
        <h1>Je suis la page {{ dataName }}</h1>
    </div>
</template>

<script>
export default {
    name: 'Movies',
    data() {
        return {
            dataName: this.$options.name,
        }
    },
}
</script>
