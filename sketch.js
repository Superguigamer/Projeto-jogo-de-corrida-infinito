  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJumpImg = loadAnimation("ghost-jumping.png");
}

function setup() {
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,400,50,50);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost", ghostImg);
  ghost.addAnimation("jump", ghostJumpImg);
}

//escreva uma condição para a torre de rolagem infinita

function draw() {
  background(255);
 if(tower.y > 400) {
      tower.y = 300
    } 
  
  if (gameState === "play") {

    ghost.velocityY = -0.5;

    
    if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3;

      // escreva o código para mover para a esquerda quando a tecla para a esquerda for pressionada
    }
    if(keyDown("right_arrow")){
  
          ghost.x = ghost.x + 3;

      // escreva o código para mover para a direita quando a tecla para a direita for pressionada
      
    }
    if(keyDown("space")){
         ghost.velocityY = -10;
         ghost.changeAnimation("jump", ghostJumpImg);
    }
    else {
      ghost.changeAnimation("ghost", ghostImg);
    }
  ghost.velocityY = ghost.velocityY + 0.8;
  
      spawnDoors();

  
//escreva um código para fazer invisibleBlockGroup (grupo de bloco invisível) colidir com o fantasma, destruir o fantasma e mudar o estado do jogo para end.
     if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy()
      gameState = "end"
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("green");
    fill("purple");
    textSize(30);
    text("Fim de jogo!", 230,250)
  }
}

function spawnDoors()
 {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,-20);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 100;
    invisibleBlock.visible = false
    //adicione a função aleatória
    //
    door.addImage(doorImg);
    door.scale = 0.3;
    climber.addImage(climberImg);
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.velocityY = 5;
    climber.velocityY = 5;
    invisibleBlock.velocityY = 5;
    climber.visible = false

    //mude a profundidade do fantasma e da porta
    
     
ghost.depth = door.depth;
    ghost.depth =1;
    
    //atribuir tempo de vida para a porta, escalador e bloco invisível

 door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); aqui os obstáculos são as portas, o escalador e o bloco invisível
    
     doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

