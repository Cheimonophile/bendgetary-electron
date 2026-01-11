import { PageFC } from "@renderer/interfaces/components/PageFC";
import { MouseEventHandler, useCallback } from "react";
import { GButton } from "../form/GButton";
import { useAppContext } from "@renderer/app";
import { useDatabase } from "@renderer/hooks/data/databaseHooks";



/**
 * Page for the settings of the application
 */
export const SettingsPage: PageFC = () => {

  // context
  const { setIsLoading } = useAppContext();

  /**
   * Get the database
   */
  const databasePath = useDatabase();

  /**
   * Function to create a new database when the create database button is pressed
   */
  const handleOnClickCreateDatabase = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    try {
      setIsLoading(true);
      await window.channels.createDatabase.rendererInvoke();
    }
    finally {
      setIsLoading(false);
    }
  }, [setIsLoading])


  /**
   * Function to open a database when the open database button is pressed
   */
  const handleOnClickOpenDatabase = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    try {
      setIsLoading(true);
      await window.channels.openDatabase.rendererInvoke();
    }
    finally {
      setIsLoading(false);
    }
  }, [setIsLoading])

  /**
   * Function to create a new database from the old database when the create database from old button is pressed
   */
  const handleOnClickCreateDatabaseFromOld = useCallback<MouseEventHandler<HTMLButtonElement>>(async () => {
    try {
      setIsLoading(true);
      await window.channels.createDatabaseFromOld.rendererInvoke();
    }
    finally {
      setIsLoading(false);
    }
  }, [setIsLoading])


  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto">

      {/** Database Section */}
      <div>
        <div className="text-lg">Current Database: {databasePath ?? <i>No Database is Currently Set</i>}</div>

        {/** Buttons */}
        <div className="flex gap-1">
          <GButton onClick={handleOnClickOpenDatabase} text="Open Database" />
          <GButton onClick={handleOnClickCreateDatabase} text="Create Database" />
          <GButton onClick={handleOnClickCreateDatabaseFromOld} text="Create Database From Old" />
        </div>


      </div>
    </div>
  )

}