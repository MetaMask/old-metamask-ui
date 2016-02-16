const inherits = require('util').inherits
const EventEmitter = require('events').EventEmitter
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const getCaretCoordinates = require('textarea-caret')
const Mascot = require('./components/mascot')
const actions = require('./actions')

module.exports = connect(mapStateToProps)(InitializeScreen)


inherits(InitializeScreen, Component)
function InitializeScreen() {
  Component.call(this)
  this.animationEventEmitter = new EventEmitter()
}

function mapStateToProps(state) {
  return {
    // state from plugin
    currentView: state.appState.currentView,
  }
}



InitializeScreen.prototype.render = function() {
  var state = this.props

  var isRestore = (state.currentView.name === 'restoreVault')
  var isCreate = (state.currentView.name === 'createVault')

  if (isRestore) {
    return this.renderRestoreVault()
  } else if (isCreate) {
    return this.renderCreateVault()
  } else {
    return this.renderMenu()
  }
}

// InitializeScreen.prototype.componentDidMount = function(){
//   document.getElementById('password-box').focus()
// }

InitializeScreen.prototype.renderMenu = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      h('h2.page-subtitle', 'Welcome!'),

      h(Mascot, {
        animationEventEmitter: this.animationEventEmitter,
      }),

      h('button.thin-btn', {
        onClick: this.showCreateVault.bind(this),
      }, 'Create New Vault'),
      
      h('.flex-row.flex-center.flex-grow', [
        h('hr'),
        h('div', 'OR'),
        h('hr'),
      ]),

      h('button.thin-btn', {
        onClick: this.showRestoreVault.bind(this),
      }, 'Restore Existing Vault'),

    ])

  ) 
}

InitializeScreen.prototype.renderCreateVault = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      h('h2.page-subtitle', 'Create Vault'),

    ])

  ) 
}

InitializeScreen.prototype.renderRestoreVault = function() {
  var state = this.props
  return (
    
    h('.initialize-screen.flex-column.flex-center.flex-grow', [

      h('h2.page-subtitle', 'Restore Vault'),

    ])

  ) 
}

InitializeScreen.prototype.showCreateVault = function() {
  this.props.dispatch(actions.showCreateVault())
}

InitializeScreen.prototype.showRestoreVault = function() {
  this.props.dispatch(actions.showRestoreVault())
}

InitializeScreen.prototype.onKeyPress = function(event) {
  if (event.key === 'Enter') {
    this.submitPassword(event)
  }
}

InitializeScreen.prototype.submitPassword = function(event){
  var element = event.target
  var password = element.value
  element.value = ''
  this.props.submitPassword(password)
}

InitializeScreen.prototype.inputChanged = function(event){
  // tell mascot to look at page action
  var element = event.target
  var boundingRect = element.getBoundingClientRect()
  var coordinates = getCaretCoordinates(element, element.selectionEnd)
  this.animationEventEmitter.emit('point', {
    x: boundingRect.left + coordinates.left - element.scrollLeft,
    y: boundingRect.top + coordinates.top - element.scrollTop,
  })
}

InitializeScreen.prototype.emitAnim = function(name, a, b, c){
  this.animationEventEmitter.emit(name, a, b, c)
}