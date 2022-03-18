var g_Opponent,r_Opponent,y_Opponent,p_MainRacer;
var g_Opponent1Img,r_Opponent1Img,y_Opponent1Img,p_MainRacer1Img;
var g_Opponent2Img,r_Opponent2Img,y_Opponent2Img,p_MainRacer2Img;

var PLAY=1;
var END=0;
var gameState=PLAY;

var distance=0;
var gameOver,gameOverImg,restart;

var path,pathImg;

var g_CG,r_CG,y_CG;


function preload(){
    g_Opponent1Img=loadImage("G_car1.png");
    g_Opponent2Img=loadAnimation("G_car2.png");
    
    r_Opponent1Img=loadImage("R_car1.png");
    r_Opponent2Img=loadAnimation("R_car2.png");

    y_Opponent1Img=loadImage("Y_car1.png");
    y_Opponent2Img=loadAnimation("Y_car2.png");

    p_MainRacer1Img=loadImage("P_car1.png");
    p_MainRacer2Img=loadAnimation("P_car2.png");

    pathImg=loadImage("road.png");

    gameOverImg=loadImage("gameOver.png");


}

function setup() {
createCanvas(windowWidth,windowHeight);
//moving background
path=createSprite(200,height/2);
path.addImage(pathImg);
path.velocityX=-5;

//cteating car running
   p_MainRacer=createSprite(150,150);
   p_MainRacer.addImage("SahilRunning",p_MainRacer1Img);
   p_MainRacer.scale=0.09;
   p_MainRacer.debug=false;
   //set collider for p_MainRacer
   p_MainRacer.setCollider("rectangle",0,0,40,40); 


   gameOver=createSprite(750,200);
   gameOver.addImage(gameOverImg);
   gameOver.scale=0.8;
   gameOver.visible=false;

   g_CG =new Group();
   r_CG =new Group();
   y_CG =new Group();

}

function draw() {
 background(0);

 drawSprites();
 textSize(20);
 fill(255);
 text("Distance :"+ distance,900,30);

 if(gameState===PLAY){
    
    distance =distance + Math.round(getFrameRate()/50);
     path.velocityX =-(6 + 2*distance/150);

     p_MainRacer.y=World.mouseY;

     edges= createEdgeSprites();
     p_MainRacer.collide(edges);

     //code to reset the background
     if(path.x < 0){
        path.x=width/2;
     }
     

     //cteating continous opponent racers
     var select_oopPlayer=Math.round(random(1,3));

    if(World.frameCount % 150 == 0){
         if(select_oopPlayer == 1){
            g_Racers();
         } else if(select_oopPlayer == 2){
            r_Racers();     
         }else if(select_oopPlayer == 3){
            y_Racers();
         }
    }

    if(g_CG.isTouching(p_MainRacer)){
        gameState=END;
        g_Opponent.velocityY = 0;
        g_Opponent.scale=0.2;
        g_Opponent.addAnimation("opponentPlayer1",g_Opponent2Img);
}

if(r_CG.isTouching(p_MainRacer)){
    gameState=END;
    r_Opponent.velocityY = 0;
    r_Opponent.scale=0.08;
    r_Opponent.addAnimation("opponentPlayer2",r_Opponent2Img);
}

if(y_CG.isTouching(p_MainRacer)){
    gameState=END;
    y_Opponent.velocityY = 0;
    y_Opponent.scale=0.1;
    y_Opponent.addAnimation("opponentPlayer3",y_Opponent2Img);
}
}else if (gameState ===END ){
    gameOver.visible=true;

   
    path.velocityX =0;
    p_MainRacer.velocityY=0;
    p_MainRacer.addAnimation("SahilRunning",p_MainRacer2Img);

g_CG.setVelocityXEach(0);
g_CG.setLifetimeEach(-1);

r_CG.setVelocityXEach(0);
r_CG.setLifetimeEach(-1);

y_CG.setVelocityXEach(0);
y_CG.setLifetimeEach(-1);


}


}

function g_Racers(){
    g_Opponent=createSprite(Math.round(random(500,1000)));
    g_Opponent.addImage("opponentPlayer1",g_Opponent1Img);
    g_Opponent.scale=0.08;
    g_Opponent.velocityX=-(6 + 2*distance/150);
    g_Opponent.setLifetime=170;
    g_CG.add(g_Opponent);
}

function r_Racers(){
     r_Opponent=createSprite(Math.round(random(500,1000)));
     r_Opponent.addImage("opponentPlayer2",r_Opponent1Img);
     r_Opponent.scale=0.2;
     r_Opponent.velocityX=-(6 + 2*distance/150);
     r_Opponent.setLifetime=170;
     r_CG.add(r_Opponent);
}

function y_Racers(){
    y_Opponent=createSprite(Math.round(random(500,1000)));
    y_Opponent.addImage("opponentPlayer3",y_Opponent1Img);
    y_Opponent.scale=0.2;
    y_Opponent.velocityX=-(6 + 2*distance/150);
    y_Opponent.setLifetime=170;
    y_CG.add(y_Opponent);

}

