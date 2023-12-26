const MDCTextField = mdc.textField.MDCTextField;

const textFields = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
    return new MDCTextField(el);
});
const suits = ["♠", "♡", "♢", "♣"];
const ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack","Queen", "King"];
const deck = [];
let deckId;

function createDeck(){
    for (const suit of suits){
        for (const rank of ranks){
            let card = {
                suit: suit,
                rank: rank
            };
            deck.push(card);
        }
    }
    return deck;
}
createDeck();
// function for getting the deck
function getDeck(){
    return deck;
}
// function for getting random card
function getRandomCard(){
    let randomValue = Math.random() * deck.length;
    let randomIndex = Math.floor(randomValue); //  0 - 51
    return deck[randomIndex];
}
function rankToWord(rank){
    if (rank === "Ace" || rank === "ACE"){
        return "Ace";
    } else if (rank === "Jack" || rank === "JACK"){
        return "Jack";
    } else if (rank === "Queen" || rank === "QUEEN"){
        return "Queen";
    } else if (rank === "King" || rank === "KING"){
        return "King";
    } else if (rank === "Face Down" || rank === "FACE DOWN"){
        return "Face Down";
    }

    const mapRanksToWords = { 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", };
    return mapRanksToWords[rank];
}
function suitToWord(suit){
    const mapSuitsToWords = { "♠": "Spades", "♡": "Hearts", "♢": "Diamonds", "♣": "Clubs", "": "Mystery", };
    const mapSuitWordsToWords = { "SPADES": "Spades", "HEARTS": "Hearts", "DIAMONDS": "Diamonds", "CLUBS": "Clubs", "": "Mystery", };
    if(suit in mapSuitsToWords === false){
        return mapSuitWordsToWords[suit];
    }
    return mapSuitsToWords[suit];
}
function rankToValue(rank){
    if (rank === "Ace" || rank === "ACE"){
        return "11/1";
    } else if (rank === "Jack" || rank === "JACK"){
        return "10";
    } else if (rank === "Queen" || rank === "QUEEN"){
        return "10";
    } else if (rank === "King" || rank === "KING"){
        return "10";
    } else if (rank === "Face Down" || rank === "FACE DOWN"){
        return "0";
    } else {
        return String(rank);
    }
}
// <li class="card" data-blackjack-value="2">King of spades</li>
// variables for the game and the DOM
const backOfCardImageSrc =
  "https://previews.123rf.com/images/rlmf/rlmf1512/rlmf151200171/49319432-playing-cards-back.jpg";
const playersCardList = document.querySelector('ol#players-cards-list');
const dealersCardList = document.querySelector('ol#dealers-cards-list');
const playersActionSection = document.querySelector('#playersActions');
const bettingSection = document.querySelector('#betting');
const bettingForm = document.forms[0];
const bankrollSpan = document.querySelector('#player-bankroll');
const wagerInput = bettingForm[0];
const wagerButton = bettingForm[1];
// HIT BUTTON
const hit_button = document.getElementById("hit-button");
const stand_button = document.getElementById("stand-button");
// values for blackjack game
let playersHandValue = 0;
let dealersHandValue = 0;
let didPlayerStand = false;
let playerBankroll = localStorage.getItem('bankroll') || 2022;
// event listener for the buttons
wagerButton.addEventListener('click', makeWager);
stand_button.addEventListener("click", stand );
hit_button.addEventListener("click", onHit);
// observer for the players hand
const playersHandObserver = new MutationObserver(() => countCardsInHand(playersCardList));
const dealersHandObserver = new MutationObserver(() => countCardsInHand(dealersCardList,true));
const observerConfig = { attributes: true, childList: true, characterData: true, subtree: true };
playersHandObserver.observe(playersCardList, observerConfig);
dealersHandObserver.observe(dealersCardList, observerConfig);

function countCardsInHand(cardList, isDealer = false) {
    const cards = cardList.querySelectorAll('li.card'); //cardList.querySelectorAll('li.card');
    let total = 0;
    let aceCounter = 0;
    for (const card of cards){
        let value = card.getAttribute('data-blackjack-value');
        if (value === "?"){
            continue;
        }
        if (value === "11/1" && isDealer === false){
            aceCounter += 1;
        } else if (value === "11/1" && isDealer === true){
            total += 11;
        } else {
            total += Number(value);
        }

    }
    if (aceCounter > 0){
        if (total + 11 + (aceCounter - 1) <= 21){
            total += 11 + (aceCounter - 1);
        } else {
            total += aceCounter;
        }
    }
    isDealer ? dealersHandValue = total : playersHandValue = total;
    

    if (isDealer){
        console.log("dealersHandValue",dealersHandValue);
    }
    if (playersHandValue > 21){
        console.log("player busted", playersHandValue);
        // stand();
    } else{
        console.log("player has", playersHandValue);
    }
    if (dealersHandValue > 21){
        console.log("dealer busted", dealersHandValue);
        // stand();
    } else{
        console.log("dealer has", dealersHandValue);
    }
}

function dealCardToDisplay(card, faceDown = false, isDealer = false) {
    const new_card = document.createElement('li');
    new_card.classList.add('mdc-list-item', 'space-between', 'card');
    new_card.setAttribute('card-image-url', card.image);
    new_card.setAttribute('data-blackjack-suit', card.suit);
    new_card.setAttribute('data-blackjack-rank', card.value);
    if (faceDown){
        new_card.setAttribute('data-blackjack-value', '?');
    }else{
        new_card.setAttribute('data-blackjack-value', rankToValue(card.value));
    }
    new_card.innerText = faceDown === false ? `${rankToWord(card.value)} of ${suitToWord(card.suit)}` : "Face Down";
    new_card.setAttribute('role', 'option');
    new_card.setAttribute('tabindex', '0');
    // adding the image
    const img = document.createElement('img');
    img.src = faceDown === false ? card.image : backOfCardImageSrc;
    img.alt = faceDown === false ? `${rankToWord(card.value)} of ${suitToWord(card.suit)}` : "Face Down";
    img.style.width = "50px";
    img.style.height = "75px";
    img.classList.add('card-image');
    new_card.appendChild(img);
    
    if (isDealer) {
        dealersCardList.appendChild(new_card);
    } else {
        playersCardList.appendChild(new_card);
    }
}

function dealRandomCard(){
    dealCardToDisplay(getRandomCard());
}

function dealOneCard(toPlayer = true){
    if(toPlayer){
        drawOneCard(card => {
            console.log("One Card:",card[0]);
            // addCardToPlayersHand(card[0]);
            dealCardToDisplay(card[0], false, false);
        });
    }
    else{
        drawOneCard(card => {
            console.log("One Card:",card[0]);
            // addCardToDealersHand(card[0]);
            dealCardToDisplay(card[0], false, true);
        });
    }
    
}

function onHit(){
    dealOneCard();
}
function dealersTurn(){
    console.log("dealersTurn");
    dealOneCard(false);
    if(dealersHandValue < 16){
        setTimeout(function() {
            dealersTurn();
        }, 1000);
    }
    else if(dealersHandValue >= 16 && dealersHandValue <= 21){
        if(dealersHandValue > playersHandValue){
            console.log("dealer wins");
        }
        else if(dealersHandValue === playersHandValue){
            console.log("push");
        }
        else{
            console.log("player wins");
        }
    }
}

function stand(){
    console.log("You stand");
    didPlayerStand = true;
    turnFaceDownCards();
    dealersTurn();
    timeToBet();
}
// STAND BUTTON
function getBankroll() {
    return Number(playerBankroll);
}

function setBankroll(newBankroll) {
    // save the playerBankroll to local storage
    localStorage.setItem('bankroll', newBankroll);
    playerBankroll = newBankroll;
}

function makeWager(event){
    event.preventDefault();
    console.log(wagerInput.value);
    timeToPlay();
}
function timeToBet(){
    playersActionSection.style.display = 'none';
    bettingSection.style.display = 'flex';
    bankrollSpan.innerText = `Bankroll: $${getBankroll()}`;
}

function timeToPlay(){
    bettingSection.style.display = 'none';
    playersActionSection.style.display = 'flex';

    drawFourCards(dealFourCards);


}

function getShoe(callback){
    const url = 'https://www.deckofcardsapi.com/api/deck/new/shuffle?deck_count=6';
    fetch(url).then((response) => {
        return response.json();
    }).then((newData) => {
        console.log("getShoe data",newData);
        callback(newData);
    }).catch((error) => {
        console.log("getShoe Error",error)
    });

}

getShoe(data => {
    deckId = data.deck_id;
    console.log("deckId",deckId);
});

function drawOneCard(callback){
    if(deckId === undefined){
        return;
    }
    fetch('https://www.deckofcardsapi.com/api/deck/' + deckId + '/draw?count=1').then((response) => {
        return response.json();
    }).then((newData) => {
        console.log("drawOneCard data",newData);
        callback(newData.cards);
    }).catch((error) => {
        console.log("drawOneCard Error",error)
    });
    
}
function getFourCards(){
    drawFourCards(dealFourCards);
}
function drawFourCards(callback){
    if(deckId === undefined){
        return;
    }
    fetch('https://www.deckofcardsapi.com/api/deck/' + deckId + '/draw?count=4').then((response) => {
        return response.json();
    }).then((newData) => {
        console.log("drawFourCards data",newData);
        callback(newData.cards);
    }).catch((error) => {
        console.log("drawFourCards Error",error)
    });
    
}

function dealFourCards(cards){
    console.log("dealFourCards",cards);
    dealCardToDisplay(cards[0], false, false);
    dealCardToDisplay(cards[2], false, false);
    dealCardToDisplay(cards[1], true, true);
    dealCardToDisplay(cards[3], false, true);

   
}

function removeChildren(domNode) {
    while (domNode.firstChild) {
      domNode.removeChild(domNode.firstChild);
    }
}
function clearCards() {
    removeChildren(dealersCardList);
    removeChildren(playersCardList);
}
function turnFaceDownCards() {
    const faceDownCards = dealersCardList.querySelectorAll('li.card[data-blackjack-value="?"]');
    for (const card of faceDownCards){
        //card.outerHTML = `${rankToWord(card.getAttribute('data-blackjack-rank'))} of ${suitToWord(card.getAttribute('data-blackjack-suit'))}`;
        card.setAttribute('data-blackjack-value', rankToValue(card.getAttribute('data-blackjack-rank')));
        card.querySelector('img').src = card.getAttribute('card-image-url');
        card.querySelector('img').alt = `${rankToWord(card.getAttribute('data-blackjack-rank'))} of ${suitToWord(card.getAttribute('data-blackjack-suit'))}`;
        card.querySelector('img').style.width = "50px";
        card.querySelector('img').style.height = "75px";

    }
}

setTimeout(function() {
    console.log("player timeout");
    stand();
   
}, 5000); 