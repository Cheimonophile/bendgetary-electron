import { useAppContext } from "@renderer/app";
import { useCallback } from "react";
import { GButton } from "../../GButton";


export interface CreateLocationButtonProps {

  /**
   * Optional text for the create location button
   * 
   * Default: "Create Location"
   */
  text?: string

  /**
   * Optional region id
   */
  regionId: string | null;

  /**
   * Optional new location name
   */
  name: string | null;

}



/**
 * Button to create a location
 * 
 * @param param0 
 * @returns 
 */
export function CreateLocationButton({
  text = "Create Location",
  regionId,
  name,
}: CreateLocationButtonProps) {

  // context
  const {
    setIsLoading
  } = useAppContext();

  /**
   * Create a new location
   */
  const handleOnClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!regionId || !name) return;
      await window.channels.createLocation.rendererInvoke({
        regionId,
        name: name
      });
    }
    finally {
      setIsLoading(false);
    }
  }, [
    regionId,
    name,
    setIsLoading
  ]);

  /**
   * Whether the create location button is disabled
   */
  const disabled = !regionId || !name;


  return (
    <GButton
      text={text}
      onClick={handleOnClick}
      disabled={disabled}
    />
  );
}