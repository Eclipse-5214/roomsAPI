
<p align="center">
  <img alt="logo" src="https://i.imgur.com/IonEmZR.png">
</p>

***
<p align="center">
  <a href="https://github.com/Eclipse-5214/roomsAPI/releases" target="_blank">
    <img alt="downloads" src="https://img.shields.io/github/v/release/Eclipse-5214/roomsAPI?color=ad03fc&style=flat-square" />
  </a>
  <a href="https://github.com/Eclipse-5214/roomsAPI/releases" target="_blank">
    <img alt="downloads" src="https://img.shields.io/github/downloads/Eclipse-5214/roomsAPi/total?color=ad03fc&style=flat-square" />
  </a>
  <a href="https://github.com/Eclipse-5214/roomsAPI/">
    <img src="https://tokei.rs/b1/github/Eclipse-5214/roomsAPI?category=code&color=ad03fc&style=flat-square" alt="lines">
  </a>
</p>

<p align="center" id="description"><em>roomsAPI</em> is an api for anything dungeon rooms related for ChatTriggers</p>

---

<h2 align="center">How 2 Use</h2>

<p>Here are some of the uses that <em>roomsAPI</em> has so far</p>

### **getRoomData()**
gets statistic info about the room your in

example:
```js
getRoomData().name
//returns the name
```
look in the /Data/roomdata.json file for all the things it can return

### **getRoomWorldData()**
gets real world info about the room you are in

example:
```js
getRoomWorldData().rotation
//returns the rotation of the room you are in
```
can return corner (x, y, z), center (x, y, z), width, hight, 

### **getRoomWorldData()**
gets real world info about the room you are in

example:
```js
getRoomWorldData().rotation
//returns the rotation of the room you are in
```

### **getRoomCoord() / getRealCoord()**
translates real world coordnantes into relitive room coordnates and vice versa

this could be usefull for makeing room specific waypoints

example:
```js
let [x, y, z] = [Player.getX(), Player.getY(), Player.getZ()]

let relitive = getRoomCoord([x, y, z])
//returns the relitive room coordnates

let actual = getRealCoord(relitive)
```

<h2 align="center">Installation Steps</h2>

## **Automatic**
1. Download Chattriggers.  
2. /ct import roomsAPI.  
3. Have fun!

## **Manual**
1. Download Chattrigers
2. Download latest release from [here](https://github.com/Eclipse-5214/roomsAPI/releases)
3. /ct files
4. unzip in folder
5. /ct reload
6. Have fun!
   
---

<h2 align="center">Credits</h2>

- **[Eclipse (AKA NEXD_)]** - Creator 
- [ChatTriggers](https://www.chattriggers.com/) - Mod Platform
- [BetterMap](https://github.com/BetterMap/BetterMap/) - Secret Waypoints and Coordnate conversion
- [BloomCore](https://www.chattriggers.com/modules/v/BloomCore/) - In dungeon detection and rendering utils
- Dr Pepper - idk its just good
