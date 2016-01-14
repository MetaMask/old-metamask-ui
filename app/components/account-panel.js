const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')

module.exports = AccountPanel


inherits(AccountPanel, Component)
function AccountPanel() {
  Component.call(this)
}


AccountPanel.prototype.render = function() {
  var state = this.props

  return (

    h('.identity-panel.flex-row.flex-space-between.full-height'+(state.isSelected?'.selected':''), {
      onClick: state.onSelect && state.onSelect.bind(null, state.address),
    }, [

      // account identicon
      h('.identicon-wrapper.flex-column.select-none', [
        h('.identicon', {
          style: { backgroundImage: 'url("'+state.img+'")' }
        }),
        h('span.font-small', state.name),
      ]),

      // account address, balance
      h('.identity-data.flex-column.flex-justify-center.flex-grow.select-none', [
        
        h('.flex-row.flex-space-between', [
          h('label.font-small', 'ADDRESS'),
          h('span.font-small', addressSummary(state.address)),
        ]),
        
        h('.flex-row.flex-space-between', [
          h('label.font-small', 'BALANCE'),
          h('span.font-small', formatBalance(state.balance)),
        ]),

        // outlet for inserting additional stuff
        state.children,

      ]),

      // navigate to account detail
      !state.onShowDetail ? null :
        h('.arrow-right.cursor-pointer', {
          onClick: state.onShowDetail && state.onShowDetail.bind(null, state.address),
        }, [
          h('i.fa.fa-chevron-right.fa-lg'),
        ]),

    ])

  )
}


function addressSummary(address) {
  return address.slice(0,2+6)+'...'+address.slice(-4)
}

function formatBalance(balance) {
  return balance.toFixed(6)+' ETH'
}
