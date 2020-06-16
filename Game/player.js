class Player {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
	this.life = 100;
    this.c = 150;
	this.walkVel = 0.1;
	this.runVel = 0.2;
	this.crouchVel = 0.02;
    this.v = 0.1;
	this.stamina = 100;
	this.moving = false;
	this.alive = true;
  }

  move() {
	  if(this.alive == true){
	if (keyIsDown(81)) {
      this.v = this.crouchVel;
    }else if (keyIsDown(SHIFT) && this.stamina > 0 && this.moving == true) {
      this.v = this.runVel;

    }else {
		this.v = this.walkVel;
	}
	if(this.v == this.runVel){
		this.stamina -= 5*deltaTime/100;
	}else if(this.stamina < 100 && this.moving == true && this.stamina > 10){
		this.stamina += 0.5*deltaTime/100;
	}else if(this.stamina < 100 && this.moving == false){
		this.stamina += deltaTime/100;
	}
	
	this.moving = false;
    if (keyIsDown(LEFT_ARROW)||keyIsDown(65)) {
      this.x -= this.v*deltaTime;
	  this.moving = true;
    }

    if (keyIsDown(RIGHT_ARROW)||keyIsDown(68)) {
      this.x += this.v*deltaTime;
	  this.moving = true;
    }

    if (keyIsDown(UP_ARROW)||keyIsDown(87)) {
      this.y -= this.v*deltaTime;
	  this.moving = true;
    }

    if (keyIsDown(DOWN_ARROW)||keyIsDown(83)) {
      this.y += this.v*deltaTime;
	  this.moving = true;
    }
	if(this.life > 100){this.life = 100;}
	if(this.x > width || this.y > height || this.x < 0 || this.y < 0){this.life -= deltaTime/100;}
	}
  }

  show() {
	  if(this.alive == true){
    push();
    fill(this.c);
    translate(this.x, this.y);
	noStroke();
	push();
	rotate(guns[currentGun].d);
	fill(color(255,190,190));
	ellipse(this.r, 0, 0.5*this.r, this.r);
	pop();
	rotate(atan2(mouseY - this.y, mouseX - this.x));
	fill(color(255,204,204));
    ellipse(0, 0, 2*this.r);
	fill(color(54,23,23));
    ellipse(-0.1*this.r, 0, 1.9*this.r, 1.8*this.r);
	fill(color(57,96,57));
    ellipse(-0.3*this.r, 0, 1.4*this.r, 1.8*this.r);
	pop();
	  }
  }
  die(){
	  if(this.alive == true){
		  
		for (let i = 0; i < bullets.length; i++) {
			if(dist(bullets[i].x+bullets[i].xmov, bullets[i].y+bullets[i].ymov, this.x, this.y) <= this.r+bullets[i].r){
				this.life -= bullets[i].damage;
				for(let i = 0; i < round(random(1,3)); i++){
					let b = new Blood(this.x, this.y, random(1,6), random(-10,30), random(-PI, PI));
					blood.push(b);
				}
				if (bullets[i].ability == 3){
					bullets[i].damage -= 2*bullets[i].damage/3;
				}else{bullets[i].dead = true;}
				bullets[i].die();
				break;
			}
		}
		
		if(this.life <= 0){
			for(let i = 0; i < round(random(40,50)); i++){
					let b = new Blood(this.x, this.y, random(1,6), random(-10,30), random(-PI, PI));
					blood.push(b);
				}
				this.alive = false;
			}
	  }
			
	}
}

