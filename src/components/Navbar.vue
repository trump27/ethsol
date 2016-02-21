<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navmenu">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">ether</a>
      </div>
      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="nav navbar-nav">
          <li><a v-link="'/node'">Node</a></li>
          <!--<li><a v-link="'/block'">Blocks</a></li>
          <li><a v-link="'/tx'">Transactions</a></li>
          <li><a v-link="'/account'">Account</a></li>
          <li><a v-link="'/send'">Send</a></li>-->
          <li><a v-link="'/sol'">Sol</a></li>
          <li><a v-link="'/labo'">Labo</a></li>
          <li><a v-link="'/contract'">Contract</a></li>
        </ul>
        <!--
        <ul class="nav navbar-nav navbar-right">
          <li><a v-if="$root.authenticated" @click="signout" href="#">Sign out</a></li>
        </ul>
        -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
