const DRAW_CIRCLE = 0;
const DRAW_RECT = 1;

class _Draw {
  constructor(canvas, sx, sy) {
    this.cv = canvas;
    this.ctx = canvas.getContext('2d');
    this.scale = 1;
    this.sx = sx;
    this.sy = sy;
    this.drawCmds = [];
  }

  circle(x, y, diameter, color, opacity) {

    let drawObj = {
      cv: this.cv,
      ctx: this.ctx,
      s: { sx: this.sx, sy: this.sy },
      params: [x, y, diameter/2],
      color, opacity
    };

    this.drawCmds.push(new DrawCommand(DRAW_CIRCLE, drawObj))
  }

  rect(x, y, w, h, color, opacity) {

    let drawObj = {
      cv: this.cv,
      ctx: this.ctx,
      s: { sx: this.sx, sy: this.sy },
      params: [x, y, w, h],
      color, opacity
    }

    this.drawCmds.push(new DrawCommand(DRAW_RECT, drawObj));
  }

  clear() {
    this.drawCmds = [];
    this.ctx.clearRect(-this.cv.width/2, -this.cv.height/2, this.cv.width, this.cv.height);
  }
}

class DrawCommand {
  constructor(drawType, drawObj) {
    this.cv = drawObj.cv;
    this.ctx = drawObj.ctx;
    this.drawType = drawType;
    this.drawObj = drawObj;

    this.draw();
  }

  draw() {
    this.ctx.translate(this.drawObj.s.sx, -this.drawObj.s.sy);

    this.ctx.beginPath();

    (this.drawType === DRAW_CIRCLE) && this.ctx.arc(...this.drawObj.params, 0, Math.PI * 2, false);
    (this.drawType === DRAW_RECT)   && this.ctx.rect(...this.drawObj.params);  
    
    this.ctx.strokeStyle = this.drawObj.color;
    this.ctx.stroke();
    this.ctx.globalAlpha = this.drawObj.opacity;
    this.ctx.fillStyle = this.drawObj.color;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }
}