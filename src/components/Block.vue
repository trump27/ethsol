<template>
  <div>
    <h2>Blocks</h2>
    <div class="panel panel-default">
      <div class="panel-heading"><h3 class="panel-title">Info</h3></div>
      <div class="panel-body">
        <dl>
          <dt>defaultBlock</dt><dd>{{node.defaultBlock}}</dd>
          <dt>blockNumber</dt><dd>{{node.blockNumber}}</dd>
          <dt>coinbase</dt><dd>{{node.coinbase}}</dd>
          <dt>mining</dt><dd>{{node.mining}}</dd>
        </dl>
      </div>
    </div>

    <form class="form-inline">
      <div class="form-group">
        Start block number :
        <input v-model="searchFromBlock" @keyup.enter="searchBlock" type="text" class="form-control" size="5">
        <button @click.prevent="searchBlock" class="btn btn-primary">Search transactions</button>
        Current block number : {{node.blockNumber}}
      </div>
    </form>

    <div class="panel panel-default">
      <div class="panel-heading"><h3 class="panel-title">transactions in blocks</h3></div>
      <!--<div class="panel-body">transactions</div>-->
      <ul class="list-group">
        <li v-for="block in blocks" class="list-group-item block-item">
          <dl>
            <dt>number / hash</dt><dd>{{block.number}} / {{block.hash}}</dd>
            <dt>miner</dt><dd>{{block.miner}}</dd>
            <dt>size</dt><dd>{{block.size}}</dd>
            <dt>timestamp</dt><dd>{{block.timestamp}}</dd>
            <dt>transactions</dt>
            <dd class="clearfix">
              <span v-for="hash in block.transactions">
                <a v-link="'/tx/' + hash">{{hash}}</a>
                <!--<a v-link="{ path: 'tx', params: { hash: 'hash' }}">{{hash}}</a>-->
              </span>
            </dd>
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
      searchFromBlock: 0,
      node: {
        defaultBlock: '',
        coinbase: '',
        blockNumber: '',
        mining: null
      },
      blocks: []
    }
  },
  created () {
    console.log('start blocks')

    this.node.defaultBlock = web3.eth.defaultBlock
    this.node.coinbase = web3.eth.coinbase
    this.node.mining = web3.eth.mining
    this.node.blockNumber = web3.eth.blockNumber
  },

  methods: {
    searchBlock () {
      if (this.blocks.length > 0) this.blocks.splice(0, this.blocks.length)
      var block = []
      for (var i = this.searchFromBlock; i < this.node.blockNumber; i++) {
        // block = web3.eth.getBlock(i)
        // if (block.transactions.length > 0) {
        if (web3.eth.getBlockTransactionCount(i) > 0) {
          block = web3.eth.getBlock(i)
          this.blocks.unshift({
            number: block.number,
            hash: block.hash,
            miner: block.miner,
            size: block.size,
            timestamp: unixtime2date(block.timestamp),
            transactions: block.transactions
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.block-item
  dl
    display inline-block
</style>
