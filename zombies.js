class Zombie {
  constructor(x, y, r, a, c) {
    this.x = x;
    this.y = y;
    this.r = r;
	this.force = r;
	this.life = r*10;
    this.ability = a;
    this.gthick = 5;
    this.gcolor = color(20,90,50);
    this.c = c;
    this.v = 0.01;
    this.dir = 0;
	this.reloadTime = 25;
	this.reload = 0;
	this.offset = 0;
	this.vRot = 1;
	if (this.ability == 1 || this.ability == 4){this.v = this.v * 15; this.vRot = this.vRot * 15;}
	if (this.ability == 5){this.force = this.force * 5}
	this.stance = 255;
	this.killed = false;
	this.objective = 0;
  }

  move() {
	  if (this.killed == false){
	this.reload -= deltaTime/100;
	this.objective = atan2(player.y - this.y, player.x - this.x);
		
	if(this.objective-this.dir > PI){
			this.dir += 2*PI;
		  }
		  if(this.dir-this.objective > PI){
			this.dir -= 2*PI;
		  }
		  if(this.dir < this.objective){
			this.dir += deltaTime/1000*this.vRot*abs(atan2(player.y - this.y, player.x - this.x)-this.dir);
		  }
		  if(this.dir > this.objective){
			this.dir -= deltaTime/1000*this.vRot*abs(atan2(player.y - this.y, player.x - this.x)-this.dir);
		  }
		
	if(dist(this.x, this.y, player.x, player.y) > (this.r + player.r)){
    this.x += cos(this.dir)*this.v*deltaTime;
    this.y += sin(this.dir)*this.v*deltaTime;
	}
	
	if(dist(this.x, this.y, player.x, player.y) <= (this.r + player.r) && this.reload <= 0){
		if(this.ability == 4){this.life = 0}else{
		player.life -= this.force;
		this.reload = this.reloadTime;
		for(let i = 0; i < round(random(4,7)); i++){
					let b = new Blood(player.x, player.y, random(1,6), random(-10,30), random(-PI, PI));
					blood.push(b);
				}
		}
	}
    
  }
  }
    

  show() {
	this.c.setAlpha(this.stance);
	this.gcolor.setAlpha(this.stance);
    push();
    fill(this.c);
    translate(this.x, this.y);
    rotate(this.dir);
    noStroke();
    ellipse(0, 0, 2*this.r, 2*this.r);
    fill(this.gcolor);
    push();
    translate(this.r,-this.r);
    rect(0, 0, 10, this.gthick);
    pop();
    push();
    translate(this.r, this.r-this.gthick)
    rect(0, 0, 10, this.gthick);
    pop();
    pop();
  }
	die(){
		if (this.killed == false){
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
			for(let i = 0; i < round(random(3,7)); i++){
					let b = new Blood(this.x, this.y, random(1,6), random(0,30), random(-PI, PI));
					blood.push(b);
				}
			if(this.ability == 2 || this.ability == 4){
				let c = new Explosion(this.x, this.y, random(50,100), random(20,30));
				explosions.push(c);
			}
			if(this.ability == 3){
				player.life += random(5,25);
			}
			zombiesKilled++;
			this.killed = true;
		}
		}
		if (this.killed == true){
			this.stance -= deltaTime/4;
		}
		if(this.stance <= 0){
			zombies.splice(zb,1);
			}
	}
}

function zombieGen(){
	zombie.gen = zombie.gen - deltaTime/100;
  if(zombie.gen <= 0){
	  let r = random(difficulty,100);
	  if (r < 78){
	let c = color(round(random(0, 70)),round(random(90, 190)),round(random(70, 120)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR, zombie.maxR), 0, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR, zombie.maxR), 0, c);
		zombies.push(z);
	}
	  }
	  if (r >= 78 && r < 83){
	let c = color(round(random(230, 255)),round(random(180, 220)),round(random(50, 80)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR*0.8, zombie.maxR*0.8), 5, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR*0.8, zombie.maxR*0.8), 5, c);
		zombies.push(z);
	}
	  }
	if (r >= 83 && r < 88){
	let c = color(round(random(0, 80)),round(random(140, 200)),round(random(210, 255)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR*0.8, zombie.maxR*0.8), 1, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR*0.8, zombie.maxR*0.8), 1, c);
		zombies.push(z);
	}
	  }
	if (r >= 88 && r < 92){
	let c = color(round(random(190, 255)),round(random(40, 90)),round(random(0, 50)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR, zombie.maxR), 2, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR, zombie.maxR), 2, c);
		zombies.push(z);
	}
	  }
	if (r >= 92 && r < 98.5){
	let c = color(round(random(0, 30)),round(random(0, 70)),round(random(0, 30)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR*2.2, zombie.maxR*2), 0, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR*2.2, zombie.maxR*2), 0, c);
		zombies.push(z);
	}
	  }
	if (r >= 98.5 && r < 99.5){
	let c = color(round(random(230, 255)),round(random(230, 255)),round(random(230, 255)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR, zombie.maxR), 3, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR, zombie.maxR), 3, c);
		zombies.push(z);
	}
	  }
	if (r >= 99.5){
	let c = color(round(random(144, 190)),15,round(random(190, 230)))
	if(round(random(1,2))==1){
		let z = new Zombie(random(0, width), height*round(random(0, 1)), random(zombie.minR*0.8, zombie.maxR*0.8), 4, c);
		zombies.push(z);
	}else{
		let z = new Zombie(width*round(random(0, 1)), random(0, height), random(zombie.minR*0.8, zombie.maxR*0.8), 4, c);
		zombies.push(z);
	}
	  }
	
    zombie.gen = zombie.genTime;
  }
}