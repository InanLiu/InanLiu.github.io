"use strict";

/**************************************************
age of aquariums
Liu Shanqi


**************************************************/
let aquariums = [] //arrays of fish
let aquariumsSize = 10 //number of start fish
let state = `start`
let user = {   //uesr object
  x: 0,  //p of user object
  y: 0,
  size: 60,
  growth:5, // uesr object is getting bigger
  vx:0,
  vy:0,
  speed:2, //moving speed
};
let pressStart = `press anykey to eat fish! `
let goodEndLine = `U are a mature and big fish now! `
let badEndLine = `try again and avoid the bigger fish`
let score = 0
let bgImage = undefined;
let bgMusic = undefined;
let putFish = undefined;
let eat = undefined;
let death  = undefined;

function preload(){
  bgImage = loadImage(`assets/images/bgImage.png`);

  bgMusic = loadSound(`assets/sounds/bgMusic.wav`);//bgmusic
  //sound effect
  putFish = loadSound(`assets/sounds/putFish.wav`);
  eat = loadSound(`assets/sounds/eat.wav`);
  death = loadSound(`assets/sounds/death.wav`);
}
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1400, 600);

  textAlign(CENTER,CENTER);
  textSize(32);
  fill(255);


  noStroke()

  for (let i = 0; i < aquariumsSize; i++){ //arrays of my fish
   aquariums[i] = createFish(random(0, width), random(0,height),random(40,100));
  }

}
//create fish's stuff
function createFish(x,y,size){
  let fish = { //data of the fish
    x: x,
    y: y,
    size: size,
    vx:0,
    vy:0,
    alive: false, // can be eatten
    speed:2,
  };
  return fish;
}
// draw()
//
// Description of draw() goes here.
function draw() {
     if (state === `start`){
      start();
     }
     else if (state === `simulation`){ //state: simulation (where the playing going on)
       simulation();
     }
     else if (state === `goodEnd`){//goodEnd when the userobject get big enough
       goodEnd();
     }
     else if (state === `badEnd`){//badEnd when userobject is eaten by bigger fish
       badEnd();
     }


}
 //state of click to start
 function start(){
  //click to start
  push();
  textAlign(CENTER,CENTER);
  textSize(32);
  fill(255);
  pop();

  background(0);
  text(pressStart, width/2, height/2)
 }
 //state of goodending
 function goodEnd(){

   background(0);
   text(goodEndLine, width/2, height/2)
  }
  //state of badending
 function badEnd(){

   background(0);
   text(badEndLine, width/2, height/2)
  }
//state of simulation
 function simulation(){
  background(41, 65, 107)

  //move the user (with the mouse)
  moveUser();

  guidance();//let audiance know click can bring more fish

  displayUser();//show the uesr object
  displayScore();//show the score
  enoughFish(); // change state to goodending

  for (let i = 0; i < aquariums.length; i++){
   //arrays of fish
    moveFish(aquariums[i]);
    displayFish(aquariums[i]);
    checkFish(aquariums[i]);
  }
}
// sets the user position to the mouse position
function moveUser(){
  // user.x = mouseX;
  // user.y = mouseY;

  let dx = user.x - mouseX; //define the position of user object
  let dy = user.y - mouseY;

  // user object move toward to the mouse position
  if (dx < 0){
    user.vx = user.speed;
  }
  else if (dx > 0){
    user.vx = -user.speed;
  }

  if (dy < 0){
    user.vy = user.speed;
  }
  else if (dy > 0){
    user.vy = -user.speed;
  }

  //apply speed
  user.x += user.vx;
  user.y += user.vy;



}

function moveFish(fish){
  // choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
  fish.vx = random(-fish.speed, fish.speed);
  fish.vy = random(-fish.speed, fish.speed);
}
  fish.x += fish.vx;
  fish.y += fish.vy;

  //constrain of the fish
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}
//check Fish weather a collision or not
function checkFish(fish){
  if(!fish.eaten){
    let d = dist (user.x,user.y,fish.x,fish.y)
    if (d < user.size / 2 + fish.size / 2 && user.size > fish.size){ //user object eaten smaller fish
      fish.eaten = true;
      user.size += user.growth;
      score ++;
      eat.play(); //apply sound effct
}
}
   let d = dist (user.x,user.y,fish.x,fish.y)
   if (d < user.size / 2 + fish.size / 2 && user.size < fish.size){ //user object is eaten by bigger fish
     death.play();
     state = `badEnd`; //apply sound effct
  }
}
 function guidance(){ // show that click can bring more fish
   push();
   fill(255);   //style
   textAlign(LEFT, TOP);
   textSize(32);
   text(`click for more`, width / 1.2, height / 8);
   pop();
 }
 //display the score of number of fish was eatten
 function displayScore() { //code from example
  push();
  fill(255);   //style
  textAlign(LEFT, TOP);
  textSize(32);
  text(score, width / 8, height / 8);
  pop();
}
  //Draw the user as a circle
  function displayUser(){
    push();
    fill(255);
    ellipse(user.x,user.y,user.size);
    pop();
  }
 //Draw the fish as circles
  function displayFish(fish){
     if(!fish.eaten){
       push();
       fill(255,100,100);
       ellipse(fish.x,fish.y,fish.size);
       pop();
     }
}
//mouse click to add more fish
  function mousePressed(){
    if (state === `simulation`){
    let fish = createFish(random(0, width), random(0,height),random(40,100))
    aquariums.push(fish);
    putFish.play(); //apply sound effect
  }
}
  function keyPressed(){ //changging states //
    if (state === `start`){
    state = `simulation`;
    bgMusic.play(); //play background music
}
}
//change states
 function enoughFish(){
   if (score === 15){
   state = `goodEnd`}
 }
