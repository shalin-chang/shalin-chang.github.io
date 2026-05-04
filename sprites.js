class Sprite { //an assumption this class makes is that all costumes will be the same size. This may backfire eventually...
	x = 0;
	y = 0;
	speed = 0; //increment for x and y velocities
	xv = 0; //real velocity
	yv = 0;
	width = 16;
	height = 16;
	direction = 0;
	size = 1; //scale factor of an object
	show = true;
	currentFrame = 0;
	frameTics = 0;
	flipsHorizontally = false; //if true, moving left sets flip to true
	flip = false;
	costumes = []; //loose costumes- static frames, idle poses, etc. not animations!!
	currentCostume = new Costume("",this.x,this.y,this.width,this.height);
	animationActive = -1;
	canLeaveScreen = false;
	animations = [];
	dead = false;
	hitbox = {"x":0,"y":0,"width":this.width,"height":this.height}; //used so that the player's head can peep in front of walls sometimes
	visible = true;
	solid = false; //if true, MovingSprites can't overlap with it
	condemned = false;
	
	constructor() {
		this.setHitbox(0,0,this.width,this.height);
	}
	
	toString = function() {
		return "position" + this.x + "," + this.y
	};
	
	turnRight = function(degrees) {
		this.direction += degrees;
	};
	
	moveTo = function(newX,newY) {
		this.x = newX;
		this.y = newY;
	};
	
	setSize = function(w,h) {
		this.width = w;
		this.height = h;
	}
	
	setDir = function(newDeg) {
		this.direction = newDeg;
	};
	
	draw = function() {
		if (!this.visible) {
			return;
		}
		//this.flip = (this.xv < 0 && this.flipsHorizontally);
		if (this.animationActive == -1) {
			drawImgFromAtlas(this.currentCostume.name,this.currentCostume.sx,this.currentCostume.sy,this.width,this.height,this.x,this.y,this.width * this.size,this.height * this.size,this.flip);
		} else {
			drawImgFromAtlas(this.currentCostume.name,this.currentCostume.sx,this.currentCostume.sy,this.width,this.height,this.x,this.y,this.width * this.size,this.height * this.size,this.flip);
		}
	};

	
	addCostume = function(name,sx,sy,w,h) {
		
		if (arguments.length == 1) {
			this.costumes.push(name);
			return;
		}
		else if (arguments.length == 3)
		{
			w = this.width;
			h = this.height;
		}
		this.costumes.push(new Costume(name,sx,sy,w,h));
	}
	
	addAnimation = function(name,tlx,tly,width,height,numOfFrames,frameDuration) { //frames are assumed to be left to right, horizontally
		let frames = [];
		for (let i = 0; i < numOfFrames; i++) {
			//onsole.log("frameDuration = " + frameDuration);
			frames.push(new AnimationFrame((name + "_" + i),(tlx + (i * width)),tly,width,height,frameDuration));
		}
		let anim = new Animation(name,frames);
		this.animations.push(anim);
	}
	
	setCurrentCostume = function(name) {
		if (this.animationActive == -1)
		{
			if (name == null) {
				this.currentCostume = this.costumes[0];
			}
			//this.currentCostume.name = name;
			for (let i = 0; i < this.costumes.length; i++) {
				if (name == this.costumes[i].name) {
					this.currentCostume = this.costumes[i];					
					return;
				}
			}
		}
		else
		{
			//let i = this.animationActive;
			//for (let i = 0; i < this.animations.length; i++) {
				//if (name == this.animations[i].name) {
					this.currentCostume = this.animations[this.animationActive].frames[this.currentFrame].getCostume();	
					//console.log("currentCostume: " + this.currentCostume);
					return;
				//}
			//}
		}
	}
	
	setAnimation = function(name) {
		
		for (let i = 0; i < this.animations.length; i++) {
			if (this.animations[i].name == name) {
				this.animationActive = i;	
				this.frameTics = 0;
				this.currentFrame = 0;
				this.setCurrentCostume();
				//console.log("animation set to " + name);
				return;
			}
		}
	}
	
	deleteAllAnimations = function() {
		this.animations = [];
	}
	
	animationProcess = function() {
		
		if (this.animationActive != -1) {
			
			let dur = this.animations[this.animationActive].frames[this.currentFrame].duration;
			
			
			if (this.currentCostume.name.includes("death")) { //dead?
				if (this.currentFrame >= this.animations[this.animationActive].frames.length - 1 && this.frameTics > dur) {
					this.condemned = true;
					this.visible = false;
				}
			}
			
			
			//console.log("frameTics = " + this.frameTics + ", currentFrame = " + this.currentFrame, ", length of animation = " + this.animations[this.animationActive].frames.length);
			if (dur <= this.frameTics) { //if time to go to next frame of animation...
				//this.setCurrentCostume();
				this.currentFrame++;
				this.frameTics = 0; //set tics to 0
				if (this.animations[this.animationActive].frames.length == this.currentFrame) { //if reached end of animation...
					this.currentFrame = 0; //...go back to the beginning
					if (this.currentCostume.name.includes("death")) {
						this.condemned = true;
						
					}
				}
				else {
					//this.currentFrame++;
				}
				this.setCurrentCostume();
			}
			else {
				this.frameTics++;
			}
		}
	}
	
	setHitbox = function(x,y,w,h) {
		this.hitbox.x = x;
		this.hitbox.y = y;
		this.hitbox.width = w;
		this.hitbox.height = h;
	}
	
	tick = function() { //use this.tick() to call this method in any subclasses of Sprite - contains all frame-to-frame processes necessary
		//this.updateHitbox();
		this.animationProcess();
	}
	
	isTouching = function(other) {
		/*
		if (!this.visible || !other.visible) {
			return false;
		}
		*/
		return (
			this.x + this.hitbox.x < other.x + other.hitbox.x + other.hitbox.width &&
			this.x + this.hitbox.x + this.width > other.x + other.hitbox.x &&
			this.y + this.hitbox.y < other.y + other.hitbox.y + other.hitbox.height &&
			this.y + this.hitbox.y + this.hitbox.height > other.y + other.hitbox.y
		);
	}
}

