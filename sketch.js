const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;

var ground, tower, towerImg;
var bgImg;
var angle = 20;
var cannon
var balls = []
var boats = []
var boatAnimation = []
var boatJson 
var boatPng
var boatBrokenAnimation = []
var boatBrokenJson
var boatBrokenPng
var waterSplashAnimation = []
var waterSplashJson
var waterSplashPng
var backgroundMusic
var cannonExplosion
var cannonWater
var pirateLaugh 
var isGameOver = false
var isPirateLaugh = false
var score = 0

function preload() {
  bgImg = loadImage("./assets/background.gif")
  towerImg = loadImage("./assets/tower.png")
  boatPng = loadImage("./assets/boat/boat.png")
  boatJson = loadJSON("./assets/boat/boat.json")
  boatBrokenPng = loadImage("./assets/boat/broken_boat.png")
  boatBrokenJson = loadJSON("./assets/boat/broken_boat.json")
  waterSplashPng = loadImage("./assets/water_splash/water_splash.png")
  waterSplashJson = loadJSON("./assets/water_splash/water_splash.json")
  backgroundMusic = loadSound("./assets/sounds/background_music.mp3")
  cannonExplosion = loadSound("./assets/sounds/cannon_explosion.mp3")
  cannonWater = loadSound("./assets/sounds/cannon_water.mp3")
  pirateLaugh = loadSound("./assets/sounds/pirate_laugh.mp3")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  //criando as opções do soloe da torre
  var options = {
    isStatic: true
  }

  angleMode(DEGREES)
  angle = 15

  //criando o corpo do solo
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options)
  //adicionando o corpo ao mundo
  World.add(world, ground)

  //criando a torre
  tower = Bodies.rectangle(160, 350, 160, 310, options)
  World.add(world, tower)

  cannon = new Cannon(180, 110, 130, 100, angle)

 var boatFrames = boatJson.frames 
 for (let i = 0; i < boatFrames.length; i++) {
   var pos = boatFrames[i].position
   var img = boatPng.get(pos.x, pos.y, pos.w, pos.h)
   boatAnimation.push(img)
 }

 var boatBrokenFrame = boatBrokenJson.frames
 for (let i = 0; i < boatBrokenFrame.length; i++) {
  var pos = boatBrokenFrame[i].position
  var img = boatBrokenPng.get(pos.x,pos.y,pos.w,pos.h)
  boatBrokenAnimation.push(img)
 }

 var waterSplashFrame = waterSplashJson.frames
 for (let i = 0; i < waterSplashFrame.length; i++) {
  var pos = waterSplashFrame[i].position
  var img = waterSplashPng.get(pos.x, pos.y, pos.w, pos.h)
  waterSplashAnimation.push(img)
 }

  textAlign(CENTER, CENTER)
  //imageMode(CENTER)
}

function draw() {
  background(189);
  //criando a imagem do fundo
  image(bgImg, 0, 0, width, height)

  if(!backgroundMusic.isPlaying()){
    backgroundMusic.play()
    backgroundMusic.setVolume(0.2)
  }

  Engine.update(engine);

  //exibindo o solo na tela
  rect(ground.position.x, ground.position.y, width * 2, 1)

  //exibindo a torre na tela
  push()//inicializa uma nova configuração
  imageMode(CENTER)
  image(towerImg, tower.position.x, tower.position.y, 160, 310)
  pop() //retorna para a configuração antiga

  for (let i = 0; i < balls.length; i++) {
    showBalls(balls[i], i)
    collisionWithBoat(i)
  }
  cannon.display()

  showBoats()



  //posição do mouse
  fill("#6d4c41")
  textSize(30)
  text("Pontuação: "+score,1020,20)
}

function keyReleased() {
  if (keyCode == DOWN_ARROW) {
    balls[balls.length - 1].shoot()
    cannonExplosion.play()
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    var ball = new Ball(cannon.x, cannon.y)
    balls.push(ball)

  }
}

function showBalls(ball, index) {
  if (ball) {
    ball.display()
    if(ball.body.position.y >= height-50){
      ball.removeBall(index)
      cannonWater.play()
      cannonWater.setVolume(0.5)
    }
    if(ball.body.position.x >= width){
      World.remove(world, balls[index].body)
      balls.splice(index,1)
    }
  }

}

function showBoats() {
  if (boats.length > 0) {
    if (boats[boats.length - 1] == undefined || boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-40, -60, -70, -80, -20]
      var position = random(positions)
      var boat = new Boats(width - 69, height - 60, 170, 170, position, boatAnimation)
      boats.push(boat)

    }
    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 })
        boats[i].display()
        boats[i].animate()
        var collision = Matter.SAT.collides(this.tower, boats[i].body)

        if(collision.collided && !boats[i].isBroken ){
      
          if(!isPirateLaugh && !pirateLaugh.isPlaying()){
            pirateLaugh.play()
            isPirateLaugh = true
          }
          isGameOver = true
          gameOver()
          
        }


      }
    }
  } else {
    var boat = new Boats(width - 69, height - 60, 170, 170, -80, boatAnimation)
    boats.push(boat)

  }
}

function collisionWithBoat(index) {
  for (let i = 0; i < boats.length; i++) {
    if (balls[index] != undefined && boats[i] != undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body)
      if (collision.collided) {
        boats[i].removeBoats(i)
        World.remove(world, balls[index].body)
        balls.splice(index, 1)
        score += 5
      }
    }

  }
}

function gameOver(){
  swal({
    title:`Fim de Jogo`, 
    text: "Obrigada por jogar",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize: "150x150",
    confirmButtonText: "Jogar novamente"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload()
    }
  }
  )
}