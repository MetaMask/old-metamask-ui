const extend = require('xtend')
const actions = require('../actions')

module.exports = reduceApp

function reduceApp(state, action) {

  // clone and defaults
  var defaultView = {
    name: 'accounts',
  }

  var appState = extend({
    currentView: defaultView,
    currentDomain: 'example.com',
    routeStack: ['locked'],
  }, state.appState)

  switch (action.type) {

  // intialize

  case actions.SHOW_CREATE_VAULT:
    return extend(appState, {
      currentView: {
        name: 'createVault',
      },
      routeStack: appState.routeStack.concat('createVault'),
    })

  case actions.SHOW_RESTORE_VAULT:
    return extend(appState, {
      currentView: {
        name: 'restoreVault',
      },
      routeStack: appState.routeStack.concat('restoreVault'),
    })

  case actions.SHOW_INIT_MENU:
    return extend(appState, {
      currentView: defaultView,
      routeStack: ['locked', defaultView.name],
    })

  case actions.SHOW_CONFIG_PAGE:
    return extend(appState, {
      currentView: {
        name: 'config',
      },
      routeStack: appState.routeStack.concat('config'),
    })

  case actions.CREATE_NEW_VAULT_IN_PROGRESS:
    return extend(appState, {
      currentView: {
        name: 'createVault',
        inProgress: true,
      },
      routeStack: appState.routeStack.concat('createVault'),
    })

  case actions.SHOW_NEW_VAULT_SEED:
    return extend(appState, {
      currentView: {
        name: 'createVaultComplete',
        context: action.value,
      },
      routeStack: appState.routeStack.concat('createVaultComplete'),
    })

  case actions.SET_RPC_TARGET:
    return extend(appState, {
      activeRpcTarget: action.value,
    })

  // unlock

  case actions.UNLOCK_METAMASK:
    return extend(appState, {
      currentView: defaultView,
      routeStack: appState.routeStack.concat(defaultView.name),
    })

  case actions.LOCK_METAMASK:
    return extend(appState, {
      routeStack: ['locked'],
    })

  // accounts

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
      routeStack: appState.routeStack.concat('accountDetail'),
    })

  case actions.SHOW_ACCOUNTS_PAGE:
    return extend(appState, {
      currentView: {
        name: 'accounts',
      },
      routeStack: ['locked', 'accounts'],
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
