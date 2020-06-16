var paused = false;
let player;
let bullets = [];
let explosions = [];
let guns = [];
let zombies = [];
let blocks = [];
let gadgets = [];
let zb = 0;
let gad = 0;
let bull = 0;
let currentGun = 1;
let currentGadget = 0;
let blood = [];
let block = 0;
let zombiesKilled = 0;
let nextWave = 100;
let difficulty = 0;

var zombie = {
  minR: 10,
  maxR: 18,
  gen: 0,
  genTime: 15,
};
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(200, 200, 12);
  let shotgun =  new Gun(6,  20, 10,  2,  100, 0.4, 0.35, 10, 50,  0);
  guns.push(shotgun);
  let pistol =   new Gun(4,  8,  5,   2,  250, 0.6, 0.07, 1,  70,  0);
  guns.push(pistol);
  let smg =      new Gun(5,  20, 1,   2,  250, 0.6, 0.35, 1,  50,  0);
  guns.push(smg);
  let sniper =   new Gun(4,  34, 15,  2,  700, 0.9, 0.01, 1,  150, 2);
  guns.push(sniper);
  let bazuca =   new Gun(20, 30, 50,  7,  350, 0.3, 0.3,  1,  400, 1);
  guns.push(bazuca);
  let sterling = new Gun(5,  20, 1.7, 2,  350, 0.7, 0.2,  1,  40,  0);
  guns.push(sterling);
  let scar =     new Gun(4,  20, 5,   2,  400, 0.7, 0.1,  1,  80,  0);
  guns.push(scar);
  let grizzly =  new Gun(5,  40, 13,  3,  800, 0.8, 0.01, 1,  250, 0);
  guns.push(grizzly);
}

function draw() {
  if (paused == false){
  
  gadgetGen();
  zombieGen();
  
  background(200);
  
  if(zombiesKilled == nextWave){
	  nextWave = 5*nextWave;
	  zombie.genTime -= 3;
	  difficulty +=10;
  }
  
  stats();
  
  for (gad = gadgets.length-1; gad >= 0; gad--) {
    gadgets[gad].move();
    gadgets[gad].show();
	gadgets[gad].die();
  }
  
  for(block = blocks.length-1; block >= 0; block--) {
    blocks[block].move();
    blocks[block].show();
	blocks[block].die();
  }
  for (let i = 0; i < blood.length; i++) {
    blood[i].move();
    blood[i].show();
	blood[i].die();
  }
  
  player.move();
  player.show();
  player.die();
  guns[currentGun].shoot();
  guns[currentGun].show();
  
  for (bull = bullets.length-1; bull >= 0; bull--) {
    bullets[bull].move();
	//if(bullets.length < i+1){i--;}
	//if(bullets.length===0){break;}
    bullets[bull].show();
	bullets[bull].die();
  }
  
  for (zb = zombies.length-1; zb >= 0; zb--) {
    zombies[zb].move();
    zombies[zb].show();
	zombies[zb].die();
  }
  
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].show();
	explosions[i].die();
  }
  
  }
}

function keyReleased() {
  if (keyCode === ESCAPE && paused == false) {
    paused = true;
	
  } else if(keyCode === ESCAPE && paused == true){
    paused = false;
  }
  if (keyCode === 189 && currentGun > 0) {
    currentGun --;
	
  } else if(keyCode === 187 && currentGun < guns.length-1){
    currentGun ++;
  }
  if (keyCode === 32) {
    useGadget();	
  }
  return false;
}
