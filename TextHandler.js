const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class TextHandler {
	constructor() {
		this.fontSize = 1;	
		this.tileHeight = 8; //height in px of the spritesheet tile
		this.tileWidth = 7;
		this.fontInfo = [];
		this.currentFont = "whiteText";
		this.addFont(384,488,"whiteText",7,7);
		this.addFont(384,440,"white4x6",4,6);
		
	}
	
	addFont = function(sx,sy,name,w,h) {
		this.tileWidth = w;
		this.tileHeight = h;
		this.fontInfo.push([name,w,h]);
		for (let i = 0; i < 10; i++) { //numbers
			addAtlas("font_" + name + "_" + i,sx + i * this.tileWidth,sy,this.tileWidth,this.tileHeight);
		}
		for (let i = 1; i < 16; i++) { //letters A-O
			addAtlas("font_" + name + "_" + alphabet[i - 1],sx + i * this.tileWidth,sy + this.tileHeight,this.tileWidth,this.tileHeight);
		}
		for (let i = 0; i < 11; i++) { //letters O-Z
			addAtlas("font_" + name + "_" + alphabet[i + 15],sx + i * this.tileWidth,sy + (this.tileHeight * 2),this.tileWidth,this.tileHeight);
		}
	}
	//font name format in Atlas: font_name_A or font_name_4
	
	setFontSize = function(num) { //num * 8 = height of character block.
		this.fontSize = num;
	}
	
	setFont = function(name) {
		this.currentFont = name;
		for (let i = 0; i < this.fontInfo.length; i++) {
			if (this.fontInfo[i][0] == name) {
				this.tileWidth = this.fontInfo[i][1];
				this.tileHeight = this.fontInfo[i][2];
				return;
			}
		}
		
	}
	
	print = function(string,x,y,centered,font) {
		if (arguments.length > 4) {
			this.setFont(font);
		}
		
		if (centered) {
			x -= Math.floor(string.length / 2) * this.tileWidth * this.fontSize;
		}
		for (let i = 0; i < string.length; i++) {
			drawImgFromAtlas(("font_" + this.currentFont + "_" + string[i].toUpperCase()),x + i * this.tileWidth * this.fontSize,y);
		}
		//console.log("printed" + string);
	}

}

var text = new TextHandler();