//get canvas
var c = document.getElementById("play_area");

var card1 = document.createElementNS("http://www.w3.org/2000/svg", "image");
card1.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "./static/images/placeholder_card.png");
card1.setAttribute("width",200);
card1.setAttribute("height",200);
card1.setAttribute("x", 100);
card1.setAttribute("y", 400);

var card2 = document.createElementNS("http://www.w3.org/2000/svg", "image");
card2.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "./static/images/placeholder_card.png");
card2.setAttribute("width",200);
card2.setAttribute("height",200);
card2.setAttribute("x", 300);
card2.setAttribute("y", 400);

var requestID = 0;

var shift_up = function(e){
    var current = 0;
    var shift = function(){
	c.removeChild(e.target);
	prev = Number(e.target.getAttribute("y"));
	e.target.setAttribute("y", prev-1);
	c.appendChild(e.target);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(shift);
	current += 3;
	if (current > 70){
	    window.cancelAnimationFrame(requestID)
	};
    }
    shift();
};

card1.addEventListener("click", shift_up);
card2.addEventListener("click", shift_up);
c.appendChild(card1);
c.appendChild(card2);
