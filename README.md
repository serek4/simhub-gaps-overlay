# Simhub relative leaderboard overlay

## screens

![gaps-screen1-RelativeOnTrack](images/gaps-screen1-RelativeOnTrack.png)
![gaps-screen1-RelativeOverall](images/gaps-screen1-PartialRelativeOverall.png)  
![gaps-screen1-PartialRelativeOverall](images/gaps-screen1-PartialRelativeClass.png)
![gaps-screen2-RelativeOnTrack](images/gaps-screen2-RelativeOnTrack.png)

## screen 1

### race
<img src="images/screen1-row.png" width ="750px">

### qualify
<img src="images/screen1-qualify-row.png" width ="750px">

## screen 2

### race
<img src="images/screen2-row.png" width ="750px">

### qualify
<img src="images/screen2-qualify-row.png" width ="750px">

## background colors

| position box color                                                    | delta box color                                                          | times box color                                                       |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| <img src="images/position-GT3.png" height="20px">   GT3               | <img src="images/box-red.png" height="20px">         more than +0.5s     | <img src="images/box-purple.png" height="20px">      session best lap |
| <img src="images/position-GT4.png" height="20px">   GT4               | <img src="images/box-orangeRed.png" height="20px">   from +0.1s to +0.5s | <img src="images/box-deepSkyBlue.png" height="20px"> driver best lap  |
| <img src="images/position-ST15.png" height="20px">  Super Trofeo 2015 | <img src="images/box-white.png" height="20px">       from +0.1s to -0.1s | <img src="images/box-white.png" height="20px">       driver last lap  |
| <img src="images/position-ST21.png" height="20px">  Super Trofeo 2021 | <img src="images/box-greenYellow.png" height="20px"> from -0.1s to -0.5s |
| <img src="images/position-CHL.png" height="20px">   Ferrari Challenge | <img src="images/box-green.png" height="20px">       less than -0.5s     |
| <img src="images/position-CUP17.png" height="20px"> Porsche CUP 2017  | <img src="images/box-black.png" height="20px">       car in pit lane*    |
| <img src="images/position-CUP21.png" height="20px"> Porsche CUP 2021  | <img src="images/box-checkered.png" height="20px">   car finished*       |
| <img src="images/position-TCX.png" height="20px">   TCX               |

<sup>* only in `on track gap` box</sup>

## dependencies

- [SimHub V8](https://www.simhubdash.com/download-2/) (tested on 8.0.2)
- [SimHub ACC Dynamic Leaderboards Plugin v1.2.0](https://github.com/kaiusl/KLPlugins.DynLeaderboards/tree/v1.2.0)

## setup

### Dynamic Leaderboards Plugin

all data comes from plugin so first go to [Plugin Getting started instructions](https://github.com/kaiusl/KLPlugins.DynLeaderboards#getting-started) and setup plugin

### overlay setup

- download latest release from [here](https://github.com/serek4/simhub-gaps-overlay/releases)
- import [gaps-overlay.simhubhash](gaps-overlay.simhubdash) to SimHub (double click)
- copy content of SimHub folder to SimHub root folder `C:\Program Files (x86)\SimHub\`
- restart SimHub

### overlay controls

- to switch between screens go to **SimHub** -> **Dash Studio** side tab -> **settings** tab and  
  add mapping for `Show next dash screen` and/or `Show previous dash screen`
- to switch between leader boards go to **SimHub** -> **Controls and events** side tab and  
  add mapping for `DynLeaderboardsPlugin.gaps.NextLeaderboard` and/or `DynLeaderboardsPlugin.gaps.PreviousLeaderboard`
