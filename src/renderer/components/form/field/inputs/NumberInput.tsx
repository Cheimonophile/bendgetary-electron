import { ComponentProps, useCallback, useMemo } from "react";
import { GInput } from "../GInput";

export interface NumberInputProps {

  /**
   * Label for the input
   */
  label: string | undefined;

  /**
   * Value of the input
   */
  value: number | null;

  /**
   * If the input is invalid
   */
  invalid?: boolean;

  /**
   * When the value changes
   * 
   * @param value 
   * @returns 
   */
  onChange: (value: number | null) => void;


  /**
   * Width of the input
   */
  width?: `${number}rem`;
}


/**
 * Input for typing a number
 */
export function NumberInput({
  label,
  value,
  onChange,
  width,
  invalid = false
}: NumberInputProps) {

  /**
   * Value of the input
   */
  const _value = useMemo(() => value === null ? "" : value.toString(), [value])


  /**
   * When the value changes
   */
  const handleOnChange = useCallback<NonNullable<ComponentProps<typeof GInput>['onChange']>>((event) => {
    try {
      const value = parseInt(event.target.value);
      if (isNaN(value)) {
        return onChange(null);
      }
      else {
        return onChange(value);
      }
    }
    catch {
      return onChange(null);
    }
  }, [onChange])


  return (
    <GInput
      invalid={invalid}
      label={label}
      width={width}
      type="number"
      value={_value}
      onChange={handleOnChange}
    />
  )
}