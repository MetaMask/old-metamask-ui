const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('./actions')

module.exports = connect(mapStateToProps)(LoadingIndicator)

function mapStateToProps(state) {
  return {
    isLoading: state.appState.isLoading,
  }
}

inherits(LoadingIndicator, Component)
function LoadingIndicator() {
  Component.call(this)
}

LoadingIndicator.prototype.render = function() {
  console.dir(this.props)
  var isLoading = this.props.isLoading

  return (
    h('div', {
      style: {
        position: 'absolute',
        display: isLoading ? 'block' : 'none',
        height: '100%',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.5)',
      }
    }, [
      'LOADING MOFO!'
    ])
  )
}

