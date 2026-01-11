import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { useData } from "@renderer/hooks/useData";
import { ReactNode, useCallback, useState } from "react";
import { GField } from "../GField";



/**
 * An option for a combobox
 */
export interface ComboboxOption {


  /**
   * The key of the item in the combobox
   */
  readonly key: string;

  /**
   * The label of the item in the combobox
   */
  readonly label: string;
}

/**
 * Callback function to load the combobox options
 */
export interface LoadComboboxOptions {
  (query: string): Promise<readonly ComboboxOption[]>;
}


/**
 * Props for SingleCombobox
 */
export interface SingleGComboboxProps {

  /**
   * Label for the combobox
   */
  readonly label?: string;

  /**
   * Width of the combobox
   */
  readonly width?: `${number}rem`;


  /**
   * The current value of the combobox
   */
  readonly value: string | null;

  /**
   * Set the value of the combobox
   * 
   * @param value 
   * @returns 
   */
  readonly onChange: (value: string | null) => void;

  /**
   * Options for the combobox
   * 
   * MUST BE IN USE CALLBACK
   */
  readonly getOptions: LoadComboboxOptions;

  /**
   * Watched changes in the query
   * 
   * @param query 
   * @returns 
   */
  readonly onChangeQuery?: (query: string) => void;

  /**
   * If the combobox is invalid
   */
  readonly invalid: boolean;
}



/**
 * A Single Combobox
 * 
 * @param props 
 * @returns 
 */
export function SingleGCombobox({
  label,
  getOptions,
  value,
  onChange,
  width,
  invalid
}: SingleGComboboxProps): ReactNode {
  const [query, setQuery] = useState<string>("");

  /**
   * Fetch the options for the combobox
   */
  const fetchOptions = useCallback(async () => {
    const options = await getOptions(query);
    return options;
  }, [query, getOptions]);

  /**
   * The options for the combobox
   */
  const options = useData(fetchOptions);

  /**
   * The actively selected label and its display value
   */
  const displayValue = useCallback((key: string | null): string => {
    const displayValue = options?.find((o) => o.key === key)?.label;
    return displayValue ?? "";
  }, [options]);

  /**
   * Handle the change of the combobox
   */
  const handleOnChangeCombobox = useCallback((key: string | null) => {
    onChange(key ?? null);
  }, [onChange]);

  return (
    <GField
      label={label}
      invalid={invalid}>
      <Combobox
        value={value}
        onChange={handleOnChangeCombobox}>
        <ComboboxInput
          className="px-1 py-0.5 border rounded"
          style={{ width }}
          displayValue={displayValue}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions id="ComboboxOption" anchor="bottom start" className="border rounded overflow-y-auto empty:invisible max-w-full max-h-96 bg-white shadow z-20">
          {options?.map((option) => (
            <ComboboxOption key={option.key} value={option.key} className="relative after:absolute after:inset-0 data-[focus]:after:backdrop-brightness-90 w-full px-1 py-0.5 cursor-pointer">
              {option.label}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </GField>
  );
}