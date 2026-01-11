import { Dao } from "@main/interfaces/Dao";
import { Location } from "@common/interfaces/models/Location";


export class LocationDao extends Dao {



  /**
   * Create a location in the database
   */
  async create({
    regionId,
    name
  }: {
    regionId: string,
    name: string
  }): Promise<Location> {
    const location = await this.connection.prisma.location.create({
      data: {
        name,
        regionId
      },
      include: {
        region: true,
      }
    });
    return location;
  }


  /**
   * Read a location from the database
   * 
   * @param id 
   * @returns 
   */
  async read(id: string): Promise<Location | null> {
    const location = await this.connection.prisma.location.findUnique({
      where: {
        id
      },
      include: {
        region: true
      }
    });
    return location;
  }



  /**
   * Read playthroughs from the database
   */
  async reads({
    regionId
  }: {
    regionId?: string
  }): Promise<readonly Location[]> {
    const locations = await this.connection.prisma.location.findMany({
      where: {
        AND: [
          {
            regionId: {
              equals: regionId
            }
          }
        ]
      },
      include: {
        region: true,
        events: {
          select: {
            no: true
          },
          orderBy: {
            no: 'desc'
          },
          take: 1,
        }
      }
    });
    const sortedLocations = locations.sort((locationA, locationB) => {
      const eventANo = locationA.events[0]?.no ?? 0;
      const eventBNo = locationB.events[0]?.no ?? 0;
      return eventANo - eventBNo;
    })
    return sortedLocations;
  }


  /**
   * Delete a location from the database
   */
  async delete(id: string) {
    await this.connection.prisma.location.delete({
      where: {
        id
      }
    });
  }
}