class Cannon{
  constructor(x,y,w,h,angle){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.canonImg = loadImage("./assets/canon.png")
    this.baseImg = loadImage("./assets/cannonBase.png")
  }

  display(){
    
    // cano do canhao
    push()
    imageMode(CENTER) 
    image(this.canonImg,this.x,this.y,this.w,this.h)
    pop()

    // base do canhao
    image(this.baseImg,70,20,200,200)

  }
}