/* #region  Initialize */
const dpi = window.devicePixelRatio;
let svg = document.getElementById('transform');
let parentSvg = svg.parentNode;

var SvgScale = 6;
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

window.addEventListener("resize", evt => {
  svgInit(svg);
})

document.getElementById('ControlRun').addEventListener('click', controlRunClick);

let isMouseDown = false;
let sx, sy;
parentSvg.addEventListener("mousedown", evt => { 
  isMouseDown = true; 
  sx = evt.offsetX;
  sy = evt.offsetY;

  console.log(sx, sy);
})

parentSvg.addEventListener("mousemove", evt => {
  if (isMouseDown) {
    let ax = evt.offsetX - sx;
    let ay = evt.offsetY - sy;
    Draw.sx += ax;
    Draw.sy += ay;
    sx = evt.offsetX;
    sy = evt.offsetY;
    DrawWafer(false);
  }
})

parentSvg.addEventListener("mouseup", evt => { isMouseDown = false })

parentSvg.addEventListener("mouseleave", evt => { isMouseDown = false })

svg.addEventListener("scroll", evt => {
  console.log(evt);
})

/* #endregion */


/* #region  Draw Functions */

const DrawFullWafer = () => {

}

const DrawWafer = (final) => {
  Draw.clear();
  Draw.circle(0, 0, Chips.wafer.diameter, "#de9726", 0.3);
  svg.style.transform = `translate("${Draw.sx}", "${Draw.sy}")`;

  if (final) DrawFullWafer();
  else {
    Draw.rect(0, 0, Chips.unit.w, Chips.unit.h, "#001580", 0.3);

    Chips.unit.set.forEach(chip => {
      if (!chip.disabled) Draw.rect(chip.sx, chip.sy, chip.w, chip.h, "#7600c9", 0.3);
    })
  }
}

/* #endregion */

