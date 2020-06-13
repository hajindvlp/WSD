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
        aliveSet.push(this.unit.set[k]);

        aliveSet[ChipNum].coord[0] = new Coord(aliveSet[ChipNum].sx, aliveSet[ChipNum].sy);
        aliveSet[ChipNum].coord[1] = new Coord(aliveSet[ChipNum].sx + aliveSet[ChipNum].w, aliveSet[ChipNum].sy);
        aliveSet[ChipNum].coord[2] = new Coord(aliveSet[ChipNum].sx, aliveSet[ChipNum].sy + aliveSet[ChipNum].h);
        aliveSet[ChipNum].coord[3] = new Coord(aliveSet[ChipNum].sx + aliveSet[ChipNum].w, aliveSet[ChipNum].sy + aliveSet[ChipNum].h);
        
        this.unit.aliveChipNum++;
        ChipNum++;
      }
    }

    let mxUnitW = Math.ceil(this.wafer.radius / this.unit.w) + 1;
    let mxUnitH = Math.ceil(this.wafer.radius / this.unit.h) + 1;

    let unitSx, unitSy;
    let stepX, stepY;
    let UnitCnt, ChipCnt;
    let uh = this.unit.h, uw = this.unit.w;

    stepX = stepY = 0.5;

    console.log(aliveSet);

    for(i=0 ; i<uh ; i+=stepY)
      for(j=0 ; j<uw ; j+=stepX) {
        UnitCnt = ChipCnt = 0;

        for(k=-mxUnitH ; k<=mxUnitH ; k++) 
          for(l=-mxUnitW ; l<=mxUnitW ; l++) {
            unitSy = k * uh + i;
            unitSx = l * uw + j;

            let unitOk = true;
            let tmxDist = 0;

            for(n=0 ; n<4 ; n++) {
              let dist = distToO(unitSx + this.unit.coord[n].x, unitSy + this.unit.coord[n].y);

              if (dist > this.wafer.radius) unitOk = false;
              if (dist > tmxDist) tmxDist = dist;
            }

            if(unitOk) {
              UnitCnt++;
              ChipCnt += ChipNum;

              if(tmxDist > this.mxDist) this.mxDist = tmxDist;
              continue;
            }

            for(m=0 ; m<ChipNum ; m++) {
              let chipOk = true;
              tmxDist = 0;
              for(n=0 ; n<4 ; n++) {
                let dist = distToO(unitSx + aliveSet[m].coord[n].x, unitSy + aliveSet[m].coord[n].y);

                if(dist > tmxDist) tmxDist = dist;
                if(dist > this.wafer.radius) chipOk = false;
              }

              if(chipOk) {
                ChipCnt++;
                if(tmxDist > this.mxDist) this.mxDist = tmxDist;
              }
            }
          }

        if(this.mxUnitCnt < UnitCnt) {
          this.mxUnitCnt = UnitCnt;

          this.whenMxUnit = new Coord(i, j);
        }
        if(this.mxChipCnt < ChipCnt) {
          this.mxChipCnt = ChipCnt;
          this.whenMxChip = new Coord(i, j);
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