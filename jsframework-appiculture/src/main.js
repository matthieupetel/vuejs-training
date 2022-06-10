// Import the Vue component
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.config.devtools = true;

// Import elementUI for the front end
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/fr'
Vue.use(ElementUI, {locale});

// Date format filter with moment.js
import Moment from 'moment';

Vue.filter('customDate', function(value) {
  if (value) {
    return Moment(String(value)).format('DD MMMM YYYY');
  }
});

// LeafLet icons
import { Icon }  from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Import lodash
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Create global components from './components/global/'
const requireComponent = require.context(
    './components/global',
    false,
    /\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
      camelCase(
          fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
      )
  );

  Vue.component(
      componentName,componentConfig.default || componentConfig
  )
});

// create a event bus view to transmit data across components
export const eventBus = new Vue();

// Create the Vue instance
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
