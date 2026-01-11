import { DatabaseConnection } from "@main/domain/DatabaseConnection";

/**
 * Abstract class for all DAO classes
 */
export abstract class Dao {

  constructor(

    /**
     * Internal connection to the database to access playthroughs
     */
    protected readonly connection: DatabaseConnection
  ) { }

}