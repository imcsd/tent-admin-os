import dateFmt from "../common/utils/dateFmt.js"

/**
 * 
 * @param {int} val - unix timestamp
 * @param {string} format - data time format, default with "yyyy-MM-dd hh:mm", support "ago" type.
 */
export function timeParser(val, format = "yyyy-MM-dd hh:mm") {
  return dateFmt(format, new Date(val * 1000));
}