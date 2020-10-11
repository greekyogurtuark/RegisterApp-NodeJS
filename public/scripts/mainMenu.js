document.addEventListener('DOMContentLoaded', () => {
  // TODO: Anything you want to do when the page is loaded?
  document.getElementsById('transaction').addEventListener('click', showTransaction)
  document.getElementsById('products').addEventListener('click', showProducts)
  document.getElementsById('employee').addEventListener('click', showEmployee)
  document.getElementsById('salesReport').addEventListener('click', showSalesReport)
  document.getElementsById('cashierReport').addEventListener('click', showCashierReport)
})

function showTransaction () {
  alert('Functionality has not yet been implemented.')
}
function showProducts () {
  window.location.assign(
    '/productDetail')
}
function showEmployee () {
  window.location.assign(
    '/employeeDetail')
}
function showSalesReport () {
  alert('Functionality has not yet been implemented.')
}
function showCashierReport () {
  alert('Functionality has not yet been implemented.')
}
