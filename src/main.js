import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './style/css.sass'

Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.config.devtools = true

new Vue({
  render: h => h(App),
}).$mount('#app')
