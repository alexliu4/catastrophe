//get canvas
var c = document.getElementById("play_area");

var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "./static/images/placeholder_card.png");
card.setAttribute("width",200);
card.setAttribute("height",200);
card.setAttribute("x", 100);
card.setAttribute("y", 400);

var requestID = 0;

var shift_up = function(e){
    var current = 0;
    var shift = function(){
	c.removeChild(e.target);
	prev = Number(card.getAttribute("y"));
	card.setAttribute("y", prev-1);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(shift);
	current += 2;
	if (current > 50){
	    window.cancelAnimationFrame(requestID)
	};
    }
    shift();
};

card.addEventListener("click", shift_up);
c.appendChild(card);
