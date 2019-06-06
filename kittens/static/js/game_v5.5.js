//get canvas
var c = document.getElementById("play_area");
var favorButton = document.getElementById("favor")
var shuffleButton = document.getElementById("shuffle")

//tracks turns
var turn_tracker = document.getElementById("turn_tracker")

var deck = [];
var deck_length = 0
var card_images = {
    "attack": "../static/images/attack.png",
    "drawfrombottom": "../static/images/drawfrombottom.png",
    "favor": "../static/images/favor.png",
    "shuffle": "../static/images/shuffle.png",
    "skip": "../static/images/skip.png",
    "diffuse": "../static/images/diffuse.png",
    "explode": "../static/images/explodingkitten.png"
};

/*
  Given a card type:
  -creates a card
  -sets image to the back of the card
  -sets height, width, x, y, and card type
*/
var make_card = function(type){
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", "../static/images/backcard.png");
    card.setAttribute("width",180);
    card.setAttribute("height",180);
    card.setAttribute("x", 0);
    card.setAttribute("y", 200);
    card.setAttribute("type", type)
    return card
};

/* shuffles the given array/deck */
var shuffle = function(array){
    var i, j, temp;

    for (i = array.length - 1; i > 0; i -= 1) {
	j = Math.floor(Math.random() * (i + 1))
	temp = array[i]
	array[i] = array[j]
	array[j] = temp
    }
    console.log("erryday i'm shufflin");
};

/*
  -Makes a deck with 4 of each card in types
  -adds an extra diffuse at the end
  -adds the the move_deck_card event listener to each card
*/
var make_deck = function(){
    var types = [
	"attack",
	"drawfrombottom",
	"favor",
	"shuffle",
	"skip"
    ]
    for (i = 0; i < 5; i+=1){
	var type = types[i];
	for (j = 0; j < 4; j+=1){
	    card = make_card(type);
	    card.addEventListener("click", draw);
	    deck.push(card)
	}
    }

    var diffuse = make_card("diffuse");
    diffuse.addEventListener("click", draw);
    deck.push(diffuse);

};

/*
  Adds 4 cards from the deck plus one diffuse to player's hand
  Adds the hover and place event listeners
  Removes the deck event listener
*/
var make_my_hand = function(array){
    for (i = 0; i < 5; i+=1){
	if (i == 0){
	    card = make_card("diffuse");
	}
	else{
	    var card = deck.pop();
	}
	card.setAttribute("x", 100 + i*200);
	card.setAttribute("y", 400);

	var type = card.getAttribute("type");

	card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
	//card.addEventListener("click", move);
	card.addEventListener("mouseover", hover);
	card.addEventListener("mouseleave", reset_position);
	card.removeEventListener("click", draw);
	card.addEventListener("click", move_center);
	array.push(card);
    };
};

/*
  Adds 4 cards from the deck plus one diffuse to opponent's hand
*/
var make_opponent_hand = function(array){
    for (i = 0; i < 5; i+=1){
	if (i == 0){
	    card = make_card("diffuse");
	}
	else{
	    var card = deck.pop();
	}
	card.setAttribute("x", 100 + i*200);
	card.setAttribute("y", 0);
	array.push(card);
    };

};

/* Draw a card */
var draw = function(e){
    var requestID;
    //console.log("draw")
    console.log(currentPlayer);
    e.stopPropagation();
    var card = deck.pop();
    console.log(card)
    card = e.target;
    console.log(card)
    players[currentPlayer].Hand.push(card);
    var type = card.getAttribute("type");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
    check();
    gauge_val += 5;
    updateGauge(gauge_val)

    var move_card = function(){
	c.removeChild(card);
	var prev_y = Number(card.getAttribute("y"));
	var prev_x = Number(card.getAttribute("x"));

	var x_inc = (1000 - prev_x)/50;
	var y_inc = (400 - prev_y)/50;

	card.setAttribute("y", prev_y + y_inc);
	card.setAttribute("x", prev_x + x_inc);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(move_card);
	if (prev_y > 380 ){
	    window.cancelAnimationFrame(requestID);
	    arrange_cards(players[currentPlayer].Hand, 400)
	    nextTurn();
	};

    }
    move_card();
 
    //setTimeout(arrange_cards, 2000, players[currentPlayer].Hand, 400);
    //nextTurn();
    
};
var opp_draw = function() {
    //console.log("opponent draw????");
    var requestID;
    var card = deck.pop()
    console.log(card)
    players[currentPlayer].Hand.push(card)
    var type = card.getAttribute("type");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
    //arrange_cards(opponent_hand);

    check();
    gauge_val += 5;
    updateGauge(gauge_val)

    var get_card = function(){
	c.removeChild(card);
	var prev_y = Number(card.getAttribute("y"));
	var prev_x = Number(card.getAttribute("x"));

	var x_inc = (1000 - prev_x)/50;
	var y_inc = (0 - prev_y)/50;
	//console.log("x inc:" +x_inc.toString() + "; y_inc: " + y_inc.toString());

	card.setAttribute("y", prev_y + y_inc);
	card.setAttribute("x", prev_x + x_inc);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(get_card);
	if (prev_y < 5 ){
	    window.cancelAnimationFrame(requestID);
	    arrange_cards(players[currentPlayer].Hand, 0)
	    //nextTurn();
	};

    }
    get_card();
    
   // arrange_cards(players[currentPlayer].Hand, 0);

}

