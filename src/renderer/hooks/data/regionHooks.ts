import { useCallback } from "react";
import { GetDataCallback, useData } from "../useData";
import { Region } from "@common/interfaces/models/Region";




/**
 * Use regions
 */
export function useRegions() {

  /**
   * Get the regions
   */
  const getRegions = useCallback<GetDataCallback<readonly Region[]>>(async () => {
    const regions = await window.channels.getRegions.rendererInvoke({});
    return regions;
  }, []);

  /**
   * Get the regions data
   */
  const regions = useData(getRegions);

  return regions
}