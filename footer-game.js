const footer = document.getElementById('footer');

var obj = {
	"x":0,
	"y":0
};
const framerate = 30;
const screen = {
	"width":canvas.width,
	"height":canvas.height
};

var player = new Player();
var ready = false;

var globalstatus = "waiting";
//FOLLOWING IS FROM WAXWING GENERAL.JS FILE


//end of drawing stuff

var init = function() {
	initAtlas();
	loadImages();
	obj.x = Math.floor(Math.random() * canvas.width);
	obj.y = Math.floor(Math.random() * canvas.width);
	player = new Player();
	player.moveTo(screen.width / 2,50);
	globalstatus = "game";
	//player.init();
	
};

footer.addEventListener('click', () => {
    console.log('Mouse clicked footer!');
	if (globalstatus == "waiting") {
		init();
	}
	
  });


window.addEventListener("keydown", function(e) {
    if(globalstatus == "game" && ["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

var mainloop = setInterval(function() {
	if (globalstatus == "game") {
		player.process();
		clearScreen();
		text.setFont("whiteText");
		text.print("ARROW KEYS TO MOVE",8,8,false);
		player.draw();
	} else if (globalstatus == "waiting") {
		//clearScreen();
		//text.setFont("whiteText");
		//text.print("CLICK ME",screen.width,screen.height,true);
	}
	
	if (ready) {
		clearInterval(mainloop);
	}
}, 1000 / 30);