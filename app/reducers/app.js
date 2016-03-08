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
    transForward: true,
  }, state.appState)

  switch (action.type) {

  // intialize

  case actions.SHOW_CREATE_VAULT:
    return extend(appState, {
      currentView: {
        name: 'createVault',
      },
      transForward: true,
    })

  case actions.SHOW_RESTORE_VAULT:
    return extend(appState, {
      currentView: {
        name: 'restoreVault',
      },
      transForward: true,
    })

  case actions.SHOW_INIT_MENU:
    return extend(appState, {
      currentView: defaultView,
      transForward: false,
    })

  case actions.SHOW_CONFIG_PAGE:
    return extend(appState, {
      currentView: {
        name: 'config',
      },
      transForward: true,
    })

  case actions.CREATE_NEW_VAULT_IN_PROGRESS:
    return extend(appState, {
      currentView: {
        name: 'createVault',
        inProgress: true,
      },
      transForward: true,
    })

  case actions.SHOW_NEW_VAULT_SEED:
    return extend(appState, {
      currentView: {
        name: 'createVaultComplete',
        context: action.value,
      },
      transForward: true,
    })

  // unlock

  case actions.UNLOCK_METAMASK:
    return extend(appState, {
      currentView: defaultView,
      transForward: true,
    })

  case actions.LOCK_METAMASK:
    return extend(appState, {
      transForward: false,
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
      transForward: true,
    })

  case actions.SHOW_ACCOUNTS_PAGE:
    return extend(appState, {
      currentView: {
        name: 'accounts',
      },
      transForward: appState.currentView.name == 'locked',
    })

  case actions.SHOW_CONF_TX_PAGE:
    return extend(appState, {
      currentView: {
        name: 'confTx',
        context: 0,
      },
      transForward: true,
    })

  case actions.UNLOCK_FAILED:
    return extend(appState, {
      passwordError: 'Incorrect password. Try again.'
    })

  default:
    return appState

  }
}
