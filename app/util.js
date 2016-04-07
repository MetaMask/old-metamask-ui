const ethUtil = require('ethereumjs-util')

module.exports = {
  valuesFor: valuesFor,
  addressSummary: addressSummary,
  numericBalance: numericBalance,
  formatBalance: formatBalance,
  dataSize: dataSize,
  readableDate: readableDate,
}


function valuesFor(obj) {
  if (!obj) return []
  return Object.keys(obj)
    .map(function(key){ return obj[key] })
}

function addressSummary(address) {
  return address ? address.slice(0,2+8)+'...'+address.slice(-4) : '...'
}

function numericBalance(balance) {
  if (!balance) return 0
  var num = parseInt(balance)
  return num
}

function formatBalance(balance) {
  if (!balance) return 'None'
  return (numericBalance(balance) / 1e18).toFixed(6) + ' ETH'
}

function dataSize(data) {
  var size = data ? ethUtil.stripHexPrefix(data).length : 0
  return size+' bytes'
}

function readableDate(ms) {
  var date = new Date(ms)
  var month = date.getMonth()
  var day = date.getDate()
  var year = date.getFullYear()
  var hours = date.getHours()
  var minutes = "0" + date.getMinutes()
  var seconds = "0" + date.getSeconds()

  var date = `${month}/${day}/${year}`
  var time = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`
  return `${date} ${time}`
}
