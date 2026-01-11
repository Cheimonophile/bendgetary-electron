import { useAppContext } from "@renderer/app";
import { GButton } from "../../GButton";
import { useCallback } from "react";



/**
 * Delete Location Button
 */
export interface DeleteLocationButtonProps {

  /**
   * Optional text for the delete location button
   * 
   * Default: "Delete Location"
   */
  text?: string

  /**
   * Optional location id
   */
  locationId: string | null;
}




/**
 * Button to delete a location
 * 
 * @param param0 
 * @returns 
 */
export function DeleteLocationButton({
  text = "Delete Location",
  locationId,
}: DeleteLocationButtonProps) {

  // context
  const {
    setIsLoading
  } = useAppContext();

  /**
  * Delete a location
  */
  const handleOnClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!locationId) return;
      await window.channels.deleteLocation.rendererInvoke(locationId);
    }
    finally {
      setIsLoading(false);
    }
  }, [
    locationId,
    setIsLoading
  ]);


  /**
   * Disabled if no location id
   */
  const disabled = !locationId;


  return (
    <GButton
      text={text}
      onClick={handleOnClick}
      disabled={disabled}
    />
  );
}