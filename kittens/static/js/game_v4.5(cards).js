//get canvas
var c = document.getElementById("play_area");
var favorButton = document.getElementById("favor")
var shuffleButton = document.getElementById("shuffle")
var drawfrombottomButton = document.getElementById("drawfrombottom")
//tracks turns
var turn_tracker = document.getElementById("turn_tracker")

var game = document.getElementById("gameover")

var deck = [];
var my_hand = [];
var opponent_hand = [];
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

/*
shuffles the given array/deck
*/
var shuffle = function(array){
  var i, j, temp;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
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
Makes the deck (without exploding kitten)
Shuffles the deck
Distributes cards to the players from the shuffled deck
Adds in an exploding kitten
Shuffles the deck with the exploding kitten
*/

var setup = function(){
  make_deck();
  shuffle(deck);

  make_my_hand();
  make_opponent_hand();
  var explode = make_card("explode");
  explode.addEventListener("click", draw);
  deck.push(explode);
  shuffle(deck);

  //adds the hand images to the canvas
  for (i = 0; i < deck.length; i+=1){
    var card = deck[i];
    c.appendChild(card);
  }
  for (i = 0; i < my_hand.length; i+=1){
    var card = my_hand[i];
    c.appendChild(card);
    card = opponent_hand[i];
    c.append(card);
  }
  console.log("Deck:")
  for (i = 0; i < deck.length; i+=1){
    console.log(deck[i].getAttribute("type"));
  }
};

/*
Adds 4 cards from the deck plus one diffuse to player's hand
Adds the hover and place event listeners
Removes the deck event listener
*/
var make_my_hand = function(){
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
    my_hand.push(card);
  };
};

/*
Adds 4 cards from the deck plus one diffuse to opponent's hand
*/
var make_opponent_hand = function(){
  for (i = 0; i < 5; i+=1){
    if (i == 0){
      card = make_card("diffuse");
    }
    else{
      var card = deck.pop();
    }
    card.setAttribute("x", 100 + i*200);
    card.setAttribute("y", 0);
    opponent_hand.push(card);
  };

};

/*
Draw a card
*/
var draw = function(e){
  e.stopPropagation();
  var card = deck.pop();
  card.addEventListener("mouseover", hover);
  card.addEventListener("mouseleave", reset_position);
  card.removeEventListener("click", draw);
  card.addEventListener("click", move_center);

  //console.log(card.getAttribute("type"))
  //card = e.target;
  console.log(card.getAttribute("type"))
  my_hand.push(card);
  var type = card.getAttribute("type");
  card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);
  arrange_cards(my_hand);
};

/*
Rearrange the spacing of the cards every time one is added to the hand
*/
var arrange_cards = function(hand){
  var i;
  for (i = 0; i < hand.length; i+=1){
    var card = hand[i];
    card.setAttribute("x", 100 + i*900/hand.length);
    card.setAttribute("y", 400);
  }
}

/*
Target should lift up when hovered over
*/
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

var move_center = function(e){
  var requestID = 0;
  card = e.target;
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
  place();
  card.removeEventListener("mouseover", hover);
  card.removeEventListener("mouseleave", reset_position);
  card.removeEventListener("click", move_center);

}

// target is player the action is being performed on
var attack = function(target){
}

//var diffuse = function(target){}
var drawfrombottom = function(e){
  // // e.stopPropagation();
  // console.log("draw from bottom")
  // console.log(deck)
  console.log("drew from the bottom now we're here")
  deck.push(deck[0]);
  deck.shift();
  draw(e);
  // console.log(deck)
}

var favor = function(target){
  console.log("before favor")
  console.log(opponent_hand)
  console.log(my_hand)

  opponentlength =  opponent_hand.length
  favor_card = opponent_hand[opponent_hand.length-1]
  opponent_hand.pop(opponent_hand.length-1)
  my_hand.push(favor_card)
  var type = favor_card.getAttribute("type");
  favor_card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", card_images[type]);

  arrange_cards(my_hand)



  console.log("after favor")
  console.log(opponent_hand)
  console.log(my_hand)
}

favorButton.addEventListener('click', function(e){
  favor(e)
})

shuffleButton.addEventListener('click', function(){
  // console.log("Shuffling!")
  // console.log(deck[0].getAttribute("type"))
  shuffle(deck)
  // console.log(deck[0].getAttribute("type"))
})

drawfrombottomButton.addEventListener('click', function(e){
  drawfrombottom(e)
  // draw(e);
})



game.addEventListener('click', function(e){
  console.log("hi")
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(20, 20, 150, 100);
  // c.setAttribute("style", "background-color: red;");
})

var game = function(){
  c.setAttribute("")
}
var main = function() {
  var game_going = true;
  var num_moves = 0;
  var turn = 1;
  var num_deck = deck.length;
  var gauge_val = 0;
  setup();




  if(turn == 1){
    // document.removeEventListener('click', DisableClickOnPage.handler, true);
    // listen to player click & see what is clicked
    document.addEventListener('click', function(e){
      if (1===0) {
        //draw
        console.log("hi");
        console.log(e.target.getAttribute("type"));
        updateGauge(gauge_val + 5) //replace w/ calculated value
      }
      else{
        console.log(e.target.getAttribute("type"));
        var move = e.target.getAttribute("type");
        if (move == 'shuffle') {shuffle(deck);}
        else if (move == 'skip') {turn = 2;}
        else{}

      }
    })
  }


  //opponent turn ===============================================
  if(turn == 2){
    document.addEventListener('click', DisableClickOnPage.handler, true);


    if (opponent_hand.length === 1) {
      draw();
      /*
      [if exploding kitten drawn]
      [ if defuse in card deck]
      [use defuse card]
      [else]
      [game over boo hoo]
      */
      turn = 1;
    }
    if (gauge_val < 20) {
      draw();
      updateGauge(gauge_val + 5);
      turn = 1;
    }
    console.log("opponent has gone.")

  }

}
main();