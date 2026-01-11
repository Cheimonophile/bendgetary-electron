import { Region } from "./Region";

/**
 * A location in the pokemon database
 */
export interface Location {

  /**
   * the id of the location
   */
  readonly id: string;

  /**
   * the name of the location
   */
  readonly name: string;

  /**
   * the region of the location
   */
  readonly region: Region;
}