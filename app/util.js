module.exports = {
  valuesFor: valuesFor,
  addressSummary: addressSummary,
  formatBalance: formatBalance,
  dataSize: dataSize,
}

function valuesFor(obj) {
  if (!obj) return []
  return Object.keys(obj)
    .map(function(key){ return obj[key] })
}

function addressSummary(address) {
  return address ? address.slice(0,2+6)+'...'+address.slice(-4) : '...'
}

function formatBalance(balance) {
  if (!balance) return
  var num = parseInt(balance)/1e18
  return num.toFixed(6)+' ETH'
}

function dataSize(data) {
  if (!data) return
  return data
}
