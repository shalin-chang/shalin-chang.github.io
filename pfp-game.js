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
/*
How it works:
mouseenter fires when the mouse pointer enters the element.
mouseleave fires when it leaves.
You can also use mouseover and mouseout, but those bubble through child elements, which may not be desired.
The JavaScript changes the element’s style and text dynamically when hovered.
✅ Tip:
If you want to trigger hover behavior programmatically (without actual mouse movement), you can dispatch events:

Javascript

Copy code
box.dispatchEvent(new Event('mouseenter'));
If you want, I can also show you how to trigger a CSS :hover effect purely from JavaScript without moving the mouse.
Do you want me to include that?

*/
