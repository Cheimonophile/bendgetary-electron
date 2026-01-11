import { useCallback } from "react";
import { ComboboxOption, SingleGCombobox } from "../GCombobox";




/**
 * The current value of the region combobox
 */
export interface RegionComboboxProps {

  /**
   * The id of the currently selected region
   */
  regionId: string | null;

  /**
   * Whether the region is invalid
   */
  invalid?: boolean;


  /**
   * When the region id changes
   */
  onChange(regionId: string | null): void;
}



/**
 * Combobox to select a region
 */
export function RegionCombobox({
  regionId,
  onChange,
  invalid = false
}: RegionComboboxProps) {

  /**
   * Get the region options for the combobox
   */
  const getRegionOptions = useCallback(async (query: string) => {
    const regions = await window.channels.getRegions.rendererInvoke({
      nameSearch: query
    });
    const options = regions.map<ComboboxOption>(region => {
      return {
        label: region.name,
        key: region.id
      } satisfies ComboboxOption;
    });
    return options;
  }, [])


  return (
    <SingleGCombobox
      label="Region"
      invalid={invalid}
      value={regionId}
      onChange={onChange}
      getOptions={getRegionOptions}
    />
  )
}