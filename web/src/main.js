import Vue from 'vue'
import App from './App'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.config.productionTip = false

new Vue({
  components: {App},
  render: h => h(App)
}).$mount('#app')
