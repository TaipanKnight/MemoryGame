//constants
SIZE = 52;
SUITS = new Array('Spades', 'Hearts', 'Diamonds', 'Clubs');
CARD_VALUES = new Array('Ace',2,3,4,5,6,7,8,9,10,'Jack','Queen','King')
//variables
//iteration
var i=0;
var n=0;
//array
var cardOrderArr=new Array();
var isFlipped=new Array();
var pairCheck=new Array();
var preloadArray=new Array();
var foundPairFirstCardArr=new Array();
var foundPairSecondCardArr=new Array();
//boolean
var allFlipped=false;
var allPairsFound=false;
var gameWaiting=false;
var gameOn=false;
//number
var counter=0;
var elementsRemaining=0;
var iRnd=0;
var numPairsFound=0;
var seconds=60;
//string
var drawButtonString='';
var drawTableString='';
var resultsString='';
var tempHolder='null';
//no starting value
var cardFace;
var clickedSlot;
var delayedClickedSlot;
var showButtonRef;
var flipButtonRef;
var gameTimer;
var imageRef;
var oldClickedSlot;
var startButtonRef;
var stopButtonRef;
var t; // Timeout for animations

var timerFaceRef;

function preloadImages() {
	for(var i=0; i<SIZE; i++){
		preloadArray[i] = new Image();
		preloadArray[i].src = './images/' + i + '.png'; 
	}
	document.getElementById("gameArea").innerHTML='<img id="cardLoad" />';
	imageRef = document.getElementById('cardLoad');
	for(var i=0; i<SIZE; i++){
		imageRef.src = preloadArray[i].src;
	}
}

function createCardData(){
	cardOrderArr=new Array();
	isFlipped=new Array();
	allPairsFound=false;
	numPairsFound=0;
	pairCheck=new Array();
	foundPairFirstCardArr=new Array();
	foundPairSecondCardArr=new Array();
	for (i=0;i<SIZE;i++){
		cardOrderArr[i]=i;
		isFlipped[i]=0;
	}
}

function shuffleCards() {
	createCardData();
	elementsRemaining = cardOrderArr.length;
	iRnd=0;
	while(elementsRemaining > 1) {
	    iRnd = Math.floor(Math.random()*(elementsRemaining-1));
	    tempHolder = cardOrderArr[iRnd];
	    cardOrderArr[iRnd]=cardOrderArr[elementsRemaining-1];
	    cardOrderArr[elementsRemaining-1] = tempHolder;
	    elementsRemaining--;			
	}
}

function drawTitleArea(){
		document.getElementById("titleArea").innerHTML='<h1>Memory Game: <span id="timerFace" /></h1>'; 
		timerFaceRef=document.getElementById('timerFace');
}
	
function setGameArea() {
	drawTableString="<table align=center>";
		for(i=0;i<SIZE;){
			drawTableString+="<tr>";
			for(n=0;n<13;n++){
				drawTableString+="<td width=86 height=119><img id='cardSlot"+i+"' width=85 onClick='JavaScript:clickedSlot="+i+";integrityCheck();' /></td>";
				i++;
			}
			drawTableString+="</tr>";
		}
	drawTableString+="</table>";
	document.getElementById("gameArea").innerHTML=drawTableString;
	drawTableString='';
}	

function checkButtonFunction() {
	if (document.getElementById('gameButton').innerHTML=="Stop Game" && tempHolder=='g') {
		stopGame();
	} else if (document.getElementById('gameButton').innerHTML=="Start Game" && tempHolder=='g') {
		startGame();
	}
	if (document.getElementById('showButton').innerHTML=="Show Cards" && tempHolder=='s') {
		showAllCards();
	} else if (document.getElementById('showButton').innerHTML=="Flip Cards" && tempHolder=='s') {
		flipNotPair();
	}
	tempHolder='null';
}

function drawButtonArea(){
	document.getElementById("buttonArea").innerHTML='<button id="gameButton" onClick="JavaScript:tempHolder=\'g\';checkButtonFunction();">Start Game</button> '+
	'<button id="showButton" onClick="tempHolder=\'s\';JavaScript:checkButtonFunction();">Show Cards</button>';
}

function integrityCheck(){
	if (!gameWaiting && !allFlipped && isFlipped[clickedSlot]==0 /*&& !timerFaceRef.innerHTML=='Game Over!'*/) flipClicked();
}

