const suits = ["♠", "♡", "♢", "♣"];
const ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Knave","Queen", "King"];
const deck = [];
function createDeck(){
    for (let i = 0; i < suits.length; i++){
        for (let j = 0; j < ranks.length; j++){
            let card = {
                suit: suits[i],
                rank: ranks[j]
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
    if (rank === "Ace"){
        return "Ace";
    } else if (rank === "Knave"){
        return "Knave";
    } else if (rank === "Queen"){
        return "Queen";
    }
    else if (rank === "King"){
        return "King";
    } else if (rank === "Face Down"){
        return "Face Down";
    }

    const mapRanksToWords = { 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten", };
    return mapRanksToWords[rank];
}
function suitToWord(suit){
    const mapSuitsToWords = { "♠": "Spades", "♡": "Hearts", "♢": "Diamonds", "♣": "Clubs", "": "Mystery", };
    return mapSuitsToWords[suit];
}

function rankToValue(rank){
    if (rank === "Ace"){
        return "11/1";
    } else if (rank === "Knave"){
        return "10";
    } else if (rank === "Face Down"){
        return "?";
    } else {
        return String(rank);
    }
}
// <li class="card" data-blackjack-value="2">King of spades</li>

function dealToDisplay(card){
    const new_card = document.createElement('li');
    new_card.classList.add('mdc-list-item', 'space-between', 'card');
    new_card.setAttribute('data-blackjack-value', rankToValue(card.rank));
    new_card.innerText = `${rankToWord(card.rank)} of ${suitToWord(card.suit)}`;
    new_card.setAttribute('role', 'option');
    new_card.setAttribute('tabindex', '0');
    
    document.querySelector('ol#players-cards-list').appendChild(new_card);

}
const playersActionSection = document.querySelector('#playersActions');
const bettingSection = document.querySelector('#betting');
const bettingForm = document.forms[0];
const bankrollSpan = document.querySelector('#player-bankroll');
const wagerInput = bettingForm[0];
const wagerButton = bettingForm[1];
wagerButton.addEventListener('click', makeWager);

function dealRandomCard(){
    dealToDisplay(getRandomCard());
}

const hit_button = document.getElementById("hit-button");
hit_button.addEventListener("click", function() {
    let randomCard = getRandomCard();
    // console.log(random_card)
    let card_value_str = `did you bust? Your card is ${randomCard.rank} of ${randomCard.suit}.`
    console.log(card_value_str,randomCard);
    dealToDisplay(randomCard);
    
});

let playerBankroll = localStorage.getItem('bankroll') || 2022;

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
let deckId;

function timeToPlay(){
    bettingSection.style.display = 'none';
    playersActionSection.style.display = 'flex';
    drawFourCards(cards => {
        console.log("Cards",cards);
    }
    );
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
    console.log("Called",data);
    deckId = data.deck_id;
    console.log("deckId",deckId);
});

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

