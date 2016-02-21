/**
 * @param {number} unix timestamp
 * @return {string} date string
 */
export function unixtime2date (ux) {
  if (!ux) return ''
  var d = new Date(ux * 1000)
  return [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate()
  ].join('/') + ' ' + d.toLocaleTimeString()
}
// module.export = getBalanceEther
// module.export = getBalanceEtherFromWei
// module.export = unixtime2date
// export { getBalanceEther, getBalanceEtherFromWei, unixtime2date }
