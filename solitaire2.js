var deck = []

var col0 = [] // 0
var col1 = [] // 1
var col2 = [] // 2
var col3 = [] // 3
var col4 = [] // 4
var col5 = [] // 5 
var col6 = [] // 6 
var flipCol = [] // 7 
var deckToFlip = [] // 8
var comp1 = [] // 9 
var comp2 = [] // 10 
var comp3 = [] // 11
var comp4 = [] // 12

// ------------------------------------------------

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

// ------------------------------------------------

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

// ------------------------------------------------

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

// Create the 52 card deck once
for(x in suites) {
    for(y in values) {
        deck.push(new Card(values[y],suites[x]))
    }
}

// ------------------------------------------------

function buildCard(carte) {
    var suite = carte.suite
    var value = carte.value
    var position = carte.position

    var imgLink = "Card_Asset/Standard_52_Cards/solitaire/individuals/" + value + "_" + suite + ".png"

    var htmlImage = '<img id="' + position + '" src=' + '"' + imgLink + '" draggable="true" ondragstart="drag(event,' + position + ')">'

    return htmlImage
}

// ------------------------------------------------

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
function showCards() {
    // Affichage
    for(let i = 0; i < 7; i++) {
        var handText = ""
        var divElement = document.getElementById("col" + i)
        if(i == 0) {
            for(x in col0) {
                handText += buildCard(col0[x])
                console.log(buildCard(col0[x]))
            }
        }
        else if(i == 1) {
            for(x in col1) {
                handText += buildCard(col1[x])
            }
        }
        else if(i == 2) {
            for(x in col2) {
                handText += buildCard(col2[x])
            }
        }
        else if(i == 3) {
            for(x in col3) {
                handText += buildCard(col3[x])
            }
        }
        else if(i == 4) {
            for(x in col4) {
                handText += buildCard(col4[x])
            }
        }
        else if(i == 5) {
            for(x in col5) {
                handText += buildCard(col5[x])
            }
        }
        else if(i == 6) {
            for(x in col6) {
                handText += buildCard(col6[x])
            }
        }
        divElement.innerHTML = handText
    }
}


// ------------------------------------------------

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target)
}

function drop(ev) {
	ev.preventDefault();
    console.log("target" + ev.target)
	if(ev.target.tagName.toLowerCase() == "img") {
        console.log("cant drop")
    }
    else {
        var data = ev.dataTransfer.getData("text")
	    ev.target.appendChild(document.getElementById(data));

    }
}

// ------------------------------------------------

function startNewGame() {
    deck = mixdeck(deck)

    createColumns()

    console.log("columns done")

    for(i = 28; i < deck.length; i++) {
        deckToFlip.push(deck[i])
        deck[i].setPosition(7)
    }

    showCards()

    console.log("cards shown")
}