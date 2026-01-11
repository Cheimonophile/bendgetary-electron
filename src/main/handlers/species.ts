import { channels } from "@common/channels";
import { SpeciesDao } from "@main/domain/daos/SpeciesDao";
import { databaseManager } from "@main/managers";
import { getBrowserWindowFromWebContents } from "@main/utility/electron";
import { openConfirmDialog } from "@main/utility/electron/dialog";


/**
 * Create a new species
 */
channels.createSpecies.mainHandle(async (event, {
  generation,
  dexNo,
  type1Id,
  type2Id,
  name,
  form
}) => {
  const window = getBrowserWindowFromWebContents(event.sender);
  const speciesDao = new SpeciesDao(databaseManager.getDatabase());
  const confirmed = await openConfirmDialog(
    window,
    `Create species ${name}${form ? ` (${form})` : ""}?`
  );
  if (!confirmed) {
    return null;
  }
  const species = await speciesDao.create({
    generation,
    dexNo,
    type1Id,
    type2Id,
    name,
    form
  });
  return species;
});



/**
 * Get the species
 */
channels.getSpecies.mainHandle(async () => {
  const speciesDao = new SpeciesDao(databaseManager.getDatabase());
  const species = await speciesDao.reads();
  return species; 
});