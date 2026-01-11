import { channels } from "@common/channels";
import { RegionDao } from "@main/domain/daos/RegionDao";
import { databaseManager } from "@main/managers";


/**
 * Get regions from the database
 */
channels.getRegions.mainHandle(async (event, {
  nameSearch
}) => {
  const regionDao = new RegionDao(databaseManager.getDatabase());
  const regions = await regionDao.reads({
    nameSearch
  });
  return regions;
});