<template>
  <div>
    <h2>Contract</h2>
    It wotks with eth client.
    <div>
      <a href="build/browser-solidity/index.html" target="sol">Solidity compiler</a>
    </div>
    <div class="well">
    personal.unlockAccount("{{coinbase}}")
    </div>

    <div id="editor"></div>

    <button @click.prevent="checkSrc" class="btn btn-primary">Check</button>
    <pre>{{source}}</pre>
    <pre>{{compileMsg | json}}</pre>
    <pre>
    contract SingleNumRegister {
        uint storedData;
        function set(uint x) {
            storedData = x;
        }
        function get() constant returns (uint retVal) {
        return storedData;
        }
    }
    </pre>
  </div>
</template>

<script>
// import { config } from '../config.js'
import Web3 from '../web3api.js'
var web3 = Web3.web3()

var editor, ace
if (typeof editor === 'undefined') {
  ace = require('brace')
  require('brace/mode/javascript')
  require('brace/theme/monokai')
  console.log('load brace')
}

export default {
  data () {
    return {
      coinbase: '',
      receipt: '',
      source: '',
      compileMsg: ''
    }
  },
  created () {
    console.log('start labo')
    this.coinbase = web3.eth.coinbase

    // var aa = require('../../assets/index.js')
    var solc = require('solc')
    var input = 'contract x { function g() {} }'
    var output = solc.compile(input, 1) // 1 activates the optimiser
    for (var contractName in output.contracts) {
      // code and ABI that are needed by web3
      console.log(contractName + ': ' + output.contracts[contractName].bytecode)
      console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
    }
  },
  ready: () => {
    editor = ace.edit('editor')
    editor.getSession().setTabSize(2)
    editor.setFontSize(16)
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/monokai')
  },
  methods: {
    checkSrc () {
      var src = editor.getValue().replace(/\r?\n/g, ' ')
      src = src.replace(/\s+/g, ' ')
      // console.log(src)
      this.source = src

      var compiled = web3.eth.compile.solidity(src, (error, result) => {
        if (error) {
          this.compileMsg = error
        } else {
          this.compileMsg = JSON.stringify(result)
          // console.log(obj)
          // if (result.length > 1) {
          // var func = result[0][0]
          // var abi = result[0][0]['info']
          // console.log(func)
          // console.log(abi)
          // this.compileMsg = func
          // } else {
            // this.compileMsg = 'compile error!!'
          // }
        }
      })
      console.log(compiled)
    }
  }
}
</script>

<style lang="stylus" acoped>
#editor
  // width 500px
  height 400px
</style>