import { Region } from "@common/interfaces/models/Region";
import { Dao } from "@main/interfaces/Dao";




export class RegionDao extends Dao {



  /**
   * Read a region from the database
   * 
   * @param regionId 
   * @returns 
   */
  async read(regionId: string): Promise<Region | null> {
    const region: Region | null = await this.connection.prisma.region.findUnique({
      where: {
        id: regionId
      }
    });
    return region;
  }


  /**
   * Read regions from the database
   */
  async reads({
    nameSearch
  }: {
    nameSearch?: string;
  }): Promise<readonly Region[]> {
    const regions: Region[] = await this.connection.prisma.region.findMany({
      where: {
        AND: nameSearch?.split(/\s/)?.filter(value => value)?.map(searchTerm => {
          return {
            name: {
              contains: searchTerm
            }
          }
        })
      }
    });
    return regions;
  }


}