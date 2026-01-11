import { useCallback } from "react";
import { GetDataCallback, useData } from "../useData";
import { Species } from "@common/interfaces/models/Species";


/**
 * Hook that fetches the species from the main process
 */
export function useSpecies() {

  /**
   * Get the species
   */
  const getSpecies = useCallback<GetDataCallback<readonly Species[]>>(() => {
    return window.channels.getSpecies.rendererInvoke();
  }, []);


  const species = useData(getSpecies);


  return species
}