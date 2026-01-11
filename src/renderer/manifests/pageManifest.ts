import { IconType } from "@renderer/components/Icon";
import { BattlesPage } from "@renderer/components/pages/BattlesPage";
import { LocationsPage } from "@renderer/components/pages/LocationsPage";
import { PlaythroughsPage } from "@renderer/components/pages/PlaythroughsPage";
import { SettingsPage } from "@renderer/components/pages/SettingsPage";
import { SpeciesPage } from "@renderer/components/pages/SpeciesPage";
import { PageFC } from "@renderer/interfaces/components/PageFC";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PAGES = [
  "playthroughs",
  "locations",
  "species",
  "battles",
  "settings",
] as const satisfies string[];


export type Page = typeof PAGES[number];


export interface PageMetadata {

  /**
   * The page's label
   */
  label: string;

  /**
   * The page's icon
   */
  icon: IconType;

  /**
   * The page's component
   */
  Component?: PageFC;
}

/**
 * Manifest containing all of the pages available in the application
 */
export const pageManifest: {
  [key in Page]: PageMetadata
} = {
  playthroughs: {
    label: "Playthroughs",
    icon: "PlayIcon",
    Component: PlaythroughsPage
  },
  locations: {
    label: "Locations",
    icon: "MapIcon",
    Component: LocationsPage
  },
  species: {
    label: "Species",
    icon: "BeakerIcon",
    Component: SpeciesPage
  },
  battles: {
    label: "Battles",
    icon: "CircleStackIcon",
    Component: BattlesPage
  },
  settings: {
    label: "Settings",
    icon: "Cog6ToothIcon",
    Component: SettingsPage
  },
}