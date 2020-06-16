class Explosion {
  constructor(x, y, l, damage) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.range = l;
	this.damage = damage;
	this.hit = false;
  }

  show(){
	this.r += 3*deltaTime/100;
	if(dist(this.x, this.y, player.x, player.y) <= (this.r + player.r) && this.hit == false){
		player.life -= this.damage;
		for(let i = 0; i < round(random(4,7)); i++){
					let b = new Blood(player.x, player.y, random(1,6), random(-10,30), random(-PI, PI));
					blood.push(b);
				}
		this.hit = true;
		
	}
    for (let i = 0; i < zombies.length; i++) {
			if(dist(zombies[i].x, zombies[i].y, this.x, this.y) <= this.r+zombies[i].r){
				zombies[i].life -= this.damage;
				for(let c = 0; c < round(random(1,3)); c++){
					let b = new Blood(zombies[i].x, zombies[i].y, random(1,6), random(-10,30), random(-PI, PI));
					blood.push(b);
				}
				break;
			}
		}
	for (let i = 0; i < blocks.length; i++) {
			if(dist(blocks[i].x, blocks[i].y, this.x, this.y) <= this.r+sqrt(sq(blocks[i].xx/2)+ sq((blocks[i].yy/2)))){
				blocks[i].life -= this.damage;
				break;
			}
		}
    push();
	strokeWeight(4);
	noFill();
    stroke(color(241,35+this.r*185/this.range,15,255-this.r*255/this.range));
	ellipse(this.x, this.y, this.r * 2);
	stroke(color(241,35+(this.r-4)*185/this.range,15,255-(this.r-4)*255/this.range));
	ellipse(this.x, this.y, (this.r-4) * 2);
	stroke(color(241,35+(this.r-8)*185/this.range,15,255-(this.r-8)*255/this.range));
	ellipse(this.x, this.y, (this.r-8) * 2);
	stroke(color(241,35+(this.r-16)*185/this.range,15,255-(this.r-16)*255/this.range));
    ellipse(this.x, this.y, (this.r-16) * 2);
    pop();
  }
  die(){
	  if(this.r >= this.range){
		explosions.shift();
    }
  }
}