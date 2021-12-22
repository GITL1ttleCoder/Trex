var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameOver, restart;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");


}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  phantom = createSprite(200,200,50,50);
  phantom.debug = true;
  phantom.setCollider("rectangle", 0,0,50,50);

  phantom.addImage(ghostImg);
  phantom.scale = 0.3;

  doorsGroup = new Group();
  climberGroup = new Group();
  
}

function draw() {
  background(200);
  

  if(gameState===PLAY){

    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("SPACE")){

     phantom.velocityY = -5;

    }

    if(keyDown("LEFT_ARROW")){

     phantom.x = phantom.x -3;
     phantom.rotate = 360;
 
    }

    if(keyDown("RIGHT_ARROW")){

     phantom.x = phantom.x +3;
     phantom.rotate = 180;
 
    }

    phantom.velocityY = phantom.velocityY + 0.8;

    phantom.collide(climber);

    spawnDoors();


  }
else if(gameState === END){
  tower.velocityY = 0;
  phantom.velocityY = 0;
  phantom.velocityX = 0;
  climberGroup.setVelocityEach(0);
  doorsGroup.setVelocityEach(0);

  climberGroup.setLifetimeEach(-1);
  doorsGroup.setLifetimeEach(-1);

  if(mousePressedOver(restart)){
    reset();
  }
}

drawSprites();
}

function spawnDoors(){

  if(frameCount % 240 === 0){
   door = createSprite(200,-50);
   door.addImage(doorImg);

   climber = createSprite(200,10);
   climber.addImage(climberImg);

   door.x = Math.round(random(120,400));
   climber.x = door.x;

   door.velocityY = 1;
   climber.velocityY = 1;

   phantom.depth = door.depth;
   phantom.depth += 1;

   door.lifetime = 800;
   climber.lifetime = 800;

   doorsGroup.add(door);
   climberGroup.add(climber);

   
  }



}

function reset(){

  gameState = PLAY;

  climberGroup.destroyEach();
  doorsGroup.destroyEach();
}