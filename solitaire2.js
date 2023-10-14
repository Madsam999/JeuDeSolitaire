class Card {
    constructor(value, suite) {
        this.value = value
        this.suite = suite
        this.innerHTML  = ""
        this.visible = false
        if(suite === "club" || suite === "spade") {
            this.colour = 0
        }
        else {
            this.colour = 1
        }
    }
}

const values = [1,2,3,4,5,6,7,8,9,10,11,12,13]
const suites = ["club","spade","diamond","heart"]

var deck = []

for(let i = 0; i < values.length; i++) {
    for(let j = 0; j < suites.length; j++) {
        deck.push(new Card(values[i],suites[j]))
    }
}

// -------------------------------------------------

function buildCard(card) {
    var image = ""
    if(card.visible == false) {
        image = "../Card_Asset/Standard_52_Cards/solitaire/individuals/card_back/card_back.png"
    }
    else {
        image = "../Card_Asset/Standard_52_Cards/solitaire/individuals/" + card.value + "_" + card.suite + ".png"
    }
    var innerHTML = "<img id='" + card.suite[0] + card.value + "' src='" + image + "' draggable='" + card.visible + "' ondragstart='drag(event)'>"
    card.innerHTML = innerHTML
}

function mixDeck() {
    var tmp = 0
    for(let i = 0; i < deck.length; i++) {
        rdm = Math.floor(Math.random() * 52)
        tmp = deck[i]
        deck[i] = deck[rdm]
        deck[rdm] = tmp
    } 
}

// --------------------------------------------------
var data = []
var cardInMovement = -1
var columnInMovement = -1

function drop(event, position) {
    debugger
    event.preventDefault()
    var dataInDrop = getData()
    if(checkIfCanMove(position)) {
        if(event.target.tagName.toLowerCase() === "img") {
            for(let i = 0; i < dataInDrop.length; i++) {
                event.target.parentElement.appendChild(document.getElementById(dataInDrop[i]))
            }
            // updateVisibility()
        }
        else {
            for(let i = 0; i < dataInDrop.length; i++) {
                event.target.appendChild(document.getElementById(dataInDrop[i]))
            }
            // updateVisibility()
        }
    }
    else {
        console.log("nuhuh")
    }
    setData([])
    cardInMovement = -1
}

function allowDrop(event) {
    event.preventDefault()
}

function drag(event) {
    var parent = event.target.parentElement.id
    checkCard(parent)
    checkIfAttachedToCards(event)
    if(parent === "div1") {
        columnInMovement = 1
    }
    else if(parent === "div2") {
        columnInMovement = 2
    }
    else if(parent === "div3") {
        columnInMovement = 3
    }
    else if(parent === "div4") {
        columnInMovement = 4
    }
    else if(parent === "div5") {
        columnInMovement = 5
    }
    else if(parent === "div6") {
        columnInMovement = 6
    }
    else if(parent === "div7") {
        columnInMovement = 7
    }
}

function checkCard(parent) {
    if(parent === "div1") {
        cardInMovement = col1[col1.length - 1]
    }
    else if(parent === "div2") {
        cardInMovement = col2[col2.length - 1]    }
    else if(parent === "div3") {
        cardInMovement = col3[col3.length - 1]    }
    else if(parent === "div4") {
        cardInMovement = col4[col4.length - 1]    }
    else if(parent === "div5") {
        cardInMovement = col5[col5.length - 1]    }
    else if(parent === "div6") {
        cardInMovement = col6[col6.length - 1]    }
    else if(parent === "div7") {
        cardInMovement = col7[col7.length - 1]    }
}

function checkIfAttachedToCards(card) {
    var firstCardId = card.target.id
    var firstCardParent = card.target.parentElement
    var foundCard = false
    for(let i = 0; i < firstCardParent.children.length; i++) {
        if(firstCardId === firstCardParent.children[i].id) {
            foundCard = true
        }
        if(foundCard) {
            data.push(firstCardParent.children[i].id)
        }
    }
}

