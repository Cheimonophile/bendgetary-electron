import { useCallback } from "react";
import { useData } from "../useData";


/**
 * Hook that fetches the database from the main process
 */
export function useDatabase() {
  const database = useData(
    useCallback(async () => {
      return await window.channels.getDatabasePath.rendererInvoke();
    }, [])
  )
  return database;
}