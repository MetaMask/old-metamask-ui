const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const Component = require('react').Component
const h = require('react-hyperscript')
const getCaretCoordinates = require('textarea-caret')
const Mascot = require('./mascot')

module.exports = UnlockScreen


inherits(UnlockScreen, Component)
function UnlockScreen() {
  Component.call(this)
  this.animationEventEmitter = new EventEmitter()
}


UnlockScreen.prototype.render = function() {
  return (
    
    h('.unlock-screen.flex-column.flex-center.flex-grow', [

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
        onFocus: this.emitAnim.bind(this, 'setFollowMouse', false),
        onBlur: this.emitAnim.bind(this, 'setFollowMouse', true),
      }),

    ])

  )
}

UnlockScreen.prototype.onKeyPress = function(event) {
  if (event.key === 'Enter') {
    this.submitPassword(event)
  }
}

UnlockScreen.prototype.submitPassword = function(event){
  var element = event.target
  var password = element.value
  element.value = ''
  this.props.submitPassword(password)
}

UnlockScreen.prototype.inputChanged = function(event){
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