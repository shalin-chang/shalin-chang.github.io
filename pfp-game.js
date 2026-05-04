  // Get the element
const pfp = document.getElementById('pfp');
let isMouseOnPfp = false;
let filterVal = 0;

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
	
	if (ready) {
		clearInterval(mainloop);
	}
}, 1000 / 30);