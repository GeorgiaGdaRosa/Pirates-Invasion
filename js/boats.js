class Boats {
    constructor(x, y, w, h, boatpos, boatAnimation) {
        this.w = w
        this.h = h
        this.boatpos = boatpos
        this.body = Bodies.rectangle(x, y, w, h)
        World.add(world, this.body)
        this.boatimage = loadImage("./assets/boat.png")
        this.animation = boatAnimation 
        this.speed = 0.05
        this.isBroken = false 
    }
    removeBoats(i) {
        this.animation = boatBrokenAnimation 
        this.speed = 0.05
        this.w = 300
        this.h = 300
        this.isBroken = true
        setTimeout(() => {
            World.remove(world, boats[i].body)
            delete boats[i]
        }, 2000);
    }

    animate(){
        this.speed = this.speed + 0.05

    }

    display() {
        var angle = this.body.angle
        var pos = this.body.position
        var index = floor(this.speed % this.animation.length)
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.animation[index], 0, this.boatpos, this.w, this.h)
        pop()


    }

}