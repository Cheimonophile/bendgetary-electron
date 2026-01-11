import { useCallback } from "react";
import { GInput } from "../GInput";


/**
 * TextInputProps
 */
export interface TextInputProps {


  label?: string;

  /**
   * The value of the text inpu
   */
  value: string | null;


  /**
   * If the input is invalid
   */
  invalid?: boolean;

  /**
   * Watch the change of the value in the input
   * 
   * @param value 
   * @returns 
   */
  onChange: (value: string | null) => void;
}


/**
 * Input for typing text
 */
export function TextInput({
  label,
  value,
  onChange,
  invalid
}: TextInputProps) {

  const handleOnChange = useCallback<NonNullable<Parameters<typeof GInput>[0]['onChange']>>((e) => {
    onChange(e.target.value ? e.target.value : null);
  }, [onChange])


  return (
    <GInput
      label={label}
      invalid={invalid ?? false}
      type="text"
      value={value ?? ""}
      onChange={handleOnChange}
    />
  )
}