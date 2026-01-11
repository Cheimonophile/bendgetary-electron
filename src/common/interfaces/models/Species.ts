import { Type } from "./Type";


/**
 * Interface for a pokemon species
 */
export interface Species {

  /**
   * ID of the species
   */
  readonly id: string;

  /**
   * Generation of the species
   */
  readonly generation: number;

  /**
   * Dex number of the species
   */
  readonly dexNo: number;

  /**
   * Type 1 of the species
   */
  readonly type1: Type;

  /**
   * Type 2 of the species
   */
  readonly type2: Type | null;


  /**
   * Name of the species
   */
  readonly name: string;

  /**
   * Form of the species
   */
  readonly form: string | null;

}