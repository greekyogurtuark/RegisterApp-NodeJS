import { Request, Response } from "express";
import { ViewNameLookup, QueryParameterLookup, RouteLookup } from "./lookups/routingLookup";
import { Resources, ResourceKey } from "../resourceLookup";
import * as EmployeesQuery from "./commands/employees/activeEmployeeExistsQuery";
import * as EmployeeSignIn from "./commands/employees/employeeSignInCommand";
import { CommandResponse, SignInPageResponse, PageResponse, ApiResponse } from "./typeDefinitions";
import * as ClearActiveUser from "./commands/activeUsers/clearActiveUserCommand";

export const start = async (req: Request, res: Response): Promise<void> => {
  return EmployeesQuery.execute()
		.then((employeesCommandResponse: CommandResponse<boolean>): void => {

      if (employeesCommandResponse.data) {
        // Renders Sign In Page with eID and error message as locals
        return res.render(ViewNameLookup.SignIn, <SignInPageResponse> {
          employeeId: req.query["employeeId"],
          errorMessage: Resources.getString(JSON.stringify(req.query[QueryParameterLookup.ErrorCode]))
        });
      } else {
        // Redirects to Employee Detail page
        return res.redirect(ViewNameLookup.EmployeeDetail);
      }
		}).catch((error: any): void => {
      return res.render(ViewNameLookup.SignIn, <PageResponse> {
				errorMessage: (error.message || Resources.getString(ResourceKey.EMPLOYEES_UNABLE_TO_QUERY))
			});
		});
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
	// TODO: Use the credentials provided in the request body (req.body)
	//  and the "id" property of the (Express.Session)req.session variable
	//  to sign in the user
  return EmployeeSignIn.signInCommand(req.body, req.session)
    .then((): void => {
      return res.redirect(ViewNameLookup.MainMenu);
    }).catch((error: any): void => {
      console.error("Caught an error during employee sign-in: " + error.message);

			return res.redirect(ViewNameLookup.SignIn
				+ "?" + QueryParameterLookup.ErrorCode
				+ "=" + ResourceKey.USER_UNABLE_TO_SIGN_IN);
		});
};

export const clearActiveUser = async (req: Request, res: Response): Promise<void> => {
	// TODO: Sign out the user associated with req.session.id
  return ClearActiveUser.clear((<Express.Session>req.session).id)
    .then((remResponse: CommandResponse<void>): void => {
      res.status(remResponse.status).send(<ApiResponse> {redirectUrl: ViewNameLookup.SignIn});
    }).catch((error: any): void => {
      res.status(error.status || 500).send(<ApiResponse> {
					errorMessage: error.message,
					redirectUrl: RouteLookup.SignIn
				});
    });
};
