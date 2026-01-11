import { FC, useMemo } from "react"
import { GTable, GTableColumn } from "../GTable"
import { DeleteLocationButton } from "../form/buttons/location/DeleteLocationButton";
import { Location } from '@common/interfaces/models/Location'
import { useLocations } from "@renderer/hooks/data/locationHooks";


/**
 * Props for the locations table
 */
export interface LocationsTableProps {

  /**
   * Id of the region to filter by
   */
  regionId?: string;
}



/**
 * Make the locations table generic
 */
export const LocationsTable: FC<LocationsTableProps> = ({
  regionId
}) => {


  /**
   * Get a list of the locations
   */
  const locations = useLocations({
    regionId
  });

  /**
   * Columns for the locations table
   */
  const columns = useMemo<GTableColumn<Location>[]>(() => [
    {
      label: "",
      width: "3rem",
      renderer: location => (
        <DeleteLocationButton
          text="X"
          locationId={location.id}
        />
      )
    },
    {
      label: "Region",
      width: "5rem",
      renderer: location => location.region.name
    },
    {
      label: "Name",
      width: "20rem",
      renderer: location => location.name
    },
  ], [])


  return (
    <GTable
      values={locations}
      columns={columns}
    />
  )
}