<template>
    <div></div>
</template>

<script>
    import Moment from 'moment';
    import {eventBus} from '../../main'

    export default {
        name: 'Ruchers',
        props: {
            ruchers: {
                type: Array
            }
        },
        beforeMount() {
            this.loadRuchers();
            this.getRuchers();
        },
        methods: {
            loadRuchers: function () {
                let storedData = JSON.parse(localStorage.getItem('ruchers'));
                if (storedData) {
                    storedData.forEach((item) => {
                        let dateToCompare = item._lastVisiteDate ? item._lastVisiteDate : item._creationDate;
                        let res = this.compareDate(Moment(dateToCompare), item._frequency);
                        item._color = res.color;
                        item._remainingTime = res.remainingTime;

                        this.$props.ruchers.push(item);
                    });
                }
            },
            getRuchers: function () {
                eventBus.$emit('ruchers', this.ruchers)
            },
            createRucher(rucher, position) {
                let item = new Rucher(rucher.id, rucher.nbRuches, rucher.frequency, position);
                console.log(item);
                return item;
            },
            storeRuchers(ruchers) {
                try {
                    localStorage.setItem('ruchers', JSON.stringify(ruchers));
                    return {
                        message: 'Données sauvegardées',
                        type: 'success'
                    }

                } catch (error) {
                    return {
                        message: 'Impossible d\'accèder au stockage de votre navigateur',
                        type: 'error'
                    }
                }
            },
            compareDate(dateToCompare, frequency) {
                let remainingTime = -dateToCompare.diff(new Date(), 'days');
                let color = null;

                if (remainingTime >= frequency) {
                    color = 'red'
                } else if (remainingTime >= frequency / 2) {
                    color = 'orange'
                } else {
                    color = 'green'
                }

                return {remainingTime, color}
            },
        }
    }

    class Rucher {
        constructor(id, nbRuches, frequency, position) {
            this._creationDate = new Date();
            this._lastVisiteDate = null;
            this._remainingTime = null;
            this._color = null;
            this._history = [];
            this._position = {
                longitude: position.longitude,
                latitude: position.latitude,
            };
            this._id = id;
            this._nbRuches = nbRuches;
            this._frequency = frequency;
        }

        get remainingTime() {
            return this._remainingTime;
        }

        set remainingTime(value) {
            this._remainingTime = value;
        }

        get color() {
            return this._color;
        }

        set color(value) {
            this._color = value;
        }

        get id() {
            return this._id;
        }

        set id(value) {
            this._id = value;
        }

        get nbRuches() {
            return this._nbRuches;
        }

        set nbRuches(value) {
            this._nbRuches = value;
        }

        get frequency() {
            return this._frequency;
        }

        set frequency(value) {
            this._frequency = value;
        }

        get position() {
            return this._position;
        }

        set position(value) {
            this._position.longitude = value.longitude;
            this._position.latitude = value.latitude;
        }

        get creationDate() {
            return this._creationDate;
        }

        set creationDate(value) {
            this._creationDate = value;
        }

        get history() {
            return this._history;
        }

        set history(value) {
            this._history = value;
        }

        get lastVisiteDate() {
            return this._lastVisiteDate;
        }

        set lastVisiteDate(value) {
            this._lastVisiteDate = value;
        }
    }
</script>