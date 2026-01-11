import { settings } from "@main/api/settings";
import { DatabaseConnection } from "@main/domain/DatabaseConnection";
import { PrismaClient } from "@prisma/client";



/**
 * Manages the database connection
 */
export class DatabaseManager {


  /**
   * The currently connected database
   */
  private _database: DatabaseConnection | null = null;

  /**
   * Callbacks to call when the database is opened
   */
  private _onOpenDatabaseCallbacks = new Set<() => void>();


  /**
   * The currently connected database
   */
  private get database(): DatabaseConnection | null {
    return this._database;
  }
  private set database(database: DatabaseConnection | null) {
    this._database = database;
  }

  /**
   * Gets the currently connected database
   * 
   * @returns
   * 
   * @throws {Error} if no database is connected
   */
  public getDatabase(): DatabaseConnection {
    if (!this._database) {
      throw new Error('No database is open');
    }
    return this._database;
  }



  /**
   * Opens a database connection
   * 
   * If the database doesn't exist, creates it.
   */
  async openDatabase(filepath: string) {
    this._database = await DatabaseConnection.open(filepath);
    await settings.dbFilepath.set(filepath);
    this._onOpenDatabaseCallbacks.forEach((callback) => callback());
  }


  /**
   * Create a new database connection
   * 
   * @param filepath 
   */
  async createDatabase(filepath: string, {
    overwrite = false
  }: {
    overwrite?: boolean
  } = {}) {
    if (overwrite) {
      await DatabaseConnection.delete(filepath);
    }
    this._database = await DatabaseConnection.create(filepath);
    await settings.dbFilepath.set(filepath);
    this._onOpenDatabaseCallbacks.forEach((callback) => callback());
  }

  /**
   * Callback to call when the database is opened
   * 
   * @param callback 
   */
  onOpenDatabase(callback: () => void) {
    this._onOpenDatabaseCallbacks.add(callback);
  }


  /**
   * Loads an old database into the new database
   * 
   * @param oldPath 
   */
  async loadOldDatabase(oldPath: string) {
    if (!this._database) {
      throw new Error('No database is open');
    }
    const oldPrisma = new PrismaClient({
      datasourceUrl: `file:${oldPath}`,
    });
    await loadOldDatabase(oldPrisma, this._database.prisma);
  }
}



