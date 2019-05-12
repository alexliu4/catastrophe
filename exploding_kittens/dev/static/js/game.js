//get canvas
var c = document.getElementById("play_area");

//instantiate conext of canvas
var ctx = c.getContext("2d");

var card = new Image();
card.src = "static/images/placeholder_card.png";

console.log("hi");
ctx.drawImage(card, 100,100,100,100);
console.log("hi");