function drawAllCards(cardFace){
	if (cardFace=='Front') {
		allFlipped=true;
		document.getElementById('showButton').innerHTML='Flip Cards';
	} else if (cardFace=='Back') {
		allFlipped=false;
		document.getElementById('showButton').innerHTML='Show Cards';
	} else {
		alert('Code Error! - "cardFace" parameter incorrect')
	}
	for(i=0;i<SIZE;i++){
		cardSlot=i;
		drawSingleCard(cardFace,cardSlot);
	}
}

function drawSingleCard(cardFace,cardSlot) {
	imageRef = document.getElementById('cardSlot'+cardSlot);
	if (cardFace=='Front') {
		imageRef.src = preloadArray[cardOrderArr[cardSlot]].src;
	} else if (cardFace=='Back') {
		imageRef.src = "./images/back.gif";
	} else {
		alert('Code Error! - "cardFace" parameter incorrect')
	}
}

function showAllCards(){
	clearTimeout(t);
	counter=0;
	allFlipped=true;
	gameWaiting=true;
	document.getElementById('showButton').innerHTML='Flip Cards';
	document.getElementById('showButton').disabled=true;
	gameWaiting=true;
	showAllCardsSlow();
}

function showAllCardsSlow(){
	imageRef = document.getElementById('cardSlot'+counter%52);
	imageRef.src = preloadArray[cardOrderArr[counter%52]].src;
	counter++;
	t = setTimeout(showAllCardsSlow, 10);
	if (counter==52) {
		clearTimeout(t);
		gameWaiting=false;
		document.getElementById('showButton').disabled=false;
		return;
	}
}

function flipNotPair() {
	clearTimeout(t);
	counter=51;
	allFlipped=false;
	gameWaiting=true;
	document.getElementById('showButton').innerHTML='Show Cards';
	document.getElementById('showButton').disabled=true;
	/* if card is face up, waiting for pair check, cancel pair check and set card 
		to turn face down - optional */
	if (pairCheck.length==1) {
		isFlipped[oldClickedSlot]=0;
		pairCheck=new Array();
	}
	/* end optional section */
	gameWaiting=true;
	flipNotPairSlow();
}

function flipNotPairSlow() {
	imageRef = document.getElementById('cardSlot'+counter%52);
	if (isFlipped[counter%52]!=1) imageRef.src = imageRef.src = "./images/back.gif";
	counter--;
	t = setTimeout(flipNotPairSlow, 10);
	if (counter<0) {
		clearTimeout(t);
		gameWaiting=false;
		document.getElementById('showButton').disabled=false;
		return;
	}
}

function flipClicked() {
	drawSingleCard('Front',clickedSlot);
	if (pairCheck.length==0) {
		pairCheck[0]=cardOrderArr[clickedSlot];
		isFlipped[clickedSlot]=1;
		oldClickedSlot=clickedSlot;
	} else {
		pairCheck[1]=cardOrderArr[clickedSlot];
		if (pairCheck[1]==pairCheck[0]) alert ('Error - Cards are the same! - This means Bug!');
		isFlipped[clickedSlot]=1;
		// Put Largest Card Value First
		if (pairCheck[1]>pairCheck[0]) {
			pairCheck[2]=pairCheck[0];
			pairCheck[0]=pairCheck[1];
			pairCheck[1]=pairCheck[2];
		}
		// Check If Cards Are A Pair
		if (pairCheck[0]-13==pairCheck[1] || pairCheck[0]-26==pairCheck[1] || pairCheck[0]-39==pairCheck[1]) {
			/* store pairs in array -- is there a better way? */
			numPairsFound++;
			foundPairFirstCardArr[foundPairFirstCardArr.length]=pairCheck[0];
			foundPairSecondCardArr[foundPairSecondCardArr.length]=pairCheck[1];
			checkAllPairsFound();
		} else {
			gameWaiting=true;
			isFlipped[clickedSlot]=0;
			isFlipped[oldClickedSlot]=0;
			delayedClickedSlot=clickedSlot;
			setTimeout(cardsNotMatched,450);
		}
		pairCheck=new Array();
	}
}

