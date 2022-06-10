<template>
    <div></div>
</template>

<script>
    import { eventBus } from '../../main'

    export default {
        name: 'Position',
        props: {
            position: {
                longitude: {
                    type: String
                },
                latitude: {
                    type: String
                }
            }
        },
        beforeMount() {
            this.loadPosition();
        },
        methods: {
            loadPosition() {
                this.getPosition((position) => {
                    this.$props.position = position;

                    eventBus.$emit('position', this.$props.position)

                })
            },
            getPosition(callback) {
                let that = this;

                const options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };

                function success(pos) {
                    callback({longitude: pos.coords.longitude, latitude: pos.coords.latitude});
                }

                function error(err) {
                    console.warn(err);
                    switch (err.code) {
                        case 1:
                            that.$message({
                                message: 'Vous avez bloqué la géolocalisation, Merci de l activer pour voir le rucher sur la carte',
                                type: 'warning'
                            });
                            break;
                        default:
                            that.$message({
                                message: 'La position de votre appareil n est pas accessible, ce rucher n apparaitra pas sur la carte',
                                type: 'error'
                            });
                            break;
                    }
                    callback({longitude: null, latitude: null});
                }
                navigator.geolocation.getCurrentPosition(success, error, options);
            },
        }
    }

</script>