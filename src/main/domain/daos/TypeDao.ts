import { Type } from "@common/interfaces/models/Type";
import { Dao } from "@main/interfaces/Dao";


/**
 * Dao for getting types from the database
 */
export class TypeDao extends Dao {



  /**
   * Read a type from the database
   * 
   * @param typeId 
   * @returns 
   */
  async read(typeId: string): Promise<Type | null> {
    const type: Type | null = await this.connection.prisma.type.findUnique({
      where: {
        id: typeId
      }
    });
    return type;
  }


  /**
   * Read types from the database
   */
  async reads({
    nameSearch
  }: {
    nameSearch?: string;
  }): Promise<readonly Type[]> {
    const types: Type[] = await this.connection.prisma.type.findMany({
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
    return types;
  }


}