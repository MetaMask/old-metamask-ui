const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const extend = require('xtend')
const actions = require('./actions')
const AccountPanel = require('./components/account-panel')

module.exports = connect(mapStateToProps)(AccountsScreen)


function mapStateToProps(state) {
  return {
    identities: state.identities,
    activeAddress: state.pluginState.activeAddress,
    currentDomain: state.pluginState.currentDomain,
  }
}

inherits(AccountsScreen, Component)
function AccountsScreen() {
  Component.call(this)
}


AccountsScreen.prototype.render = function() {
  var state = this.props
  var identities = valuesFor(state.identities)
  var actions = {
    onSelect: this.onSelect.bind(this),
    onShowDetail: this.onShowDetail.bind(this),
  }
  return (

    h('.accounts-section.flex-column.flex-grow', [

      // subtitle and nav
      h('.flex-column.flex-center', [
        h('h2.page-subtitle', 'Accounts'),
        h('h3', 'Selected Address is visible to website below'),
      ]),

      // current domain
      h('.current-domain-panel.flex-center.font-small', [
        h('span', state.currentDomain),
      ]),

      // identity selection
      h('section.identity-section.flex-column',
        identities.map(renderAccountPanel)
      ),

    ])
    
  )

  function renderAccountPanel(identity){
    var isSelected = state.activeAddress === identity.address
    var componentState = extend(identity, actions, { isSelected: isSelected })
    return h(AccountPanel, componentState)
  }
}

AccountsScreen.prototype.onSelect = function(address, event){
  event.stopPropagation()
  this.props.dispatch(actions.selectActiveAccount(address))
}

AccountsScreen.prototype.onShowDetail = function(address, event){
  event.stopPropagation()
  this.props.dispatch(actions.showAccountDetail(address))
}

function valuesFor(obj) {
  return Object.keys(obj)
    .map(function(key){ return obj[key] })
}
