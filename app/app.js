const inherits = require('util').inherits
const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const extend = require('xtend')
const Toggle = require('react-toggle')
const actions = require('./actions')
const UnlockScreen = require('./unlock')
// const selectReddit = require('../actions').selectReddit
// const fetchPostsIfNeeded = require('../actions').fetchPostsIfNeeded
// const invalidateReddit = require('../actions').invalidateReddit
// const Picker = require('../components/Picker')
// const Posts = require('../components/Posts')

module.exports = connect(mapStateToProps)(App)



// actions


// actions end 


inherits(App, Component)
function App() { Component.call(this) }

function mapStateToProps(state) {
  return {
    isActive: state.pluginState.isActive,
    identities: state.identities,
  }
}

App.prototype.render = function() {
  // const { selectedReddit, posts, isFetching, lastUpdated } = this.props
  var state = this.props
  return (

    h('.flex-column.flex-grow.full-height', [
      
      // top row
      h('.app-header.flex-column.flex-center', [
        h('h1', 'MetaMask'),
        h('h2', 'Welcome!'),
      ]),

      // panel content
      h('.app-primary.flex-row.flex-grow', this.renderPrimary()),

      // footer
      h('.app-footer.flex-row.flex-space-around', [
        // settings
        'settings',
        // toggle
        onOffToggle({
          toggleMetamaskActive: this.toggleMetamaskActive.bind(this),
          isActive: state.isActive,
        }),
        // help
        'help',
      ]),
      
    ])

  )
}

App.prototype.toggleMetamaskActive = function(){
  if (!this.props.isActive) {
    // currently inactive: redirect to password box
    var passwordBox = document.querySelector('input[type=password]')
    if (!passwordBox) return
    passwordBox.focus()
  } else {
    // currently active: deactivate
    this.props.dispatch(actions.setMetamaskActive(false))
  }
}

App.prototype.unlockWithPassword = function(password){
  if (password === 'test') {
    this.props.dispatch(actions.setMetamaskActive(true))
  } else {
    console.log('incorrect password. try "test".')
  }
}

App.prototype.renderPrimary = function(state){
  var state = this.props
  var content = null

  if (state.isActive) {
    content = h('span', 'unlocked!')
  } else {
    content = h(UnlockScreen, {
      submitPassword: this.unlockWithPassword.bind(this),
    })
  }

  return [content]

    // h('.flex-row.flex-space-between', [
    //   h('span.bold', 'Your Wallets'),
    //   h('button', '+ NEW'),
    // ]),

    // h('section.identity-section.flex-column', valuesFor(state.identities).map(identityPanel)),
}

function onOffToggle(state){
  return (
    
    h('.app-toggle.flex-row.flex-center', [
      h('label', 'OFF'),
      h(Toggle, {
        checked: state.isActive,
        // disabled: !state.isActive,
        onChange: state.toggleMetamaskActive,
      }),
      h('label', 'ON'),
    ])

  )
}

function identityPanel(identity){
  return (

    h('.identity-panel.flex-row.flex-space-between', [
      
      h('span.bold', identity.name),

      h('.flex-column.flex-space-between', [
        h('.flex-row.flex-left.flex-space-between', [
          h('span.font-small', 'ADDRESS'),
          h('span.font-small', addressSummary(identity.address)),
        ]),
        h('.flex-row.flex-left.flex-space-between', [
          h('span.font-small', 'BALANCE'),
          h('span.font-small', identity.balance.toString()+' ETH'),
        ]),
      ]),

    ])

  )
}

function valuesFor(obj) {
  return Object.keys(obj)
    .map(function(key){ return obj[key] })
}

function addressSummary(address) {
  return address.slice(0,8)+'...'+address.slice(-4)
}

// class AsyncApp extends Component {
//   constructor(props) {
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.handleRefreshClick = this.handleRefreshClick.bind(this)
//   }

//   componentDidMount() {
//     const { dispatch, selectedReddit } = this.props
//     dispatch(fetchPostsIfNeeded(selectedReddit))
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.selectedReddit !== this.props.selectedReddit) {
//       const { dispatch, selectedReddit } = nextProps
//       dispatch(fetchPostsIfNeeded(selectedReddit))
//     }
//   }

//   handleChange(nextReddit) {
//     this.props.dispatch(selectReddit(nextReddit))
//   }

//   handleRefreshClick(e) {
//     e.preventDefault()

//     const { dispatch, selectedReddit } = this.props
//     dispatch(invalidateReddit(selectedReddit))
//     dispatch(fetchPostsIfNeeded(selectedReddit))
//   }

//   render() {
//     const { selectedReddit, posts, isFetching, lastUpdated } = this.props
//     return (

//       h('div', [
//         h(Picker, {
//           value: selectedReddit,
//           onChange: this.handleChange,
//           options: [ 'reactjs', 'frontend'],
//         }),
//         // h('p', [
//         //   lastUpdated && h('span', `Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`),
//         //   !isFetching && h('a', { href: '#', onClick: this.handleRefreshClick }, 'Refresh'),
//         // ]),
//         isFetching && posts.length === 0 && h('h2', 'Loading...'),
//         !isFetching && posts.length === 0 && h('h2', 'Empty.'),
//         posts.length > 0 && h('div', { style: { opacity: isFetching ? 0.5 : 1 } }, [
//           h(Posts, { posts: posts }),
//         ]),
//       ])

//     )
//   }
// }

// AsyncApp.propTypes = {
//   selectedReddit: PropTypes.string.isRequired,
//   posts: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// }

// function mapStateToProps(state) {
//   const { selectedReddit, postsByReddit } = state
//   const {
//     isFetching,
//     lastUpdated,
//     items: posts
//   } = postsByReddit[selectedReddit] || {
//     isFetching: true,
//     items: []
//   }

//   return {
//     selectedReddit,
//     posts,
//     isFetching,
//     lastUpdated
//   }
// }

// export default connect(mapStateToProps)(AsyncApp)