// -------------------------------------------------
// ------------------GLOBALS------------------------
// -------------------------------------------------

var theDeck = []

$(document).ready(function(){
	//program deal button
	$("#deal-button").click(function(){
		// when user hits deal, we need to create the deck and then shuffle it
		createDeck();
		shuffleDeck();
	});


})

// when the user drinks a beer - add class lit to sway the table

function createDeck(){
	var suits = ["h", "s", "d", "c"];
	var newDeck = [];

	// use the names of the card to create an array with a bunch of names similar to 1d, 2d, 3d etc.
	for (let s = 0; s < suits.length; s++){
		for(c = 1; c <=13; c++){
			newDeck.push(c+suits[s]);
		}
	}

	// rewrite the top deck to be a fresh deck in order	 1h - 13c
	theDeck = newDeck;
}

function shuffleDeck(){
	for (let i = 0; i < 989; i++){
		var randomNumber1 = Math.floor(Math.random() * theDeck.length); 
		var randomNumber2 = Math.floor(Math.random() * theDeck.length);

		var firstCardToSwitch = theDeck[randomNumber1];
		var secondCardToSwitch = theDeck[randomNumber2];
		var temp  = firstCardToSwitch;//hold the first card because it's about to get overwritten

		
		theDeck[randomNumber2] = firstCardToSwitch;
		theDeck[randomNumber1] = secondCardToSwitch;
	}	
}

function drinkBeer(){
	$("#table-container").addClass("lit");

	// Take away beer from table after they drink it
	$("#beer-section").css({
		"display":"none"
	})

}