async function loadOldDatabase(oldPrisma: PrismaClient, newPrisma: PrismaClient) {

  // load versions
  const oldVersions = await oldPrisma.$queryRaw<{ id: number, name: string, generation: number }[]>`SELECT * FROM version`
  const versionsOldToNew = new Map<number, string>();
  for (const oldVersion of oldVersions) {
    console.log("Loading version", oldVersion.name);
    const newVersion = await newPrisma.version.create({
      data: {
        name: oldVersion.name,
        generation: oldVersion.generation,
        fanmade: false
      }
    });
    versionsOldToNew.set(oldVersion.id, newVersion.id);
  }

  // load regions
  const oldRegions = await oldPrisma.$queryRaw<{ id: number, name: string }[]>`SELECT * FROM region`
  const regionsOldToNew = new Map<number, string>();
  for (const oldRegion of oldRegions) {
    console.log("Loading region", oldRegion.name);
    const newRegion = await newPrisma.region.create({
      data: {
        name: oldRegion.name
      }
    });
    regionsOldToNew.set(oldRegion.id, newRegion.id);
  }

  // load balls
  const oldBalls = await oldPrisma.$queryRaw<{ id: number, name: string }[]>`SELECT * FROM ball`
  const ballsOldToNew = new Map<number, string>();
  for (const oldBall of oldBalls) {
    console.log("Loading ball", oldBall.name);
    const newBall = await newPrisma.ball.create({
      data: {
        name: oldBall.name,
        hisui: oldBall.name.includes('Hisui')
      }
    });
    ballsOldToNew.set(oldBall.id, newBall.id);
  }

  // load types
  const oldTypes = await oldPrisma.$queryRaw<{
    id: number,
    name: string,
    color: string
  }[]>`SELECT * FROM type`
  const typesOldToNew = new Map<number, string>();
  for (const oldType of oldTypes) {
    console.log("Loading type", oldType.name);
    const newType = await newPrisma.type.create({
      data: {
        name: oldType.name,
        color: oldType.color
      }
    });
    typesOldToNew.set(oldType.id, newType.id);
  }

  // load battle type
  const oldBattleTypes = await oldPrisma.$queryRaw<{ id: number, name: string }[]>`SELECT * FROM battle_type`
  const battleTypesOldToNew = new Map<number, string>();
  for (const oldBattleType of oldBattleTypes) {
    console.log("Loading battle type", oldBattleType.name);
    const newBattleType = await newPrisma.battleType.create({
      data: {
        name: oldBattleType.name
      }
    });
    battleTypesOldToNew.set(oldBattleType.id, newBattleType.id);
  }

  // load catch types
  const oldCatchTypes = await oldPrisma.$queryRaw<{
    id: number,
    name: string,
    detail: string | null
  }[]>`SELECT * FROM catch_type`
  const catchTypesOldToNew = new Map<number, string>();
  for (const oldCatchType of oldCatchTypes) {
    console.log("Loading catch type", oldCatchType.name);
    const newCatchType = await newPrisma.catchType.create({
      data: {
        name: oldCatchType.name,
        detail: oldCatchType.detail
      }
    });
    catchTypesOldToNew.set(oldCatchType.id, newCatchType.id);
  }

  // load items
  const oldItems = await oldPrisma.$queryRaw<{ id: number, name: string }[]>`SELECT * FROM item`
  const itemsOldToNew = new Map<number, string>();
  for (const oldItem of oldItems) {
    console.log("Loading item", oldItem.name);
    const newItem = await newPrisma.item.create({
      data: {
        name: oldItem.name
      }
    });
    itemsOldToNew.set(oldItem.id, newItem.id);
  }

  // load locations
  const oldLocations = await oldPrisma.$queryRaw<{
    id: number,
    name: string,
    region_id: number
  }[]>`SELECT * FROM location`
  const locationsOldToNew = new Map<number, string>();
  for (const oldLocation of oldLocations) {
    console.log("Loading location", oldLocation.name);
    const regionId = regionsOldToNew.get(oldLocation.region_id);
    const newLocation = await newPrisma.location.create({
      data: {
        name: oldLocation.name,
        regionId: regionId as string
      }
    });
    locationsOldToNew.set(oldLocation.id, newLocation.id);
  }

  // load species
  const oldSpecieses = await oldPrisma.$queryRaw<{
    id: number,
    name: string,
    form: string | null,
    dex_no: number,
    generation: number,
    type1_id: number,
    type2_id: number | null,
  }[]>`SELECT * FROM species`
  const speciesOldToNew = new Map<number, string>();
  for (const oldSpecies of oldSpecieses) {
    console.log("Loading species", oldSpecies.name, oldSpecies.form);
    const type1Id = typesOldToNew.get(oldSpecies.type1_id);
    const type2Id = oldSpecies.type2_id ? typesOldToNew.get(oldSpecies.type2_id) : null;
    const newSpecies = await newPrisma.species.create({
      data: {
        name: oldSpecies.name,
        form: oldSpecies.form,
        dexNo: oldSpecies.dex_no,
        generation: oldSpecies.generation,
        type1Id: type1Id as string,
        type2Id: type2Id as string | null
      }
    });
    speciesOldToNew.set(oldSpecies.id, newSpecies.id);
  }

  // load playthrough
  const oldPlaythroughs = await oldPrisma.$queryRaw<{
    id_no: string,
    name: string,
    version_id: number,
    adventure_started: string,
  }[]>`SELECT * FROM playthrough`
  // const playthroughsOldToNew = new Map<string, string>();
  for (const oldPlaythrough of oldPlaythroughs) {
    console.log("Loading playthrough", oldPlaythrough.adventure_started);
    const versionId = versionsOldToNew.get(oldPlaythrough.version_id);
    await newPrisma.playthrough.create({
      data: {
        idNo: oldPlaythrough.id_no,
        name: oldPlaythrough.name,
        versionId: versionId as string,
        adventureStarted: new Date(oldPlaythrough.adventure_started).toISOString()
      }
    });
    // playthroughsOldToNew.set(oldPlaythrough.idNo, newPlaythrough.id);
  }

  // load team members
  const oldTeamMembers = await oldPrisma.$queryRaw<{
    id: number,
    playthrough_id_no: string,
    slot: number,
    nickname: string | null
    caught_date: string,
    caught_location_id: number,
    caught_species_id: number,
    caught_level: number,
    ball_id: number,
    gender: string
  }[]>`SELECT * FROM team_member`
  const teamMembersOldToNew = new Map<number, string>();
  for (const oldTeamMember of oldTeamMembers) {
    console.log("Loading team member", oldTeamMember.playthrough_id_no, oldTeamMember.slot);
    const playthroughId = oldTeamMember.playthrough_id_no;
    const caughtLocationId = locationsOldToNew.get(oldTeamMember.caught_location_id);
    const caughtSpeciesId = speciesOldToNew.get(oldTeamMember.caught_species_id);
    const ballId = ballsOldToNew.get(oldTeamMember.ball_id);
    const newTeamMember = await newPrisma.teamMember.create({
      data: {
        playthroughIdNo: playthroughId,
        slot: oldTeamMember.slot,
        nickname: oldTeamMember.nickname,
        caughtDate: new Date(oldTeamMember.caught_date).toISOString(),
        caughtLocationId: caughtLocationId as string,
        caughtSpeciesId: caughtSpeciesId as string,
        caughtLevel: oldTeamMember.caught_level,
        ballId: ballId as string,
        gender: oldTeamMember.gender,
      }
    });
    teamMembersOldToNew.set(oldTeamMember.id, newTeamMember.id);
  }


  // load trainer class
  const oldTrainerClasses = await oldPrisma.$queryRaw<{ id: number, name: string }[]>`SELECT * FROM trainer_class`
  const trainerClassesOldToNew = new Map<number, string>();
  for (const oldTrainerClass of oldTrainerClasses) {
    console.log("Loading trainer class", oldTrainerClass.name);
    const newTrainerClass = await newPrisma.trainerClass.create({
      data: {
        name: oldTrainerClass.name.replace(' & ', ' and ')
      }
    });
    trainerClassesOldToNew.set(oldTrainerClass.id, newTrainerClass.id);
  }

  // load trainers
  const oldTrainers = await oldPrisma.$queryRaw<{
    id: number,
    name: string,
    class_id: number
  }[]>`SELECT * FROM trainer`
  const trainersOldToNew = new Map<number, string>();
  for (const oldTrainer of oldTrainers) {
    console.log("Loading trainer", oldTrainer.name);
    const classId = trainerClassesOldToNew.get(oldTrainer.class_id);
    const newTrainer = await newPrisma.trainer.create({
      data: {
        name: oldTrainer.name,
        classId: classId as string
      }
    });
    trainersOldToNew.set(oldTrainer.id, newTrainer.id);
  }

  // load events
  const oldEvents = await oldPrisma.$queryRaw<{
    no: number,
    playthrough_id_no: string,
    location_id: number,
    date: string,
  }[]>`SELECT * FROM event`
  const eventsOldToNew = new Map<number, number>();
  for (const oldEvent of oldEvents) {
    console.log("Loading event", oldEvent.no);
    const playthroughId = oldEvent.playthrough_id_no;
    const locationId = locationsOldToNew.get(oldEvent.location_id);
    const newEvent = await newPrisma.event.create({
      data: {
        playthroughIdNo: playthroughId,
        locationId: locationId as string,
        date: new Date(oldEvent.date).toISOString()
      }
    });
    eventsOldToNew.set(oldEvent.no, newEvent.no);
  }

  // battle events
  const oldBattleEvents = await oldPrisma.$queryRaw<{
    no: number,
    battle_type_id: number,
    opponent1_id: number,
    opponent2_id: number | null,
    partner_id: number | null,
    lost: boolean,
    round: number | null,
  }[]>`SELECT * FROM battle_event`
  for (const oldBattleEvent of oldBattleEvents) {
    console.log("Loading battle event", oldBattleEvent.no);
    const no = eventsOldToNew.get(oldBattleEvent.no);
    const battleTypeId = battleTypesOldToNew.get(oldBattleEvent.battle_type_id);
    const opponent1Id = trainersOldToNew.get(oldBattleEvent.opponent1_id);
    const opponent2Id = oldBattleEvent.opponent2_id ? trainersOldToNew.get(oldBattleEvent.opponent2_id) : null;
    const partnerId = oldBattleEvent.partner_id ? trainersOldToNew.get(oldBattleEvent.partner_id) : null;
    await newPrisma.battleEvent.create({
      data: {
        no: no as number,
        battleTypeId: battleTypeId as string,
        opponent1Id: opponent1Id as string,
        opponent2Id: opponent2Id as string | null,
        partnerId: partnerId as string | null,
        lost: oldBattleEvent.lost,
        round: oldBattleEvent.round
      }
    });
  }

  // item events
  const oldItemEvents = await oldPrisma.$queryRaw<{
    no: number,
    item_id: number,
  }[]>`SELECT * FROM item_event`
  for (const oldItemEvent of oldItemEvents) {
    console.log("Loading item event", oldItemEvent.no);
    const no = eventsOldToNew.get(oldItemEvent.no);
    const itemId = itemsOldToNew.get(oldItemEvent.item_id);
    await newPrisma.itemEvent.create({
      data: {
        no: no as number,
        itemId: itemId as string
      }
    });
  }

  // catch events
  const oldCatchEvents = await oldPrisma.$queryRaw<{
    no: number,
    catch_type_id: number,
    team_member_id: number,
  }[]>`SELECT * FROM catch_event`
  for (const oldCatchEvent of oldCatchEvents) {
    console.log("Loading catch event", oldCatchEvent.no, oldCatchEvent.team_member_id);
    const no = eventsOldToNew.get(oldCatchEvent.no);
    const catchTypeId = catchTypesOldToNew.get(oldCatchEvent.catch_type_id);
    const teamMemberId = teamMembersOldToNew.get(oldCatchEvent.team_member_id);
    await newPrisma.catchEvent.create({
      data: {
        no: no as number,
        catchTypeId: catchTypeId as string,
        teamMemberId: teamMemberId as string
      }
    });
  }


  // load team member changes
  const oldTeamMemberChanges = await oldPrisma.$queryRaw<{
    event_no: number,
    team_member_id: number,
    level: number | null,
    species_id: number | null,
  }[]>`SELECT * FROM team_member_change`
  for (const oldTeamMemberChange of oldTeamMemberChanges) {
    console.log("Loading team member change", oldTeamMemberChange.event_no, oldTeamMemberChange.team_member_id);
    const eventNo = eventsOldToNew.get(oldTeamMemberChange.event_no);
    const teamMemberId = teamMembersOldToNew.get(oldTeamMemberChange.team_member_id);
    const speciesId = oldTeamMemberChange.species_id ? speciesOldToNew.get(oldTeamMemberChange.species_id) : null;

    // check if the new team member exists
    const newTeamMember = await newPrisma.teamMemberChange.findFirst({
      where: {
        eventNo: eventNo as number,
        teamMemberId: teamMemberId as string
      }
    })

    // create if it doesn't exist
    if (!newTeamMember) {
      await newPrisma.teamMemberChange.create({
        data: {
          eventNo: eventNo as number,
          teamMemberId: teamMemberId as string,
          level: oldTeamMemberChange.level,
          speciesId: speciesId as string | null
        }
      });
    }

    // update if it does exist
    else {

      // update the level if it exists
      if (oldTeamMemberChange.level !== null) {
        await newPrisma.teamMemberChange.update({
          where: {
            teamMemberId_eventNo: {
              eventNo: eventNo as number,
              teamMemberId: teamMemberId as string
            }
          },
          data: {
            level: oldTeamMemberChange.level
          }
        });
      }

      // update the species if it exists
      if (oldTeamMemberChange.species_id !== null) {
        await newPrisma.teamMemberChange.update({
          where: {
            teamMemberId_eventNo: {
              eventNo: eventNo as number,
              teamMemberId: teamMemberId as string
            }
          },
          data: {
            speciesId: speciesId as string
          }
        });
      }
    }
  }


}