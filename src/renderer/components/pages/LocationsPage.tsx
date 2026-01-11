import { PageFC } from "@renderer/interfaces/components/PageFC";
import { LocationsTable } from "../tables/LocationsTable";
import { useState } from "react";
import { RegionCombobox } from "../form/field/comboboxes/RegionCombobox";
import { TextInput } from "../form/field/inputs/TextInput";
import { CreateLocationButton } from "../form/buttons/location/CreateLocationButton";



/**
 * Page for interacting with locations
 */
export const LocationsPage: PageFC = () => {

  // field state
  const [regionId, setRegionId] = useState<string | null>(null);
  const [newLocationName, setNewLocationName] = useState<string | null>(null);


  return (
    <div className="h-full w-full flex flex-col gap-2">

      {/** Above Table */}
      <div>

        {/** Input Box */}
        <div className="w-96 flex flex-col gap-0.5">

          {/** Location and Region */}
          <div className="flex flex-row gap-1">

            {/** Region Combobox */}
            <div className="w-24">
              <RegionCombobox
                regionId={regionId}
                onChange={setRegionId}
              />
            </div>

            {/** Location Name */}
            <div className="flex-1">
              <TextInput
                label="Location Name"
                value={newLocationName}
                onChange={setNewLocationName}
              />
            </div>
          </div>


          {/** Create Location Button */}
          <CreateLocationButton
            regionId={regionId}
            name={newLocationName}
          />
        </div>
      </div>

      {/** locations table */}
      <div className="flex-1 overflow-hidden">
        <LocationsTable
          regionId={regionId ?? undefined}
        />
      </div>
    </div>
  )

}