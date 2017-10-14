const $ = require('jquery')

class HTMLHelper {
  static newTableEntry(val) {
    return `
      <tr class='table-row'>
        <td id='tbl-name ${val['id']}'>${val['name']}</td>
        <td id='tbl-cal ${val['id']}'>${val['calories']}</td>
        <td><input type='image' class='delete-food ${val['id']}' src='https://i.imgur.com/Ea2X1B0.png'/></td>
      </tr>
    `
  }
}

module.exports = HTMLHelper
