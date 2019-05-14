//get canvas
var c = document.getElementById("play_area2");

deck = []
hand = ["../static/images/diffuse.png"]
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

var setup = function(e){
// first four cards
  for(k=0; k<4; k+=1){
    var card = document.createElementNS("http://www.w3.org/2000/svg", "image");
    var drew = draw()
    hand.push(drew)
    card.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href", drew);
    card.setAttribute("width",200);
    card.setAttribute("height",200);
    card.setAttribute("x", 100 + k*200);
    card.setAttribute("y", 400);
    card.setAttribute("position", "down");
    c.appendChild(card);
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
  c.appendChild(card);

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
