//get canvas
var c = document.getElementById("play_area");

var deck = [];
var my_hand = [];
var opponent_hand = [];

var card_images = {
    "card1": "../static/images/attack.png",
    "card2": "../static/images/drawfrombottom.png",
    "card3": "../static/images/favor.png",
    "card4": "../static/images/reverse.png",
    "card5": "../static/images/shuffle.png",
    "card6": "../static/images/skip.png",
};

var make_card = function(type, image){
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", image);
    card.setAttribute("width",200);
    card.setAttribute("height",200);
    card.setAttribute("x", 0);
    card.setAttribute("y", 100);
    card.setAttribute("position", "down");
    card.setAttribute("type", type)
    //should be added once it becomes part of the hand
    //card.addEventListener("click", move);
    return card
};

var shuffle = function(array){
    var i, j, temp;
    
    for (i = array.length - 1; i > 0; i -= 1) {
	j = Math.floor(Math.random() * (i + 1))
	temp = array[i]
	array[i] = array[j]
	array[j] = temp
    }
};

var make_deck = function(){
    for (i = 1; i < 7; i+=1){
	var type = "card"+String(i);
	var image = card_images[type];
	for (j = 0; j < 4; j+=1){
	    card = make_card(type, image);
	    deck.push(card)
	}
    }

    var diffuse = make_card("diffuse", "../static/images/diffuse.png");
    deck.push(diffuse);
};

var setup = function(){
    make_deck();
    shuffle(deck);
    console.log(deck);
    make_my_hand();
    for (i = 0; i < deck.length; i+=1){
	var card = deck[i];
	c.appendChild(card);
    }
    for (i = 0; i < my_hand.length; i+=1){
	var card = my_hand[i];
	c.appendChild(card);
    }
};

var make_my_hand = function(){
    var diffuse = make_card("diffuse", "../static/images/diffuse.png");
    //diffuse.addEventListener("click", move);
    my_hand.push(diffuse);
    for (i = 0; i < 4; i+=1){
	var card = deck.pop();
	card.setAttribute("x", 300 + i*200);
	card.setAttribute("y", 400);
	card.addEventListener("click", move);
	my_hand.push(card);
    };
};

var move = function(e){
    var requestID = 0;
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

    var place = function(){
	c.removeChild(card);
	var prev_y = Number(card.getAttribute("y"));
	var prev_x = Number(card.getAttribute("x"));

	var x_inc = (500 - prev_x)/10;
	var y_inc = (200 - prev_y)/10;

	card.setAttribute("y", prev_y + y_inc);
	card.setAttribute("x", prev_x + x_inc);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(place);
	if (prev_y < 201 ){
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
	card = my_hand[i];
	c.removeChild(card);
	card.setAttribute("x", 100 + i * 200);
	card.setAttribute("y", 400);
	card.setAttribute("position", "down");
	c.appendChild(card);
    }
}

setup();
