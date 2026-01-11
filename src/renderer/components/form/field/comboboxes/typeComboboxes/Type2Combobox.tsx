import { TypeCombobox } from "../TypeCombobox";




export interface Type2ComboboxProps {

  /**
   * The label for the type combobox
   */
  label?: string | boolean

  /**
   * The id of the currently selected type
   */
  type2Id: string | null;

  /**
   * 
   * 
   * @param type2Id 
   */
  onChange(type2Id: string | null): void;

}


/**
 * Type 2 combobox
 * 
 * @param param0 
 * @returns 
 */
export function Type2Combobox({
  type2Id: type2Id,
  onChange
}: Type2ComboboxProps) {
  return (
    <TypeCombobox
      invalid={false}
      label="Type 2"
      typeId={type2Id}
      onChange={onChange}
    />
  )
}