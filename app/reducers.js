const combineReducers = require('redux').combineReducers
const actions = require('./actions')
const extend = require('xtend')

// require {
//   SELECT_REDDIT, INVALIDATE_REDDIT,
//   REQUEST_POSTS, RECEIVE_POSTS
// } from './actions'

module.exports = combineReducers({
  pluginState: pluginState,
  identities: identities,
})

function pluginState(state, action) {

  // clone + defaults
  state = extend({
    isActive: true,
    activeAccount: null,
    currentView: {
      viewName: 'accounts',
    },
    currentDomain: 'meteor-dapp-boardroom.meteor.com',
  }, state)

  switch (action.type) {
  
  case actions.SET_METAMASK_ACTIVE:
    return extend(state, {
      isActive: action.value,
      currentView: {
        viewName: 'accounts',
      },
    })

  case actions.TOGGLE_ACCOUNT_ACTIVE:
    // abort if not active
    if (!state.isActive) return state
    // deselect
    if (state.activeAddress === action.value) {
      return extend(state, {
        activeAddress: null,
      })
    // select
    } else {
      return extend(state, {
        activeAddress: action.value,
      })
    }

  case actions.SHOW_ACCOUNT_DETAIL:
    // abort if not active
    if (!state.isActive) return state
    return extend(state, {
      currentView: {
        viewName: 'accountDetail',
        context: action.value,
      },
    })

  case actions.SHOW_ACCOUNTS_PAGE:
     // abort if not active
    if (!state.isActive) return state
    return extend(state, {
      currentView: {
        viewName: 'accounts',
      },
    }) 

  default:
    return state
  }
}

function identities(state, action) {
  state = extend({
    '0x1113462427bcc9133bb46e88bcbe39cd7ef0e111': {
      name: 'Walrus',
      img: './app/img/identicon-walrus.png',
      address: '0x1113462427bcc9133bb46e88bcbe39cd7ef0e111',
      balance: 220,
      txCount: 4,
    },
    '0x222462427bcc9133bb46e88bcbe39cd7ef0e7222': {
      name: 'Tardus',
      img: './app/img/identicon-tardigrade.png',
      address: '0x222462427bcc9133bb46e88bcbe39cd7ef0e7222',
      balance: 10.005,
      txCount: 16,
    },
    '0x333462427bcc9133bb46e88bcbe39cd7ef0e7333': {
      name: 'Gambler',
      img: './app/img/identicon-walrus.png',
      address: '0x333462427bcc9133bb46e88bcbe39cd7ef0e7333',
      balance: 0.000001,
      txCount: 1,
    }
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

function posts(state, action) {
  state = state || {}
  switch (action.type) {
  //   case INVALIDATE_REDDIT:
  //     return Object.assign({}, state, {
  //       didInvalidate: true
  //     })
  //   case REQUEST_POSTS:
  //     return Object.assign({}, state, {
  //       isFetching: true,
  //       didInvalidate: false
  //     })
  //   case RECEIVE_POSTS:
  //     return Object.assign({}, state, {
  //       isFetching: false,
  //       didInvalidate: false,
  //       items: action.posts,
  //       lastUpdated: action.receivedAt
  //     })
    default:
      return state
  }
}

