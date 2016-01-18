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
    identities: state.metamask.identities,
    unconfTxs: state.metamask.unconfTxs,
    selectedAddress: state.metamask.selectedAddress,
    currentDomain: state.appState.currentDomain,
  }
}

inherits(AccountsScreen, Component)
function AccountsScreen() {
  Component.call(this)
}


AccountsScreen.prototype.render = function() {
  var state = this.props
  var identityList = valuesFor(state.identities)
  var unconfTxList = valuesFor(state.unconfTxs)
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
        identityList.map(renderAccountPanel)
      ),

    ])
    
  )

  function renderAccountPanel(identity){
    var isSelected = state.selectedAddress === identity.address
    var componentState = extend(actions, {
      identity: identity,
      isSelected: isSelected,
    })
    return h(AccountPanel, componentState)
  }
}

AccountsScreen.prototype.onSelect = function(address, event){
  event.stopPropagation()
  // if already selected, deselect
  if (this.props.selectedAddress === address) address = null
  this.props.dispatch(actions.setSelectedAddress(address))
}

AccountsScreen.prototype.onShowDetail = function(address, event){
  event.stopPropagation()
  this.props.dispatch(actions.showAccountDetail(address))
}

function valuesFor(obj) {
  if (!obj) return []
  return Object.keys(obj)
    .map(function(key){ return obj[key] })
}
