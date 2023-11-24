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

function dealToDisplay(card){
    let card_value_str = `Your card is ${card.rank} of ${card.suit}.`
    console.log(card_value_str,card);
    // console.log(randomCard);
}

function dealRandomCard(){
    dealToDisplay(getRandomCard());
}


const hit_button = document.getElementById("hit-button");
hit_button.addEventListener("click", function() {
    let randomCard = getRandomCard();
    // console.log(random_card)
    let card_value_str = `did you bust? Your card is ${randomCard.rank} of ${randomCard.suit}.`
    console.log(card_value_str,randomCard);
    // console.log(randomCard);
});