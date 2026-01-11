import { useCallback } from "react";
import { GetDataCallback, useData } from "../useData";
import { Location } from '@common/interfaces/models/Location'


/**
 * Parameters for the useLocation hook
 */
export interface UseLocationParams {

  /**
   * Id of the region to filter by
   */
  regionId?: string;
}


/**
 * Use the locations
 */
export function useLocations({
  regionId
}: UseLocationParams) {

  /**
   * Get the locations
   */
  const getLocations = useCallback<GetDataCallback<readonly Location[]>>(async () => {
    const locations = await window.channels.getLocations.rendererInvoke({
      regionId
    });
    return locations;
  }, [regionId]);

  /**
   * Get the locations data
   */
  const locations = useData(getLocations);

  return locations
}