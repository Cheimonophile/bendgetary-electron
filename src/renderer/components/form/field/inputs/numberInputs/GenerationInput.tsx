import { NumberInput } from "../NumberInput";



export interface GenerationInputProps {

  /**
   * The label for the generation input
   */
  label?: string | true

  /**
   * The generation
   */
  generation: number | null;


  /**
   * 
   * @param generation 
   */
  onChange(generation: number | null): void;

}



/**
 * NumberInput for the generation
 * @returns 
 */
export function GenerationInput({
  generation,
  onChange,
  label
}: GenerationInputProps) {

  /**
   * If the generation is invalid
   */
  const invalid = generation === null || generation < 1 || generation > 9;

  /**
   * Internal label
   */
  const _label = label === true ? "Generation" : label;

  return (
    <NumberInput
      label={_label}
      value={generation}
      onChange={onChange}
      invalid={invalid}
      width="6rem"
    />
  )
}