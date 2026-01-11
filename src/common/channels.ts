import { makeMainToRendererChannel } from "./interfaces/channels/MainToRendererChannel";
import { RendererToMainChannel, makeRendererToMainChannel } from "./interfaces/channels/RendererToMainChannel";
import { Location } from "./interfaces/models/Location";
import { Playthrough } from "./interfaces/models/Playthrough";
import { Region } from "./interfaces/models/Region";
import { Species } from "./interfaces/models/Species";
import { Type } from "./interfaces/models/Type";

/**
 * Channels available to the application
 * 
 * DO NOT IMPORT IN RENDERER PROCESS; CAN ONLY BE USED IN MAIN AND PRELOAD
 * 
 * use window.channels instead
 */
export const channels = Object.freeze({

  // database channels
  getDatabasePath: makeRendererToMainChannel<void, string | null>("getDatabasePath"),
  createDatabase: makeRendererToMainChannel<void, void>("createDatabase"),
  createDatabaseFromOld: makeRendererToMainChannel<void, void>("createDatabaseFromOld"),
  openDatabase: makeRendererToMainChannel<void, void>("openDatabase"),


  // type channels
  getTypes: makeRendererToMainChannel<{
    nameSearch?: string
  }, readonly Type[]>("getTypes"),

  // region channels
  getRegions: makeRendererToMainChannel<{
    nameSearch?: string
  }, readonly Region[]>("getRegions"),

  // species channels
  createSpecies: makeRendererToMainChannel<{
    generation: number,
    dexNo: number,
    type1Id: string,
    type2Id: string | null,
    name: string,
    form: string | null
  }, Species | null>("createSpecies"),
  getSpecies: makeRendererToMainChannel<void, readonly Species[]>("getSpecies"),

  // location channels
  createLocation: makeRendererToMainChannel<{
    regionId: string,
    name: string
  }, Location | null>("createLocation"),
  getLocations: makeRendererToMainChannel<{
    regionId?: string
  }, readonly Location[]>("getLocations"),
  deleteLocation: makeRendererToMainChannel<string, void>("deleteLocation"),

  // playthrough channels
  getPlaythroughs: makeRendererToMainChannel<void, readonly Playthrough[]>("getPlaythroughs"),
} satisfies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: RendererToMainChannel<any, any>;
})



/**
 * Observer channel. 
 * 
 * Used to allow the the main process to notify observer processes of changes
 * 
 * Should pass back a number that gets incremented every time the state changes
 */
export const observerChannel = makeMainToRendererChannel<void>("observerChannel");