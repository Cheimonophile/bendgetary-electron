import { Input } from "@headlessui/react";
import { GField } from "../GField";
import { ComponentProps } from "react";
import { clsx } from "clsx";

/**
 * Props for GInput
 */
export interface GInputProps {

  /**
   * Label for the input
   */
  label: string | undefined;

  /**
   * Type of the input
   */
  type: ComponentProps<'input'>['type'];


  /**
   * Value of the input
   */
  value: string;

  /**
   * If the input is invalid
   */
  invalid: boolean;

  /**
   * When the value changes
   * 
   * @param value 
   * @returns 
   */
  onChange: ComponentProps<'input'>['onChange'];


  /**
   * Width of the input
   */
  width?: `${number}rem`;



}


/**
 * Generic input field
 */
export function GInput({
  label,
  type,
  value,
  onChange,
  width,
  invalid
}: GInputProps) {
  return (
    <GField
      label={label}
      invalid={invalid}>
      <Input
        className={clsx(
          " border rounded px-1 py-0.5"
        )}
        style={{ width }}
        type={type}
        value={value}
        onChange={onChange}
      />
    </GField>
  );
}