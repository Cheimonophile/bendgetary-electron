

/**
 * A pokemon version
 */
export interface Version {

  /**
   * The id of the version
   */
  readonly id: string;

  /**
   * The name of the version
   */
  readonly name: string;

  /**
   * The generation of the version
   */
  readonly generation: number;

  /**
   * Is this version a fanmade version
   */
  readonly fanmade: boolean;

}