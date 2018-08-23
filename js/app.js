/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 var decks = document.querySelector('.deck');
 let openedCards = [];
 let isTimeout = false;
 var restart = document.querySelector('.restart');
  window.onload = function(){
      decks.addEventListener('click', function(){
        if(!isTimeout){
            var clicked = event.target;
            if(clicked.classList.contains('card') && openedCards.length < 2){
              if( !clicked.classList.contains('match') && !openedCards.includes(clicked)){   //to match upcoming cards other than already matched
                  openCard(clicked);
                  openedCards.push(clicked);    //adds to array of opened card to restrict only 2 open cards
                  if(openedCards.length == 2){  //checks remaining cards to  match
                    matchCard();
                  }
              }
            }
          }
        });
  }

function openCard(clicked){
  clicked.classList.toggle("open"); //referred from w3schools.com
  clicked.classList.toggle("show");
}

function matchCard(){
  var c1 = openedCards[0];
  var c2 = openedCards[1];
  if(c1.firstElementChild.className === c2.firstElementChild.className){
    c2.classList.toggle('match');
    c1.classList.toggle('match');
  }
  else {
    isTimeout = true; // time out to disappear after 1sec
      setTimeout(function(){
        openCard(c1);
        openCard(c2);
        openedCards=[];
      },1000);
      isTimeout = false;  // No card is clicked until timout is set false!
  }
}

restart.addEventListener('click',function(){
    var cards = document.querySelectorAll('ul.deck li');
    for(i=0;i<cards.length;i++){
      cards[i].className = "card";
    }
    shuffle(Array.from(cards));
});
