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
    
    //movimento do canhao
    if(keyIsDown(RIGHT_ARROW)&& this.angle<72){
      this.angle+= 1 
    }

    if(keyIsDown(LEFT_ARROW)&& this.angle>-36){
      this.angle--
    }

    // cano do canhao
    push()
    translate(this.x,this.y)
    rotate(this.angle)
    imageMode(CENTER) 
    image(this.canonImg,0,0,this.w,this.h)
    pop()

    // base do canhao
    image(this.baseImg,70,20,200,200)

  }
}