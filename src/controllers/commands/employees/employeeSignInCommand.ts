import { EmployeeModel } from "../models/employeeModel";
import * as EmployeeRepository from "../models/employeeModel";
import * as ActiveUserRepository from "../models/activeUserModel"
import * as Util from "../helpers/helper";
import * as DatabaseConnection from "../models/databaseConnection";
import { CommandResponse, SignInRequest, ActiveUser } from "../../typeDefinitions";
import { ResourceKey, Resources } from "../../../resourceLookup";
import { ActiveUserModel } from "../models/activeUserModel";
import Sequelize from "sequelize";


export const signInCommand = async (req: SignInRequest, session?: Express.Session):
  Promise<CommandResponse<ActiveUser>> => {
    if (session == null) {
      return Promise.reject(<CommandResponse<ActiveUser>> {
        status: 500,
        message: Resources.getString(ResourceKey.USER_SESSION_NOT_FOUND)
      });
    }

    if (Util.isBlankString(req.employeeId) || isNaN(Number(req.employeeId)) || Util.isBlankString) {
      return Promise.reject(<CommandResponse<ActiveUser>> {
        status: 422,
        message: Resources.getString(ResourceKey.USER_SIGN_IN_CREDENTIALS_INVALID)
      });
    }

    return EmployeeRepository.queryByEmployeeId(Number(req.employeeId))
      .then(async (employee: (EmployeeModel) | null): Promise<CommandResponse<ActiveUserModel>> => {
        if (employee == null || req.password != employee.password.toString()) {
          return Promise.reject(<CommandResponse<ActiveUser>> {
            status: 401,
            message: Resources.getString(ResourceKey.USER_SIGN_IN_CREDENTIALS_INVALID)
          });
        }
        let transact: Sequelize.Transaction;

        return DatabaseConnection.createTransaction()
          .then((transaction: Sequelize.Transaction): Promise<ActiveUserModel | null> => {
            transact = transaction;
            return ActiveUserRepository.queryByEmployeeId(employee.id, transact);
        }).then((user: (ActiveUserModel | null)): Promise<ActiveUserModel> => {
            if (user) {
              return user.update(
                <Object> {sessionKey: session.id},
                <Sequelize.InstanceUpdateOptions> {transaction: transact});
            } else {
              return ActiveUserModel.create(
                <ActiveUserModel> {
                  name: employee.firstName + " " + employee.lastName,
                  employeeId: employee.id,
                  sessionKey: session.id,
                  classification: employee.classification
                },
                <Sequelize.CreateOptions> {transaction: transact});
            }
        }).then((activeUser: ActiveUserModel): CommandResponse<ActiveUserModel> => {
          transact.commit();

          return <CommandResponse<ActiveUserModel>> {
            status: 200,
            data: activeUser
          };
        }).catch((error: any): Promise<CommandResponse<ActiveUserModel>> => {
          transact.rollback();

          return Promise.reject(<CommandResponse<ActiveUserModel>> {
            status: 500,
            message: error.message
          });
        });

    }).then((userCommandResponse: CommandResponse<ActiveUserModel>): CommandResponse<ActiveUser> => {
      return <CommandResponse<ActiveUser>> {
        status: 200,
        data: <ActiveUser> {
          id: (<ActiveUserModel>userCommandResponse.data).id,
          name: (<ActiveUserModel>userCommandResponse.data).name,
          employeeId: (<ActiveUserModel>userCommandResponse.data).employeeId,
          classification: (<ActiveUserModel>userCommandResponse.data).classification
        }
      }
    });

  }
