//get canvas
var c = document.getElementById("play_area");
/*
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


card1.addEventListener("click", shift_up);
card2.addEventListener("click", shift_up);
c.appendChild(card1);
c.appendChild(card2);
*/
cards = {"card1": "./static/images/placeholder_card.png", "card2": "./static/images/placeholder_card.png"}

var requestID = 0;
var cards = [];

var move = function(e){
    console.log(e);
    var current = 0;
    var shift = function(){
	c.removeChild(e.target);
	prev = Number(e.target.getAttribute("y"));
	e.target.setAttribute("y", prev-2);
	c.appendChild(e.target);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(shift);
	if (prev<370){
	    window.cancelAnimationFrame(requestID);
	};
    }

    var x_inc = 0;
    var y_inc = 0;
    var place = function(){
	c.removeChild(e.target);
	var prev_y = Number(e.target.getAttribute("y"));
	var prev_x = Number(e.target.getAttribute("x"));

	e.target.setAttribute("y", prev_y + y_inc);
	e.target.setAttribute("x", prev_x + x_inc);
	c.appendChild(e.target);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(place);
	if (prev_y < 200 ){
	    window.cancelAnimationFrame(requestID);
	};
    }

    position = e.target.getAttribute("position");
    
    if (position == "down"){
	console.log(position);
	reset_positions()
	shift();
	e.target.setAttribute("position", "up");
    }
    else if (position == "up"){
	console.log(position);
	place();
	e.target.setAttribute("position", "placed");
    }

};


var i;
for(i=0; i<5; i+=1){
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "./static/images/placeholder_card.png");
    card.setAttribute("width",200);
    card.setAttribute("height",200);
    card.setAttribute("x", 100 + i*200);
    card.setAttribute("y", 400);
    card.setAttribute("position", "down");
    card.addEventListener("click", move);
    c.appendChild(card);
    cards[i] = card;
};

var reset_positions = function(){
    for(i=0; i<5; i+=1){
	card = cards[i];
	c.removeChild(card);
	card.setAttribute("x", 100 + i * 200);
	card.setAttribute("y", 400);
	card.setAttribute("position", "down");
	c.appendChild(card);
    }
}
