class Ball {

    constructor(x, y) {
        var options = {
            isStatic: true
        }

        this.raio = 30
        this.ballimage = loadImage("./assets/cannonball.png")
        this.body = Bodies.circle(x, y, this.raio, options)
        World.add(world, this.body)

        this.tragetory = []
        this.animation = this.ballimage
        this.isSink = false
        this.speed = 0.05
    }

    shoot() {
        var newAngle = cannon.angle - 28
        newAngle = newAngle * (3.14 / 180)
        var velocity = p5.Vector.fromAngle(newAngle)
        velocity.mult(0.5)
        Matter.Body.setStatic(this.body, false)
        Matter.Body.setVelocity(this.body, {
            x: velocity.x * (180 / 3.14),
            y: velocity.y * (180 / 3.14)
        })
    }
    removeBall(index) {
        this.animation = waterSplashAnimation
        this.raio = 150
        this.isSink = true
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 })
        setTimeout(() => {
            World.remove(world, balls[index].body)
            delete balls[index]
        }, 1000);
    }

    animate() {
        this.speed = this.speed + 0.05
    }

    display() {
        var pos = this.body.position
        var index = floor(this.speed % this.animation.length)
        if (this.isSink) {
            push()
            imageMode(CENTER)
            image(this.animation[index], pos.x, pos.y, this.raio, this.raio)
            pop()

        } else {
            push()
            imageMode(CENTER)
            image(this.ballimage, pos.x, pos.y, this.raio, this.raio)
            pop()
        }


        if (this.body.velocity.x > 0 && this.body.position.x > 240) {
            var position = [this.body.position.x, this.body.position.y]
            this.tragetory.push(position)
        }

        for (let i = 0; i < this.tragetory.length; i++) {
            image(this.ballimage, this.tragetory[i][0], this.tragetory[i][1], 5, 5)

        }
    }
}