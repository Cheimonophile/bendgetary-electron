import { useCallback } from "react";
import { GButton } from "../../GButton";
import { useAppContext } from "@renderer/app";


/**
 * Props for the CreateSpeciesButton component
 */
export interface CreateSpeciesButtonProps {

  /**
   * text for the create species button
   * 
   * Default: "Create Species"
   */
  text?: string;

  /**
   * generation
   */
  generation: number;

  /**
   * dex number
   */
  dexNo: number;

  /**
   * type 1 id
   */
  type1Id: string;

  /**
   * type 2 id
   */
  type2Id: string | null;

  /**
   *  new species name
   */
  name: string;

  /**
   * new species form
   */
  form: string | null;

  /**
   * Callback called after the species is created successfully
   */
  onSuccess?: () => void;
}


/**
 * Button to create a species
 * @returns 
 */
export function CreateSpeciesButton({
  text = "Create Species",
  generation,
  dexNo,
  type1Id,
  type2Id,
  name,
  form,
  onSuccess
}: CreateSpeciesButtonProps) {

  // context
  const {
    setIsLoading
  } = useAppContext();

  /**
   * 
   */
  const handleOnClick = useCallback(async () => {
    setIsLoading(true);
    try {
      await window.channels.createSpecies.rendererInvoke({
        generation,
        dexNo,
        type1Id,
        type2Id,
        name,
        form
      });
      onSuccess?.()
    }
    finally {
      setIsLoading(false);
    }
  }, [
    setIsLoading,
    generation,
    dexNo,
    type1Id,
    type2Id,
    name,
    form,
    onSuccess
  ]);

  return (
    <GButton
      text={text}
      onClick={handleOnClick}
    />
  )
}