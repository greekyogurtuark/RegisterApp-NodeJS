import { EmployeeModel } from "../models/employeeModel";
import { Resources, ResourceKey } from "../../../resourceLookup";
import * as EmployeeRepository from "../models/employeeModel";
import { CommandResponse, Employee } from "../../typeDefinitions";


export const execute = async (): Promise<CommandResponse<boolean>> => {
	return EmployeeRepository.queryActiveExists()
    .then((queriedActiveEmployee: (EmployeeModel | null)): Promise<CommandResponse<boolean>> => {
			if (!queriedActiveEmployee) {
				return Promise.reject(<CommandResponse<boolean>>{
					status: 404,
					message: Resources.getString(ResourceKey.EMPLOYEE_NOT_FOUND)
				});
			}

			return Promise.resolve(<CommandResponse<boolean>>{
          status: 200,
          data: true
        });
	});
};
