const React = require('react')
const render = require('react-dom').render
const h = require('react-hyperscript')
const extend = require('xtend')
const Root = require('./app/root')
const actions = require('./app/actions')
const configureStore = require('./app/store')

module.exports = launchApp

function launchApp(opts) {
  
  var accountManager = opts.accountManager
  actions._setAccountManager(accountManager)

  // check if we are unlocked first
  accountManager.getState(function(err, metamaskState){
    if (err) throw err
    startApp(metamaskState, opts)
  })

}

function startApp(metamaskState, opts){

  // parse opts
  var store = configureStore({
    metamask: metamaskState,
  })

  // start app
  render(
    h(Root, {
      // inject initial state
      store: store,
    }
  ), opts.container)

}