const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;

var ground,tower,towerImg;
var bgImg;
var angle = 20;
var cannon 

function preload() {
  bgImg = loadImage("./assets/background.gif")
  towerImg = loadImage("./assets/tower.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  //criando as opções do soloe da torre
  var options = {
    isStatic:true
  }

  //criando o corpo do solo
  ground = Bodies.rectangle(0,height-1,width*2,1,options)
  //adicionando o corpo ao mundo
  World.add(world,ground)

  //criando a torre
  tower = Bodies.rectangle(160,350,160,310,options)
  World.add(world,tower)

  cannon = new Cannon(180,110,130,100,angle)

  
  textAlign(CENTER,CENTER)
  //imageMode(CENTER)
}

function draw() {
  background(189);
  //criando a imagem do fundo
  image(bgImg,0,0,width,height)
 
  Engine.update(engine);

  //exibindo o solo na tela
  rect(ground.position.x, ground.position.y, width*2,1)

  //exibindo a torre na tela
  push()//inicializa uma nova configuração
  imageMode(CENTER)
  image(towerImg,tower.position.x, tower.position.y,160,310)
  pop() //retorna para a configuração antiga

  cannon.display()
   
  //posição do mouse
  text(mouseX+" | "+mouseY,mouseX,mouseY)
}
