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

const gcd = function(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

const fixDpi = () => {
  let style = {
    height() {
      return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
    },
    width() {
      return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
    }
  }

  canvas.setAttribute('width', style.width() * dpi);
  canvas.setAttribute('height', style.height() * dpi);

  console.log(style.width(), style.height())
}
