// ** means any better way

// LAST CARD IN DECK IS TOP CARD


// WRAP INTO MAIN FUNCTION?
// Ascending value - allow for comparison
const suitValue = ['Diamonds','Clubs','Hearts','Spades'];

// One player game - hand
var hand = [];

// Initialise deck
var deck = deckInit();

// Shuffle deck
deck = shuffle(deck);

// Money counter
var money = 10;
var moneyDisplay = document.querySelector("span");
var changeSpan = document.querySelectorAll("span")[1];
var betAmount = 1;

// Lower card
var lowerCard;

// Higher card
var higherCard;

// Card Drawn
var drawnCard;

//Visuals for lower and upper bound
var lowerCardDisplay = document.getElementById("lowerCardDisplay");
var higherCardDisplay = document.getElementById("higherCardDisplay");
// Visuals for third card
var drawnCardDisplay = document.getElementById("drawnCardDisplay");

// Visuals stating turnout of hand
var statusDisplay = document.getElementById("statusDisplay");
var status;

//TEST
// var testButton = document.getElementById("test");
// testButton.addEventListener("click", function(){
//     var deck = deckInit();
//     deck = shuffle(deck);
//     var lowerCard;
//     var higherCard;
//     var drawnCard;
//     lowerCardDisplay.textContent = "";
//     higherCardDisplay.textContent = "";


// })


// Deal button - deals 2 cards to player
var dealButton = document.getElementById("dealButton");
dealButton.addEventListener("click", deal);

//Deal one card
function deal() {

    if (hand.length === 2) {
        statusDisplay.textContent = "Hand has been dealt!";
        window.setTimeout(function() {statusDisplay.textContent = ""}, 5000);
    } else {
        // Deal a cards to player
        while (hand.length < 2){
            hand.push(deck.pop());;
        }
        // Sort cards by number value- lower being index 0
        hand.sort(function(a,b){

            // value of a is smaller than b 
            if (a.value < b.value){
                return -1;        
            }
            // value of a is greater than b
            else if (a.value > b.value){
                return 1;        
            }
            // value of a is equal to b - sort by suit - a is higher suit than b
            else if (suitValue.indexOf(a.suit) > suitValue.indexOf(b.suit)){
                return 1;        
            }
            // value of a === b - suit of a < b
            else {
                return -1;
            }

        });
        // Print out hand 
        for (var i = 0; i < 2; i++){
            console.log(`Card is ${hand[i].name} of ${hand[i].suit}`);
        }

        lowerCard = hand[0];
        higherCard = hand[1];

        // ** Update display
        lowerCardDisplay.textContent = `${lowerCard.name} ${lowerCard.suit}`;
        higherCardDisplay.textContent = `${higherCard.name} ${higherCard.suit}`;
        dealButton.style.display = "none";
        drawButton.style.display = "inline";
        passButton.style.display = "inline";
    }
}


// DRAW BUTTON - Draw a third card after clicking deal
var drawButton = document.getElementById("drawButton"); 
drawButton.addEventListener("click", draw);
drawButton.style.display = "none";

function draw() {

    if (drawnCard === undefined){
        drawnCard = deck.pop();

        // Display drawn card
        drawnCardDisplay.textContent= `${drawnCard.name} ${drawnCard.suit}`;

        // Win if between the boundary
        if (drawnCard.value > lowerCard.value && drawnCard.value < higherCard.value) {
            statusDisplay.textContent = "Take your winnings!";
            changeSpan.textContent = `+ $${betAmount}`
        }

        // Lose if outside the boundary
        else if (drawnCard.value < lowerCard.value || drawnCard.value > higherCard.value) {
            statusDisplay.textContent = "Pay up!";
            changeSpan.textContent = `- $${betAmount}`
            money--;
        }

        // On the boundary
        else {
            statusDisplay.textContent = "You pay double!";
            changeSpan.textContent = `- ${betAmount * 2}`
            money -= 2;
        }
        
        window.setTimeout(function(){
            moneyDisplay.textContent = money;
            reset();
        }, 4000);
    }
    else{
        console.log("Third card has been drawn")
    }
}

// PASS BUTTON
var passButton = document.getElementById("passButton"); 
passButton.addEventListener("click", pass);
passButton.style.display = "none";

function pass() {
    statusDisplay.textContent = "You passed!";
    window.setTimeout(reset, 4000);
}

// Card object
function card(value, name, suit) {
    this.value = value;
	this.name = name;
	this.suit = suit;
}

//Make a set of 52 unique cards
function deckInit(){
	this.names = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	this.suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
	var cards = [];
    
    for( var s = 0; s < this.names.length; s++ ) {
        for( var n = 0; n < this.suits.length; n++ ) {
            cards.push( new card( (s+1), this.names[s], this.suits[n]) );
        }
    }

    return cards;
}

//Shuffle deck - Fisher-Yates Shuffle https://bost.ocks.org/mike/shuffle/compare.html https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function reset() {
    hand = [];
    deck = deckInit();
    deck = shuffle(deck);
    lowerCard = null;
    higherCard = null;
    drawnCard = undefined;

    lowerCardDisplay.textContent = "";
    higherCardDisplay.textContent = "";
    drawnCardDisplay.textContent = "";
    statusDisplay.textContent = "";
    changeSpan.textContent = "";

    dealButton.style.display = "inline";
    drawButton.style.display = "none";
    passButton.style.display = "none";
}