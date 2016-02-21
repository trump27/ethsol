import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
Vue.use(VueRouter)
const router = new VueRouter()

router.map({
  '/node': { component: require('./components/Node.vue') },
  // '/block': { component: require('./components/Block.vue') },
  // '/tx': { component: require('./components/Tx.vue') },
  // '/tx/:hash': { component: require('./components/Tx.vue') },
  // '/account/': { component: require('./components/Account.vue') },
  // '/account/:hash': { component: require('./components/Account.vue') },
  // '/send': { component: require('./components/Send.vue') },
  '/sol': { component: require('./components/Sol.vue') },
  '/labo': { component: require('./components/Labo.vue') },
  '/contract': { component: require('./components/Contract.vue') },
  '*': { component: require('./components/Node.vue') }
})

const App = Vue.extend(require('./App.vue'))
router.start(App, '#app')
