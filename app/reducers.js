const combineReducers = require('redux').combineReducers
const actions = require('./actions')
const extend = require('xtend')

// require {
//   SELECT_REDDIT, INVALIDATE_REDDIT,
//   REQUEST_POSTS, RECEIVE_POSTS
// } from './actions'

module.exports = combineReducers({
  appState: appState,
  metamask: metamask,
  identities: identities,
})

function appState(state, action) {

  // clone + defaults
  state = extend({
    currentView: {
      viewName: 'accounts',
    },
    currentDomain: 'meteor-dapp-boardroom.meteor.com',
  }, state)

  switch (action.type) {
  
  case actions.UNLOCK_METAMASK:
    return extend(state, {
      currentView: {
        viewName: 'accounts',
      },
    })

  case actions.SET_SELECTED_ACCOUNT:
    return extend(state, {
      activeAddress: action.value,
    })

  case actions.SHOW_ACCOUNT_DETAIL:
    return extend(state, {
      currentView: {
        viewName: 'accountDetail',
        context: action.value,
      },
    })

  case actions.SHOW_ACCOUNTS_PAGE:
    return extend(state, {
      currentView: {
        viewName: 'accounts',
      },
    }) 

  default:
    return state

  }
}

function metamask(state, action) {

  // clone + defaults
  state = extend({
    isUnlocked: false,
    currentDomain: 'meteor-dapp-boardroom.meteor.com',
    identities: {},
  }, state)

  switch (action.type) {

  case actions.UPDATE_METAMASK_STATE:
    return extend(state, action.value)

  case actions.UNLOCK_METAMASK:
    return extend(state, {
      isUnlocked: true,
    })

  case actions.LOCK_METAMASK:
    return extend(state, {
      isUnlocked: false,
    })

  default:
    return state

  }
}

function identities(state, action) {
  state = extend({

  }, state)

  switch (action.type) {
    // case INVALIDATE_REDDIT:
    // case RECEIVE_POSTS:
    // case REQUEST_POSTS:
    //   return Object.assign({}, state, {
    //     [action.reddit]: posts(state[action.reddit], action)
    //   })
    default:
      return state
  }
}
