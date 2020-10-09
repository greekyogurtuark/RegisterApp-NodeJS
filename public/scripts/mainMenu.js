document.addEventListener("DOMContentLoaded", () => {
	// TODO: Anything you want to do when the page is loaded?
  document.getElementsById("transaction").addEventListener("click",showTransaction);
  document.getElementsById("products").addEventListener("click",showProducts);
  document.getElementsById("employee").addEventListener("click",showEmployee);
  document.getElementsById("salesReport").addEventListener("click",show_salesReport);
  document.getElementsById("cashierReport").addEventListener("click",show_cashierReport);
});


function showTransaction(){
  alert(“Functionality has not yet been implemented.” );
}
function showProducts(){
  window.location.assign(
        "/productDetail");
}
function showEmployee(){
  window.location.assign(
        "/employeeDetail");
}
function show_salesReport(){
  alert(“Functionality has not yet been implemented.” );
}
function show_cashierReport(){
  alert(“Functionality has not yet been implemented.” );
}
