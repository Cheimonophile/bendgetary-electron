import { NumberInput } from "../NumberInput";


export interface DexNoInputProps {

  /**
  * The dex number
  */
  dexNo: number | null;

  /**
  * 
  * @param dexNo 
  */
  onChange(dexNo: number | null): void;

  /**
  * The label for the dex number input
  */
  label?: string | true;
}




export function DexNoInput({
  dexNo,
  onChange,
  label
}: DexNoInputProps) {

  /**
   * If the dex number is invalid
   */
  const invalid = dexNo === null || dexNo < 1;

  /**
   * Internal label
   */
  const _label = label === true ? "Dex No" : label;

  return (
    <NumberInput
      label={_label}
      value={dexNo}
      onChange={onChange}
      width="5rem"
      invalid={invalid}
    />
  )
}