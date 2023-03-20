# Simhub relative leaderboard overlay

### race

<img src="images/screen1-row.png" width ="400px"> <img src="images/screen2-row.png" width ="400px">
<img src="images/gaps-screen1-race.gif" width ="400px"> <img src="images/gaps-screen2-race.gif" width ="400px">

### qualify

<img src="images/screen1-qualify-row.png" width ="400px"> <img src="images/screen2-qualify-row.png" width ="400px">
<img src="images/gaps-screen1-quali.gif" width ="400px"> <img src="images/gaps-screen2-quali.gif" width ="400px">

## background colors

| position box color                                                    | delta box color                                                          | time box color                                                        | current lap status                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| <img src="images/position-GT3.png" height="20px">   GT3               | <img src="images/box-red.png" height="20px">         more than +0.5s     | <img src="images/box-purple.png" height="20px">      session best lap | <img src="images/box-green.png" height="20px">    fast lap |
| <img src="images/position-GT4.png" height="20px">   GT4               | <img src="images/box-orangeRed.png" height="20px">   from +0.1s to +0.5s | <img src="images/box-deepSkyBlue.png" height="20px"> driver best lap  | <img src="images/box-red.png" height="20px">   invalid lap |
| <img src="images/position-ST15.png" height="20px">  Super Trofeo 2015 | <img src="images/box-white.png" height="20px">       from +0.1s to -0.1s | <img src="images/box-white.png" height="20px">       driver last lap  | <img src="images/box-orangeRed.png" height="20px"> out lap |
| <img src="images/position-ST21.png" height="20px">  Super Trofeo 2021 | <img src="images/box-greenYellow.png" height="20px"> from -0.1s to -0.5s |                                                                       | <img src="images/box-black.png" height="20px">      in pit |
| <img src="images/position-CHL.png" height="20px">   Ferrari Challenge | <img src="images/box-green.png" height="20px">       less than -0.5s     |
| <img src="images/position-CUP17.png" height="20px"> Porsche CUP 2017  | <img src="images/box-black.png" height="20px">       car in pit lane*    |
| <img src="images/position-CUP21.png" height="20px"> Porsche CUP 2021  | <img src="images/box-checkered.png" height="20px">   car finished*       |
| <img src="images/position-TCX.png" height="20px">   TCX               |

<sup>* only in `on track gap` box</sup>

## dependencies

- [SimHub V8](https://www.simhubdash.com/download-2/) (tested on 8.2.3)
- [SimHub ACC Dynamic Leaderboards Plugin v1.2.2](https://github.com/kaiusl/KLPlugins.DynLeaderboards/tree/v1.2.2)

## setup

### Dynamic Leaderboards Plugin

all data comes from plugin so first go to [Plugin Getting started instructions](https://github.com/kaiusl/KLPlugins.DynLeaderboards/tree/v1.2.2#getting-started) and setup plugin

#### leaderboard rotation

by default overlay have this leaderboards:
- RelativeOnTrackWoPit
- RelativeOverall
- PartialRelativeClass

you can use any relative leaderboard you want and reorder them in  
SimHub -> DynLeaderboard side tab -> Dynamic leaderboards tab  

leaderboard name `gaps`

### overlay setup

- download [latest](https://github.com/serek4/simhub-gaps-overlay/releases/latest) release
- import `gaps-overlay-v1.5.simhubdash` to SimHub (double click)
- copy content of SimHub folder to SimHub root folder `C:\Program Files (x86)\SimHub\`
- restart SimHub

### overlay controls

- to switch between screens go to **SimHub** -> **Dash Studio** side tab -> **settings** tab and  
  add mapping for `Show next dash screen` and/or `Show previous dash screen`
- to switch between leader boards go to **SimHub** -> **Controls and events** side tab and  
  add mapping for `DynLeaderboardsPlugin.gaps.NextLeaderboard` and/or `DynLeaderboardsPlugin.gaps.PreviousLeaderboard`
- to switch between gaps and lap times go to **SimHub** -> **Controls and events** side tab and  
  add mapping for `GraphicalDashPlugin.actionA`
