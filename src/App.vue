<template>
  <div>
    <navbar></navbar>
    <div class="container">
      <router-view transition="route"></router-view>
    </div>
  </div>
</template>

<style lang="stylus">
.route-transition
  transition all .5s ease
.route-leave
  display none
.route-enter
  opacity 0
  padding 0 0
  height 0
  transform translate3d(0, 0, 0)

dt
  float left
  clear left
  width 120px
dd
  float left
</style>

<script>
export default {
  data () {
    return {}
  },
  components: {
    navbar: require('./components/Navbar.vue')
  },
  created: () => {
    console.log('start')
  }
}
</script>
