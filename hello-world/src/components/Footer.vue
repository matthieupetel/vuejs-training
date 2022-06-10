<script>
export default {
    name: 'Footer',
    functional: true,

    render: function (createElement) {
        return createElement(
            'footer',
            {
                style: {
                    fontStyle: 'italic',
                }
            },
            [
                'Copyright 2021 - Vue.js Formation',
                createElement('br'),
                createElement(
                    'a',
                    {
                        attrs: {
                            href: 'https://fr.vuejs.org/'
                        }
                    },
                    'Documentation Vue.js'
                )
            ],
        );
    },
}

</script>

<style scoped>

</style>
