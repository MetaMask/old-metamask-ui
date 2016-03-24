const extend = require('xtend')
const actions = require('../actions')

module.exports = reduceMetamask

function reduceMetamask(state, action) {

  // clone + defaults
  var metamaskState = extend({
    isInitialized: false,
    isUnlocked: false,
    currentDomain: 'example.com',
    rpcTarget: 'https://rawtestrpc.metamask.io/',
    identities: {},
    unconfTxs: {},
  }, state.metamask)

  switch (action.type) {

  case actions.SHOW_ACCOUNTS_PAGE:
    var state = extend(metamaskState)
    delete state.seedWords
    return state

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

  case actions.SET_RPC_TARGET:
    return extend(metamaskState, {
      rpcTarget: action.value,
    })

  case actions.COMPLETED_TX:
    var stringId = String(action.id)
    var newState = extend(metamaskState, {
      unconfTxs: {}
    })
    for (var id in metamaskState.unconfTxs) {
      if (id !== stringId) {
        newState.unconfTxs[id] = metamaskState.unconfTxs[id]
      }
    }
    return newState

  default:
    return metamaskState

  }
}
