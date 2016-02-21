<template>
  <div>
    <h2>Node</h2>

    <div class="panel panel-default">
      <div class="panel-heading"><h3 class="panel-title">Info</h3></div>
      <div class="panel-body">
        <dl>
          <dt>node</dt><dd>{{node.node}}</dd>
          <dt>network</dt><dd>{{node.network}}</dd>
          <dt>api</dt><dd>{{node.api}}</dd>
          <dt>provider</dt><dd>{{node.providerhost}}</dd>
          <dt>defaultBlock</dt><dd>{{node.defaultBlock}}</dd>
          <dt>blockNumber</dt><dd>{{node.blockNumber}}</dd>
          <dt>defaultAccount</dt><dd>{{defaultAccount}}</dd>
          <dt>coinbase</dt><dd>{{node.coinbase}}</dd>
          <dt>mining</dt><dd>{{node.mining}}</dd>
        </dl>
      </div>
    </div>

    <div class="form-inline">
      <input v-model="node.providerhost" type="text" class="form-control">
      <button @click.prevent="changeProvider" class="btn btn-primary">Change provider</button>
      <button @click.prevent="resetProvider" class="btn btn-info">Reset provider</button>
    </div>
    <br>

    <div class="panel panel-default">
      <div class="panel-heading"><h3 class="panel-title">Accounts</h3></div>
      <div class="panel-body">
        <ul class="list-group">
          <li v-for="account in accounts" class="list-group-item">
            <span><a v-link="'/account/' + account.id">{{account.id}}</a>
              <span class="badge">{{account.balance}}</span>
            </span>
            <!--
            <button @click="changeCoinbase(account.id)" class="btn btn-xs btn-danger pull-right">set coinbase</button>
            -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { config } from '../config.js'
import Web3 from '../web3api.js'

var web3 = Web3.web3()
// var web3 = new Web3()
// web3.setProvider(new web3.providers.HttpProvider(config.provider))
// if (!web3.isConnected()) {
//   alert('ノードに接続できません')
// }

function getBalance (addresses) {
  return web3.fromWei(web3.eth.getBalance(addresses), 'ether')
}

export default {
  data () {
    return {
      node: {
        network: '',
        node: '',
        api: '',
        providerhost: '',
        defaultBlock: '',
        coinbase: '',
        blockNumber: '',
        mining: null
      },
      defaultAccount: '',
      accounts: []
    }
  },
  created () {
    console.log('start node')

    this.node.network = web3.version.network
    this.node.node = web3.version.node
    this.node.api = web3.version.api
    this.node.providerhost = web3.currentProvider.host
    this.node.defaultBlock = web3.eth.defaultBlock
    this.node.coinbase = web3.eth.coinbase
    this.node.mining = web3.eth.mining
    this.node.blockNumber = web3.eth.blockNumber
    this.defaultAccount = web3.eth.defaultAccount

    var accounts = web3.eth.accounts
    for (let idx in accounts) {
      this.accounts.push({
        id: accounts[idx],
        balance: getBalance(accounts[idx])
      })
    }
  },
  methods: {
    changeCoinbase (address) {
      console.log(web3.eth.defaultAccount)
      web3.eth.defaultAccount = address
      console.log(web3.eth.defaultAccount)
    },
    changeProvider () {
      window.localStorage.setItem('providerHost', this.node.providerhost)
      this.node.providerhost = web3.currentProvider.host
    },
    resetProvider () {
      this.node.providerhost = config.provider
      this.changeProvider()
    }
  }
}
</script>