function checkIfCanMove(position) {
    debugger
    var canMove;
    if(position == 1) {
        if(cardInMovement.value == col1[col1.length - 1].value - 1 && cardInMovement.colour != col1[col1.length - 1].colour) {
            col1.push(cardInMovement)
            canMove = true
        } 
    }
    else if(position == 2) {
        if(cardInMovement.value == col2[col2.length - 1].value - 1 && cardInMovement.colour != col2[col2.length - 1].colour) {
            col2.push(cardInMovement)
            canMove = true
        } 
    }
    else if(position == 3) {                               
        if(cardInMovement.value == col3[col3.length - 1].value - 1 && cardInMovement.colour != col3[col1.length - 1].colour) {
            col3.push(cardInMovement)
            canMove = true
        } 
    }
    else if(position == 4) {
        if(cardInMovement.value == col4[col4.length - 1].value - 1  && cardInMovement.colour != col4[col4.length - 1].colour) {
            col4.push(cardInMovement)
            canMove = true
        } 
    }
    else if(position == 5) {
        if(cardInMovement.value == col5[col5.length - 1].value - 1 && cardInMovement.colour != col5[col5.length - 1].colour) {
            col5.push(cardInMovement)
            canMove = true
        }
    }
    else if(position == 6) {
        if(cardInMovement.value == col6[col6.length - 1].value - 1 && cardInMovement.colour != col6[col6.length - 1].colour) {
            col6.push(cardInMovement)
            canMove = true
        } 
    } 
    else if(position == 7) {
        if(cardInMovement.value == col7[col7.length - 1].value - 1 && cardInMovement.colour != col7[col7.length - 1].colour) {
            col7.push(cardInMovement)
            canMove = true
        } 
    }

    if(columnInMovement == 1) {
        col1.pop()
    }
    else if(columnInMovement == 2) {
        col2.pop()
    }
    else if(columnInMovement == 3) {
        col3.pop()
    }
    else if(columnInMovement == 4) {
        col4.pop()
    }
    else if(columnInMovement == 5) {
        col5.pop()
    }
    else if(columnInMovement == 6) {
        col6.pop()
    }
    else if(columnInMovement == 7) {
        col7.pop()
    }
    return canMove
}

// -----------------------------------------------------

var col1 = []
var col2 = []
var col3 = []
var col4 = []
var col5 = []
var col6 = []
var col7 = []

var comp1 = []
var comp2 = []
var comp3 = []
var comp4 = []

var cardPile = []
var flippedCards = []

// ----------------------------------------------------

function start() {
    mixDeck()

    createColumns()

    for(let i = 28; i < deck.length; i++) {
        flippedCards.push(deck[i])
    }

    showCards()

}

function createColumns() {
    deck[0].visible = true
    deck[2].visible = true
    deck[5].visible = true
    deck[9].visible = true
    deck[14].visible = true
    deck[20].visible = true
    deck[27].visible = true
    for(let i = 0; i < 28; i++) {
        if(i == 0) {
            col1.push(deck[i])
        }
        else if(i == 1 || i < 3) {
            col2.push(deck[i])
        }
        else if(i == 3 || i < 6) {
            col3.push(deck[i])
        }
        else if(i == 6 || i < 10) {
            col4.push(deck[i])
        }
        else if(i == 10 || i < 15) {
            col5.push(deck[i])
        }
        else if(i == 15 || i < 21) {
            col6.push(deck[i])
        }
        else if(i == 21 || i < 28) {
            col7.push(deck[i])
        }
    }
}

function showCards() {
    for(let i = 1; i < 8; i++) {
        var column = document.getElementById("div" + i)
        var colText = ""
        if(i == 1) {
            for(x in col1) {
                buildCard(col1[x])
                colText += col1[x].innerHTML
            }
        }
        else if( i == 2) {
            for(x in col2) {
                buildCard(col2[x])
                colText += col2[x].innerHTML
            }
        }
        else if(i == 3) {
            for(x in col3) {
                buildCard(col3[x])
                colText += col3[x].innerHTML
            }
        }
        else if(i == 4) {
            for(x in col4) {
                buildCard(col4[x])
                colText += col4[x].innerHTML
            }
        }
        else if(i == 5) {
            for(x in col5) {
                buildCard(col5[x])
                colText += col5[x].innerHTML
            }
        }
        else if(i == 6) {
            for(x in col6) {
                buildCard(col6[x])
                colText += col6[x].innerHTML
            }
        }
        else if(i == 7) {
            for(x in col7) {
                buildCard(col7[x])
                colText += col7[x].innerHTML
            }
        }
        column.innerHTML = colText
    }
}

function getData() {
    return data
}

function setData(list) {
    data = list
}