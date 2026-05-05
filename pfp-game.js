  // Get the element
const pfp = document.getElementById('pfp');
const headerBg = document.getElementById('header');
const headerLinks = document.getElementById('header-links');
let isMouseOnPfp = false;
let isMouseOnHeaderBg = false;
let isMouseOnHeaderLinks = false;
let filterVal = 0;
let angle = 45;
  // Trigger JavaScript when mouse enters
pfp.addEventListener('mouseenter', () => {
	isMouseOnPfp = true;
    console.log('Mouse entered!');
    
});

  // Trigger JavaScript when mouse leaves
pfp.addEventListener('mouseleave', () => {
    console.log('Mouse left!');
	isMouseOnPfp = false;
});

headerBg.addEventListener('mouseenter', () => {
	isMouseOnHeaderBg = true;
    console.log('Mouse entered header!');
    
});

  // Trigger JavaScript when mouse leaves
headerBg.addEventListener('mouseleave', () => {
    console.log('Mouse left header!');
	isMouseOnHeaderBg = false;
});
headerLinks.addEventListener('mouseenter', () => {
	isMouseOnHeaderLinks = true;
    console.log('Mouse entered header link!');
    
});

  // Trigger JavaScript when mouse leaves
headerLinks.addEventListener('mouseleave', () => {
    console.log('Mouse left header link!');
	isMouseOnHeaderLinks = false;
});
  
  
var ready = false;







var mainloop = setInterval(function() {
	
	if (isMouseOnPfp) {
		pfp.style.filter = "hue-rotate(" + filterVal + 'deg)';
		filterVal+= 2;
		if (filterVal == 360) {
			filterVal = 0;
		}
	} else {
		pfp.style.filter = "hue-rotate(" + 0 + 'deg)';
		filterVal = 0;
		
	}
	if (isMouseOnHeaderBg && !isMouseOnPfp && !isMouseOnHeaderLinks) {
		headerBg.style.background = "repeating-linear-gradient(" + angle + "deg,#60bc6d,#60bc6d 20px,#469852 20px,#469852 40px)";

		angle += 2;
		if (angle >= 405) {
			angle = 45;
		}
	} else {
		//headerBg.style.background = "repeating-linear-gradient(" + 45 + "deg,#60bc6d,#60bc6d 20px,#469852 20px,#469852 40px)";
	}
	
	if (ready) {
		clearInterval(mainloop);
	}
}, 1000 / 30);