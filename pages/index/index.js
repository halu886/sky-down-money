Page({
  data: {
    res: {},
    texts:[
      
    ]
  },
  onReady() {
    this.point = {
      x: 123,
      y: 23,
      dx: 433,
      dy: 454,
      r: 234,
      g: 653,
      b: 546
    }

    this.setData({ res: my.getSystemInfoSync() })
    this.interval = setInterval(this.draw.bind(this), 13);
    this.ctx = my.createCanvasContext('canvas');
  },
  draw() {
    const { ctx } = this;
    this.drawCloud()
    ctx.setFillStyle("rgb(114, 198, 208)");
    ctx.fillRect(0, 0, this.data.res.windowWidth, this.data.res.windowHeight);

    this.drawCloud();

    for(let i = 0;i< this.data.texts.length;i++){
      const t = this.data.texts[i]
      ctx.fillText("钱",t.x,t.y);
      this.data.texts[i].y +=2;
      if(t.x>this.data.res.windowHeight){
        this.data.texts[i].splice(i,1)
      }
    }

    ctx.draw()
  },

  drawCloud() {
    const maxWidth = this.data.res.windowWidth;
    const { ctx } = this;
    let x = 0, y = 20;
    let randoms = [0.4,0.9,0.8,0.7];
    let randomIndex = 0;
    ctx.beginPath();
    while (x <= maxWidth) {
      let random = randoms[randomIndex++%4]
      let r = parseInt(random * 15 + 1);
      let radious =  parseInt(random * 360 + 1) / Math.PI;
      let nextX = parseInt(Math.abs(2 * r * Math.sin(90 * radious / 180)));
      ctx.arc(x+r,y,r,0,radious,false);
      x += nextX;
    }
    ctx.closePath();
    ctx.setFillStyle("white");
    ctx.fillRect(0, 20, maxWidth, 30);
    ctx.fill();
  },

  addMoney(){
    this.data.texts.push({
      y:70,
      x:Math.random()*this.data.res.windowWidth})
  }
});
