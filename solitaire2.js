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

function buildCard(card,flip) {
    var image = ""
    if(flip) {
        var tempHTML = "<img id='" + card.suite[0] + card.value + "' src='/Card_Asset/Standard_52_Cards/solitaire/individuals/card_back/card_back.png' onclick='flipCard()'>"
        card.innerHTML = tempHTML
    }
    else {
        if(card.visible == false) {
            image = "/Card_Asset/Standard_52_Cards/solitaire/individuals/card_back/card_back.png"
        }
        else {
            image = "/Card_Asset/Standard_52_Cards/solitaire/individuals/" + card.value + "_" + card.suite + ".png"
        }
        var innerHTML = "<img id='" + card.suite[0] + card.value + "' src='" + image + "' draggable='" + card.visible + "' ondragstart='drag(event)'>"
        card.innerHTML = innerHTML
    }
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
var cardInMovement = []
var columnInMovement = -1

function drop(event, position) {
    debugger
    event.preventDefault()
    var dataInDrop = getData()
    if(position == 0) {
        setData([])
        cardInMovement = []
    }
    else if(checkIfCanMove(position)) {
        if(event.target.tagName.toLowerCase() === "img") {
            if(position == 9 || position == 10 || position == 11 || position == 12) {
                var parent = event.target.parentElement
                if(parent.children.length == 0) {
                    parent.appendChild(document.getElementById(dataInDrop[0]))
                }
                else {
                    event.target.parentElement.removeChild(event.target.parentElement.firstElementChild)
                    parent.appendChild(document.getElementById(dataInDrop[0]))
                }
            }
            else {
                for(let i = 0; i < dataInDrop.length; i++) {
                    event.target.parentElement.appendChild(document.getElementById(dataInDrop[i]))
                }
            }
            updateVisibility()
        }
        else {
            if(position == 9 || position == 10 || position == 11 || position == 12) {
                if(event.target.children.length == 0) {
                    event.target.appendChild(document.getElementById(dataInDrop[0]))
                }
                else {
                    event.target.removeChild(event.target.parentElement.firstElementChild)
                    event.target.appendChild(document.getElementById(dataInDrop[0]))
                }
            }
            else {
                for(let i = 0; i < dataInDrop.length; i++) {
                    event.target.appendChild(document.getElementById(dataInDrop[i]))
                }
            }
            updateVisibility()
        }
    }
    else {
        console.log("nuhuh")
    }
    setData([])
    cardInMovement = []
    console.log(cardInMovement)
    checkIfWin()
}

function checkIfWin() {
    var winMessage = "<p id='winMessage'>Congrats you win!!!!!</p>"
    if(comp1.length == 13 && comp2.length == 13 && comp3.length == 13 && comp4.length == 13) {
        document.getElementById("body").children.unshift(winMessage)
    }
}

function allowDrop(event) {
    event.preventDefault()
}

function drag(event) {
    var parent = event.target.parentElement.id
    checkIfAttachedToCards(event)
    checkCard(parent)
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
    else if(parent === "flippedDeck") {
        columnInMovement = 8
    }
    else if(parent === "comp1") {
        columnInMovement = 9
    }
    else if(parent === "comp2") {
        columnInMovement = 10
    }
    else if(parent === "comp3") {
        columnInMovement = 11
    }
    else if(parent === "comp4") {
        columnInMovement = 12
    }
}

function checkCard(parent) {
    if(parent === "div1") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col1[col1.length - (i + 1)])
        }
    }
    else if(parent === "div2") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col2[col2.length - (i + 1)])
        }
    }
    else if(parent === "div3") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col3[col3.length - (i + 1)])
        }
    }
    else if(parent === "div4") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col4[col4.length - (i + 1)])
        }
    }
    else if(parent === "div5") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col5[col5.length - (i + 1)])
        }    
    }
    else if(parent === "div6") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col6[col6.length - (i + 1)])
        }    
    }
    else if(parent === "div7") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(col7[col7.length - (i + 1)])
        }    
    }
    else if(parent === "flippedDeck") {
        cardInMovement.push(flippedCards[0])
    }
    else if(parent === "comp1") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(comp1[comp1.length - (i + 1)])
        }
    }
    else if(parent === "comp2") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(comp2[comp2.length - (i + 1)])
        }
    }
    else if(parent === "comp3") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(comp3[comp3.length - (i + 1)])
        }
    }
    else if(parent === "comp4") {
        for(let i = 0; i < data.length; i++) {
            cardInMovement.push(comp4[comp4.length - (i + 1)])
        }
    }
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
    var tempCardInMovement = [...cardInMovement].reverse()
    if(position == 1) {
        if(col1.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col1.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col1[col1.length - 1].value - 1 && cardInMovement[cardInMovement.length - 1].colour != col1[col1.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col1.push(tempCardInMovement[x])
                }
                canMove = true
            } 
        }
    }
    else if(position == 2) {
        if(col2.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col2.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col2[col2.length - 1].value - 1 && cardInMovement[cardInMovement.length - 1].colour != col2[col2.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col2.push(tempCardInMovement[x])
                }
                canMove = true
            } 
        }
    }
    else if(position == 3) {                               
        if(col3.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col3.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col3[col3.length - 1].value - 1 && cardInMovement[cardInMovement.length - 1].colour != col3[col3.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col3.push(tempCardInMovement[x])
                }
                canMove = true
            } 
        }
    }
    else if(position == 4) {
        if(col4.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col4.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col4[col4.length - 1].value - 1  && cardInMovement[cardInMovement.length - 1].colour != col4[col4.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col4.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }
    else if(position == 5) {
        if(col5.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col5.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col5[col5.length - 1].value - 1 && cardInMovement[cardInMovement.length - 1].colour != col5[col5.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col5.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }
    else if(position == 6) {
        if(col6.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col6.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col6[col6.length - 1].value - 1 && cardInMovement[cardInMovement.length - 1].colour != col6[col6.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col6.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    } 
    else if(position == 7) {
        if(col7.length == 0 && cardInMovement[cardInMovement.length - 1].value == 13) {
            for(x in tempCardInMovement) {
                col7.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == col7[col7.length - 1].value - 1 && cardInMovement[cardInMovement.length - 1].colour != col7[col7.length - 1].colour) {
                for(x in tempCardInMovement) {
                    col7.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }
    else if(position == 9) {
        if(comp1.length == 0 && cardInMovement[0].value == 1) {
            for(x in tempCardInMovement) {
                comp1.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == comp1[comp1.length - 1].value + 1 && cardInMovement[cardInMovement.length - 1].suite === comp1[comp1.length - 1].suite) {
                for(x in tempCardInMovement) {
                    comp1.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }
    else if(position == 10) {
        if(comp2.length == 0 && cardInMovement[0].value == 1) {
            for(x in tempCardInMovement) {
                comp2.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == comp2[comp2.length - 1].value + 1 && cardInMovement[cardInMovement.length - 1].suite === comp2[comp2.length - 1].suite) {
                for(x in tempCardInMovement) {
                    comp2.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }
    else if(position == 11) {
        if(comp3.length == 0 && cardInMovement[0].value == 1) {
            for(x in tempCardInMovement) {
                comp3.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == comp3[comp3.length - 1].value + 1 && cardInMovement[cardInMovement.length - 1].suite === comp3[comp3.length - 1].suite) {
                for(x in tempCardInMovement) {
                    comp3.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }
    else if(position == 12) {
        if(comp4.length == 0 && cardInMovement[0].value == 1) {
            for(x in tempCardInMovement) {
                comp4.push(tempCardInMovement[x])
            }
            canMove = true
        }
        else {
            if(cardInMovement[cardInMovement.length - 1].value == comp4[comp4.length - 1].value + 1 && cardInMovement[cardInMovement.length - 1].suite === comp4[comp4.length - 1].suite) {
                for(x in tempCardInMovement) {
                    comp4.push(tempCardInMovement[x])
                }
                canMove = true
            }
        }
    }

    if(canMove) {
        for(let i = 0; i < cardInMovement.length; i++) {
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
            else if(columnInMovement == 8) {
                flippedCards.shift()
            }
            else if(columnInMovement == 9) {
                comp1.pop()
            }
            else if(columnInMovement == 10) {
                comp2.pop()
            }
            else if(columnInMovement == 11) {
                comp3.pop()
            }
            else if(columnInMovement == 12) {
                comp4.pop()
            }
        }
    }

    return canMove
}

function updateVisibility() {
    // make updateVisibility()
    var columnToUpdate = columnInMovement
    var tempHTML = ""
    if(columnToUpdate == 1) {
        col1[col1.length - 1].visible = true
        for(x in col1) {
            buildCard(col1[x],false)
            tempHTML += col1[x].innerHTML
        }
        document.getElementById("div1").innerHTML = tempHTML
    }
    else if(columnToUpdate == 2) {
        col2[col2.length - 1].visible = true
        for(x in col2) {
            buildCard(col2[x],false) 
            tempHTML += col2[x].innerHTML
        }
        document.getElementById("div2").innerHTML = tempHTML
    }
    else if(columnToUpdate == 3) {
        col3[col3.length - 1].visible = true
        for(x in col3) {
            buildCard(col3[x],false)
            tempHTML += col3[x].innerHTML
        }
        document.getElementById("div3").innerHTML = tempHTML
    }
    else if(columnToUpdate == 4) {
        col4[col4.length - 1].visible = true
        for(x in col4) {
            buildCard(col4[x],false)
            tempHTML += col4[x].innerHTML
        }
        document.getElementById("div4").innerHTML = tempHTML
    }
    else if(columnToUpdate == 5) {
        col5[col5.length - 1].visible = true
        for(x in col5) {
            buildCard(col5[x],false)
            tempHTML += col5[x].innerHTML
        }
        document.getElementById("div5").innerHTML = tempHTML
    }
    else if(columnToUpdate == 6) {
        col6[col6.length - 1].visible = true
        for(x in col6) {
            buildCard(col6[x],false)
            tempHTML += col6[x].innerHTML
        }
        document.getElementById("div6").innerHTML = tempHTML
    }
    else if(columnToUpdate == 7) {
        col7[col7.length - 1].visible = true
        for(x in col7) {
            buildCard(col7[x],false)
            tempHTML += col7[x].innerHTML
        }
        document.getElementById("div7").innerHTML = tempHTML
    }
    else if(columnToUpdate == 8) {
        flippedCards[0].visible = true
        buildCard(flippedCards[0],false)
        tempHTML = flippedCards[0].innerHTML
        document.getElementById("flippedDeck").innerHTML = tempHTML
    }
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

    // Empty HTML of divs

    mixDeck()

    createColumns()

    for(let i = 28; i < deck.length; i++) {
        cardPile.push(deck[i])
    }

    buildCard(cardPile[0],true)

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
                buildCard(col1[x],false)
                colText += col1[x].innerHTML
            }
        }
        else if( i == 2) {
            for(x in col2) {
                buildCard(col2[x],false)
                colText += col2[x].innerHTML
            }
        }
        else if(i == 3) {
            for(x in col3) {
                buildCard(col3[x],false)
                colText += col3[x].innerHTML
            }
        }
        else if(i == 4) {
            for(x in col4) {
                buildCard(col4[x],false)
                colText += col4[x].innerHTML
            }
        }
        else if(i == 5) {
            for(x in col5) {
                buildCard(col5[x],false)
                colText += col5[x].innerHTML
            }
        }
        else if(i == 6) {
            for(x in col6) {
                buildCard(col6[x],false)
                colText += col6[x].innerHTML
            }
        }
        else if(i == 7) {
            for(x in col7) {
                buildCard(col7[x],false)
                colText += col7[x].innerHTML
            }
        }
        column.innerHTML = colText
    }

    document.getElementById("deckToFlip").innerHTML = cardPile[0].innerHTML

}

function flipCard() {
    debugger
    if(cardPile.length == 0) {
        cardPile = flippedCards.reverse()
        flippedCards = []
    }
    var cardOnTop = cardPile[0]
    cardOnTop.visible = true
    buildCard(cardOnTop,false)
    flippedCards.unshift(cardOnTop)
    cardPile.shift()
    if(cardPile.length == 0) {
        document.getElementById("deckToFlip").innerHTML = "<div style='height: 144px; width: 100px;' onclick='flipCard()'></div>"
    }
    else {
        buildCard(cardPile[0],true)
        document.getElementById("deckToFlip").innerHTML = cardPile[0].innerHTML
        document.getElementById("flippedDeck").innerHTML = flippedCards[0].innerHTML
    }
}

function generatePage() {
    
}

function getData() {
    return data
}

function setData(list) {
    data = list
}