function checkAllPairsFound() {
	for (i=0;i<isFlipped.length;i++){
		if (isFlipped[i]==0) {
			allPairsFound=false;
			return;
		} else {
			allPairsFound=true;
		}
	}
	if (allPairsFound==true) {
		allFlipped=true;
		document.getElementById('gameButton').disabled=true;
		alert('all pairs found');
		showResults();
		gameOn=false;
		document.getElementById('gameButton').innerHTML='Start Game';
		document.getElementById('gameButton').disabled=false;
	}
}

function cardsNotMatched(){
	drawSingleCard('Back',delayedClickedSlot);
	drawSingleCard('Back',oldClickedSlot);
	gameWaiting=false;
	return;
}

function startGame() {
	gameOn=true;
	seconds=61; // set to 60
	drawAllCards('Back');
	shuffleCards();
	document.getElementById('gameButton').innerHTML='Stop Game';
	document.getElementById('gameButton').disabled=false;
	countdown();
}

function stopGame() {
	gameOn=false;
	clearTimeout(t);
	clearTimeout(gameTimer);
	gameWaiting=false;
	timerFaceRef.innerHTML="Game Over!"
	document.getElementById('gameButton').innerHTML='Start Game';
	document.getElementById('gameButton').disabled=true;
	showResults();
	document.getElementById('gameButton').disabled=false;
	
}

function countdown() {
	if (seconds == 1) {
		clearTimeout(gameTimer);
		stopGame();
		return;
	}
	seconds--;
	timerFaceRef.innerHTML = seconds+' Seconds Remaining';
	gameTimer = setTimeout(countdown, 1000);
} 

function showResults() {
	// sort arrays - Bubble Sort
	var sorted=false;
	for (i=0;i<foundPairFirstCardArr.length-1 && !sorted;i++) {
		sorted=true;
		for (n=0;n<foundPairFirstCardArr.length;n++){
			if (foundPairFirstCardArr[n]%13 > foundPairFirstCardArr[n+1]%13){
				tempHolder=foundPairFirstCardArr[n];
				foundPairFirstCardArr[n]=foundPairFirstCardArr[n+1];
				foundPairFirstCardArr[n+1]=tempHolder;
				tempHolder=foundPairSecondCardArr[n];
				foundPairSecondCardArr[n]=foundPairSecondCardArr[n+1];
				foundPairSecondCardArr[n+1]=tempHolder;
				sorted=false;
			}
		}
	}
	tempHolder='null';
	// Create resultsString -- Can be optimized?
	resultsString='';
	resultsString+='You found '+numPairsFound+' pairs!\n\n';
	for (i=0;i<foundPairFirstCardArr.length;i++){
		resultsString+=CARD_VALUES[foundPairFirstCardArr[i]%13]+' of ';
		if (foundPairFirstCardArr[i]<13) {
			resultsString+=SUITS[0];
		} else if (foundPairFirstCardArr[i]<26) {
			resultsString+=SUITS[1];
		} else if (foundPairFirstCardArr[i]<39) {
			resultsString+=SUITS[2];
		} else {
			resultsString+=SUITS[3];
		}
		resultsString+=' -- ';
		resultsString+=CARD_VALUES[foundPairSecondCardArr[i]%13]+' of ';
		if (foundPairSecondCardArr[i]<13) {
			resultsString+=SUITS[0];
		} else if (foundPairSecondCardArr[i]<26) {
			resultsString+=SUITS[1];
		} else if (foundPairSecondCardArr[i]<39) {
			resultsString+=SUITS[2];
		} else {
			resultsString+=SUITS[3];
		}
		resultsString+='\n';
	}
	alert(resultsString);
	resultsString='';
	return;
}


/* Create Page */
preloadImages();
createCardData();
drawTitleArea();
setGameArea();
drawButtonArea();
//stopButtonRef.disabled=true;

/* Begin Initial Game Options */
/* Comment or Uncomment as needed */
//shuffleCards(); // Only needed if NOT starting game AND want starting cards shuffled
drawAllCards('Back'); // {Alternative: Cards Face Down}
//drawAllCards('Front'); // {Alternative: Cards Face Up}
//startGame(); // Will shuffle cards

/* Still to do
	*follow specification - on track now :)
	*optimize algorithms - pretty good so far!!!
		-check results algorithm
	* Comment Functions to Specification!!!!
	* Fix being able to play after game over
	* fix button disabling 
*/