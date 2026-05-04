class Player extends MovingSprite {
	constructor()
	{
		super();
		this.setVel(2,2);
		this.moveTo(100,140);

		this.width = 16;
		this.height = 16;
		this.speed = 2;
		this.size = 1;
		//this.flip = true;
		this.setHP(3,3);
		this.setHitbox(1,8,14,12);
		this.canLeaveScreen = true;
		this.attack = new PlayerAttack(this.x,this.y,this.xv,this.yv);
		this.canAttackAgain = true;
		// ANIMATIONS ///////////////////////////////////////
		this.addCostume("left_walk_0",0,48,16,16);
		this.addCostume("right_walk_0",0,64,16,16);
		this.addCostume("up_walk_0",0,80,16,16);
		this.addCostume("down_walk_0",0,96,16,16);
		this.addAnimation("left_walk",16,48,16,16,4,2);
		this.addAnimation("right_walk",16,64,16,16,4,2);
		this.addAnimation("up_walk",16,80,16,16,4,2);
		this.addAnimation("down_walk",16,96,16,16,4,2);
		/*
		this.addCostume("grass_left_walk_0",64,48,16,16);
		this.addCostume("grass_right_walk_0",64,64,16,16);
		this.addCostume("grass_up_walk_0",64,80,16,16);
		this.addCostume("grass_down_walk_0",64,96,16,16);
		this.addAnimation("grass_left_walk",80,48,16,16,4,2);
		this.addAnimation("grass_right_walk",80,64,16,16,4,2);
		this.addAnimation("grass_up_walk",80,80,16,16,4,2);
		this.addAnimation("grass_down_walk",80,96,16,16,4,2);
		*/
		
		this.setCurrentCostume("right_walk_0");
		this.visible = true;
		this.invisLength = 60;
		this.costumePrefix = "";
		
	}
	/*
	goToSpawnPoint = function (world,level) {
		for (let i = 0; i < spawnPoints.length; i++) {
			if (spawnPoints[i][0] == world && spawnPoints[i][1] == level) {
				this.moveTo(spawnPoints[i][2],spawnPoints[i][3]);
				break;
			}
		}
	}
	*/
	keyInput = function () {
		if (key.z && !this.attack.active && this.canAttackAgain) {
			this.attack.activate(this.currentCostume.name);
			this.canAttackAgain = false;
		}
		if (!key.z) {
			this.canAttackAgain = true;
		}
		//this.speed = 2 + (key.space * 2);
		let oldv = [this.xv,this.yv];
		if (key.up && this.y > 0) {
			this.yv = this.speed * -1;
		}
		else if (key.down && this.y < screen.height - this.height) {
			this.yv = this.speed;
		}
		else {
			this.yv = 0;
		}
		if (key.right && this.x < screen.width - this.width) {
			this.xv = this.speed;
		}
		else if (key.left && this.x > 0) {
			this.xv = this.speed * -1;
		}
		else {
			this.xv = 0;
		}
		
		//this.moveTo(this.x + this.xv,this.y + this.yv);
		this.moveByVel();
		
		let nom = "side_walk";
		if (this.animationActive >= 0) {
			nom = this.animations[this.animationActive].name;
		}
		if (oldv[0] != this.xv || oldv[1] != this.yv) { //if direction has changed
		
			if (this.xv > 0) {
				this.setAnimation(this.costumePrefix + "right_walk");
			} else if (this.xv < 0) {
				this.setAnimation(this.costumePrefix + "left_walk");
			}
			else if (this.yv > 0) {
				this.setAnimation(this.costumePrefix + "down_walk");
			}
			else if (this.yv < 0) {
				this.setAnimation(this.costumePrefix + "up_walk");
			} else {
				this.animationActive = -1;
				this.setCurrentCostume(this.costumePrefix + nom + "_0");
			}
			

		}
		

	}
	
	invisFrames = function() {
		if (this.invincible) {
			if (this.invisFrameTick < 20) {
				this.visible = (this.invisFrameTick % 3 == 0);
			} else {
				this.visible = (this.invisFrameTick % 10 < 5);
			}
		}
		else {
			this.visible = true;
		}
	}
	
	process = function() {
		//console.log("player.process() called");
		this.costumePrefix = "";
		this.tick();
		this.invisFrames();
		this.healthProcess();
		this.keyInput();
		this.checkBounds();
		if (this.attack.active) {
			this.attack.process(this.x,this.y,this.xv,this.yv,this.currentCostume.name);
		}
	}
	
	die = function() {
		game.status = "gameOver";
	}
}

class PlayerAttack extends MovingSprite {
	constructor(x,y,xv,yv) {
		super();
		this.moveTo(x,y);
		this.setVel(xv,yv);
		this.setSize(32,16);
		
		
		this.active = false;
		this.visible = false;
		this.playerCode = "";
		this.addCostume("empty",24,112,8,32);
		this.addAnimation("attack_side",0,144,32,16,8,1);
		this.addAnimation("attack_up",128,160,16,32,8,1);
		this.addAnimation("attack_down",0,160,16,32,8,1);
		this.setAnimation("attack_side");
		
		for (let i = 0; i < 3; i++) {
			this.animations[this.animationActive].frames[i].width = 24;
		}
	}
	
	activate = function(playerName) {

		this.active = true;
		this.visible = true;
		if (playerName.includes("right") || playerName.includes("left")) {
			if (playerName.includes("right")) {
				this.playerCode = "right";
			} else {
				this.playerCode = "left";
			}
			this.setAnimation("attack_side");
			this.setSize(32,16);
			
		} else if (playerName.includes("up"))
		{
			this.playerCode = "up";
			this.setAnimation("attack_up");
			this.setSize(16,32);
		}
		else if (playerName.includes("down")) {
			this.playerCode = "down";
			this.setAnimation("attack_down");
			this.setSize(16,32);
		}
	}
	
	process = function(x,y,xv,yv,playerName) {
		this.moveTo(x,y);
		this.setVel(xv,yv);
		this.tick();
		this.flip = false;
		this.setSize(32,16);

		if (!playerName.includes(this.playerCode)) {
			this.visible = false;
			this.active = false;
		}
		
		if (playerName.includes("right")) 
		{
			this.playerCode = "right";
			this.x += 16;
			if (!this.currentCostume.name.includes("side")) {
				this.setAnimation("attack_side");
			}
			
			if (this.currentFrame < 2) {
				this.setHitbox(2,2,this.width - 20,this.height - 4);
			} else {
				this.setHitbox(2,2,this.width - 4,this.height - 4);
			}
			
		} 
		else if (playerName.includes("left")) 
		{
			this.playerCode = "left";
			this.x -= 0;
			this.flip = true;
			if (!this.currentCostume.name.includes("side")) {
				this.setAnimation("attack_side");
			}
			this.setHitbox(-30,2,this.width - 4,this.height - 4);
		}
		else if (playerName.includes("up"))
		{
			this.playerCode = "up";
			this.y -= 32;
			this.setSize(16,32);
			if (!this.currentCostume.name.includes("up")) {
				this.setAnimation("attack_up");
			}
			this.setHitbox(2,2,this.width - 4,this.height - 4);
		}
		else if (playerName.includes("down"))
		{
			this.playerCode = "down";
			this.y += 8;
			this.setSize(16,32);
			if (!this.currentCostume.name.includes("down")) {
				this.setAnimation("attack_down");
			}
			this.setHitbox(2,2,this.width - 4,this.height - 4);
		}
		

		if (this.currentFrame >= this.animations[this.animationActive].frames.length - 1 && this.frameTics >= 1) {
			this.active = false;
			this.visible = false;
		}
		
		
	}
};