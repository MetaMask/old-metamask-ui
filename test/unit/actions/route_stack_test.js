var jsdom = require('mocha-jsdom')
var assert = require('assert')
var freeze = require('deep-freeze-strict')
var path = require('path')

var actions = require(path.join(__dirname, '..', '..', '..', 'app', 'actions.js'))
var reducers = require(path.join(__dirname, '..', '..', '..', 'app', 'reducers.js'))

describe ('route stack actions', function() {

  describe('lock screen', function() {
    var initialState = {
      appState: {
        routeStack: ['locked'],
        currentView: {
          name: 'locked',
        }
      }
    }
    freeze(initialState)

    describe('logging in', function() {
      it('should add accounts to the routeStack', function() {
        var result = reducers(initialState, {
          type: actions.UNLOCK_METAMASK,
        });
        assert.deepEqual(result.appState.routeStack, ['locked', 'accounts'])
      })
    })
  })

  describe('accounts view', function() {
    var initialState = {
      appState: {
        routeStack: ['locked', 'accounts'],
        currentView: {
          name: 'accounts',
        }
      }
    }
    freeze(initialState)


    describe('clicking lock', function() {
      it('should pop accounts off the stack', function() {
        var result = reducers(initialState, {
          type: actions.LOCK_METAMASK,
        })

        assert.deepEqual(result.appState.routeStack, ['locked'])
      })
    })

    describe('clicking config button', function() {
      it('should add config to routeStack', function() {
        var result = reducers(initialState, {
          type: actions.SHOW_CONFIG_PAGE,
        })

        assert.deepEqual(result.appState.routeStack, ['locked', 'accounts', 'config'])
      })
    })
  })
})

