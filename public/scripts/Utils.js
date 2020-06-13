const setArrayOfObjects = (obj, length) => {
  let list = [];

  for(var i = 0 ; i < length ; i++) {
    list.push(obj);
  }

  return list;
}

const distToO = (x, y) => {
  return Math.sqrt(x*x + y*y);
}

const newRowNode = (chipNum) => {
  let div = document.createElement('div');
  div.innerHTML = `<span id="td"> <button id="DeleteChip">x</button>  </span>
  <span id="td"> <input id="sx" class="ChipInfo" type="number" /> </span>
  <span id="td"> <input id="sy" class="ChipInfo" type="number" /> </span>
  <span id="td"> <input id="w" class="ChipInfo" type="number" /> </span>
  <span id="td"> <input id="h" class="ChipInfo" type="number" /> </span>`;

  div.className = chipNum;
  div.id = "tr";

  return div;
}

const circleNode = (drawObj) => {
  let nodeObj = document.createElementNS('http://www.w3.org/2000/svg', "circle");

  NanTo0(drawObj);

  nodeObj.setAttributeNS(null, "cx", drawObj.x);
  nodeObj.setAttributeNS(null, "cy", drawObj.y);
  nodeObj.setAttributeNS(null, "r", drawObj.radius);
  nodeObj.setAttributeNS(null, "fill", drawObj.color);
  nodeObj.setAttributeNS(null, "fill-opacity", drawObj.opacity);
  nodeObj.setAttributeNS(null, "stroke", drawObj.color);
  nodeObj.setAttributeNS(null, "stroke-width", "0.3");

  return nodeObj;
}

const rectNode = (drawObj) => {
  let nodeObj = document.createElementNS('http://www.w3.org/2000/svg', "rect");
  
  NanTo0(drawObj);

  nodeObj.setAttributeNS(null, "x", drawObj.x);
  nodeObj.setAttributeNS(null, "y", drawObj.y);
  nodeObj.setAttributeNS(null, "width", drawObj.w);
  nodeObj.setAttributeNS(null, "height", drawObj.h);
  nodeObj.setAttributeNS(null, "fill", drawObj.color);
  nodeObj.setAttributeNS(null, "fill-opacity", drawObj.opacity);
  nodeObj.setAttributeNS(null, "stroke", drawObj.color);
  nodeObj.setAttributeNS(null, "stroke-width", "0.3");

  return nodeObj;
}

const NanTo0 = Obj => {
  for (var prop in Obj) {
    Obj[prop] = Obj[prop] || 0;
  }
}