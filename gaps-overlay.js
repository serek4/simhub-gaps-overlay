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

/**
 * SimHub Swoop Plugin functions
 */

/**
 * get Swoop plugin data for ahead/behind or player car
 * @param {number} relativePosition driver position relative to player (-1 = ahead, 0 = player, +1 = behind)
 * @param {string} propName driver prop name to read
 * @returns SimHub Swoop plugin prop
 */
function swoop_driverProp(relativePosition, propName) {
  var relativePositionString;
  switch (relativePosition) {
    case -1:
      relativePositionString = "Ahead_";
      break;
    case 0:
      relativePositionString = "My";
      break;
    case 1:
      relativePositionString = "Behind_";
      break;

    default:
      break;
  }
  return $prop("SimHubSwoopPlugin." + relativePositionString + propName);
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, 0 = player, +1 = behind)
 * @returns {string} driver name with short first name (J. Smith)
 */
function swoop_driverName(relativePosition) {
  var firstName = swoop_driverProp(relativePosition, "FirstName");
  if (firstName !== null) {
    firstName.slice(0, 1) + ".";
    return firstName + " " + swoop_driverProp(relativePosition, "LastName");
  }
  return null;
}

/**
 * calculate driver last lap sector time delta to player
 * @param {number} relativePosition driver position relative to player (-1 = ahead, +1 = behind)
 * @param {number} sectorNr sector number to compare
 * @returns delta in seconds
 */
function swoop_driverLastLapSectorDelta(relativePosition, sectorNr) {
  var driverLastLapSector = timespantoseconds(
    swoop_driverProp(relativePosition, "LastLapSector" + sectorNr)
  );
  var playerLastLapSector = timespantoseconds(
    swoop_driverProp(0, "LastLapSector" + sectorNr)
  );
  return driverLastLapSector === null
    ? null
    : playerLastLapSector - driverLastLapSector;
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, 0 = player, +1 = behind)
 * @param {number} sectorNr sector number to compare
 * @returns true or false
 */
function swoop_driverLastLapSectorIsBest(relativePosition, sectorNr) {
  var driverLastLapSector = timespantoseconds(
    swoop_driverProp(relativePosition, "LastLapSector" + sectorNr)
  );
  if (driverLastLapSector === 0) {
    return false;
  }
  var allCarsBestSector = timespantoseconds(
    $prop("SimHubSwoopPlugin.AllCarsBestSector" + sectorNr)
  );
  return driverLastLapSector === allCarsBestSector ? true : false;
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, 0 = player, +1 = behind)
 * @param {number} sectorNr sector number to compare
 * @returns true or false
 */
function swoop_driverLastLapSectorIsPersonalBest(relativePosition, sectorNr) {
  var driverLastLapSector = timespantoseconds(
    swoop_driverProp(relativePosition, "LastLapSector" + sectorNr)
  );
  if (driverLastLapSector === 0) {
    return false;
  }
  var driverBestSector = timespantoseconds(
    swoop_driverProp(relativePosition, "BestSector" + sectorNr)
  );
  return driverLastLapSector === driverBestSector ? true : false;
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, +1 = behind)
 * @returns driver last lap delta to player
 */
function swoop_driverLastLapDelta(relativePosition) {
  var driverLastLap = timespantoseconds(
    swoop_driverProp(relativePosition, "LastlapTime")
  );
  var playerLastLap = timespantoseconds($prop("LastLapTime"));
  return Math.min(Math.max(playerLastLap - driverLastLap, -99.9), 99.9);
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, 0 = player, +1 = behind)
 * @returns driver last lap delta background color
 */
function swoop_driverLastLapDeltaBackground(relativePosition) {
  var allCarsBestLapTime = timespantoseconds(
    $prop("SimHubSwoopPlugin.AllCarsBestLap")
  );
  var driverLastLapTime = timespantoseconds(
    swoop_driverProp(relativePosition, "LastlapTime")
  );
  if (!(driverLastLapTime === 0) && driverLastLapTime === allCarsBestLapTime) {
    return "Purple";
  }
  if (swoop_driverLastLapDelta(relativePosition) < -0.1) {
    return "Green";
  }
  if (swoop_driverLastLapDelta(relativePosition) > 0.1) {
    return "Red";
  }
  return "White";
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, +1 = behind)
 * @returns driver best lap delta to player
 */
function swoop_driverBestLapDelta(relativePosition) {
  var driverBestLap = timespantoseconds(
    swoop_driverProp(relativePosition, "BestlapTime")
  );
  var playerBestLap = timespantoseconds($prop("BestLapTime"));
  return Math.min(Math.max(playerBestLap - driverBestLap, -99.9), 99.9);
}

/**
 *
 * @param {number} relativePosition driver position relative to player (-1 = ahead, 0 = player, +1 = behind)
 * @returns driver best lap delta background color
 */
function swoop_driverBestLapDeltaBackground(relativePosition) {
  var allCarsBestLapTime = timespantoseconds(
    $prop("SimHubSwoopPlugin.AllCarsBestLap")
  );
  var driverBestLapTime = timespantoseconds(
    swoop_driverProp(relativePosition, "BestlapTime")
  );
  if (driverBestLapTime !== 0 && driverBestLapTime === allCarsBestLapTime) {
    return "Purple";
  }
  if (swoop_driverBestLapDelta(relativePosition) < -0.1) {
    return "Green";
  }
  if (swoop_driverBestLapDelta(relativePosition) > 0.1) {
    return "Red";
  }
  return "White";
}

/**
 *
 * @param {number} relativePosition driver position relative to player (negative = ahead, positive = behind)
 * @returns swoop plugin leaderBoard prop
 */
function swoop_LeaderBoardProp(relativePosition, propName) {
  var position = driver_Position(relativePosition);
  if (position > 30) {
    return null;
  }
  return $prop(
    "SimHubSwoopPlugin.SWLeaderBoard.Position" + position + "." + propName
  );
}
