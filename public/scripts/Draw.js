const DRAW_CIRCLE = 0;
const DRAW_RECT = 1;

class _Draw {
  constructor(svg, sx, sy) {
    this.svg = svg;
    this.sx = sx,
    this.sy = sy,
    this.drawBase = {
      svg: svg,
    }
    this.drawCmds = [];
  }

  circle(x, y, diameter, color, opacity) {
    let drawObj = this.drawBase;

    Object.assign(drawObj, {
      x, y, 
      radius: diameter/2,
      color, opacity
    });

    this.drawCmds.push(new DrawCommand(DRAW_CIRCLE, drawObj))
  }

  rect(x, y, w, h, color, opacity) {
    let drawObj = this.drawBase;

    Object.assign(drawObj, {
      x, y, w, h, color, opacity
    });

    this.drawCmds.push(new DrawCommand(DRAW_RECT, drawObj));
  }

  clear() {
    this.drawCmds = [];
    this.svg.innerHTML = "";
  }
}

class DrawCommand {
  constructor(drawType, drawObj) {
    this.svg = drawObj.svg;
    this.drawType = drawType;
    this.drawObj = drawObj;

    this.draw();
  }

  draw() {
    let nodeObj;

    if(this.drawType === DRAW_RECT) nodeObj = rectNode(this.drawObj);
    else if(this.drawType === DRAW_CIRCLE) nodeObj = circleNode(this.drawObj);
    
    this.svg.appendChild(nodeObj);
  }
}