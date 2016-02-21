var Web3 = require('web3')
console.log('web3api')
// module.exports = Web3

var web3

exports.web3 = function () {
  if (typeof web3 === 'undefined') {
    web3 = new Web3()
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'))
    console.log('new web3')
  }
  if (!web3.isConnected()) {
    window.alert('ノードに接続できません')
  }
  return web3
}
