
import { PrismaClient, PrismaPromise } from "@prisma/client";
import fs from "fs";
import { app } from "electron";
import path from "path";
import { createFileBackup, deleteFileIfExists } from "@main/utility/fs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

/**
 * The directory of the migrations.
 */
const MIGRATIONS_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'migrations')
  : path.join(app.getAppPath(), 'prisma', 'migrations');


/**
 * The directory of the prisma client.
 */
const PRISMA_CLIENT_DIR = app.isPackaged
  ? path.join(process.resourcesPath, 'prisma-client')
  : path.join(app.getAppPath(), 'prisma', 'prisma-client');


/**
 * The manifest of the prisma engines from the platform
 */
const prismaEngineManifest: {
  [key in typeof process['platform']]?: string
} = {
  win32: 'query_engine-windows.dll.node',
  linux: 'libquery_engine-debian-openssl-1.1.x.so.node',
  darwin: 'libquery_engine-darwin-arm64.dylib.node'
}


/**
 * Sets the prisma engine library using the envronment variable, and returns it
 */
export function getPrismaQueryEngineLibrary() {
  const prismaQueryEngineLibrary = prismaEngineManifest[process.platform];
  if (!prismaQueryEngineLibrary) {
    throw new Error("Unsupported platform. (prisma query engine not in manifest)");
  }
  const prismaEngineFilepath = path.join(PRISMA_CLIENT_DIR, prismaQueryEngineLibrary);
  return prismaEngineFilepath;
}


/**
 * Sets the prisma engine library using the envronment variable, and returns it
 */
process.env.PRISMA_QUERY_ENGINE_LIBRARY = getPrismaQueryEngineLibrary();


/**
 * Gets a migration directory from its migration id
 * 
 * @param migrationId 
 * @returns 
 */
const getMigrationDir = (migrationId: string) => `${MIGRATIONS_DIR}/${migrationId}`;


/**
 * Returns the migration filepath for a given migration dirname.
 * 
 * @param migrationDirname 
 * @returns 
 */
const getMigrationFilepath = (migrationDirname: string) => `${getMigrationDir(migrationDirname)}/migration.sql`;

/**
 * Returns the migration's dirname from its filepath.
 * 
 * @param migrationName 
 * @returns 
 */
const isMigration = async (migrationName: string): Promise<boolean> => {
  const migrationDir = getMigrationDir(migrationName);
  const dirStat = await fs.promises.stat(migrationDir)
  if (!dirStat.isDirectory()) {
    return false;
  }
  const migrationFilepath = getMigrationFilepath(migrationName);
  const fileState = await fs.promises.stat(migrationFilepath)
  const isFile = fileState.isFile();
  return isFile;
};


/**
 * Makes the map of the migrations
 */
export const getMigrations = async (): Promise<Array<string>> => {
  const migrationNames = (
    await fs.promises.readdir(MIGRATIONS_DIR)
  ).sort();
  const migrations = new Array<string>();
  for (const migrationName of migrationNames) {
    if (!await isMigration(migrationName)) {
      continue;
    }
    const migrationFilepath = getMigrationFilepath(migrationName)
    const migrationSql = await fs.promises.readFile(migrationFilepath, "utf-8");
    migrations.push(migrationSql);
  }
  return migrations;
};


/**
 * Migrate the prisma client
 * 
 * @param prisma 
 */
export async function migrate(prisma: PrismaClient) {
  const executePromises: PrismaPromise<number>[] = [];
  const [{ user_version: userVersion }] = await prisma.$queryRaw<[{ user_version: number }]>`PRAGMA user_version;`;
  const migrations = await getMigrations();
  for (let i = userVersion; i < migrations.length; i++) {
    const migration = migrations[i];
    if (!migration) {
      throw new Error(`Migration ${i} does not exist.`);
    }
    const migrationPromises = migration
      .split(";")
      .slice(0, -1) // remove whitespace after last semicolon
      .map(statement => prisma.$executeRawUnsafe(statement));
    executePromises.push(...migrationPromises);
  }
  executePromises.push(
    prisma.$executeRawUnsafe(`PRAGMA user_version = ${migrations.length};`)
  );
  await prisma.$transaction(executePromises);

}



/**
 * Class that keeps track of a prisma connection
 */
export class DatabaseConnection {


  private constructor(

    /**
     * The path to the database
     */
    public readonly path: string,

    /**
     * The prisma client object of the database
     */
    public readonly prisma: PrismaClient
  ) { }


  /**
   * Get an instance of the prisma client for a given database file
   * @param filePath 
   * @returns 
   */
  static getPrismaClient(filePath: string): PrismaClient {
    const adapter = new PrismaBetterSqlite3({ url: `file:${filePath}` });
    const prisma = new PrismaClient({ adapter });
    return prisma;
  }


  /**
   * Creates a new database connection.
   * 
   * @param filePath The path of the database
   */
  static async open(filePath: string): Promise<DatabaseConnection> {
    await createFileBackup(filePath);
    const prisma = DatabaseConnection.getPrismaClient(filePath);
    await migrate(prisma);
    const database = new DatabaseConnection(filePath, prisma);
    return database
  }

  /**
   * Attempts to create a database connection.
   * 
   * @param filePath 
   * @returns 
   */
  static async create(filePath: string): Promise<DatabaseConnection> {
    if (fs.existsSync(filePath)) {
      throw new Error(`Database already exists at ${filePath}`);
    }
    const prisma = DatabaseConnection.getPrismaClient(filePath);
    await migrate(prisma);
    const database = new DatabaseConnection(filePath, prisma);
    return database
  }

  /**
   * Deletes a database given a filepath
   */
  static async delete(filepath: string): Promise<void> {
    try {
      await deleteFileIfExists(filepath);
    }
    catch {
      // do nothing because failed delete means it didn't exist
    }
  }
}