const $ = require('jquery')

class HTMLHelper {
  static newTableEntry(val) {
    return `
      <tr class='table-row'>
        <td class='table-name ${val['id']}'>${val['name']}</td>
        <td class='table-cal ${val['id']}'>${val['calories']}</td>
        <td><input type='image' class='delete-food ${val['id']}' src='https://i.imgur.com/Ea2X1B0.png'/></td>
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
    `
  }
  static newFoodMealTableEntry(val) {
    return `
      <tr class='table-row'>
        <td class='food-meal-checkbox ${val['id']}'><input id="checkBox ${val['id']}" type="checkbox"></td>
        <td class='table-name ${val['id']}'>${val['name']}</td>
        <td class='table-cal ${val['id']}'>${val['calories']}</td>
      </tr>`
  }
}

module.exports = HTMLHelper
