class Bullet {
  constructor(x, y, r, l, s, d, damage, c, a) {
    this.x = x;
    this.y = y;
    this.xmov = 0;
    this.ymov = 0;
    this.r = r;
    this.speed = s;
    this.dir = d;
	this.color = c;
    this.range = l;
	this.damage = damage;
	this.ability = a;
	this.dead = false;
  }

  move() {
    this.xmov = cos(this.dir)*this.speed*deltaTime + this.xmov;
    this.ymov = sin(this.dir)*this.speed*deltaTime + this.ymov;
    
  }

  show(){
	push();
    translate(this.x + this.xmov, this.y + this.ymov);
	rotate(this.dir);
	if(this.ability == 1){
		push();
		scale(0.7);
		grenade();
		pop();
	}else if(this.ability == 2){
		push();
		scale(0.7);
		bGrenade();
		pop();
	}else{  
    
    noStroke();
    fill(this.color, 255-sqrt(sq(this.xmov) + sq(this.ymov))*255/this.range);
	rect(-1.25*this.r,-this.r, this.r*2.5, this.r*2,0,this.r,this.r,0)
    //ellipse(0, 0, this.r * 2.5, this.r *2);
	}
	pop();
  }
  die(){
	  if(sqrt(sq(this.xmov) + sq(this.ymov)) >= this.range || this.dead == true){
		  if(this.ability == 1 || this.ability == 4){
				let c = new Explosion(this.x + this.xmov, this.y + this.ymov, random(40,100), random(20,30));
				explosions.push(c)
		  }
		  if(this.ability == 2){
				let d = 0
				for(let i = 0; i < 30; i++){
					d += PI/15;
					let b = new Bullet(this.x + this.xmov, this.y + this.ymov, 2, 100, 0.2, d, 40, 50, 0);
					bullets.push(b);
				}
		  }
		bullets.splice(bull,1);
    }
  }
}