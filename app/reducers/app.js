const extend = require('xtend')
const actions = require('../actions')

module.exports = reduceApp

function reduceApp(state, action) {

  // clone and defaults
  var defaultView = {
    name: 'accounts',
  }

  // confirm seed words
  var seedConfView = {
    name: 'createVaultComplete',
  }
  var seedWords = state.metamask.seedWords

  var appState = extend({
    currentView: seedWords ? seedConfView : defaultView,
    currentDomain: 'example.com',
    transForward: true,
    isLoading: false,
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

  case actions.SHOW_INFO_PAGE:
    return extend(appState, {
      currentView: {
        name: 'info',
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
      isLoading: true,
    })

  case actions.SHOW_NEW_VAULT_SEED:
    return extend(appState, {
      currentView: {
        name: 'createVaultComplete',
        context: action.value,
      },
      transForward: true,
      isLoading: false,
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
    var seedWords = state.metamask.seedWords
    return extend(appState, {
      currentView: {
        name: seedWords ? 'createVaultComplete' : 'accounts',
      },
      transForward: appState.currentView.name == 'locked',
      isLoading: false,
    })

  case actions.SHOW_CONF_TX_PAGE:
    return extend(appState, {
      currentView: {
        name: 'confTx',
        context: 0,
      },
      transForward: true,
    })

  case actions.COMPLETED_TX:
    var unconfTxs = Object.keys(state.metamask.unconfTxs).filter(tx => tx !== tx.id)
    if (unconfTxs && unconfTxs.length > 0) {
      return extend(appState, {
        transForward: false,
        currentView: {
          name: 'confTx',
          context: 0,
        }
      })
    } else {
      return extend(appState, {
        transForward: false,
        currentView: {
          name: 'accounts',
          context: 0,
        },
        transForward: false,
      })
    }

  case actions.NEXT_TX:
    return extend(appState, {
      transForward: true,
      currentView: {
        name: 'confTx',
        context: ++appState.currentView.context
      }
    })

  case actions.PREVIOUS_TX:
    return extend(appState, {
      transForward: false,
      currentView: {
        name: 'confTx',
        context: --appState.currentView.context
      }
    })

  case actions.TRANSACTION_ERROR:
    return extend(appState, {
      currentView: {
        name: 'confTx',
        errorMessage: 'There was a problem submitting this transaction.',
      }
    })

  case actions.UNLOCK_FAILED:
    return extend(appState, {
      passwordError: 'Incorrect password. Try again.'
    })

  case actions.SHOW_LOADING:
    return extend(appState, {
      isLoading: true,
    })

  case actions.HIDE_LOADING:
    return extend(appState, {
      isLoading: false,
    })

  case actions.CLEAR_SEED_WORD_CACHE:
    return extend(appState, {
      transForward: true,
      currentView: {
        name: 'accounts',
      },
      isLoading: false,
    })

  default:
    return appState

  }
}
