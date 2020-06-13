/* #region  Initialize */
const dpi = window.devicePixelRatio;
let svg = document.getElementById('transform');
let parentSvg = svg.parentNode;
let isCalculated =  false;

var SvgScale = 1;
var Chips = new _Chips();
var Draw = new _Draw(svg, 0, 0);

/* #endregion */


/* #region  Wafer & Unit */

const waferDiameterChanged = (evt) => {
  Chips.wafer.diameter = evt.target.valueAsNumber;
  Chips.wafer.radius = Chips.wafer.diameter / 2;
  DrawWafer(false);
}

const unitWidthChanged = (evt) => {
  Chips.unit.w = evt.target.valueAsNumber;
  DrawWafer(false);
}

const unitHeightChanged = (evt) => {
  Chips.unit.h = evt.target.valueAsNumber;
  DrawWafer(false);
}

/* #endregion */


/* #region  Chip Info */

const addNewChipClick = (evt) => {
  document.getElementById('ChipTable').appendChild(newRowNode(Chips.unit.chipNum));
  Chips.unit.chipNum++;
  Chips.unit.set.push(new Chip());
}

const deleteChipClick = (evt) => {
  let ChipNum = evt.target.parentNode.parentNode.className;
  Chips.unit.set[ChipNum].clear();
  evt.target.parentNode.parentNode.parentNode.removeChild(evt.target.parentNode.parentNode);

  DrawWafer(false);
}

const chipInfoInput = (evt) => {
  let ChipNum = evt.target.parentNode.parentNode.className;
  let fieldName = evt.target.id;

  Chips.unit.set[ChipNum][fieldName] = evt.target.valueAsNumber;

  DrawWafer(false);
}

/* #endregion */


/* #region  Control Buttons */

const controlRunClick = (evt) => {
  Chips.Calculate();

  document.getElementById('ResultUnitNum').textContent = Chips.mxUnitCnt.toString();
  document.getElementById('ResultChipNum').textContent = Chips.mxChipCnt.toString();
  document.getElementById('ResultDist').textContent = Chips.mxDist.toString();

  DrawWafer(true);
}

/* #endregion */


/* #region  Mouse Drag */

let isMouseDown = false;
let sx, sy;

const MouseDown = evt => {
  isMouseDown = true;
  sx = evt.offsetX;
  sy = evt.offsetY;
}

const MouseMove = evt => {
  if (isMouseDown) {
    let ax = evt.offsetX - sx;
    let ay = evt.offsetY - sy;
    Draw.sx += ax / 6;
    Draw.sy -= ay / 6;
    sx = evt.offsetX;
    sy = evt.offsetY;
    DrawWafer(isCalculated);
  }
}

const MouseEnd = evt => {
  isMouseDown = false;
}

const MouseScroll = evt => {

  if(evt.deltaY > 0) SvgScale /= 1.1;
  else if(evt.deltaY < 0) SvgScale *= 1.1;

  DrawWafer(isCalculated);
}

/* #endregion */


/* #region  Event Listeners */

let eventType = "keyup"
document.getElementById('WaferInput').addEventListener(eventType, waferDiameterChanged);
document.getElementById('UnitWidthInput').addEventListener(eventType, unitWidthChanged);
document.getElementById('UnitHeightInput').addEventListener(eventType, unitHeightChanged);

document.getElementById('AddNewChip').addEventListener("click", addNewChipClick);
document.addEventListener("click", (evt) => { evt.target.id === "DeleteChip" && deleteChipClick(evt) });
document.addEventListener("keydown", (evt) => { evt.target.className === "ChipInfo" && chipInfoInput(evt) });
document.addEventListener("keypress", (evt) => { evt.target.className === "ChipInfo" && chipInfoInput(evt) });
document.addEventListener("keyup", (evt) => { evt.target.className === "ChipInfo" && chipInfoInput(evt) });

document.getElementById('ControlRun').addEventListener('click', controlRunClick);

parentSvg.addEventListener("mousedown", MouseDown);
parentSvg.addEventListener("mousemove", MouseMove);
parentSvg.addEventListener("mouseup", MouseEnd);
parentSvg.addEventListener("mouseleave", MouseEnd);
parentSvg.addEventListener("wheel", MouseScroll);

/* #endregion */


/* #region  Draw Functions */

const DrawFullWafer = () => {
  let i, j, k;
  let mxUnitW = Math.ceil(Chips.wafer.radius / Chips.unit.w) + 1;
  let mxUnitH = Math.ceil(Chips.wafer.radius / Chips.unit.h) + 1;
  let sx, sy, usx, usy;

  sy = Chips.whenMxChip.y;
  sx = Chips.whenMxChip.x;

  for(i=-mxUnitH ; i<=mxUnitH ; i++)
    for(j=-mxUnitW ; j<=mxUnitW ; j++) {
      usy = i * Chips.unit.h + sy;
      usx = j * Chips.unit.w + sx;

      let unitOk = false;

      for(k=0 ; k<4 ; k++) {
        let dist = distToO(usx + Chips.unit.coord[k].x, usy + Chips.unit.coord[k].y);

        if(dist < Chips.wafer.radius) unitOk = true;
      }

      if(unitOk) {
        Draw.rect(usx, usy, Chips.unit.w, Chips.unit.h, "#001580", 0.3);

        Chips.unit.set.forEach(chip => {
          if(!chip.disabled) 
            Draw.rect(usx + chip.sx, usy + chip.sy, chip.w, chip.h, "#7600c9", 0.3);
        })
      }
    }
}

const DrawWafer = (final) => {
  isCalculated = final;
  Draw.clear();
  Draw.circle(0, 0, Chips.wafer.diameter, "#de9726", 0.3);

  if (final) DrawFullWafer();
  else {
    Draw.rect(0, 0, Chips.unit.w, Chips.unit.h, "#001580", 0.3);

    Chips.unit.set.forEach(chip => {
      if (!chip.disabled) Draw.rect(chip.sx, chip.sy, chip.w, chip.h, "#7600c9", 0.3);
    })
  }
}

/* #endregion */