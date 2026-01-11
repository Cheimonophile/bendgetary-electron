import { TypeCombobox } from "../TypeCombobox";




export interface Type1ComboboxProps {

  /**
   * The label for the type combobox
   */
  label?: string | boolean

  /**
   * The id of the currently selected type
   */
  type1Id: string | null;

  /**
   * 
   * 
   * @param type1Id 
   */
  onChange(type1Id: string | null): void;

}


/**
 * Type 1 combobox
 * 
 * @param param0 
 * @returns 
 */
export function Type1Combobox({
  type1Id,
  onChange
}: Type1ComboboxProps) {
  return (
    <TypeCombobox
      invalid={type1Id === null}
      label="Type 1"
      typeId={type1Id}
      onChange={onChange}
    />
  )
}