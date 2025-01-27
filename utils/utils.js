//load the room data
export const rooms = JSON.parse(FileLib.read("roomsAPI", "data/roomData.json"));

/**
 * Checks if the chunk at the specified coordinate is loaded.
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @returns
 */
export const chunkLoaded = (x, y, z) => {
    if (!World || !World.getWorld()) return false;
    return World.getChunk(x, y, z).chunk.func_177410_o();
};

//get current dungeon room
export const getPos = () => {
    let worldX = Math.floor((Player.getX() + 200.5) / 32);
    let worldZ = Math.floor((Player.getZ() + 200.5) / 32);

    let roomComponentArray = [];

    for (let i = 0; i < 36; i++) {
        let x = i % 6;
        let z = Math.floor(i / 6);
        let rx = -185 + x * 32;
        let rz = -185 + z * 32;
        roomComponentArray[i] = [rx, rz];
    }

    const index = worldX + worldZ * 6;

    if (index < 0 || index > 35) return null;

    return roomComponentArray[index];
};

const blacklisted = [
    101, // Iron Bars
    54, // Chest
];

export const hashCode = (s) =>
    s.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
    }, 0); // From https://stackoverflow.com/a/15710692/15767968

/**
 * Gets the core hash at a certain x, z position
 * @param {Number} x
 * @param {Number} z
 * @returns
 */
export const getCore = () => {
    if (!getPos()) return;

    let [x, z] = getPos();

    if (!chunkLoaded(x, 68, z)) return;

    let blockIds = "";
    for (let y = 140; y >= 12; y--) {
        let block = World.getBlockAt(x, y, z);
        // Blacklisted blocks should just be counted as air.
        if (blacklisted.includes(block.type.getID())) {
            blockIds += "0";
            continue;
        }

        blockIds += block.type.getID();
    }

    return hashCode(blockIds);
};

//pulls room data from the roomData.json file
export const getRoomData = () => {
    let roomCore = getCore();
    if (!roomCore) return;

    for (var i = 0; i < rooms.length; i++) {
        for (var j = 0; j < Object.values(rooms[i].cores).length; j++) {
            if (roomCore === rooms[i].cores[j]) {
                return rooms[i];
            }
        }
    }

    return null;
};

//used to get highest block
export const getRoofAt = (x, z) => {
    let y = 255;
    while (y > 0 && World.getBlockStateAt(new BlockPos(x, y, z)).getBlockId() === 0) y--;

    return y;
};

//returns room world data. for example: corner, center, width, hight, ect
export const getRoomWorldData = () => {
    let x = Math.floor((Player.getX() + 8) / 32) * 32 - 8;
    let y = Math.floor((Player.getZ() + 8) / 32) * 32 - 8;
    let width = 30;
    let height = 30;

    let roofY = getRoofAt(x, y);

    while (World.getBlockStateAt(new BlockPos(x - 1, roofY, y)).getBlockId() !== 0) {
        x -= 32;
        width += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x, roofY, y - 1)).getBlockId() !== 0) {
        y -= 32;
        height += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x - 1, roofY, y)).getBlockId() !== 0) {
        //second iteration incase of L shape
        x -= 32;
        width += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x + width + 1, roofY, y)).getBlockId() !== 0) {
        width += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x, roofY, y + height + 1)).getBlockId() !== 0) {
        height += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x + width, roofY, y + height + 1)).getBlockId() !== 0) {
        //second iteration incase of L shape
        height += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x + width + 1, roofY, y + height)).getBlockId() !== 0) {
        //second iteration incase of L shape
        width += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x + width, roofY, y - 1)).getBlockId() !== 0) {
        //second iteration incase of L shape
        y -= 32;
        height += 32;
    }
    while (World.getBlockStateAt(new BlockPos(x - 1, roofY, y + height)).getBlockId() !== 0) {
        //third iteration incase of L shape
        x -= 32;
        width += 32;
    }

    let rotation = getRotation(x, y, width, height, roofY);

    if (rotation === -1) return null;

    return {
        x,
        y,
        width,
        height,
        rotation,
        cx: x + width / 2,
        cy: y + height / 2,
        cz: roofY,
    };
};

