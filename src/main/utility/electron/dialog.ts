import { BrowserWindow, dialog } from "electron";




/**
 * Dialog for creating a database file
 */
export async function createDatabaseDialog(window: BrowserWindow): Promise<string | null> {
  const saveReturn = await dialog.showSaveDialog(window, {
    title: 'Create Database',
    message: 'Create a new pokemon playthrough database.',
    buttonLabel: 'Create',
    filters: [{ name: 'PkmnDb', extensions: ['pkmndb'] }],
    properties: [
      'createDirectory',
      'dontAddToRecent'
    ]
  })
  if (saveReturn.canceled) {
    return null;
  }
  return saveReturn.filePath
}




/**
 * Dialog for opening a database file
 */
export async function openDatabaseDialog(window: BrowserWindow): Promise<string | null> {
  const openReturn = await dialog.showOpenDialog(window, {
    title: 'Open Database',
    message: 'Open an existing pokemon playthrough database.',
    buttonLabel: 'Open',
    filters: [{ name: 'PkmnDb', extensions: ['pkmndb'] }],
    properties: [
      'openFile',
      'dontAddToRecent'
    ]
  })
  if (openReturn.canceled) {
    return null;
  }
  return openReturn.filePaths[0] ?? null;
}


/**
 * Dialog for opening an old database file
 * 
 * @param window 
 * @returns 
 */
export async function openOldDatabaseDialog(window: BrowserWindow): Promise<string | null> {
  const openReturn = await dialog.showOpenDialog(window, {
    title: 'Open Old Database',
    message: 'Open an existing pokemon playthrough database in the old format to create a new one from.',
    buttonLabel: 'Open',
    properties: [
      'openFile',
      'dontAddToRecent'
    ]
  })
  if (openReturn.canceled) {
    return null;
  }
  return openReturn.filePaths[0] ?? null;
}


/**
 * Ask the user to confirm an action
 * 
 * @param window 
 * @param message 
 * @returns 
 */
export async function openConfirmDialog(window: BrowserWindow, message: string): Promise<boolean> {
  const confirmReturn = await dialog.showMessageBox(window, {
    type: 'question',
    buttons: ['Yes', 'No'],
    defaultId: 1,
    title: 'Confirm',
    message: message,
  })
  return confirmReturn.response === 0;
}