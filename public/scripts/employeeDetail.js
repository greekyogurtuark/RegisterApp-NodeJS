let hideEmployeeSavedAlertTimer = undefined;

document.addEventListener("DOMContentLoaded", () => {
	// TODO: Things that need doing when the view is loaded
	getElementById("employeeSave").addEventListener("click", saveActionClick);

});

function validateSave() {
	if (getElementById("employeeFirstName").value == "")
	{
		displayError("Please provide a valid first name.");
		return false;
	}
	if (getElementById("employeeLastName").value == "")
	{
		displayError("Please provide a valid last name.");
		return false;
	}
	if (getElementById("employeePassword").value != getElementbyId("employeeConfirmPassword").value || getElementById("employeePassword").value == "")
	{
		displayError("Password invalid or mismatched.");
		return false;
	}
	if(getElementById("employeeEmployeeType").value != "Cashier" && getElementById("employeeEmployeeType").value != "ShiftManager" && getElementById("employeeEmployeeType").value != "GeneralManager" )
	{
		displayError("Please provide a valid employee type.");
		return false;
	}

	return true;
}
// Save
function saveActionClick(event) {
	// TODO: Actually save the employee via an AJAX call
	if (!validateSave()) {
		return;
	}
	const saveActionElement = event.target;
	saveActionElement.disabled = true;

	const employeeId = getElementById("employeeId");

	const employeeIdIsDefined = ((employeeId != null) && (employeeId.trim() !== ""));
	const saveActionUrl = ("/api/employeeDetail/"
		+ (employeeIdIsDefined ? employeeId : ""));
	const saveEmployeeRequest = {
		id: employeeId,
		firstName: getElementById("employeeFirstName") ,
		lastName: getElementById("employeeLastName"),
		password: getElementById("employeePassword"),
		managerId: getElementById("employeeManagerId"),
		employeeId: getElementById("employeeId"),
		classification: getElementById("employeeType")
	};

	if (employeeIdIsDefined) {
		ajaxPatch(saveActionUrl, saveEmployeeRequest, (callbackResponse) => {
			saveActionElement.disabled = false;

			if (isSuccessResponse(callbackResponse)) {
				displayEmployeeSavedAlertModal();
			}
		});
	} else {
		ajaxPost(saveActionUrl, EmployeeRequest, (callbackResponse) => {
			saveActionElement.disabled = false;

			if (isSuccessResponse(callbackResponse)) {
				displayEmployeeSavedAlertModal();

				if ((callbackResponse.data != null)
					&& (callbackResponse.data.employee != null)
					&& (callbackResponse.data.employee.id.trim() !== "")) {

					document.getElementById("employeeEmployeeId").classList.remove("hidden");

					setEmployeeId(callbackResponse.data.employee.id.trim());
				}
			}
		});
	}
};

function displayEmployeeSavedAlertModal() {
	if (hideEmployeeSavedAlertTimer) {
		clearTimeout(hideEmployeeSavedAlertTimer);
	}

	const savedAlertModalElement = getSavedAlertModalElement();
	savedAlertModalElement.style.display = "none";
	savedAlertModalElement.style.display = "block";

	hideEmployeeSavedAlertTimer = setTimeout(hideEmployeeSavedAlertModal, 1200);
}

function hideEmployeeSavedAlertModal() {
	if (hideEmployeeSavedAlertTimer) {
		clearTimeout(hideEmployeeSavedAlertTimer);
	}

	getSavedAlertModalElement().style.display = "none";
}

// End save
