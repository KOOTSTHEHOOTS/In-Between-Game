// ** means any better way

// LAST CARD IN DECK IS TOP CARD


// WRAP INTO MAIN FUNCTION?
// Ascending value - allow for comparison
const numValue = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suitValue = ['Diamonds','Clubs','Hearts','Spades'];

// One player game - hand
var hand = [];

// Initialise deck
var deck = deckInit();

// Shuffle deck
deck = shuffle(deck);

// Money counter
var money;

// Lower card
var lowerCard;

// Higher card
var higherCard;

//Visuals for lower and upper bound
var lowerCardDisplay = document.getElementsByTagName("p")[1];
var higherCardDisplay = document.getElementsByTagName("p")[2];

// Deal button - deals 2 cards to player
var dealButton = document.querySelector("button");
dealButton.addEventListener("click", function(){

    if (hand.length === 2) {
        console.log("Hand has been dealt!")
    }
    else {
        // Deal a cards to player
        while (hand.length < 2){
            deal();
        }
        // Sort cards by number value- lower being index 0
        hand.sort(function(a,b){

            // value of a is smaller than b 
            if (numValue.indexOf(a.value) < numValue.indexOf(b.value)){
                return -1;        
            }
            // value of a is greater than b
            else if (numValue.indexOf(a.value) > numValue.indexOf(b.value)){
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
            console.log(`Card is ${hand[i].value} of ${hand[i].suit}`) 
        }
        // ** Update higher and lower Card 
        lowerCard = hand.slice(0, 1);
        higherCard = hand.slice(1, 2);

        // ** Update display
        lowerCardDisplay.textContent = `${lowerCard[0].value} ${lowerCard[0].suit}`;
        higherCardDisplay.textContent = `${higherCard[0].value} ${higherCard[0].suit}`;
    }
});

// Card object
function card(value, suit) {
	this.value = value;
	this.suit = suit;
}

//Make a set of 52 unique cards
function deckInit(){
	this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Diamonds','Clubs','Hearts','Spades'];
	var cards = [];
    
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.values.length; n++ ) {
            cards.push( new card( this.values[n], this.suits[s] ) );
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

//Deal one card
function deal() {
    // Remove top card and add it to hand
    hand.push(deck.pop());
}