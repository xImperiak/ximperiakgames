class Gun {
  constructor(x, y, r, b, d, s, o, n, damage, a) {
	this.x = x;
	this.y = y;
    this.reloadTime = r;
    this.bwidth = b;
    this.reload = r;
    this.range = d;
    this.bspeed = s;
	this.offset = o;
	this.realOffset = this.offset;
	this.bnumber = n;
	this.d = atan2(mouseY - player.y, mouseX - player.x);
	this.damage = damage;
	this.ability = a;
	this.vRot = 7;
  }

  shoot() {
	  if(player.alive == true){
		  if(atan2(mouseY - player.y, mouseX - player.x)-this.d > PI){
			this.d += 2*PI;
		  }
		  if(this.d-atan2(mouseY - player.y, mouseX - player.x) > PI){
			this.d -= 2*PI;
		  }
		  if(this.d < atan2(mouseY - player.y, mouseX - player.x)){
			this.d += deltaTime/1000*this.vRot*abs(atan2(mouseY - player.y, mouseX - player.x)-this.d);
		  }
		  if(this.d > atan2(mouseY - player.y, mouseX - player.x)){
			this.d -= deltaTime/1000*this.vRot*abs(atan2(mouseY - player.y, mouseX - player.x)-this.d);
		  }
    this.reload -= deltaTime/100;
	
	if (player.v == player.crouchVel) {
      this.realOffset = 0.5*this.offset;
    }else if (player.v == player.runVel) {
      this.realOffset = 1.5*this.offset;
    }else {this.realOffset = this.offset}
	
    if (mouseIsPressed && this.reload <= 0) {
		if (this.ability == 0){
		  for(let i = 0; i < this.bnumber; i++){
		this.d += random(-this.realOffset,this.realOffset);
		let b = new Bullet(player.x + cos(this.d)*(player.r+this.y), player.y + sin(this.d)*(player.r+this.y), this.bwidth, this.range, this.bspeed, this.d, this.damage, 50, 0);
		bullets.push(b);
		  }
		}
		if (this.ability == 1){
		  for(let i = 0; i < this.bnumber; i++){
		this.d += random(-this.realOffset,this.realOffset);
		let b = new Bullet(player.x + cos(this.d)*(player.r+this.x), player.y + sin(this.d)*(player.r+this.y), this.bwidth, this.range, this.bspeed, this.d, this.damage, color(40,0,0), 4);
		bullets.push(b);
		  }
	  }
	  if (this.ability == 2){
		  for(let i = 0; i < this.bnumber; i++){
		this.d += random(-this.realOffset,this.realOffset);
		let b = new Bullet(player.x + cos(this.d)*(player.r+this.y), player.y + sin(this.d)*(player.r+this.y), this.bwidth, this.range, this.bspeed, this.d, this.damage, 50, 3);
		bullets.push(b);
		  }
		}
      this.reload = this.reloadTime;
	  }
  }
  }
  
  show() {
	  if(player.alive == true){
    push();
    translate(player.x, player.y);
    rotate(this.d);
	translate(player.r, -this.x/2);
	push();
	if(currentGun == 0){shotgun();}
	if(currentGun == 1){pistol();}
	if(currentGun == 2){smg();}
	if(currentGun == 3){sniper();}
	if(currentGun == 4){bazuca();}
	if(currentGun == 5){sterling();}
	if(currentGun == 6){scar();}
	if(currentGun == 7){grizzly();}
	pop();
    pop();
  }
  }
}

function shotgun(){
	push();
	noStroke();
	fill(120,66,18);
    rect(0, 0, guns[0].y/5, guns[0].x);
	fill(166,172,175);
	rect(guns[0].y/5, 0, guns[0].y/10, guns[0].x);
	fill(110,44,0);
	rect(2.2*guns[0].y/5, -guns[0].x*0.2, 1.8*guns[0].y/5, guns[0].x*1.4);
	fill(23,32,42);
	rect(3*guns[0].y/10, 0, 3*guns[0].y/5, guns[0].x);
	pop();
}

function pistol(){
	push();
	noStroke();
	fill(144,148,151);
    rect(0, 0, guns[1].y, guns[1].x);
	fill(0,0,0);
    rect(guns[1].y*0.2, guns[1].x*0.2, guns[1].y*0.15, guns[1].x*0.6);
	rect(guns[1].y*0.8, guns[1].x*0.3, guns[1].y*0.2, guns[1].x*0.4);
	pop();
}

