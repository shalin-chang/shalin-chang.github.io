class Costume {
	//name,sx,sy,width,height;
	constructor(nameIn,x,y,w,h) {
		this.name = nameIn;
		this.sx = x;
		this.sy = y;
		this.width = w;
		this.height = h;
	}
	
}

class AnimationFrame extends Costume
{
	constructor(nameIn,x,y,w,h,framelength) {
		super(nameIn,x,y,w,h);
		this.duration = framelength; //duration measured in frames, for now, at 30fps
		//console.log(this.duration + " from " + framelength);
	}
	
	
	getCostume = function() {
		return new Costume(this.name,this.sx,this.sy,this.width,this.height);
	}
}

class Animation
{
	constructor(animName,frameArray)
	{
		this.frames = frameArray;
		this.name = animName;
	}

	getLength = function()
	{
		return this.frames.length;
	}
}