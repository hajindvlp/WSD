class _Chips {
  constructor() {
    this.wafer = new Wafer();
    this.unit = new Unit();

    this.mxUnitCnt = this.mxChipCnt = 0;
    this.whenMxUnit = this.whenMxChip = new Coord();
    this.mxDist = 0;
  }

  Calculate() {
    let i, j, k, l, m, n;
    let aliveSet = [] // list of Chip
    let ChipNum = 0;

    this.mxUnitCnt = this.mxChipCnt = 0;
    this.mxDist = 0;

    this.unit.coord[0] = new Coord(0, 0);
    this.unit.coord[1] = new Coord(this.unit.w, 0);
    this.unit.coord[2] = new Coord(0, this.unit.h);
    this.unit.coord[3] = new Coord(this.unit.w, this.unit.h);

    for(k=0; k<this.unit.chipNum; k++) {
      if(!this.unit.set[k].disabled) {
        this.unit.aliveChipNum++;
        ChipNum++;
        aliveSet.push(this.unit.set[k]);

        aliveSet[ChipNum-1].coord[0] = new _coord(aliveSet[ChipNum-1].startX, aliveSet[ChipNum-1].startY);
        aliveSet[ChipNum-1].coord[1] = new _coord(aliveSet[ChipNum-1].startX + aliveSet[ChipNum-1].width, aliveSet[ChipNum-1].startY);
        aliveSet[ChipNum-1].coord[2] = new _coord(aliveSet[ChipNum-1].startX, aliveSet[ChipNum-1].startY + aliveSet[ChipNum-1].height);
        aliveSet[ChipNum-1].coord[3] = new _coord(aliveSet[ChipNum-1].startX + aliveSet[ChipNum-1].width, aliveSet[ChipNum-1].startY + aliveSet[ChipNum-1].height);
      }
    }

  }
}

class Wafer {
  constructor() {
    this.diameter = this.radius = 0;
  }
}

class Unit {
  constructor() {
    this.w = this.h = 0;
    this.chipNum = this.aliveChipNum = 0;
    this.set = []; // list of Chip
    this.coord = setArrayOfObjects(new Coord(), 4);
  }
}

class Chip {
  constructor() {
    this.disabled = false;
    this.w = this.h = 0;
    this.sx = this.sy = 0;
    this.coord = setArrayOfObjects(new Coord(), 4);
  }

  clear() {
    this.disabled = true;
    this.w = this.h = this.sx = this.sy = 0;
  }
}

class Coord {
  constructor(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }
}