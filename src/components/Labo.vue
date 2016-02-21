<template>
  <div>
    <h2>Contract Manager</h2>
    <div v-if="infoMsg" class="alert alert-success">{{infoMsg}}</div>
    <div v-if="errorMsg" class="alert alert-danger">{{errorMsg}}</div>

    <div class="well">
    personal.unlockAccount("{{coinbase}}")
    </div>

    <form class="form-horizontal">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">name</label>
        <div class="col-sm-10">
          <input v-model="contract.name" type="text" id="name" class="form-control" required>
        </div>
      </div>
      <div class="form-group">
        <label for="addr" class="col-sm-2 control-label">addr</label>
        <div class="col-sm-10">
          <input v-model="contract.addr" type="text" id="addr" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="abi" class="col-sm-2 control-label">abi</label>
        <div class="col-sm-10">
          <input v-model="contract.abi" type="text" id="abi" class="form-control">
        </div>
      </div>
      <div class="form-group">
        <label for="source" class="col-sm-2 control-label">source</label>
        <div class="col-sm-10">
          <textarea v-model="contract.source" id="source" rows="5" class="col-sm-8 form-control"></textarea>
        </div>
      </div>
      <button @click.prevent="registCont" type="submit" class="btn btn-primary pull-right">Regist</button>
    </form>

    <br>
    <h3>List</h3>
    <button @click.prevent="listCont" class="btn btn-primary">Reload</button>
    <table class="table table-bordered table-condensed">
      <tr><th>Name</th><th>Address</th></tr>
      <tr v-for="cont in contracts">
        <td>{{cont.name}}</td><td>{{cont.addr}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Web3 from '../web3api.js'

var web3 = Web3.web3()

var contRegister = null

export default {
  data () {
    return {
      errorMsg: '',
      infoMsg: '',
      coinbase: '',
      receipt: '',
      contract: {
        name: '',
        addr: '',
        abi: '',
        source: ''
      },
      contracts: [],
      register: {
        addr: '0x2780d14f958f2113279227bf765e17ab66b0209d',
        abi: '[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contractInfos","outputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"},{"name":"abi","type":"string"},{"name":"source","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"},{"name":"abi","type":"string"},{"name":"source","type":"string"}],"name":"addContract","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"name":"ret","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"idx","type":"uint256"}],"name":"getContInfo","outputs":[{"name":"name","type":"string"},{"name":"addr","type":"address"},{"name":"abi","type":"string"},{"name":"source","type":"string"}],"type":"function"},{"constant":true,"inputs":[{"name":"idx","type":"uint256"}],"name":"tt","outputs":[{"name":"name","type":"string"}],"type":"function"}]'
      }
    }
  },
  created () {
    console.log('start labo')
    this.coinbase = web3.eth.coinbase
  },
  ready () {
    web3.eth.defaultAccount = web3.eth.accounts[0]
    if (typeof contRegister === 'undefined') {
      var cont = web3.eth.contract(JSON.parse(this.register.abi))
      contRegister = cont.at(this.register.addr)
      console.log('create instance of contract')
      console.log(contRegister)

      this.listCont()

      // var events = contRegister.allEvents({fromBlock: 0, toBlock: 'latest'})
      // events.watch((err, logs) => {
      //   if (err) this.errorMsg = err
      //   console.log(logs)
      // })
    }
  },
  methods: {
    listCont () {
      if (this.contracts.length > 0) this.contracts.splice(0, this.contracts.length)
      let count = contRegister.getCount.call()
      for (let i = 0; i < count; i++) {
        let cont = contRegister.getContInfo.call(i)
        this.contracts.push({name: cont[0], addr: cont[1]})
      }
    },
    registCont () {
      this.infoMsg = this.errorMsg = ''
      contRegister.addContract(this.contract.name,
        this.contract.addr,
        this.contract.abi,
        this.contract.source,
        (err, result) => {
          if (err) this.errorMsg = err
          this.infoMsg = result
        }
      )
    }

  }
}
</script>
