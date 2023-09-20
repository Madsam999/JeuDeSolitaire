var deck = []
var deckToFlip = []
var cardsOnTable = []
var col0 = []
var col1 = []
var col2 = []
var col3 = []
var col4 = []
var col5 = []
var col6 = []
var flipCol = []
var comp1 = []
var comp2 = []
var comp3 = []
var comp4 = []

var columnInMovement = -1

class Card {
    constructor(value,suite) {
        this.value = value
        this.suite = suite
        if(suite == "club" || suite == "spade") {
            this.color = 0
        }
        else {
            this.color = 1
        }
        this.visibility = true
    }
    setPosition(position) {
        this.position = position
    }
    setMoving(moving) {
        this.moving = moving
    }
}

const map = new Map([
    ["heart","&heartsuit;"],
    ["diamond","&diamondsuit;"],
    ["spade","&spadesuit;"],
    ["club","&clubsuit;"]
])

const symbolMaps = new Map([
    [1,"A"],
    [2,2],
    [3,3],
    [4,4],
    [5,5],
    [6,6],
    [7,7],
    [8,8],
    [9,9],
    [10,10],
    [11,"J"],
    [12,"Q"],
    [13,"K"]
])

const values = [1,2,3,4,5,6,7,8,9,10,11,12,13]
const suites = ["club","spade","heart","diamond"]

// Mix the 52 card deck
function mixdeck(list) {
    for(i in list) {
         var randomIndex = Math.floor(Math.random()*52)
         var temp = list[randomIndex]
         list[randomIndex] = list[i]
         list[i] = temp
    }
    return list
}

// Create the 52 card deck once
for(x in suites) {
    for(y in values) {
        deck.push(new Card(values[y],suites[x]))
    }
}

// ---------------------------------------------------------

function moveCard(event) {
    var card = event.target
    var cardId = Number(card.id)
    if(cardId == 0){
        col0[0].setMoving(true)
    }
    columnInMovement = cardId
    console.log(columnInMovement)
}


function moveTo(event,cardPosition) {
    var cardNextPosition = cardPosition
    if(cardNextPosition == 1) {
        canMove(1)
    }
}


function canMove(nextPos) {
    if(columnInMovement == 0) {
        var cardInMovement = col0[0]
        cardInMovement.setMoving(false)
        if(nextPos[0].color == cardInMovement.color) {
            console.log("nope big")
        }
        else if(nextPos[0].value <= cardInMovement.value) {
            console.log("nope big")
        }
        else {
            console.log("yessir")
        }
    }
}

// --------------------------------------------------

// Create a new game
function newGame() {

    // This function should mix the deck
    console.log("Its a new game")

    deck = mixdeck(deck)

    createColumns()
    console.log(col3)

    // Filling of the array that contains the cards in the flipping deck
    deckToFlip = []
    for(let i = 28; i<deck.length; i++) {
        deckToFlip.push(deck[i])
    }

    showStartCards()

    var flip = document.getElementById("deck")
    var flipText = buildCard(deckToFlip[0].value,deckToFlip[0].suite,8)
    deckToFlip[0].setPosition(7)
    flip.innerHTML = flipText

    

}

// Function that seperates the cards in the proper columns for the playing area
function createColumns() {
    var card
    for(let i = 0; i < 28; i++) {
        card = deck[i]
        if(i == 0) {
            col0.push(deck[i])
            card.setPosition(0)
        }
        else if(i == 1 || i < 3) {
            col1.push(deck[i])
            card.setPosition(1)
        }
        else if(i == 3 || i < 6) {
            col2.push(deck[i])
            card.setPosition(2)
        }
        else if(i == 6 || i < 10) {
            col3.push(deck[i])
            card.setPosition(3)
        }
        else if(i == 10 || i < 15) {
            col4.push(deck[i])
            card.setPosition(4)
        }
        else if(i == 15 || i < 21) {
            col5.push(deck[i])
            card.setPosition(5)
        }
        else if(i == 21 || i < 28) {
            col6.push(deck[i])
            card.setPosition(6)
        }
    }
}

// Function that shows the cards at the start of the game
function showStartCards() {
    // Affichage
    for(let i = 0; i < 7; i++) {
        var handText = ""
        var divElement = document.getElementById("" + i)
        if(i == 0) {
            for(x in col0) {
                handText += buildCard(col0[x].value,col0[x].suite,col0[x].position)
            }
        }
        else if(i == 1) {
            for(x in col1) {
                handText += buildCard(col1[x].value,col1[x].suite,col1[x].position)
            }
        }
        else if(i == 2) {
            for(x in col2) {
                handText += buildCard(col2[x].value,col2[x].suite,col2[x].position)
            }
        }
        else if(i == 3) {
            for(x in col3) {
                handText += buildCard(col3[x].value,col3[x].suite,col3[x].position)
            }
        }
        else if(i == 4) {
            for(x in col4) {
                handText += buildCard(col4[x].value,col4[x].suite,col4[x].position)
            }
        }
        else if(i == 5) {
            for(x in col5) {
                handText += buildCard(col5[x].value,col5[x].suite,col5[x].position)
            }
        }
        else if(i == 6) {
            for(x in col6) {
                handText += buildCard(col6[x].value,col6[x].suite,col6[x].position)
            }
        }
        divElement.innerHTML = handText
    }
}

// Function that builds the cards from a simple blueprint
function buildCard(value,suite,position) {
    var card = "<div class='playingCards' onclick='moveCard(event)'" + "id='" + position + "'>\
        <span class='value'>" + symbolMaps.get(value) + "</span>\
        <span class='suit " + suite + "'>" + map.get(suite) + "</span>\
     </div>"
    return card
}

// Function that flips a card from the deck on top
function flipCard(event) {
    // Card that gets flipped
    var cardFlipped = event.target
    var nextPosition = document.getElementById("flippedCards")
    var card = buildCard(deckToFlip[0].value,deckToFlip[0].suite,8)
    nextPosition.innerHTML = card
    //Get the next card
    var temp = deckToFlip.shift()
    deckToFlip.push(temp)
    deckToFlip[0].setPosition(7)
    // New Card
    document.getElementById("deck").innerHTML = "<div class='playingCards' onclick='moveCard(event)'" + "id='" + 8 + "'></div>"
}




function showCards() {

}

