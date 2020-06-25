var trex; 
var trexRunning;
var trexCollided;
var ground;
var invisibleGround;
var groundImage;
var obstaclesGroup;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var cloudsGroup, cloudImage;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var restart, restartImage;
var gameOver,gameOverImage;


function preload(){
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
}

function setup() { 
  createCanvas(600, 200);
  trex = createSprite(50, 180, 10, 10);
  trex.addAnimation("trexRunning",trexRunning)
  trex.scale=0.5;
  
  trex.addAnimation("trex_collided",trexCollided);
  
  ground = createSprite(300, 180, 600, 15);
  ground.addImage("ground", groundImage);
  invisibleGround  = createSprite(300, 190, 600, 15);
  invisibleGround.visible = false;
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  restart = createSprite(300, 110, 20, 20);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  gameOver = createSprite(300, 70, 20, 20);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
}

function draw() {
  background("aliceblue");
  
  
    
  
  if(gameState===PLAY){
    score = score+Math.round(getFrameRate()/60);
      ground.velocityX= -2;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    
    if(keyDown("space")&& trex.isTouching(ground)){
    trex.velocityY= -10; 
     }
    
trex.velocityY = trex.velocityY+0.5;
    
  spawnClouds();
  spawnObstacles();
    
    if(trex.isTouching(obstaclesGroup)){
      gameState=END;
    }
    
  }
  else if(gameState===END){
    trex.velocityY=0;
    ground.velocityX=0;
    restart.visible=true;
    gameOver.visible=true;
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("trex_collided",trexCollided);  
       
   }
  if(mousePressedOver(restart)) {
    reset();
  }
  trex.collide(invisibleGround);
  text("score:" +score, 500, 40);
  drawSprites();
  }
    
  function reset(){
  gameState= PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("trexRunning",trexRunning);    
  score=0;
  
}

function spawnClouds(){
  if(frameCount%60===0){
    var cloud = createSprite(600, 100, 15, 15);
    cloud.addImage("cloud", cloudImage);
    cloud.velocityX= -5;
    cloud.scale=0.6;
    cloud.y=Math.round(random(100, 180))
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloud.lifeTime= 120;
    cloudsGroup.add(cloud);
     } 
}

function spawnObstacles(){
if(frameCount%80===0){
  var obstacles = createSprite(600, 160, 15, 15);
  var rand = Math.round(random(1, 6))
  switch(rand){
    case 1: obstacles.addImage("obstacle1" ,obstacle1);
      break;
    case 2: obstacles.addImage("obstacle2" ,obstacle2);
      break;
    case 3: obstacles.addImage("obstacle3" ,obstacle3);
      break;
    case 4: obstacles.addImage("obstacle4" ,obstacle4); 
      break;
    case 5: obstacles.addImage("obstacle5" ,obstacle5);
      break;
    case 6: obstacles.addImage("obstacle6" ,obstacle6);
      break;  
  } 
   obstacles.velocityX= -2;
   obstacles.scale= 0.5;
   obstacles.lifeTime = 300;
   obstaclesGroup.add(obstacles);
   }                                               

}
