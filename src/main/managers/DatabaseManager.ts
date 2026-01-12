import { settings } from "@main/api/settings";
import { DatabaseConnection } from "@main/domain/DatabaseConnection";


/**
 * Manages the database connection
 */
export class DatabaseManager {


  /**
   * The currently connected database
   */
  private _database: DatabaseConnection | null = null;

  /**
   * Callbacks to call when the database is opened
   */
  private _onOpenDatabaseCallbacks = new Set<() => void>();


  /**
   * The currently connected database
   */
  private get database(): DatabaseConnection | null {
    return this._database;
  }
  private set database(database: DatabaseConnection | null) {
    this._database = database;
  }

  /**
   * Gets the currently connected database
   * 
   * @returns
   * 
   * @throws {Error} if no database is connected
   */
  public getDatabase(): DatabaseConnection {
    if (!this._database) {
      throw new Error('No database is open');
    }
    return this._database;
  }



  /**
   * Opens a database connection
   * 
   * If the database doesn't exist, creates it.
   */
  async openDatabase(filepath: string) {
    this._database = await DatabaseConnection.open(filepath);
    await settings.dbFilepath.set(filepath);
    this._onOpenDatabaseCallbacks.forEach((callback) => callback());
  }


  /**
   * Create a new database connection
   * 
   * @param filepath 
   */
  async createDatabase(filepath: string, {
    overwrite = false
  }: {
    overwrite?: boolean
  } = {}) {
    if (overwrite) {
      await DatabaseConnection.delete(filepath);
    }
    this._database = await DatabaseConnection.create(filepath);
    await settings.dbFilepath.set(filepath);
    this._onOpenDatabaseCallbacks.forEach((callback) => callback());
  }

  /**
   * Callback to call when the database is opened
   * 
   * @param callback 
   */
  onOpenDatabase(callback: () => void) {
    this._onOpenDatabaseCallbacks.add(callback);
  }
}