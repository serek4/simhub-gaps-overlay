/**
 * gaps-overlay screen elements functions
 */

/**
 * main window functions
 */
function mainWindowVisible() {
  const inMenu = $prop("TyrePressureFrontLeft") === 0;
  if (!inMenu) {
    return true;
  }
  if ($prop("GameRawData.Graphics.IsSetupMenuVisible") === 1) {
    return false;
  }
  const playerCarID = $prop("DataCorePlugin.GameRawData.Graphics.PlayerCarID");
  const focusedCarID = $prop("DataCorePlugin.GameRawData.Realtime.FocusedCarIndex");
  return focusedCarID !== playerCarID;
}

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
  if (driver_BestLapTime(LBposition) === null) {
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
  return gapTextColor(bestLapBoxBackground(LBposition));
}

function bestLapBoxText(LBposition) {
  if (
    driver_BestLapDelta(LBposition) === null ||
    DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 ||
    focused_BestToOverallBestDelta() >= 30
  ) {
    return secToTimeStr(driver_BestLapTime(LBposition));
  }
  return format(driver_BestLapDelta(LBposition), "0.0", true);
}

/**
 * last lap box functions
 */
function lastLapBoxVisible(LBposition) {
  if (driver_LastLapTime(LBposition) === null) {
    return false;
  }
  return true;
}

function lastLapBoxBackground(LBposition) {
  const _lastIsPB = driver_LastLapTime(LBposition) === driver_BestLapTime(LBposition);
  if (_lastIsPB && driver_HasBestLap(LBposition)) {
    return "Purple";
  }
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1) {
    return _lastIsPB ? "DeepSkyBlue" : "White";
  }
  return gapBackgroundColor(driver_LastLapDelta(LBposition), _lastIsPB ? "DeepSkyBlue" : "White");
}

function lastLapBoxTextColor(LBposition) {
  return gapTextColor(lastLapBoxBackground(LBposition));
}

function lastLapBoxText(LBposition) {
  if (
    driver_LastLapDelta(LBposition) === null ||
    DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 ||
    focused_LastToOverallBestDelta() >= 30
  ) {
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
  return gapTextColor(deltaBoxBackground(LBposition));
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
  const _delta = driver_LastLapSectorDelta(LBposition, sector);
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 || _delta === null) {
    return driver_LastSectorIsPB(LBposition, sector) ? "DeepSkyBlue" : "White";
  }
  return gapBackgroundColor(driver_LastLapSectorDelta(LBposition, sector), "White");
}

function sectorBoxTextColor(LBposition, sector) {
  return gapTextColor(sectorBoxBackground(LBposition, sector));
}

function sectorBoxText(LBposition, sector) {
  const _delta = driver_LastLapSectorDelta(LBposition, sector);
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 || _delta === null) {
    return format(driver_LastLapSectorTime(LBposition, sector), "0.0", false);
  }
  return format(_delta, "0.0", true);
}
