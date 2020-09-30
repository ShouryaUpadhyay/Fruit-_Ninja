
var sword,swordImage;
var fruits;
var alien,alienImage;
var monsterGroup,fruitGroup,position;
//declaring Gamestates

var PLAY= 1;
var END = 0;
var gameState = 1;

var score = 0;

var gameOverImage,Over, knifeSwooshSound,gameover;


function preload(){
  swordImage = loadImage("sword.png")
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  monsterImage = loadImage("alien1.png","alien2.png")

  gameOverImage=loadImage("gameover.png")
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
  gameover = loadSound("gameover.mp3")

}

function setup() {
  createCanvas(400, 400);
  
monsterGroup=createGroup();
fruitGroup=new Group();
  sword();
}

function draw() {
  background(220);
  
  text("Score = "+score,320,30);
  
  if(gameState===PLAY){
    sword.y = World.mouseY;
  sword.x = World.mouseX;
enemy();
fruits();    
  

     if(fruitGroup.isTouching(sword)){
fruitGroup.destroyEach();
 knifeSwooshSound.play();
score = score+2;
     }
    

  }
      
 if(monsterGroup.isTouching(sword)){
  
gameover.play();

   fruitGroup.destroyEach();
   monsterGroup.destroyEach();
   
   fruitGroup.setVelocityX=0; 
   monsterGroup.setVelocityX=0;
   fruits.velocityX =0;
   monsterGroup.velocityX =0;
   sword.velocityX =0;
   

   
  Over = createSprite(200,200,20,20);
  Over.addImage("GameOver",gameOverImage)
   
   gameState=END;
 }
    
  drawSprites();

  
  
}
function enemy(){
  if (frameCount % 40 === 0) {
    var monster = createSprite(400,120,40,10);
    monster.y = Math.round(random(300,100));
    monster.addImage(monsterImage);
    monster.scale = 0.5;
    monster.velocityX = -(6+2*score/5);
    
     //assign lifetime to the variable
    monster.lifetime = 130;
    monsterGroup.add(monster)
  }
}

function fruits(){  
        if (frameCount % 60 === 0) {
          position = Math.round(random(1,2));     
     var fruits = createSprite(0,120,40,10);
     fruits.y = Math.round(random(50,200));
     var rand = Math.round(random(1,4));
     switch(rand) {
     case 1: fruits.addImage(fruit1);
     break;
     case 2: fruits.addImage(fruit2);
     break;
     case 3: fruits.addImage(fruit3);

     break;
     case 4:fruits.addImage(fruit4);
     break;
     default: break;
      
   }  
          if(position==1){
             fruits.x=400;
            fruits.velocityX = -(7+(score/4));  
             }
          else {
            if(position==2){
               fruits.x=0;
                fruits.velocityX = (7+(score/4)); 
               }
            
            
          }
          
          fruits.scale=0.2;
   
             fruitGroup.add(fruits);
        }   
   
  }

function sword(){
  sword=createSprite(200,320,20,20)
  sword.addImage("sword",swordImage)
  sword.scale = 0.5;
}
