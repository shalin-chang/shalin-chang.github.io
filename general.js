var canvas = document.getElementById('footer-canvas');
var context = canvas.getContext('2d');
const imgRoot = "./images/footer-game/";
var images = [];

var atlas = "";
var atlasName = "atlas"; //change if you ever use more than one atlas
var atlasData = []; //coordinates for stuff in the atlas, but not sprites, which store their own costume data in costumes. (at least for now).




function initAtlas()
{
	atlas = new Image();
	atlas.src = imgRoot + atlasName + ".png";
}

function addImage(name) {
	let temp = new Image();
	temp.src = imgRoot + name + ".png";
	temp.onload = () => {
		let tempArr = [name,temp];
		images.push(tempArr);
	};
}
function loadImages() {
	/*
	for (let i = 0; i < recipes.recipes.length;i++) {
		let temp = new Image();
		temp.src = imgRoot + recipes.recipes[i].name + ".png";
		temp.onload = () => {
			let tempArr = [recipes.recipes[i].name,temp];
			images.push(tempArr);
		};
	}
	*/
	addImage("atlas");
}

function drawImg(name,x,y,width,height,direction) {
	for (let i = 0; i < images.length; i++) {
		if (images[i][0] == name) {
			if (arguments.length == 3) {
				context.drawImage(images[i][1], x, y); 
			} else if (arguments.length == 6) {
				rotateAndPaintImage(context,images[i][0],degToRad(direction),x,y,width,height);
			} else if (arguments.length == 5) {
				context.drawImage(images[i][1], x, y,width,height); 
			}
			return;
		}
	}

	const img = new Image();        
	

	img.src = imgRoot + name + ".png";        
	img.onload = () => {
		if (arguments.length == 3) {
			context.drawImage(img, x, y); 
		} else if (arguments.length == 5) {
			context.drawImage(img, x, y,width,height); 
		}
	};
}

function addAtlas(costumeName,x,y,w,h) {
	if (!atlasData.includes([costumeName,x,y,w,h])) {
		atlasData.push([costumeName,x,y,w,h]);
	}
}

function clearScreen() {
	context.clearRect(0, 0, canvas.width,canvas.height);
}



function drawImgFromAtlas(name,sx,sy,swidth,sheight,dx,dy,dwidth,dheight,flip) {
	
	if (arguments.length == 3) //drawing from local atlasData
	{
		for (let i = 0; i < atlasData.length; i++)
		{
			if (atlasData[i][0] == name)
			{
				context.drawImage(atlas,atlasData[i][1],atlasData[i][2],atlasData[i][3],atlasData[i][4],sx,sy,atlasData[i][3],atlasData[i][4]);
			}
		}
	}
	else
	{
		if (flip) {
			
			image = atlas;
			//context.translate(dx+image.width,dy);
			context.scale(-1,1);
			//context.drawImage(image, sx, sy, swidth, sheight, 0, 0, dwidth, dheight);
			context.drawImage(atlas,sx,sy,swidth,sheight,-dx,dy,dwidth,dheight);
			context.setTransform(1,0,0,1,0,0);
			
			//drawer.flipHorizontally(img,dx,dy);
		} else {
			image = atlas;
			context.drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
		}
	}
	/*
	for (let i = 0; i < atlasData.length; i++) {
		if (atlasData[i][0] == name) {
			if (arguments.length == 3) {
				context.drawImage(atlas, atlasData[i][1], atlasData[i][2]); 
			} else if (arguments.length == 6) {
				rotateAndPaintImage(context,images[i][0],degToRad(direction),x,y,width,height);
			} else if (arguments.length == 5) {
				context.drawImage(images[i][1], x, y,width,height); 
			}
			return;
		}
	}
	*/
}

function degToRad(deg) {
	return deg * Math.PI / 180;
}

function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, -axisX, -axisY );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );
}

class BasicDrawing {
	fillRect = function(tlx,tly,width,height,color, opacity)
	{
		context.fillStyle = color;
		context.fillRect(tlx,tly,width,height);
	}
	
	flipHorizontally = function(img,x,y){
		// move to x + img's width
		context.translate(x+img.width,y);

		// scaleX by -1; this "trick" flips horizontally
		context.scale(-1,1);
		
		// draw the img
		// no need for x,y since we've already translated
		context.drawImage(img,0,0);
		
		// always clean up -- reset transformations to default
		context.setTransform(1,0,0,1,0,0);
	}
	
	fillScreen = function(color) {
		this.fillRect(0,0,canvas.width,canvas.height,color);
	}

}

var drawer = new BasicDrawing();