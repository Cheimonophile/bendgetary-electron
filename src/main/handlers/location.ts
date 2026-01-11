import { channels } from "@common/channels";
import { LocationDao } from "@main/domain/daos/LocationDao";
import { RegionDao } from "@main/domain/daos/RegionDao";
import { databaseManager } from "@main/managers";
import { WindowManager } from "@main/managers/WindowManager";
import { getBrowserWindowFromWebContents } from "@main/utility/electron";
import { openConfirmDialog } from "@main/utility/electron/dialog";



/**
 * Create a location in the database
 */
channels.createLocation.mainHandle(async (event, {
  regionId,
  name
}) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const regionDao = new RegionDao(databaseManager.getDatabase());
  const region = await regionDao.read(regionId)
  if (!region) {
    throw new Error(`Region '${regionId}' not found`);
  }
  const confirmed = await openConfirmDialog(window, `Create location ${name} in ${region.name}?`);
  if (!confirmed) {
    return null;
  }
  const locationDao = new LocationDao(databaseManager.getDatabase());
  const location = await locationDao.create({
    regionId,
    name
  });
  WindowManager.notify();
  return location;
});


/**
 * Get locations from the database
 */
channels.getLocations.mainHandle(async (event, {
  regionId
}) => {
  const locationDao = new LocationDao(databaseManager.getDatabase());
  const locations = await locationDao.reads({
    regionId
  });
  return locations;
});


/**
 * Delete a location from the database
 */
channels.deleteLocation.mainHandle(async (event, locationId) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const locationDao = new LocationDao(databaseManager.getDatabase());
  const location = await locationDao.read(locationId);
  if (!location) {
    throw new Error(`Location '${locationId}' not found`);
  }
  const confirmed = await openConfirmDialog(window, `Delete location ${location.name} from ${location.region.name}?`);
  if (!confirmed) {
    return;
  }
  await locationDao.delete(locationId);
  WindowManager.notify();
});