<template>
  <div>
    <h2>Sol</h2>
    <div>
      <a href="build/browser-solidity/index.html" target="sol">Solidity compiler</a>
    </div>
    <div class="well">
    personal.unlockAccount("{{coinbase}}")
    </div>

  </div>
</template>

<script>
// import { config } from '../config.js'
import Web3 from '../web3api.js'

var web3 = Web3.web3()
// var web3 = new Web3()
// web3.setProvider(new web3.providers.HttpProvider(config.provider))
// if (!web3.isConnected()) {
//   alert('ノードに接続できません')
// }

export default {
  data () {
    return {
      coinbase: ''
    }
  },
  created () {
    console.log('start send')

    this.coinbase = web3.eth.coinbase
  },

  methods: {
  }
}
</script>