//gets the rotation of the room
export const getRotation = (x, y, width, height, roofY) => {
    let currRoomData = getRoomData();
    if (!currRoomData) return -1;

    if (currRoomData.shape !== "L") {
        if (this.getTopBlockAt(x, y, roofY) === 11) return 1;
        if (this.getTopBlockAt(x + width, y, roofY) === 11) return 2;
        if (this.getTopBlockAt(x + width, y + height, roofY) === 11) return 3;
        if (this.getTopBlockAt(x, y + height, roofY) === 11) return 4;
    } else {
        let one = this.getTopBlockAt2(x + width / 2 + 1, y + height / 2, roofY);
        let two = this.getTopBlockAt2(x + width / 2 - 1, y + height / 2, roofY);
        let three = this.getTopBlockAt2(x + width / 2, y + height / 2 + 1, roofY);
        let four = this.getTopBlockAt2(x + width / 2, y + height / 2 - 1, roofY);

        if (one === 0 && three === 0) return 2; //swapped
        if (two === 0 && three === 0) return 3;
        if (one === 0 && four === 0) return 1; // untested
        if (two === 0 && four === 0) return 4; // works
    }

    return -1;
};

//self explanitory
export const getTopBlockAt = (x, z, y) => {
    if (!y) y = getHeightAt(x, z);

    return World.getBlockStateAt(new BlockPos(x, y, z)).getMetadata();
};

export const getTopBlockAt2 = (x, z, y) => {
    if (!y) y = getHeightAt(x, z);

    return World.getBlockStateAt(new BlockPos(x, y, z)).getBlockId();
};

//rotates coordnates
export const rotateCoords = ([x, y, z], degree) => {
    if (degree == 1) return [x, y, z];
    if (degree == 2) return [-z, y, x];
    if (degree == 3) return [-x, y, -z];
    if (degree == 4) return [z, y, -x];

    return [x, y, z];
};

//unrotates coordnates
export const unRotateCoords = ([x, y, z], degree) => {
    if (degree == 1) return [x, y, z];
    if (degree == 2) return [z, y, -x];
    if (degree == 3) return [-x, y, -z];
    if (degree == 4) return [-z, y, x];

    return [x, y, z];
};

//translates real world coords to relitive room coords
export const getRoomCoord = (pos) => {
    let roomData = getRoomWorldData();
    if (!roomData) return [0, 0, 0];

    if (!pos) return [0, 0, 0];
    let [x, y, z] = pos;

    let roomCorner = null;
    let coord = [x, y, z];
    if (roomData.rotation === 1) roomCorner = [roomData.x, 0, roomData.y];
    if (roomData.rotation === 2) roomCorner = [roomData.x + roomData.width, 0, roomData.y];
    if (roomData.rotation === 3) roomCorner = [roomData.x + roomData.width, 0, roomData.y + roomData.height];
    if (roomData.rotation === 4) roomCorner = [roomData.x, 0, roomData.y + roomData.height];
    const roomCoord = unRotateCoords(
        coord.map((v, i) => v - roomCorner[i]),
        roomData.rotation
    );

    return roomCoord;
};

//translates relitive room coords to real world coords
export const getRealCoord = (pos) => {
    let roomData = getRoomWorldData();
    if (!roomData) return [0, 0, 0];

    if (!pos) return [0, 0, 0];
    let [x, y, z] = pos;

    let roomCorner = null;
    const rotated = rotateCoords([x, y, z], roomData.rotation);
    if (roomData.rotation === 1) roomCorner = [roomData.x, 0, roomData.y];
    if (roomData.rotation === 2) roomCorner = [roomData.x + roomData.width, 0, roomData.y];
    if (roomData.rotation === 3) roomCorner = [roomData.x + roomData.width, 0, roomData.y + roomData.height];
    if (roomData.rotation === 4) roomCorner = [roomData.x, 0, roomData.y + roomData.height];
    const realCoord = rotated.map((v, i) => v + roomCorner[i]);

    return realCoord;
};
