import { Version } from "./Version";

/**
 * The playthrough id
 */
export type PlaythroughIdNo = string;


/**
 * The playthrough model
 */
export interface Playthrough {

  /**
   * The id of the playthrough
   */
  readonly idNo: PlaythroughIdNo;

  /**
   * The name of the playthrough
   */
  readonly name: string;

  /**
   * The version id of the playthrough
   */
  readonly versionId: string;

  /**
   * The version name of the playthrough
   */
  readonly adventureStarted: Date;


  /**
   * The version of the playthrough
   */
  readonly version: Version
}