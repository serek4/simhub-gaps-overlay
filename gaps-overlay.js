/**
 * gaps overlay
 */

// var textFont = "Bahnschrift"
// var textFont = "Sui Generis Free";
var textFont = "RussellSquare";
var fontSize = 22;

/**
 * check if there is driver ahead/behind
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns true or false
 */
function isDriver(offset) {
  return $prop(readDriverProp(offset, "Name")) ? true : false;
}
/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns {number} driver overall position
 */
function driver_Position(offset) {
  return $prop(readDriverProp(offset, "Position"));
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns driver car number in #999 format
 */
function driver_CarNumber(offset) {
  return "#" + $prop(readDriverProp(offset, "CarNumber"));
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns {string} driver name with short first name (J. Smith)
 */
function driver_Name(offset) {
  let name = $prop(readDriverProp(offset, "Name"));
  let nameArray = name.split(" ");
  nameArray[0] = nameArray[0].slice(0, 1) + ".";
  return nameArray.join(" ");
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns {time} driver best lap time in mm.ss.fff format
 */
function driver_BestLapTime(offset) {
  return $prop(readDriverProp(offset, "BestLapTime"));
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns driver best lap delta to player
 */
function driver_BestLapDelta(offset) {
  var driverBestLap = timespantoseconds(driver_BestLapTime(offset));
  var playerBestLap = timespantoseconds($prop("BestLapTime"));
  return Math.min(Math.max(playerBestLap - driverBestLap, -99.9), 99.9);
}

/**
 * check if driver has session best lap time
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns true or false
 */
function driver_HasBestLap(offset) {
  if (
    $prop("BestLapOpponentPosition") + 1 ===
    $prop(readDriverProp(offset, "Position"))
  ) {
    return true;
  }
  return false;
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns {time} driver last lap time in mm.ss.fff format
 */
function driver_LastLapTime(offset) {
  return $prop(readDriverProp(offset, "LastLapTime"));
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns driver last lap delta to player
 */
function driver_LastLapDelta(offset) {
  var driverLastLap = timespantoseconds(driver_LastLapTime(offset));
  var playerLastLap = timespantoseconds($prop("LastLapTime"));
  return Math.min(Math.max(playerLastLap - driverLastLap, -99.9), 99.9);
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns driver current gap to player (negative = ahead, positive = behind)
 */
function driver_Gap(offset) {
  return -Math.min(Math.max($prop(readDriverProp(offset, "Gap")), -99.9), 99.9);
}

/**
 *
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @returns driver lap number relative to player
 */
function driver_RelativeLapNr(offset) {
  var driverLap = $prop(readDriverProp(offset, "CurrentLap"));
  var playerLap = $prop("DataCorePlugin.GameData.CompletedLaps");
  return driverLap - playerLap;
}

/**
 * get Swoop plugin data for ahead/behind or player car
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @param {string} propName driver prop name to read
 * @returns SimHub Swoop plugin prop
 */
function driver_SwoopProp(offset, propName) {
  var relativePosition;
  switch (offset) {
    case -1:
      relativePosition = "Ahead_";
      break;
    case 0:
      relativePosition = "My";
      break;
    case 1:
      relativePosition = "Behind_";
      break;

    default:
      break;
  }
  return $prop("SimHubSwoopPlugin." + relativePosition + propName);
}

/**
 * calculate opponent best sector time delta to player
 * @param {number} offset driver position relative to player (negative = ahead, positive = behind)
 * @param {number} sectorNr sector number to compare
 * @returns delta in seconds
 */
function driver_SwoopBestSectorDelta(offset, sectorNr) {
  var driverBestSector = timespantoseconds(
    driver_SwoopProp(offset, "BestSector" + sectorNr)
  );
  var playerBestSector = timespantoseconds(
    driver_SwoopProp(0, "BestSector" + sectorNr)
  );
  return driverBestSector === null ? null : playerBestSector - driverBestSector;
}

/**
 *
 * @param {number} driverRelativePosition driver position relative to player (negative = ahead, positive = behind)
 * @param {string} propName driver prop name to read
 * @returns prop string name
 */
function readDriverProp(driverRelativePosition, propName) {
  var relativePosition = driverRelativePosition > 0 ? "Behind" : "Ahead";
  return (
    "PersistantTrackerPlugin.Driver" +
    relativePosition +
    "_0" +
    (Math.abs(driverRelativePosition) - 1) +
    "_" +
    propName
  );
}
