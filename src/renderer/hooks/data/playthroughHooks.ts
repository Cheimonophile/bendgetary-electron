import { Playthrough } from "@common/interfaces/models/Playthrough";
import { GetDataCallback, useData } from "../useData";
import { useCallback } from "react";


/**
 * Use playthroughs
 */
export function usePlaythroughs() {

  /**
   * Get the playthroughs
   */
  const fetPlaythroughs = useCallback<GetDataCallback<readonly Playthrough[]>>(() => {
    return window.channels.getPlaythroughs.rendererInvoke();
  }, []);

  /**
   * Get the playthroughs data
   */
  const playthroughs = useData(fetPlaythroughs);


  return playthroughs
}