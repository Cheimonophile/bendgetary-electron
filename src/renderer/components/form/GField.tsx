import { Field, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { FC } from "react";


export interface GFieldProps {
  children?: React.ReactNode;

  /**
   * Label for the field
   */
  label: string | undefined;

  /**
   * If the field is invalid
   */
  invalid: boolean;
}


/**
 * Field parameter for the form
 * 
 * @returns 
 */
export const GField: FC<GFieldProps> = ({
  children,
  label,
  invalid
}) => {
  return (
    <Field className="flex flex-col relative text-sm">
      {label && (
        <Label className={clsx(
          "block font-bold leading-none",
          invalid && "italic"
        )}>
          {invalid && "!"}{label}
        </Label>
      )}
      {children}
    </Field>
  )
}