const $ = require('jquery')

class HTMLHelper {
  static newTableEntry(val) {
    return `
      <tr class='table-row'>
        <td id='tbl-name ${val['id']}'>${val['name']}</td>
        <td id='tbl-cal ${val['id']}'>${val['calories']}</td>
        <td><button type='button' class='delete-food ${val['id']}'>Delete</button></td>
      </tr>
    `
  }
}

module.exports = HTMLHelper
