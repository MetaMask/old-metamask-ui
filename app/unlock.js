const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('./actions')
const Mascot = require('./components/mascot')
const getCaretCoordinates = require('textarea-caret')
const EventEmitter = require('events').EventEmitter

module.exports = connect(mapStateToProps)(UnlockScreen)


inherits(UnlockScreen, Component)
function UnlockScreen() {
  Component.call(this)
  this.animationEventEmitter = new EventEmitter()
}

function mapStateToProps(state) {
  return {}
}

UnlockScreen.prototype.render = function() {
  return (
    
    h('.unlock-screen.flex-column.flex-center.flex-grow', [

      h('h2.page-subtitle', 'Welcome!'),

      h(Mascot, {
        animationEventEmitter: this.animationEventEmitter,
      }),

      h('label', {
        htmlFor: 'password-box',
      }, 'Enter Password:'),

      h('input', {
        type: 'password',
        id: 'password-box',
        onKeyPress: this.onKeyPress.bind(this),
        onInput: this.inputChanged.bind(this),
      }),

    ])

  )
}

UnlockScreen.prototype.componentDidMount = function(){
  document.getElementById('password-box').focus()
}

UnlockScreen.prototype.onKeyPress = function(event) {
  if (event.key === 'Enter') {
    this.submitPassword(event)
  }
}

UnlockScreen.prototype.submitPassword = function(event){
  var element = event.target
  var password = element.value
  // reset input
  element.value = ''
  this.props.dispatch(actions.tryUnlockMetamask(password))
}

UnlockScreen.prototype.inputChanged = function(event){
  // tell mascot to look at page action
  var element = event.target
  var boundingRect = element.getBoundingClientRect()
  var coordinates = getCaretCoordinates(element, element.selectionEnd)
  this.animationEventEmitter.emit('point', {
    x: boundingRect.left + coordinates.left - element.scrollLeft,
    y: boundingRect.top + coordinates.top - element.scrollTop,
  })
}

UnlockScreen.prototype.emitAnim = function(name, a, b, c){
  this.animationEventEmitter.emit(name, a, b, c)
}