<template>
  <div>
    <h2>Transactions</h2>

    <form class="form-inline">
      <div class="form-group">
        Hash :
        <input v-model="searchTxHash" @keyup.enter="searchTx" type="text" class="form-control" size="60">
        <button @click.prevent="searchTx" class="btn btn-primary">Search</button>
      </div>
    </form>

    <div class="panel panel-default">
      <div class="panel-heading"><h3 class="panel-title">transactions</h3></div>
      <!--<div class="panel-body">transactions</div>-->
      <ul class="list-group">
        <li v-for="tx in txs" class="list-group-item block-item">
          <dl>
            <dt>hash</dt><dd>{{tx.hash}}</dd>
            <dt>Index</dt><dd>{{tx.transactionIndex}}</dd>
            <dt>blockNumber</dt><dd>{{tx.blockNumber}}</dd>
            <dt>blockHash</dt><dd>{{tx.blockHash}}</dd>
            <dt>timestamp</dt><dd>{{tx.timestamp}}</dd>
            <dt>from</dt><dd><a v-link="'/account/' + tx.from">{{tx.from}}</a></dd>
            <dt>to</dt><dd><a v-link="'/account/' + tx.to">{{tx.to}}</a></dd>
            <dt>value</dt><dd>{{tx.value}}<span class="badge">{{tx.valueEther}}</span></dd>
            <dt>gasPrice</dt><dd>{{tx.gasPrice}}</dd>
            <dt>gas</dt><dd>{{tx.gas}}</dd>
            <dt>input</dt><dd>{{tx.input}}</dd>
          </dl>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
// import { config } from '../config.js'
import { unixtime2date } from '../common.js'
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
      searchTxHash: '',
      txs: []
    }
  },
  created () {
    console.log('start tx')

    if (this.$route.params.hash) {
      this.searchTxHash = this.$route.params.hash
      this.txs.push(this.getTx(this.searchTxHash, null))
    }
  },

  methods: {
    getTx (txHash, block) {
      var tx = web3.eth.getTransaction(txHash)
      if (!tx) return null
      tx.valueEther = web3.fromWei(tx.value, 'ether')
      if (!block) {
        block = web3.eth.getBlock(tx.blockHash)
      }
      tx.timestamp = unixtime2date(block.timestamp)
      return tx
    },
    searchTx () {
      if (this.txs.length > 0) this.txs.splice(0, this.txs.length)
      if (this.searchTxHash) {
        this.txs.push(this.getTx(this.searchTxHash))
      } else {
        var blockNumber = web3.eth.blockNumber
        var block = []
        for (var i = blockNumber; i > 0; i--) {
          // block = web3.eth.getBlock(i)
          // if (block && block.transactions.length > 0) {
          if (web3.eth.getBlockTransactionCount(i) > 0) {
            block = web3.eth.getBlock(i)
            for (var j = 0; j < block.transactions.length; j++) {
              this.txs.push(this.getTx(block.transactions[j], block))
            }
          }
        }
      }
      // console.log(this.txs)
    }
  }
}
</script>

<style lang="stylus" scoped>
.block-item
  dl
    display inline-block
</style>
