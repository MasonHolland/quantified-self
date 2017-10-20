const $ = require('jquery')

class HTMLHelper {
  static newTableEntry(val, table, meal) {
    return `
      <tr class='table-row'>
        <td class='table-name ${val['id']}'>${val['name']}</td>
        <td class='${meal}-calories table-cal ${val['id']}'>${val['calories']}</td>
        <td class='delete-button'><input type='image' class='delete-food-${table} ${val['id']}' src='https://i.imgur.com/Ea2X1B0.png'/ alt='delete button'></td>
      </tr>`
  }
  static newTableDiv(val) {
    return `
      <div class='${val.name} 'meals-table>
      <tr>
        <table class='${val.name}-table table-striped table-bordered meal-table' border='1'>
          <thead>
            <p class='meal-table-title'><strong>${val.name}</strong></p>
              <tr>
                <th class='meal-table-header'>Name</th>
                <th class='meal-table-header'>Calories</th>
                <th class=table-actions></th>
              </tr>
            </thead class='${val.name}-thead meal-table-head'>
          <tbody class='${val.name}-tbody ${val.id} meal-table-body'>
          </tbody>
          <tfoot class='${val.name}-tfoot meal-table-footer'
          </tfoot>
        </table>
      </tr>
    `
  }
  static newFoodMealTableEntry(val) {
    return `
      <tr class='table-row'>
        <td class='food-meal-checkbox ${val['id']}'>
          <input class='add-to-meal-checkbox' id="checkBox ${val['id']}" type="checkbox">
        </td>
        <td class='table-name ${val['id']}'>${val['name']}</td>
        <td class='table-cal ${val['id']}'>${val['calories']}</td>
      </tr>`
  }

  static totalMealCalories(val) {
    return `
      <tr class='table-row meal-calories'>
        <td class='${val.name}-calories-header meal-cals-header'>Total Calories</td>
        <td class='${val.name}-calories meal-cals-val total-meal-calories'>${val.calories}</td>
      </tr>
      <tr class='table-row meal-calories-remaining'>
        <td class='${val.name}-remaing-calories-header meal-cals-header'>Remaining Calories</td>
        <td class='${val.name}-remaining-calories meal-cals-val rem-meal-cals'>${val.remainingCalories}</td>
      </tr>`
  }
}
module.exports = HTMLHelper
