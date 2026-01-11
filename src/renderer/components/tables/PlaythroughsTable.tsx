import { FC, useMemo } from "react";
import { GTable, GTableColumn } from "../GTable";
import { Playthrough } from "@common/interfaces/models/Playthrough";
import { usePlaythroughs } from "@renderer/hooks/data/playthroughHooks";



/**
 * Table for playthroughs
 */
export const PlaythroughsTable: FC = () => {

  /**
   * Playthroughs in the application
   */
  const playthroughs = usePlaythroughs();


  /**
   * Columns for the playthroughs table
   */
  const columns = useMemo((): GTableColumn<Playthrough>[] => [
    {
      label: "Name",
      width: "10rem",
      renderer: playthrough => playthrough.name ?? ""
    },
    {
      label: "Version",
      width: "7rem",
      renderer: playthrough => playthrough.version.name
    },
    {
      label: "Adventure Started",
      width: "10rem",
      renderer: playthrough => playthrough.adventureStarted.toLocaleDateString()
    }
  ], [])



  return (
    <GTable
      columns={columns}
      values={playthroughs}
    />
  )


};