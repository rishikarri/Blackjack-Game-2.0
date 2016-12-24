// -------------------------------------------------
// ------------------GLOBALS------------------------
// -------------------------------------------------

var theDeck = [];
var playersHand = [];
var dealersHand = [];
//start it at two because by the time the user deals, slots 0 and 1 will be taken up
var hitCardLocation = 2;



$(document).ready(function(){
	// start off by disabling the hit and stand button 
	disableButton("hit");
	disableButton("stand");
	//program deal button
	$("#deal-button").click(function(){
		// when user hits deal, we need to create the deck and then shuffle it
		createDeck();
		shuffleDeck();

		//let's give the carcs to the dealer and player in teh following order: player,dealer,player,dealer
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());

		//now that the dealer and player have the correct cards, we have to actually place the cards on the screen
		// 	placeCard("dealer", 5, "10c");
		placeCard("player" ,0, playersHand[0]);
		placeCard("player" ,1, playersHand[1]);
		placeCard("dealer" ,0, dealersHand[0]);
		placeCard("dealer" ,1, dealersHand[1]);


		console.log(playersHand);
		console.log(dealersHand);
		console.log(theDeck);

		// after user deals, enable hit and stand button
		disableButton("deal");
		enableButton("hit");
		enableButton("stand");




	});

	$('#hit-button').click(function(){				
		playersHand.push(theDeck.shift());
		placeCard("player", hitCardLocation, playersHand[hitCardLocation]);
		console.log(theDeck);
		hitCardLocation++;
	})


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

// Takes in dealer or player, cardSlot location, and what type of card and then places the image on teh page
function placeCard(who, cardLocation, whatCard){
	var newHTML = ""; 
	// location to target 
	var placement = $('#'+who+'-hand-container' + ' .card-'+cardLocation);

	placement.html('<img src="Images/cards/'+whatCard+'.png">');	
	console.log('hi');
}

function disableButton(typeOfButton){
	$('#'+typeOfButton+'-button').attr("disabled", "disabled");
}

function enableButton(typeOfButton){
	$('#'+typeOfButton+'-button').removeAttr("disabled");
}

// $(document).ready(function(){
// 	placeCard("dealer", 5, "10c");

// })
