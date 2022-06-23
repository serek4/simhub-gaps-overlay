/**
 * gaps overlay
 */

// var textFont = "Bahnschrift"
// var textFont = "Sui Generis Free";
var textFont = "RussellSquare";
var fontSize = 22;
var leaderBoardName = "gaps";

/**
 * check if there is driver on leader board
 * @param {number} position driver position in leader board
 * @returns true or false
 */
function isDriver(position) {
  return driver_Position(position) != null ? true : false;
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns {number} driver overall position
 */
function driver_Position(position) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "Position.Overall");
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns driver car number in #999 format
 */
function driver_CarNumber(position) {
  return "#" + DynLeaderboardsPluginProp(leaderBoardName, position, "Car.Number");
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns {string} driver name with short first name (J. Smith)
 */
function driver_Name(position) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "Driver.1.InitialPlusLastName");
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns {time} driver best lap time in mm.ss.fff format
 */
function driver_BestLapTime(position) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "Laps.Best.Time");
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns driver best lap delta to focused (from focused POW: negative = slower, positive = faster)
 */
function driver_BestLapDelta(position) {
  var _driverBestLapDelta = DynLeaderboardsPluginProp(
    leaderBoardName,
    position,
    "Laps.Best.Delta.Dynamic.ToFocusedBest"
  );
  return _driverBestLapDelta === null ? null : -Math.min(Math.max(_driverBestLapDelta, -99.9), 99.9);
}

/**
 * check if driver has session best lap time
 * @param {number} position driver position in leader board
 * @returns true or false
 */
function driver_HasBestLap(position) {
  if (DynLeaderboardsPluginProp(leaderBoardName, position, "IsOverallBestLapCar")) {
    return true;
  }
  return false;
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns {time} driver last lap time in mm.ss.fff format
 */
function driver_LastLapTime(position) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "Laps.Last.Time");
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns driver last lap delta to focused (from focused POW: negative = slower, positive = faster)
 */
function driver_LastLapDelta(position) {
  var _driverLastLapDelta = DynLeaderboardsPluginProp(
    leaderBoardName,
    position,
    "Laps.Last.Delta.Dynamic.ToFocusedLast"
  );
  return _driverLastLapDelta === null ? null : -Math.min(Math.max(_driverLastLapDelta, -99.9), 99.9);
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns driver current gap to focused (negative = behind, positive = ahead)
 */
function driver_Gap(position) {
  var _driverGapToFocused = DynLeaderboardsPluginProp(leaderBoardName, position, "Gap.ToFocused.OnTrack");
  return _driverGapToFocused === null ? null : Math.min(Math.max(_driverGapToFocused, -99.9), 99.9);
}

/**
 *
 * @param {number} position driver position in leader board
 * @returns driver lap number relative to focused
 */
function driver_RelativeLapNr(position) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "RelativeOnTrackLapDiff");
}
/**
 *
 * @param {number} position driver position in leader board
 * @param {number} sectorNr sector number
 * @returns time in seconds
 */
function driver_LastLapSectorTime(position, sectorNr) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "Laps.Last.S" + sectorNr);
}
/**
 * calculate driver last lap sector time delta to focused
 * @param {number} position driver position in leader board
 * @param {number} sectorNr sector number
 * @returns delta in seconds
 */
function driver_LastLapSectorDelta(position, sectorNr) {
  const _driverLastLapSector = driver_LastLapSectorTime(position, sectorNr);
  const _focusedLastLapSector = driver_LastLapSectorTime(
    $prop("DynLeaderboardsPlugin." + leaderBoardName + ".FocusedPosInCurrentLeaderboard") + 1,
    sectorNr
  );
  if (_driverLastLapSector === null || _focusedLastLapSector === null) {
    return null;
  }
  return Math.min(Math.max(_focusedLastLapSector - _driverLastLapSector, -99.9), 99.9);
}
/**
 *
 * @param {number} position driver position in leader board
 * @param {number} sectorNr sector number to compare
 * @returns time in seconds
 */
function driver_BestSectorTime(position, sectorNr) {
  return DynLeaderboardsPluginProp(leaderBoardName, position, "BestS" + sectorNr);
}
/**
 *
 * @param {number} position driver position in leader board
 * @param {number} sectorNr sector number to compare
 * @returns true or false
 */
function driver_LastSectorIsPB(position, sectorNr) {
  var _PB = driver_BestSectorTime(position, sectorNr);
  var _last = driver_LastLapSectorTime(position, sectorNr);
  return _last === _PB ? true : false;
}
/**
 *
 * @param {string} leaderBoard leader board name
 * @param {number} position position in leader board
 * @param {string} prop prop to read
 * @returns
 */
function DynLeaderboardsPluginProp(leaderBoard, position, prop) {
  return $prop("DynLeaderboardsPlugin." + leaderBoard + "." + position + "." + prop);
}

function secToTimeStr(sec) {
  return new Date(Math.round(sec * 10) * 100).toISOString().substr(14, 7);
}

function gapBackgroundColor(gap, defaultColor) {
  if (gap === null) {
    return defaultColor;
  }
  if (gap < -0.5) {
    return "Green";
  }
  if (gap < -0.1) {
    return "GreenYellow";
  }
  if (gap >= -0.1 && gap <= 0.1) {
    return "White";
  }
  if (gap > 0.5) {
    return "Red";
  }
  if (gap > 0.1) {
    return "OrangeRed";
  }
  return defaultColor;
}

function gapTextColor(gapBackgroundColor) {
  switch (gapBackgroundColor) {
    case "Purple":
    case "Green":
    case "Red":
    case "Black":
      return "White";
    case "DeepSkyBlue":
    case "GreenYellow":
    case "OrangeRed":
    case "White":
      return "Black";

    default:
      return "Black";
  }
}

function isPartialLeaderBoard(leaderBoard) {
  var currentLeaderboard = $prop("DynLeaderboardsPlugin." + leaderBoard + "." + "CurrentLeaderboard");
  return currentLeaderboard.startsWith("PartialRelative");
}

function LBPosition(repeatIndex, screen) {
  switch (screen) {
    case 1:
      return repeatIndex;
    case 2:
      if (isPartialLeaderBoard(leaderBoardName)) {
        var focusedPosition = $prop("DynLeaderboardsPlugin." + leaderBoardName + ".FocusedPosInCurrentLeaderboard") + 1;
        switch (focusedPosition) {
          case 1:
          case 2:
            return repeatIndex;
          case 3:
            return repeatIndex + 1;
          case 4:
            return repeatIndex + 2;

          default:
            return repeatIndex + 3;
        }
      }
      return repeatIndex + 2;

    default:
      return repeatIndex;
  }
}
