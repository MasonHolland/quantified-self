const $ = require('jquery')

class HTMLHelper {
  static newTableEntry(val) {
    return `
      <tr class='table-row'>
        <td id='tbl-name ${val['id']}'>${val['name']}</td>
        <td id='tbl-cal ${val['id']}'>${val['calories']}</td>
        <td><button type='button' class='delete-food ${val['id']}'>Delete</button></td>
      </tr>`
  }
  static newTableDiv(val) {
    return `
      <div class='${val.name} 'meals-table>
      <tr>
        <table class='${val.name}-table table-striped table-bordered'>
          <thead>
            <h3>${val.name}</h3>
              <tr>
                <th>Name</th>
                <th>Calories</th>
                <th class=table-actions></th>
              </tr>
            </thead class='${val.name}-thead meal-table-head'>
          <tbody class='${val.name}-tbody meal-table-body'>
          </tbody>
        </table>
      </tr>
    </div>
    `
  }
}

module.exports = HTMLHelper