var drawfrombottom = function(){
    //e.stopPropagation();
    var card = deck.splice(0, 1);
    console.log(card)
    card.addEventListener("mouseover", hover);
    card.addEventListener("mouseleave", reset_position);
    card.removeEventListener("click", draw);
    card.addEventListener("click", move_center);

    //console.log(card.getAttribute("type"))
    //card = e.target;
    console.log(card.getAttribute("type"))
    players[currentPlayer].push(card);
    var type = card.getAttribute("type");
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
    var y;
    if (currentPlayer == 0) {
	y = 400
    }
    if (currentPlayer == 1) {
	y = 0
    }
    check();
    arrange_cards(players[currentPlayer].Hand, y);
    nextTurn();
}

/* Rearrange the spacing of the cards every time one is added to the hand */
var arrange_cards = function(hand, y){
    var i;
    for (i = 0; i < hand.length; i+=1){
	var card = hand[i];
	card.setAttribute("x", 100 + i*900/hand.length);
	card.setAttribute("y", y);
    }
}

/* Target should lift up when hovered over */
var hover = function(e){
    var requestID = 0;
    var card = e.target;
    //console.log(e);
    var current = 0;
    var shift = function(){
	c.removeChild(card);
	prev = Number(card.getAttribute("y"));
	card.setAttribute("y", prev-5);
	c.appendChild(card);
	//cancel before animating in case  clicked multiple times
	window.cancelAnimationFrame(requestID)
	requestID = window.requestAnimationFrame(shift);
	if (prev<370){
	    window.cancelAnimationFrame(requestID);
	};
    }

    shift();
}

var reset_position = function(e){
    var card = e.target;
    card.setAttribute("y", 400);

}

var remove_card = function(hand, type){
    var i;
    for (i = 0; i < hand.length; i+=1){
	if (hand[i].getAttribute("type") == type){
	    hand.splice(i, 1);
	    break;
	}
    }
};

var move_center = function(e){
    
    var requestID = 0;
    var card = e.target;
    var type = card.getAttribute("type");
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
    };
    place();
    card.removeEventListener("mouseover", hover);
    card.removeEventListener("mouseleave", reset_position);
    card.removeEventListener("click", move_center);
    remove_card(players[currentPlayer].Hand, type);

}

//==============================================================================
var currentPlayer = 0;
var players = new Array();
var gauge_val = 0;


var favor = function(){
    console.log("before favor")
    var opp_hand = players[(currentPlayer + 1) % 2].Hand;
    console.log(opp_hand)
    var my_hand = players[currentPlayer].Hand
    console.log(my_hand)

    opponentlength =  opp_hand.length
    favor_card = opp_hand[opp_hand.length-1]
    opp_hand.pop(opp_hand.length-1)
    players[currentPlayer].Hand.push(favor_card)
    var type = favor_card.getAttribute("type");
    favor_card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);

    var y;
    if (currentPlayer == 0) {
	y = 400
    }
    if (currentPlayer == 1) {
	y = 0
    }
    arrange_cards(players[currentPlayer].Hand, y)



    console.log("after favor")
    console.log(opp_hand)
    console.log(my_hand)
}
favorButton.addEventListener('click', function(e){
    favor(e)
})
function createPlayers(num) {
    players = new Array();
    for (var i = 1; i <= num; i++){
	var hand = new Array();
	var player = { Name: 'Player ' + i, ID: i,  Hand: hand };
	players.push(player);
    }
}

/*
  Makes the deck (without exploding kitten)
  Shuffles the deck
  Distributes cards to the players from the shuffled deck
  Adds in an exploding kitten
  Shuffles the deck with the exploding kitten
*/
var init = function() {
    var game_going = true;
    var num_moves = 0;

    var num_deck = deck.length;

    make_deck();
    shuffle(deck);
    createPlayers(2);

    make_my_hand(players[0].Hand);
    make_opponent_hand(players[1].Hand);
    console.log(players)
    var explode = make_card("explode");
    explode.addEventListener("click", draw);
    deck.push(explode);
    shuffle(deck);
    for (i = 0; i < deck.length; i+=1){
	var card = deck[i];
	c.appendChild(card);
    }
    for (j = 0; j < players.length; j += 1) {
	for (i = 0; i < players[j].Hand.length; i+=1){
            var card = players[j].Hand[i];
            c.appendChild(card);
	}
    }

}
init();
var nextTurn = function() {
    currentPlayer += 1;
    currentPlayer = currentPlayer % 2;
    console.log("next turn yall")
    onTurn();
}
var check = function(){
    console.log("check")
    if (players[currentPlayer].Hand.some( card => card.getAttribute("type") === "explode")) {
	if (players[currentPlayer].Hand.some( card => card.getAttribute("type") === "defuse")) {
	    //discard both cards
	    console.log("diffused you loser")
	}
	else {
	    endGame();
	}
	console.log("explosion")
    }
}
var onTurn = function() {
    if (currentPlayer == 0){
	console.log("tryna remove elisteners yafeel")
	document.removeEventListener('click', blockClick, true);
	document.removeEventListener('mouseover', blockMouseOver, true);
	console.log("removed")
	document.addEventListener('click', function(e){
	    //console.log("elisteners removed");
	    var move = e.target.getAttribute("type");
	    console.log(move);

	    if (move == 'shuffle') {shuffle(deck);}
	    else if (move == 'skip') {nextTurn(); }
	    else if (move == 'drawfrombottom'){drawfrombottom();}
	    else if (move == 'favor') {favor()}


	})}

    if (currentPlayer == 1) {
	document.addEventListener('click', blockClick, true);
	document.addEventListener('mouseover', blockMouseOver, true);
	if (gauge_val < 20) {
	    //console.log("gauge little")
	    opp_draw();
	    //console.log("gauge done")
	    nextTurn();
	}
    }

}
onTurn();

var blockClick = function(e) {
    e.stopPropagation();
    console.log('stopped')

}
var blockMouseOver = function(e) {
    e.stopPropagation();
    console.log('stopped')

}


/*

 */
