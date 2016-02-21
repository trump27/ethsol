<template>
  <div>
    <h2>Send</h2>

    <div v-if="validateMsg" class="alert alert-danger">{{validateMsg}}</div>
    <form class="form">
      <div class="form-group">
        <label for="sendFrom">Form</label>
        <select v-model="selectedFrom" id="sendFrom" class="form-control">
          <option v-for="option in fromList" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div v-if="selectedFrom">
          <code>Please unlock account. See below.</code>
          <pre>personal.unlockAccount("{{selectedFrom}}")</pre>
        </div>

        <label for="sendTo">To</label>
        <select v-model="selectedTo" id="sendTo" class="form-control">
          <option v-for="option in toList" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
        <label for="sendEther">Value(ether)</label>
        <input type="text" v-model="sendEther" class="form-control" id="sendEther">
        <br>
        <button @click.prevent="sendTransaction" class="btn btn-primary">Send transaction</button>
      </div>
    </form>
    <div v-if="sendResult" class="alert alert-success">
      {{sendResult}}
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
      validateMsg: '',
      fromList: [],
      toList: [],
      selectedFrom: '',
      selectedTo: '',
      sendEther: 0,
      sendResult: ''
    }
  },
  created () {
    console.log('start send')

    var list = web3.eth.accounts
    for (var idx in list) {
      this.fromList.push({text: list[idx], value: list[idx]})
      this.toList.push({text: list[idx], value: list[idx]})
    }
  },

  methods: {
    sendTransaction () {
      this.validateMsg = ''
      this.sendResult = ''
      // check
      this.sendEther = this.sendEther.trim()
      if (this.sendEther < 1) {
        this.validateMsg = 'valueが妥当でない'
        return
      }
      if (!this.selectedFrom || !this.selectedTo) {
        this.validateMsg = 'From、Toが未入力'
        return
      }
      if (this.selectedFrom === this.selectedTo) {
        this.validateMsg = 'From、Toが妥当でない'
        return
      }
      // send
      web3.eth.defaultAccount = this.selectedFrom
      var sendObject = {
        from: this.selectedFrom,
        to: this.selectedTo,
        value: web3.toWei(this.sendEther, 'ether')
      }
      var self = this
      web3.eth.sendTransaction(sendObject, function (error, address) {
        if (error) {
          self.validateMsg = error
        } else {
          self.sendResult = address
        }
      })
    }
  }
}
</script>
