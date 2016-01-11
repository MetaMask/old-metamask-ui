const SET_METAMASK_ACTIVE = 'SET_METAMASK_ACTIVE'

module.exports = {
  SET_METAMASK_ACTIVE: SET_METAMASK_ACTIVE,
  setMetamaskActive: setMetamaskActive,
}

function setMetamaskActive(value) {
  console.log(value)
  return {
    type: SET_METAMASK_ACTIVE,
    isActive: value,
  }
}