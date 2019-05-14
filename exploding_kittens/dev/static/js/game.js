//get canvas
var c = document.getElementById("play_area");

var requestID = 0;
deck = []
cards = {
    "card1": "../static/images/attack.png",
    "card2": "../static/images/drawfrombottom.png",
    "card3": "../static/images/favor.png",
    "card4": "../static/images/reverse.png",
    "card5": "../static/images/shuffle.png",
    "card6": "../static/images/skip.png",
}

for (i = 1; i < 7; i+=1){
    for (j = 0; j < 4; j+=1){
	deck.push(cards["card"+String(i)])
    }
}
console.log(deck)


var draw = function(e){
    var random = Math.floor(Math.random() * deck.length);
    console.log(random); // random index
    drew = deck.splice(random,1)
    // console.log(drew)
    // console.log(deck)
    return drew
}

var shuffle = function(e){
    for (i = 0; i < deck.length; i +=1){
	var random = Math.floor(Math.random() * deck.length);
	temp = deck[i]
	deck[i] = deck [random]
	deck[random] = temp
    }
}

var move = function(e){
    var card = e.target;
    console.log(e);
    var current = 0;
    var shift = function(){
	c.removeChild(card);
	prev = Number(card.getAttribute("y"));
	card.setAttribute("y", prev-2);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(shift);
	if (prev<370){
	    window.cancelAnimationFrame(requestID);
	};
    }

    var x_inc = (500 - Number(card.getAttribute("x")))/15.0;
    var y_inc = (200 - Number(card.getAttribute("y")))/15.0;
    var place = function(){
	c.removeChild(card);
	var prev_y = Number(card.getAttribute("y"));
	var prev_x = Number(card.getAttribute("x"));

	card.setAttribute("y", prev_y + y_inc);
	card.setAttribute("x", prev_x + x_inc);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(place);
	if (prev_y <= 200 ){
	    window.cancelAnimationFrame(requestID);
	};
    }

    position = card.getAttribute("position");
    
    if (position == "down"){
	console.log(position);
	reset_positions()
	shift();
	card.setAttribute("position", "up");
    }
    else if (position == "up"){
	console.log(position);
	place();
	card.setAttribute("position", "placed");
    }

};

var reset_positions = function(){
    for(i=0; i<5; i+=1){
	card = hand[i];
	c.removeChild(card);
	card.setAttribute("x", 100 + i * 200);
	card.setAttribute("y", 400);
	card.setAttribute("position", "down");
	c.appendChild(card);
    }
}


var hand = []
var setup = function(e){
    // first four cards
    for(k=0; k<4; k+=1){
	var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
	var drew = draw()
	card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", drew);
	card.setAttribute("width",200);
	card.setAttribute("height",200);
	card.setAttribute("x", 100 + k*200);
	card.setAttribute("y", 400);
	card.setAttribute("position", "down");
	card.addEventListener("click", move);
	c.appendChild(card);
	hand.push(card)
	console.log("hello")
    };
    // gives everyone a diffuse
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "../static/images/diffuse.png");
    card.setAttribute("width",200);
    card.setAttribute("height",200);
    card.setAttribute("x", 100 + 4*200);
    card.setAttribute("y", 400);
    card.setAttribute("position", "down");
    card.addEventListener("click", move);
    c.appendChild(card);
    hand.push(card)

    // adds the back logo of the deck
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "../static/images/backcard.png");
    card.setAttribute("width",200);
    card.setAttribute("height",200);
    card.setAttribute("x", 0);
    card.setAttribute("y", 100);
    card.setAttribute("position", "down");
    c.appendChild(card);

    deck.push("../static/images/explodingkitten.png") // adds the exploding kitten after everything
    shuffle()
}



setup()

// draw()
// shuffle()
