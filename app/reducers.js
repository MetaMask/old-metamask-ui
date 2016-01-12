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
      view: 'acccounts',
    },
  }, state)

  switch (action.type) {
  
  case actions.SET_METAMASK_ACTIVE:
    return extend(state, {
      isActive: action.value,
      currentView: {
        view: 'acccounts',
      },
    })

  case actions.SELECT_ACTIVE_ACCOUNT:
    // abort if not active
    if (!state.isActive) return state
    return extend(state, {
      activeAddress: action.value,
    })

  case actions.SHOW_ACCOUNT_DETAIL:
    // abort if not active
    if (!state.isActive) return state
    return extend(state, {
      currentView: {
        view: 'acccountDetail',
        context: action.value,
      },
    })

  default:
    return state
  }
}

function identities(state, action) {
  state = extend({
    '0x18a3462427bcc9133bb46e88bcbe39cd7ef0e761': {
      address: '0x18a3462427bcc9133bb46e88bcbe39cd7ef0e761',
      balance: 220,
      txCount: 4,
    },
    '0x8a3462427bcc9133bb46e88bcbe39cd7ef0e7618': {
      address: '0x8a3462427bcc9133bb46e88bcbe39cd7ef0e7618',
      balance: 10.005,
      txCount: 16,
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

