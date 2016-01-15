const injectCss = require('inject-css')
const MetaMaskUi = require('./index.js')
const MetaMaskUiCss = require('./css.js')

// account management

var identities = {
  '0x1113462427bcc9133bb46e88bcbe39cd7ef0e111': {
    name: 'Walrus',
    img: 'QmW6hcwYzXrNkuHrpvo58YeZvbZxUddv69ATSHY3BHpPdd',
    address: '0x1113462427bcc9133bb46e88bcbe39cd7ef0e111',
    balance: 220,
    txCount: 4,
  },
  '0x222462427bcc9133bb46e88bcbe39cd7ef0e7222': {
    name: 'Tardus',
    img: 'QmQYaRdrf2EhRhJWaHnts8Meu1mZiXrNib5W1P6cYmXWRL',
    address: '0x222462427bcc9133bb46e88bcbe39cd7ef0e7222',
    balance: 10.005,
    txCount: 16,
  },
  '0x333462427bcc9133bb46e88bcbe39cd7ef0e7333': {
    name: 'Gambler',
    img: 'QmW6hcwYzXrNkuHrpvo58YeZvbZxUddv69ATSHY3BHpPdd',
    address: '0x333462427bcc9133bb46e88bcbe39cd7ef0e7333',
    balance: 0.000001,
    txCount: 1,
  }
}

var isUnlocked = false
var selectedAddress = null

function getState(){
  return {
    isUnlocked: isUnlocked,
    identities: isUnlocked ? identities : {},
    selectedAddress: selectedAddress,
  }
}

var accountManager = {
  getState: function(cb){
    cb(null, getState())
  },
  setLocked: function(){
    isUnlocked = false
  },
  submitPassword: function(password, cb){
    if (password === 'test') {
      isUnlocked = true
      cb(null, getState())
    } else {
      cb(new Error('Bad password -- try "test"'))
    }
  },
  setSelectedAddress: function(address, cb){
    selectedAddress = address
    cb(null, getState())
  },
  signTransaction: function(txParams, cb){
    alert('signing tx....')
  },
}

// start app

var container = document.getElementById('app-content')

var css = MetaMaskUiCss()
injectCss(css)

var app = MetaMaskUi({
  container: container,
  accountManager: accountManager
})