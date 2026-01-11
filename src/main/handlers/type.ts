import { channels } from "@common/channels";
import { TypeDao } from "@main/domain/daos/TypeDao";
import { databaseManager } from "@main/managers";



/**
 * Get the types from the database
 */
channels.getTypes.mainHandle(async (event, {
  nameSearch
}) => {
  const typeDao = new TypeDao(databaseManager.getDatabase());
  const types = await typeDao.reads({
    nameSearch
  });
  return types;
});