class MovingSprite extends Sprite {
	constructor() {
		super();
		this.hp = 3;
		this.maxhp = 3;
		this.invincible = false;
		this.invisFrameTick = 0;
		this.invisLength = 45; //how many frames you're invincible after taking damage. 45 / 30fps = 1.5 seconds.
	}
	
	// HEALTH CODE //////////////////////////////////////
	setHP = function(hp,max) {
		this.hp = hp;
		this.maxhp = max;
	}
	
	die = function() {
		//this.condemned = true;
		console.log("died in sprites.js");
	}
	
	takeDamage = function(howMuch) {
		if (!this.invincible) {
			this.hp -= howMuch;
			if (this.hp <= 0) {
				//DEAD
				this.die();
				return;
			}
			else {
				this.invincible = true;
				this.invisFrameTick = this.invisLength;
			}
		}
	}
	
	healthProcess = function() {
		if (this.invincible) {
			if (this.invisFrameTick == 0) {
				this.invincible = false;
			} else {
				this.invisFrameTick--;
			}
		}
	}
	
	
	// MOVEMENT CODE ////////////////////////////////////
	moveSteps = function(stepCount) {
		this.x += Math.cos(this.direction);
		this.y += Math.sin(this.direction);
	};
	
	moveSteps = function(degrees) {
		this.direction -= degrees;
	};
	
	moveByVel = function() {
		this.moveTo(this.x + this.xv,this.y + this.yv);
	}
	reverseByVel = function() {
		this.moveTo(this.x - this.xv,this.y - this.yv);
	}

	setVel = function(newXV,newYV) {
		this.xv = newXV;
		this.yv = newYV;
	};
	
	checkBounds = function() {
		if (!this.canLeaveScreen) {
			if (this.x < 0) {
				this.x = 0;
			}
			if (this.x + this.width > canvas.width) {
				this.x = game.window.width - this.width;
			}
			if (this.y < game.window.tly) {
				this.y = game.window.tly;
			}
			if (this.y + this.height > canvas.height) {
				this.y = game.window.bottom - this.height;
			}
		}
	};
	
	touchingEdge = function() {
			if (this.x < 0) {
				return "left";
			}
			if (this.x + this.width > canvas.width) {
				return "right";
			}
			if (this.y < game.window.tly) {
				return "up";
			}
			if (this.y + this.height > canvas.height) {
				return "down";
			}
		return false;
	}
	
	reachedEdge = function() {
		//this.checkBounds();
	}
}


class ObjectHandler {
	constructor()
	{
		
		this.objs = [];
		this.collectedItems = [];
	}
	
	init = function() {
		this.clear();
		this.collectedItems = [];
	}
	
	add = function(obj)
	{
		this.objs.push(obj);
	}
	
	clear = function()
	{
		this.objs = [];
		//
	}
	
	
	process = function()
	{
		for (let i = 0; i < this.objs.length; i++) {
			this.objs[i].process();
			if (this.objs[i].condemned) {
				this.objs.splice(i,1);
			}
			
		}
	}
	
	
	draw = function()
	{
		for (let i = 0; i < this.objs.length; i++) {
			this.objs[i].draw();
		}
	}
}