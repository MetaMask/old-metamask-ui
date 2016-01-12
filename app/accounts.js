const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('./actions')

module.exports = connect(mapStateToProps)(AccountsPanel)

function mapStateToProps(state) {
  return {
    identities: state.identities,
    activeAddress: state.pluginState.activeAddress,
  }
}

inherits(AccountsPanel, Component)
function AccountsPanel() {
  Component.call(this)
}


AccountsPanel.prototype.render = function() {
  var state = this.props
  var identityProps = {
    activeAddress: state.activeAddress,
    onSelect: this.onSelect.bind(this),
    onShowDetail: this.onShowDetail.bind(this),
  }
  return (

    h('.flex-column.flex-grow', [

      h('.flex-row.flex-space-between', [
        h('span.bold', 'Your Wallets'),
        h('button', '+ NEW'),
      ]),

      h('section.identity-section.flex-column', valuesFor(state.identities)
      .map(identityPanel.bind(null, identityProps))),

    ])
    
  )
}

AccountsPanel.prototype.onSelect = function(address, event){
  event.stopPropagation()
  this.props.dispatch(actions.selectActiveAccount(address))
}

AccountsPanel.prototype.onShowDetail = function(address, event){
  event.stopPropagation()
  this.props.dispatch(actions.showAccountDetail(address))
}

function identityPanel(props, identity){
  // pseudo-random identicon
  var imgSrc = identity.address.slice(2,3)>'7' ? 
    './app/img/identicon-walrus.png' :
    './app/img/identicon-tardigrade.png'
    console.log(identity.address, props.activeAddress)
  var isSelected = (identity.address === props.activeAddress)

  return (

    h('.identity-panel.flex-row.flex-space-between.full-height'+(isSelected?'.selected':''), {
      onClick: props.onSelect.bind(null, identity.address),
    }, [

      // account identicon
      h('.identicon', {
        style: {
          backgroundImage: 'url("'+imgSrc+'")',
        }
      }),

      // account address, balance
      h('.identity-data.flex-column.flex-space-between.flex-grow.select-none', [
        h('.flex-row.flex-space-between', [
          h('label.font-small', 'ADDRESS'),
          h('span.font-small', addressSummary(identity.address)),
        ]),
        h('.flex-row.flex-space-between', [
          h('label.font-small', 'BALANCE'),
          h('span.font-small', formatBalance(identity.balance)),
        ]),
      ]),

      // navigate to account detail
      h('.arrow-right.cursor-pointer', {
        onClick: props.onShowDetail.bind(null, identity.address),
      }, [
        h('i.fa.fa-chevron-right.fa-lg'),
      ])

    ])

  )
}

function valuesFor(obj) {
  return Object.keys(obj)
    .map(function(key){ return obj[key] })
}

function addressSummary(address) {
  return address.slice(0,2+6)+'...'+address.slice(-4)
}

function formatBalance(balance) {
  return balance.toFixed(6)+' ETH'
}