function smg(){
	push();
	noStroke();
	fill(147,81,22);
    rect(0, 0, guns[2].y*0.2, guns[2].x);
	fill(23,32,42);
    rect(guns[2].y*0.2, 0, guns[2].y*0.4, guns[2].x);
	rect(guns[2].y*0.3, -guns[2].x*0.75, guns[2].y*0.15, guns[2].x*2.5);
	rect(guns[2].y*0.6, guns[2].x*0.15, guns[2].y*0.4, guns[2].x*0.7);
	rect(guns[2].y*0.8, 0, guns[2].y*0.1, guns[2].x);
	pop();
}

function sniper(){
	push();
	noStroke();
	fill(147,81,22);
    rect(0, 0, guns[3].y*0.6, guns[3].x);
	rect(guns[3].y*0.6, guns[3].x*0.2, guns[3].y*0.3, guns[3].x*0.6);
	fill(23,32,42);
    rect(guns[3].y*0.9, guns[3].x*0.1, guns[3].y*0.1, guns[3].x*0.8);
	rect(guns[3].y*0.35, guns[3].x*0.1, guns[3].y*0.1, guns[3].x*0.8);
	rect(guns[3].y*0.2, guns[3].x*0.3, guns[3].y*0.15, guns[3].x*0.4);
	rect(guns[3].y*0.15, guns[3].x*0.2, guns[3].y*0.05, guns[3].x*0.6);
	rect(0, 0, guns[3].y*0.05, guns[3].x);
	pop();
}

function bazuca(){
	push();
	noStroke();
	fill(35,155,86);
    rect(guns[4].y*0.1, guns[4].x*0.1, guns[4].y*0.8, guns[4].x*0.8);
	fill(25,111,61);
    rect(0, 0, guns[4].y*0.1, guns[4].x);
	rect(guns[4].y*0.9, -guns[4].x*0.1, guns[4].y*0.1, guns[4].x*1.2);
	rect(guns[4].y*0.4, guns[4].x*0.5, guns[4].y*0.3, guns[4].x*0.3);
	fill(244,208,63);
    rect(guns[4].y*0.8, guns[4].x*0.1, guns[4].y*0.05, guns[4].x*0.8);
	fill(171,235,198);
    rect(guns[4].y*0.2, guns[4].x*0.1, guns[4].y*0.05, guns[4].x*0.8);
    rect(guns[4].y*0.3, guns[4].x*0.1, guns[4].y*0.05, guns[4].x*0.8);
	pop();
}

function sterling(){
	push();
	noStroke();
	fill(23,32,42);
    rect(0, 0, guns[5].y*0.2, guns[5].x);
	rect(guns[5].y*0.3, -guns[5].x*0.25, guns[5].y*0.15, guns[5].x*2.8);
	fill(77,86,86);
    rect(guns[5].y*0.2, 0, guns[5].y*0.4, guns[5].x);
	rect(guns[5].y*0.6, guns[5].x*0.15, guns[5].y*0.4, guns[5].x*0.7);
	fill(23,32,42);
	rect(guns[5].y*0.8, 0, guns[5].y*0.1, guns[5].x);
	pop();
}

function scar(){
	push();
	noStroke();
	fill(229,152,102);
    rect(guns[6].y*0.1, 0, guns[6].y*0.7, guns[6].x);
	fill(23,32,42);
	rect(0, 0, guns[6].y*0.1, guns[6].x);
	rect(guns[6].y*0.8, guns[6].x*0.2, guns[6].y*0.2, guns[6].x*0.6);
	rect(guns[6].y*0.95, guns[6].x*0.1, guns[6].y*0.05, guns[6].x*0.8);
	rect(guns[6].y*0.2, guns[6].x*0.2, guns[6].y*0.05, guns[6].x*0.6);
	rect(guns[6].y*0.7, guns[6].x*0.2, guns[6].y*0.05, guns[6].x*0.6);
	pop();
}

function grizzly(){
	push();
	noStroke();
	fill(208,211,212);
    rect(0, 0, guns[7].y*0.5, guns[7].x);
	rect(guns[7].y*0.5, guns[7].x*0.3, guns[7].y*0.4, guns[7].x*0.4);
	fill(23,32,42);
    rect(guns[7].y*0.9, guns[7].x*0.1, guns[7].y*0.1, guns[7].x);
	rect(guns[7].y*0.35, guns[7].x*0.1, guns[7].y*0.1, guns[7].x*0.8);
	rect(guns[7].y*0.2, guns[7].x*0.3, guns[7].y*0.15, guns[7].x*0.4);
	rect(guns[7].y*0.15, guns[7].x*0.2, guns[7].y*0.05, guns[7].x*0.6);
	rect(guns[7].y*0.3, guns[7].x, guns[7].y*0.2, guns[7].x*0.4);
	rect(guns[7].y*0.3, -0.4*guns[7].x, guns[7].y*0.2, guns[7].x*0.4);
	rect(0, 0, guns[7].y*0.05, guns[7].x);
	pop();
}