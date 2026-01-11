import { Playthrough } from "@common/interfaces/models/Playthrough";
import { Dao } from "@main/interfaces/Dao";



/**
 * Dao for accessing playthroughs
 */
export class PlaythroughDao extends Dao {


  /**
   * Read playthroughs from the database
   */
  async reads(): Promise<readonly Playthrough[]> {
    const playthroughs: Playthrough[] = await this.connection.prisma.playthrough.findMany({
      include: {
        version: true
      },
      orderBy: {
        adventureStarted: "desc"
      }
    });
    return playthroughs;
  }
}