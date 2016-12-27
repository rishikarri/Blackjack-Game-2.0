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



		// after user deals, enable hit and stand button
		disableButton("deal");
		enableButton("hit");
		enableButton("stand");




	});

	$('#hit-button').click(function(){				
		playersHand.push(theDeck.shift());
		placeCard("player", hitCardLocation, playersHand[hitCardLocation]);		
		hitCardLocation++;
		var playerTotal = calcTotal(playersHand,"player");
		if (playerTotal > 21){
			//player Lost
			checkWin("player", playerTotal);
		}
	})

	$('#stand-button').click(function(){				
		//player has chosen to stand
		var dealerTotal = calcTotal(dealersHand);
		var dCardLocation = 2; 
		while(dealerTotal < 17){
			dealersHand.push(theDeck.shift());
			placeCard("dealer" , dCardLocation, dealersHand[dCardLocation]);

			dCardLocation++;
			dealerTotal = calcTotal(dealersHand);
			console.log("hi");

		}
		
		checkWin();
	})

	$("#reset-button").click(function(){
		// when player presses reset, enable the deal button, create a new deck and shuffle it
		enableButton("deal");
		createDeck();
		shuffleDeck();
		clearSpeechBubble();
		playersHand = [];
		dealersHand = [];
		//reset hit card location to 2 so that you don't pass the wrong location to the playershand and or dealershand
		hitCardLocation = 2; 

		$(".card").html("");
		console.log(theDeck);		

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
	console.log("whatCard" + whatCard);
	placement.html('<img src="Images/cards/'+whatCard+'.png">');		
}


function disableButton(typeOfButton){
	$('#'+typeOfButton+'-button').attr("disabled", "disabled");
}

function enableButton(typeOfButton){
	$('#'+typeOfButton+'-button').removeAttr("disabled");
}

// returns the total when given a hand

function calcTotal(hand){
	// loop through each card in the hand and calculate calcTotal
	var total = 0; 

	for (let i = 0; i < hand.length; i++){
		var cardValue = Number(hand[i].slice(0, -1));
		//check if faceCard, if so, set it to 10

		if(cardValue > 10){
			cardValue = 10;
		}

		if (cardValue === 1){
			//if it's an ace, make it a 1 or 11 based on whether or not they bust 
			if(total + 11 > 21){
				cardValue = 1;
			}else{
				cardValue = 11;	
			}
		}
		console.log(cardValue);

		total+= cardValue;


	}
	return total;
	
	// $("#speech-bubble").html("you win!");
	
}

function checkWin(){
	var playerTotal = calcTotal(playersHand, "player");
	var dealerTotal = calcTotal(dealersHand, "dealer");

	if (playerTotal > 21){
		$("#speech-bubble").html("BUST - he he he - you lose!");
		dealerSpeak();
		
		

		disableButton("hit");
		disableButton("stand");

	}else if (dealerTotal > 21){
		$("#speech-bubble").html("Dealer Busts - YOU WIN!");
		dealerSpeak();
				
		disableButton("hit");
		disableButton("stand");


	}else if(playerTotal > dealerTotal){
		$("#speech-bubble").html("You win!");
		dealerSpeak();
		disableButton("hit");
		disableButton("stand");
	}else if(playerTotal < dealerTotal){
		$("#speech-bubble").html("You lose!");
		dealerSpeak();
		disableButton("hit");
		disableButton("stand");
	}else{
		//they are equal
		$("#speech-bubble").html("Push! You have the same total as me!");
		dealerSpeak();
		disableButton("hit");
		disableButton("stand");
	}
	
}

// displays the dealer's words and then clears them after four seconds
function dealerSpeak(){


		$("#speech-bubble").css({
			"display": "inline-block"
		})
		$("#speech-bubble-tail").css({
			"display": "inline-block"
		})

		// now that you have told the player they lost, clear the speech bubble after a few seconds

		setTimeout(clearSpeechBubble, 4000);
}
function clearSpeechBubble(){
	//when this function is called it should set speech bubble to none
	$("#speech-bubble").css({
		"display": "none"
	})

	$("#speech-bubble-tail").css({
		"display": "none"
	})
}

// testing section
$(document).ready(function(){
	// placeCard("dealer", 5, "10c");
	// calcTotal(playersHand, "player");

})
