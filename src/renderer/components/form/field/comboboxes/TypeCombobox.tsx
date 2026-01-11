import { useCallback } from "react";
import { ComboboxOption, SingleGCombobox } from "../GCombobox";


/**
 * Props for the type combobox
 */
export interface TypeComboboxProps {

  /**
   * The label for the type combobox
   */
  readonly label?: string | true

  /**
   * The id of the currently selected type
   */
  readonly typeId: string | null;


  /**
   * Whether the type is invalid
   */
  readonly invalid: boolean;


  /**
   * 
   * @param typeId 
   */
  onChange(typeId: string | null): void;




}




/**
 * Combobox to select a type
 */
export function TypeCombobox({
  typeId,
  onChange,
  label,
  invalid
}: TypeComboboxProps) {

  /**
   * Get the types from the database
   */
  const getTypeOptions = useCallback(async (query: string) => {
    const types = await window.channels.getTypes.rendererInvoke({
      nameSearch: query
    });
    const options = types.map<ComboboxOption>(type => {
      return {
        label: type.name,
        key: type.id
      } satisfies ComboboxOption;
    });
    return options;
  }, [])

  return (
    <SingleGCombobox
      invalid={invalid}
      label={label === true ? "Type" : label}
      width="5rem"
      value={typeId}
      onChange={onChange}
      getOptions={getTypeOptions}
    />
  )
}