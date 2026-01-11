import { FC, useMemo } from "react"
import { GTable, GTableColumn } from "../GTable"
import { Species } from "@common/interfaces/models/Species";
import { useSpecies } from "@renderer/hooks/data/speciesHooks";
import { TypeDisplay } from "../dataDisplayts/TypeDisplay";


/**
 * Props for the species table
 */
export interface SpeciesTableProps {

  /**
   * Id of the region to filter by
   */
  regionId?: string;
}



/**
 * Make the species table generic
 */
export const SpeciesTable: FC<SpeciesTableProps> = () => {


  /**
   * Get a list of the species
   */
  const species = useSpecies();

  /**
   * Columns for the species table
   */
  const columns = useMemo<GTableColumn<Species>[]>(() => [
    {
      label: "No",
      width: "3rem",
      renderer: species => species.dexNo
    },
    {
      label: "Name",
      width: "10rem",
      renderer: species => species.name
    },
    {
      label: "Form",
      width: "10rem",
      renderer: species => species.form
    },
    {
      label: "Gen",
      width: "3rem",
      renderer: species => species.generation
    },
    {
      label: "Type 1",
      width: "6rem",
      renderer: species => <TypeDisplay type={species.type1} />
    },
    {
      label: "Type 2",
      width: "6rem",
      renderer: species => species.type2 && <TypeDisplay type={species.type2} />
    },
  ], [])


  return (
    <GTable
      values={species}
      columns={columns}
    />
  )
}