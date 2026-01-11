import { channels } from "@common/channels";
import { PlaythroughDao } from "@main/domain/daos/PlaythroughDao";
import { databaseManager } from "@main/managers";





/**
 * Return the playthroughs from the database
 */
channels.getPlaythroughs.mainHandle(async () => {
  const playthroughDao = new PlaythroughDao(databaseManager.getDatabase());
  const playthroughs = await playthroughDao.reads();
  return playthroughs;
});