var key = {
	"enter":false,
	"up":false,
	"down":false,
	"right":false,
	"left":false,
	"space":false,
	"z":false
};

document.body.onkeydown = function(e) {
		if (e.keyCode == 13) {
		key.enter = true;
		//enter();
	}
	if (e.keyCode == 37) {
		key.left = true;
		//moveleft();
	}
	if (e.keyCode == 38) {
		key.up = true;
		//moveup();
	}
	if (e.keyCode == 39) {
		key.right = true;
		//moveright();
	}
	if (e.keyCode == 40) {
		key.down = true;
		//movedown();
	}
	if (e.keyCode == 32) {
		key.space = true;
	}
	if (e.keyCode == 90) {
		key.z = true;
	}
}

document.body.onkeyup = function(e) {
	if (e.keyCode == 13) {
		key.enter = false;
	}	
	if (e.keyCode == 37) {
		key.left = false;
	}
	if (e.keyCode == 38) {
		key.up = false;
	}
	if (e.keyCode == 39) {
		key.right = false;
	}
	if (e.keyCode == 40) {
		key.down = false;
	}
	if (e.keyCode == 32) {
		key.space = false;
	}	
	if (e.keyCode == 90) {
		key.z = false;
	}
}