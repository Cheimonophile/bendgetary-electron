import { Species } from "@common/interfaces/models/Species";
import { Dao } from "@main/interfaces/Dao";





/**
 * Data access object for species
 */
export class SpeciesDao extends Dao {




  /**
   * Create a new species
   * 
   * @param param0 
   * @returns 
   */
  async create({
    generation,
    dexNo,
    type1Id,
    type2Id,
    name,
    form,
  }: {
    generation: number;
    dexNo: number;
    type1Id: string;
    type2Id: string | null;
    name: string;
    form: string | null;
  }): Promise<Species> {
    const species = await this.connection.prisma.species.create({
      data: {
        generation,
        dexNo,
        type1Id,
        type2Id,
        name,
        form,
      },
      include: {
        type1: true,
        type2: true,
      },
    });
    return species;
  }


  /**
   * Get a list of the species
   */
  async reads(): Promise<readonly Species[]> {
    const species = await this.connection.prisma.species.findMany({
      include: {
        type1: true,
        type2: true,
      },
      orderBy: {
        dexNo: "desc",
      }
    });
    return species;
  }
}