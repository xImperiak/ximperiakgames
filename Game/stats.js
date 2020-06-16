function stats(){
	push();
	noStroke();
	fill(color(88,214,141));
	if(player.life<60){fill(color(255,153,51));}
	if(player.life<30){fill(color(255,51,51));}
	translate(width/2, height - 60);
	if(player.life>0){rect(0, 0, - width/2 *  player.life /100, 20);}
	pop();
	push();
	noStroke();
	fill(color(255,255,0));
	translate(width/2, height-60);
	rect(0, 0, width/2 * player.stamina / 100, 20);
	pop();
	push();
	textSize(25);
	textAlign(CENTER);
	text(zombiesKilled, width/2, 65);
	pop();
	push();
	noStroke();
	fill(color(255,30,60,100));
	translate(width/2-(width * zombiesKilled / nextWave)/2, 20);
	rect(0, 0, width * zombiesKilled / nextWave, 20);
	pop();
	push();
	noStroke();
	fill(100);
	translate(width/2, height-50);
	ellipse(0, 0, 80);
	if(currentGadget == 1){
		grenade();
	}
	if(currentGadget == 2){
		bGrenade();
	}
	if(currentGadget == 3){
		healthKit();
	}
	pop();
}