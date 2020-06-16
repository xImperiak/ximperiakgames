class Gadget {
  constructor(x, y, u, g) {
    this.x = x;
    this.y = y;
    this.utility = u;
	this.gun = g;
	this.phase = 0;
	this.time = 0;
	if(this.gun == true){
		this.r = guns[this.utility].y + 10;
	}
	if(this.gun == false){this.r = 30;}
  }

  move() {
    if (dist(player.x, player.y, this.x, this.y) < (this.r + player.r)*2 && this.phase < this.r + 2* player.r){
		this.phase += deltaTime/25;
	}else{this.phase = 0;}
	this.time += deltaTime/1000;
    
  }

  show(){
    push();
	translate(this.x,this.y);
    stroke(255);
	strokeWeight(6);
    noFill();
    ellipse(0, 0, this.r * 2);
	push();
	rotate(this.time);
	if(this.gun == true){translate(-guns[this.utility].y*0.5, -guns[this.utility].x*0.5);}
	if(this.utility == 0 && this.gun == true){shotgun();}
	if(this.utility == 1 && this.gun == true){pistol();}
	if(this.utility == 2 && this.gun == true){smg();}
	if(this.utility == 3 && this.gun == true){sniper();}
	if(this.utility == 4 && this.gun == true){bazuca();}
	if(this.utility == 5 && this.gun == true){sterling();}
	if(this.utility == 6 && this.gun == true){scar();}
	if(this.utility == 7 && this.gun == true){grizzly();}
	if(this.utility == 1 && this.gun == false){grenade();}
	if(this.utility == 2 && this.gun == false){bGrenade();}
	if(this.utility == 3 && this.gun == false){healthKit();}
	if(this.utility == 4 && this.gun == false){bGrenade();}
	pop();
	stroke(255, 255-this.phase*255/(this.r + 2* player.r));
	strokeWeight(3);
	if(this.phase > 0){ellipse(0, 0, (this.r + this.phase) * 2);}
	if(this.phase > 10){ellipse(0, 0, (this.r + this.phase-10) * 2);}
	if(dist(player.x, player.y, this.x, this.y) < (this.r + player.r)*2){
		push();
		stroke(255,255);
		rect(-this.r/2, -2.5*this.r, this.r, this.r);
		textAlign(CENTER);
		strokeWeight(1);
		textSize(this.r/2);
		text("E", 0, - 1.8*this.r);
		pop();
  }
    pop();
  }
  die(){
	  if(dist(player.x, player.y, this.x, this.y) < (this.r + player.r)*2 && keyIsDown(69)){
		  if(this.gun == true){currentGun = this.utility}
		  if(this.gun == false){currentGadget = this.utility}
		  gadgets.splice(gad,1);
	  }
	  if(this.time > 60){
		  gadgets.splice(gad,1);
	  }
    }
  }
  
function  gadgetGen(){
	if(0 == round(random(0,500000/deltaTime/(difficulty+10)))){
		if (1 == round(random(0,1))){
			let g = new Gadget(random(0, width), random(0, height), round(random(0,6)), true);
			gadgets.push(g);
		}else{
		let g = new Gadget(random(0, width), random(0, height), round(random(1,3)), false);
		gadgets.push(g);
		}
	}
}

function useGadget(){
	//let b = new Block(player.x, player.y, random(20,30), random(20,30), random(100,140));
	//blocks.push(b);
	if (currentGadget == 1){
		grenadeUse();
	}
	if (currentGadget == 2){
		bGrenadeUse();
	}
	if (currentGadget == 3){
		healthKitUse();
	}
	currentGadget = 0;
}

function grenadeUse(){
	let d = atan2(mouseY - player.y, mouseX - player.x);
	let b = new Bullet(player.x + cos(d)*(player.r+20), player.y + sin(d)*(player.r+20), 7, constrain(dist(player.x, player.y, mouseX, mouseY),player.r+10,300), 0.3, d, 0, color(30,132,73), 1);
	bullets.push(b);
}

function grenade(){
	noStroke();
	fill(color(30,132,73));
	ellipse(0,0,20,25);
	fill(color(20,90,50));
	rect(-10,-10,4,4);
	rect(-12,-4,4,4);
	rect(-12,2,4,4);
	rect(-10,8,4,4);
	rect(-5,-10,4,4);
	rect(-7,-4,4,4);
	rect(-7,2,4,4);
	rect(-5,8,4,4);
	rect(0,-10,4,4);
	rect(-2,-4,4,4);
	rect(-2,2,4,4);
	rect(0,8,4,4);
	rect(3,-4,4,4);
	rect(3,2,4,4);
	rect(6,-10,4,4);
	rect(8,-4,4,4);
	rect(8,2,4,4);
	rect(6,8,4,4);
	fill(150);
	rect(-4,-20,12,2);
	fill(0);
	rect(-2,-20,4,8);
}

function bGrenadeUse(){
	let d = atan2(mouseY - player.y, mouseX - player.x);
	let b = new Bullet(player.x + cos(d)*(player.r+20), player.y + sin(d)*(player.r+20), 5, constrain(dist(player.x, player.y, mouseX, mouseY),player.r+10,300), 0.3, d, 0, color(51,51,0), 2);
	bullets.push(b);
}

function bGrenade(){
	noStroke();
	fill(color(51,51,0));
	ellipse(0,0,20,20);
	fill(150);
	rect(-4,-16,12,2);
	fill(0);
	rect(-2,-16,4,8);
	fill(color(244,208,63));
	rect(-2,-12,4,2);
}

function healthKitUse(){
	player.life += random(25,40);
}

function healthKit(){
	noStroke();
	fill(color(231,76,60));
	rect(-15,-15,30,30)
	fill(255);
	rect(-3,-10,6,20);
	rect(-10,-3,20,6);
}