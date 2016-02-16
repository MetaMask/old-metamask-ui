const combineReducers = require('redux').combineReducers
const actions = require('./actions')
const extend = require('xtend')

module.exports = rootReducer


function rootReducer(state, action) {

  // clone
  state = extend(state)

  //
  // Identities
  //

  state.identities = reduceIdentities(state, action)

  //
  // MetaMask
  //

  state.metamask = reduceMetamask(state, action)

  //
  // AppState
  //

  state.appState = reduceApp(state, action)


  return state
  
}

//
// Sub-Reducers take in the complete state and return their sub-state
//

function reduceApp(state, action) {
  
  // clone and defaults
  var defaultView = {
    name: 'accounts',
  }

  var appState = extend({
    currentView: defaultView,
    currentDomain: 'example.com',
  }, state.appState)

  switch (action.type) {

  case actions.SHOW_CREATE_VAULT:
    return extend(appState, {
      currentView: {
        name: 'createVault',
      }
    })
  case actions.SHOW_RESTORE_VAULT:
    return extend(appState, {
      currentView: {
        name: 'restoreVault',
      }
    })
  case actions.SHOW_INIT_MENU:
    return extend(appState, {
      currentView: defaultView,
    })
  
  case actions.UNLOCK_METAMASK:
    return extend(appState, {
      currentView: defaultView,
    })

  case actions.SET_SELECTED_ACCOUNT:
    return extend(appState, {
      activeAddress: action.value,
    })

  case actions.SHOW_ACCOUNT_DETAIL:
    return extend(appState, {
      currentView: {
        name: 'accountDetail',
        context: action.value,
      },
    })

  case actions.SHOW_ACCOUNTS_PAGE:
    return extend(appState, {
      currentView: {
        name: 'accounts',
      },
    })

  case actions.SHOW_CONF_TX_PAGE:
    return extend(appState, {
      currentView: {
        name: 'confTx',
        context: 0,
      },
    })

  default:
    return appState

  }
}

function reduceMetamask(state, action) {

  // clone + defaults
  var metamaskState = extend({
    isInitialized: false,
    isUnlocked: false,
    currentDomain: 'example.com',
    identities: {},
    unconfTxs: {},
  }, state.metamask)

  switch (action.type) {

  case actions.UPDATE_METAMASK_STATE:
    return extend(metamaskState, action.value)

  case actions.UNLOCK_METAMASK:
    return extend(metamaskState, {
      isUnlocked: true,
    })

  case actions.LOCK_METAMASK:
    return extend(metamaskState, {
      isUnlocked: false,
    })

  default:
    return metamaskState

  }
}

function reduceIdentities(state, action) {
  
  // clone + defaults
  var idState = extend({

  }, state.identities)

  switch (action.type) {
    default:
      return idState
  }

}
