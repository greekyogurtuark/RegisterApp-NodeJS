import * as DatabaseConnection from "../models/databaseConnection";
import { ActiveUserModel } from "../models/activeUserModel";
import * as ActiveUserRepository from "../models/activeUserModel";
import { CommandResponse } from "../../typeDefinitions";
import Sequelize from "sequelize";

export const clear =  async (sessionId: string): Promise<CommandResponse<void>> => {
  let transact: Sequelize.Transaction;

  return DatabaseConnection.createTransaction()
    .then((transaction: Sequelize.Transaction): Promise<ActiveUserModel | null> => {
      transact = transaction;
      return ActiveUserRepository.queryBySessionKey(sessionId, transaction);
    }).then((user: (ActiveUserModel | null)): Promise<void> => {
      if (!user) {
        return Promise.resolve();
      }

      return user.destroy(<Sequelize.DestroyOptions> {transaction: transact});
    }).then((): CommandResponse<void> => {
			transact.commit();

			return <CommandResponse<void>> {status: 204};
		}).catch((error: any): CommandResponse<void> => {
			if (transact != null) {
        transact.rollback();
			}

			return <CommandResponse<void>> {
				status: 500,
				message: error.message
			};
		});
}
