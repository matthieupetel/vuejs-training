<script>
export default {
    name: "Header",
    functional: true,

    render: function (createElement) {
        return createElement(
            'section',
            {
                style: {
                    backgroundColor: 'skyblue',
                }
            },
            [
                createElement(
                    'h1',
                    'Mon application Vue.js'
                ),
                createElement(
                    'ul',
                    [
                        createElement(
                            'li',
                            'Home'
                        ),
                        createElement(
                            'li',
                            'About'
                        )
                    ]
                )
            ],
        );
    },
}

</script>

<style scoped>

</style>
