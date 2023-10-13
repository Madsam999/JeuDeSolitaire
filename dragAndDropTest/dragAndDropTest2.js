class Card {
    constructor(value,suite) {
        this.value = value
        this.suite = suite
        if(suite === "spade" || suite === "club") {
            this.colour = 0
        }
        else {
            this.colour = 1
        }
        this.visible = false
        this.innerHTML = ""
    }
}

var col7 = []
var col8 = []

var data = []

var card1 = new Card(9,"spade")
var card2 = new Card(7,"club")
var card3 = new Card(8,"diamond")

col7.push(card1)
col8.push(card2)
col8.push(card3)

var cardInMovement = -1
var positionInMovement = -1

function buildCard(card) {
    var image = ""
    if(card.visible == false) {
        image = "../Card_Asset/Standard_52_Cards/solitaire/individuals/card_back/card_back.png"
    }
    else {
        image = "../Card_Asset/Standard_52_Cards/solitaire/individuals/" + card.value + "_" + card.suite + ".png"
    }
    var innerHTML = "<img id='image" + card.value + "' src='" + image + "' draggable='" + card.visible + "' ondragstart='drag(event)'>"
    card.innerHTML = innerHTML
}

// --------------------------------------------------

function start() {
    col7[col7.length - 1].visible = true
    col8[col8.length - 1].visible = true
    buildCard(col7[0])
    buildCard(col8[0])
    buildCard(col8[1])

    document.getElementById("div7").innerHTML = col7[0].innerHTML
    var temp = col8[0].innerHTML + col8[1].innerHTML
    console.log(col8[0].innerHTML)
    document.getElementById("div8").innerHTML = temp
}

// --------------------------------------------------

function drop(ev,position) {
    debugger
    var dataInDrop = getData()
    ev.preventDefault()
    if(checkIfCanMove(position)) {
        if(ev.target.tagName.toLowerCase() == "img") {
            console.log(dataInDrop)
            for(let i = 0; i < dataInDrop.length; i++) {
                ev.target.parentElement.appendChild(document.getElementById(dataInDrop[i]));
            }
            updateVisibility()
        }
        else {
            for(let i = 0; i < dataInDrop.length; i++) {
                ev.target.appendChild(document.getElementById(dataInDrop[i]));
            }
            updateVisibility()
        }
    }
    else {
        console.log("nuhuh")
    }
    setData([])
    cardInMovement = -1
}

function allowDrop(ev) {
    ev.preventDefault()
}

function drag(ev) {
    var parent = ev.target.parentElement.id
    checkCard(parent)
    checkIfMultipleCardsInMovement(ev)
    if(parent === "div7") {
        positionInMovement = 7
    }
    else {
        positionInMovement = 8
    }
}

// --------------------------------------------------

function checkCard(position) {
    if(position === "div7") {
        cardInMovement = col7[col7.length - 1]
    }
    else {
        cardInMovement = col8[col8.length - 1]
    }
}

function checkIfMultipleCardsInMovement(event) {
    var firstCardId = event.target.id
    var firstCardParent = event.target.parentElement
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
    switch(position) {
        case 7:
            if(cardInMovement.value == col7[col7.length - 1].value - 1 && cardInMovement.colour != col7[col7.length - 1].colour) {
                col7.push(cardInMovement)
                col8.pop()
                return true
            }
            else {
                return false
            }
        case 8:
            if(cardInMovement.value == col8[col8.length - 1].value - 1 && cardInMovement.colour != col8[col8.length - 1].colour) {
                col8.push(cardInMovement)
                col7.pop()
                return true
            }
            else {
                return false
            }

    }
}

function updateVisibility() {
    var columnToUpdate = positionInMovement
    if(columnToUpdate == 7) {
        col7[col7.length - 1].visible = true
        var tempInnerHTML = ""
        for(let i = 0; i < col7.length; i++) {
            buildCard(col7[i])
            tempInnerHTML += col7[i].innerHTML
        }
        document.getElementById("div7").innerHTML = tempInnerHTML
    }
    else {
        col8[col8.length - 1].visible = true
        var tempInnerHTML = ""
        for(let i = 0; i < col8.length; i++) {
            buildCard(col8[i])
            tempInnerHTML += col8[i].innerHTML
        }
        document.getElementById("div8").innerHTML = tempInnerHTML
    }
}

// --------------------------------------------------

function getData() {
    return data
}

function setData(list) {
    data = list
}