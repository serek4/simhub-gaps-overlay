/**
 * gaps-overlay screen elements functions
 */

/**
 * main window functions
 */
function mainWindowVisible() {
  const inMenu = $prop("TyrePressureFrontLeft") === 0;
  const solo = $prop("OpponentsCount") <= 1;
  if (!solo) {
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
  return false;
}

/**
 * position box functions
 */
function positionBoxVisible(LBposition) {
  return true;
}

function positionBoxBackground(LBposition) {
  return DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Car.Class.Color");
}

function positionBoxTextColor(LBposition) {
  const _carClass = DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Car.Class");
  switch (_carClass) {
    case "ST15":
    case "CUP17":
      return "Black";
    case "GT3":
    case "GT4":
    case "CHL":
    case "CUP21":
    case "ST21":
    case "TCX":
      return "White";

    default:
      return "Black";
  }
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
 * car logo box functions
 */
function carLogoBoxVisible(LBposition) {
  return true;
}

function carLogoBoxBackground(LBposition) {
  return "Black";
}

function carLogoBoxImage(LBposition) {
  return DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Car.Manufacturer").toLowerCase().replace(/\d/, "").replace(" ", "-");
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
  if (
    DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 ||
    $prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY"
  ) {
    return "DeepSkyBlue";
  }
  return gapBackgroundColor(driver_BestLapDelta(LBposition), "DeepSkyBlue");
}

function bestLapBoxTextColor(LBposition) {
  return gapTextColor(bestLapBoxBackground(LBposition));
}

function bestLapBoxText(LBposition, mode) {
  const _delta = driver_BestLapDelta(LBposition);
  if (
    $prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY" ||
    _delta === null ||
    Math.abs(_delta) >= 60 ||
    DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 ||
    focused_BestToBestDelta() >= 30 ||
    mode === "time"
  ) {
    return secToTimeStr(driver_BestLapTime(LBposition));
  }
  return format(_delta, "0.0", true);
}

/**
 * last lap box functions
 */
function lastLapBoxVisible(LBposition) {
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    if (driver_BestLapDelta(LBposition) === null) {
      return false;
    }
    return true;
  }
  if (driver_LastLapTime(LBposition) === null) {
    return false;
  }
  return true;
}

function lastLapBoxBackground(LBposition) {
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    return gapBackgroundColor(driver_BestLapDelta(LBposition), "DeepSkyBlue");
  }
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

function lastLapBoxText(LBposition, mode) {
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    return format(driver_BestLapDelta(LBposition), "0.0", true);
  }
  const _delta = driver_LastLapDelta(LBposition);
  if (
    _delta === null ||
    Math.abs(_delta) >= 60 ||
    DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 ||
    focused_LastToBestDelta() >= 30 ||
    mode === "time"
  ) {
    return secToTimeStr(driver_LastLapTime(LBposition));
  }
  return format(_delta, "0.0", true);
}

/**
 * delta box functions
 */

function deltaBoxCheckered(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFinished") === 1) {
    return true;
  }
  return false;
}

function deltaBoxVisible(LBposition) {
  return true;
}

function deltaBoxBackground(LBposition) {
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Pit.IsIn")) {
    return "Black";
  }
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Laps.Current.IsOutLap")) {
      return "OrangeRed";
    }
    return DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Laps.Current.IsValid") ? "Green" : "Red";
  }
  return gapBackgroundColor(driver_Gap(LBposition), "Black");
}

function deltaBoxTextColor(LBposition) {
  return gapTextColor(deltaBoxBackground(LBposition));
}

function deltaBoxText(LBposition) {
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Pit.IsIn")) {
      return "in pit";
    }
    if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Laps.Current.IsOutLap")) {
      return "out lap";
    }
    return DynLeaderboardsPluginProp(leaderBoardName, LBposition, "Laps.Current.IsValid") ? "fast" : "invalid";
  }
  return driver_Gap(LBposition);
}

/**
 * sectors boxes functions
 */
function sectorBoxVisible(LBposition, sector) {
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    return driver_BestLapSectorTime(LBposition, sector) !== null;
  }
  return driver_LastLapSectorTime(LBposition, sector) !== null;
}

function sectorBoxBackground(LBposition, sector) {
  let _delta = driver_LastLapSectorDelta(LBposition, sector);
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    _delta = driver_BestLapSectorDelta(LBposition, sector);
  }
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 || _delta === null) {
    if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
      return "DeepSkyBlue";
    }
    return driver_LastSectorIsPB(LBposition, sector) ? "DeepSkyBlue" : "White";
  }
  return gapBackgroundColor(_delta, "White");
}

function sectorBoxTextColor(LBposition, sector) {
  return gapTextColor(sectorBoxBackground(LBposition, sector));
}

function sectorBoxText(LBposition, sector, mode) {
  let _delta = driver_LastLapSectorDelta(LBposition, sector);
  let _time = driver_LastLapSectorTime(LBposition, sector);
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    _delta = driver_BestLapSectorDelta(LBposition, sector);
    _time = driver_BestLapSectorTime(LBposition, sector);
  }
  if (DynLeaderboardsPluginProp(leaderBoardName, LBposition, "IsFocused") === 1 || _delta === null || mode === "time") {
    return format(_time, "0.0", false);
  }
  return format(_delta, "0.0", true);
}

/**
 * labels
 */
function leaderboardTypeVisible() {
  return true;
}

function leaderboardTypeBackground() {
  return "#80000000";
}

function leaderboardTypeTextColor() {
  return "White";
}

function leaderboardTypeText() {
  return $prop("DynLeaderboardsPlugin." + leaderBoardName + ".CurrentLeaderboard")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase();
}

function classNameVisible() {
  return leaderboardType() == "Class";
}

function classNameBackground() {
  return "#80000000";
}

function classNameTextColor() {
  return "White";
}

function classNameText() {
  const _focusedPosition = $prop("DynLeaderboardsPlugin." + leaderBoardName + ".FocusedPosInCurrentLeaderboard") + 1;
  return DynLeaderboardsPluginProp(leaderBoardName, _focusedPosition, "Car.Class");
}

function displayModeVisible() {
  return true;
}

function displayModeBackground() {
  return "#80000000";
}

function displayModeTextColor() {
  return "White";
}

function displayModeText(mode) {
  if ($prop("DataCorePlugin.GameData.SessionTypeName") === "QUALIFY") {
    return "quali";
  }
  return mode;
}
