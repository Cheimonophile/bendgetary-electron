import { channels } from "@common/channels";
import { databaseManager } from "@main/managers";
import { getBrowserWindowFromWebContents } from "@main/utility/electron";
import { createDatabaseDialog, openDatabaseDialog, openOldDatabaseDialog } from "@main/utility/electron/dialog";


/**
 * Handler for getting the current database path
 */
channels.getDatabasePath.mainHandle(async () => {
  try {
    return databaseManager.getDatabase().path;
  }
  catch {
    return null;
  }
})


/**
 * Handler for creating a new database
 */
channels.createDatabase.mainHandle(async (event) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const filePath = await createDatabaseDialog(window);
  if (!filePath) {
    return;
  }
  await databaseManager.createDatabase(filePath, {
    overwrite: true
  });
})




/**
 * Handler for opening an existing database
 */
channels.openDatabase.mainHandle(async (event) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const filePath = await openDatabaseDialog(window);
  if (!filePath) {
    return;
  }
  await databaseManager.openDatabase(filePath);
});

/**
 * Create the database fromt he old database
 */
channels.createDatabaseFromOld.mainHandle(async (event) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const oldFilePath = await openOldDatabaseDialog(window);
  if (!oldFilePath) {
    return;
  }
  const newFilePath = await createDatabaseDialog(window);
  if (!newFilePath) {
    return;
  }
  await databaseManager.createDatabase(newFilePath, {
    overwrite: true
  });
  await databaseManager.loadOldDatabase(oldFilePath);
});