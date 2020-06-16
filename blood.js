class Blood {
  constructor(x, y, r, l, d) {
    this.x = x;
    this.y = y;
    this.xmov = 0;
    this.ymov = 0;
    this.r = r;
    this.speed = 0.2;
    this.dir = d;
    this.range = l;
	this.timeOut = random(20,40);
  }

  move(){
	  this.timeOut -= deltaTime/100;
	  while(sqrt(sq(this.xmov) + sq(this.ymov)) < this.range){
		this.xmov = cos(this.dir)*this.speed*deltaTime + this.xmov;
		this.ymov = sin(this.dir)*this.speed*deltaTime + this.ymov;
	  }
    
  }

  show(){
    push();
    translate(this.xmov, this.ymov);
    noStroke();
    fill(color(204, 0, 0, this.timeOut*3.3));
    ellipse(this.x + 20*cos(this.dir), this.y + 20*sin(this.dir), this.r * 2);
    pop();
  }
  die(){
	  if(this.timeOut <= 0){
		blood.shift();
    }
  }
}