/**
 * gaps-overlay screen elements functions
 */

/**
 * position box functions
 */
function positionBoxVisible(LBposition) {
  return true;
}

function positionBoxBackground(LBposition) {
  return driver_HasBestLap(LBposition) ? "Purple" : "White";
}

function positionBoxTextColor(LBposition) {
  return driver_HasBestLap(LBposition) ? "White" : "Black";
}

function positionBoxText(LBposition) {
  return driver_Position(LBposition);
}

/**
 * car number box functions
 */
function carNumberBoxVisible(LBposition) {
  return true;
}

function carNumberBoxBackground(LBposition) {
  return DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Team.CupCategory.Color");
}

function carNumberBoxTextColor(LBposition) {
  return DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Team.CupCategory.TextColor");
}

function carNumberBoxText(LBposition) {
  return driver_CarNumber(LBposition);
}

/**
 * name box functions
 */
function nameBoxVisible(LBposition) {
  return true;
}

function nameBoxBackground(LBposition) {
  return "Transparent";
}

function nameBoxTextColor(LBposition) {
  if ($prop("SessionTypeName") == "RACE") {
    var driverLap = driver_RelativeLapNr(LBposition);
    if (driverLap < 0) {
      return "Cyan";
    } else if (driverLap > 0) {
      return "Orange";
    }
  }
  return "White";
}

function nameBoxText(LBposition) {
  return driver_Name(LBposition);
}

/**
 * best lap box functions
 */
function bestLapBoxVisible(LBposition) {
  if (timespantoseconds(driver_BestLapTime(LBposition)) === 0) {
    return false;
  }
  return true;
}

function bestLapBoxBackground(LBposition) {
  if (driver_HasBestLap(LBposition)) {
    return "Purple";
  }
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return "DeepSkyBlue";
  }
  return gapBackgroundColor(driver_BestLapDelta(LBposition), "DeepSkyBlue");
}

function bestLapBoxTextColor(LBposition) {
  if (driver_HasBestLap(LBposition)) {
    return "White";
  }
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return "Black";
  }
  return gapTextColor(driver_BestLapDelta(LBposition));
}

function bestLapBoxText(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return secToTimeStr(driver_BestLapTime(LBposition));
  }
  return format(driver_BestLapDelta(LBposition), "0.0", true);
}

/**
 * last lap box functions
 */
function lastLapBoxVisible(LBposition) {
  if (driver_LastLapDelta(LBposition) === null) {
    return false;
  }
  return true;
}

function lastLapBoxBackground(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    if (driver_LastLapTime(LBposition) === driver_BestLapTime(LBposition)) {
      return driver_HasBestLap(LBposition) ? "Purple" : "DeepSkyBlue";
    }
    return "White";
  }
  if (driver_LastLapTime(LBposition) === driver_BestLapTime(LBposition) && driver_HasBestLap(LBposition)) {
    return "Purple";
  }
  return gapBackgroundColor(driver_LastLapDelta(LBposition), "White");
}

function lastLapBoxTextColor(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    if (driver_LastLapTime(LBposition) === driver_BestLapTime(LBposition)) {
      return driver_HasBestLap(LBposition) ? "White" : "Black";
    }
    return "Black";
  }
  return gapTextColor(driver_LastLapDelta(LBposition));
}

function lastLapBoxText(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return secToTimeStr(driver_LastLapTime(LBposition));
  }
  return format(driver_LastLapDelta(LBposition), "0.0", true);
}

/**
 * delta box functions
 */
function deltaBoxVisible(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return false;
  }
  return true;
}

function deltaBoxBackground(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Pit.IsIn")) {
    return "Black";
  }
  return gapBackgroundColor(driver_Gap(LBposition), "White");
}

function deltaBoxTextColor(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Pit.IsIn")) {
    return "White";
  }
  return gapTextColor(driver_Gap(LBposition));
}

function deltaBoxText(LBposition) {
  return format(driver_Gap(LBposition), "0.0", true);
}

/**
 * sectors boxes functions
 */
function sectorBoxVisible(LBposition, sector) {
  return driver_LastLapSectorTime(LBposition, sector) !== null;
}

function sectorBoxBackground(LBposition, sector) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return driver_LastSectorIsPB(LBposition, sector) ? "DeepSkyBlue" : "White";
  }
  var sectorDelta = driver_LastLapSectorDelta(LBposition, sector);
  return gapBackgroundColor(sectorDelta, "White");
}

function sectorBoxTextColor(LBposition, sector) {
  var sectorDelta = driver_LastLapSectorDelta(LBposition, sector);
  return gapTextColor(sectorDelta);
}

function sectorBoxText(LBposition, sector) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return format(driver_LastLapSectorTime(LBposition, sector), "0.0", false);
  }
  return format(driver_LastLapSectorDelta(LBposition, sector), "0.0", true);
}
