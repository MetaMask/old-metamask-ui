var jsdom = require('mocha-jsdom')
var assert = require('assert')
var freeze = require('deep-freeze-strict')
var path = require('path')

var actions = require(path.join(__dirname, '..', '..', '..', 'app', 'actions.js'))
var reducers = require(path.join(__dirname, '..', '..', '..', 'app', 'reducers.js'))

describe('SET_RPC_TARGET', function() {

  it('sets the state.appState.activeRpcTarget property of the state to the action.value', function() {
    var initialState = {
      appState: {
        activeRpcTarget: 'foo',
      }
    }
    freeze(initialState)

    const action = {
      type: actions.SET_RPC_TARGET,
      value: 'bar',
    }
    freeze(action)

    var resultingState = reducers(initialState, action)
    assert.equal(resultingState.appState.activeRpcTarget, action.value)
  });
});
