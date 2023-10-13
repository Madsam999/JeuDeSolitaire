// This is a super simple case of the drag and drop model. I move the card from div 1 to div 2

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

// ---------------------------------------------------------------

class Card {
    constructor(value,suite) {
        this.value = value
        this.suite = suite
        if(this.suite == "club" || this.suite == "spade" ) {
            this.colour = 0
        }
        else {
            this.colour = 1
        }
        this.visible = false
        this.innerHTML = ""
    }
}

var col3 = []
var col4 = []

var card1 = new Card(10,"club")
var card2 = new Card(9,"diamond")

var cardInMovement = -1

col3.push(card1)
col4.push(card2)

function allowDrop2(ev) {
	ev.preventDefault();
}

function drag2(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target);
    checkCard(ev);
}

function drop2(ev,position) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(checkIfCanMove(position)) {
        if(ev.target.tagName.toLowerCase() == "img") {
            var data = ev.dataTransfer.getData("text")
            ev.target.parentElement.appendChild(document.getElementById(data));
        }
        else {
            var data = ev.dataTransfer.getData("text")
            ev.target.appendChild(document.getElementById(data));
        }
    }
    else {
        console.log("nuhuh")
    }
}

function checkCard(event) {
    if(event.target.id == "image2") {
        cardInMovement = col3[0]
    }
    else {
        cardInMovement = col4[0]
    }
}

function checkIfCanMove(position) {
    switch(position) {
        case 3:
            if(cardInMovement.value == col3[0].value - 1 && col3[0].colour != cardInMovement.colour) {
                return true
            }
            else {
                return false
            }
        case 4:
            if(cardInMovement.value == col4[0].value - 1 && col4[0].colour != cardInMovement.colour) {
                return true
            }
            else {
                return false
            }
    }
}

// -----------------------------------------------------------

var col5 = []
var col6 = []

var card1 = new Card(10,"club")
var card2 = new Card(9,"diamond")
var card3 = new Card(11,"diamond")

var cardInMovement2 = -1

col5.push(card3)
col5.push(card1)
col6.push(card2)

var data = []

function allowDrop3(ev) {
	ev.preventDefault();
}

function drag3(ev) {
    var dataInDrag = getData()
    // console.log(ev.target, ev.target.id);
    checkCard2(ev);
    checkIfMultipleCardsInMovement(ev)
}

function drop3(ev,position) {
    var dataIndrop = getData()
    ev.preventDefault();
    if(checkIfCanMove2(position)) {
        if(ev.target.tagName.toLowerCase() == "img") {
            for(let i = 0; i < dataIndrop.length; i++) {
                ev.target.parentElement.appendChild(document.getElementById(dataIndrop[i]));
            }
        }
        else {
            for(let i = 0; i < dataIndrop.length; i++) {
                ev.target.parentElement.appendChild(document.getElementById(dataIndrop[i]));
            }
        }
    }
    else {
        console.log("nuhuh")
    }
}

function checkCard2(event) {
    if(event.target.id == "image4") {
        cardInMovement2 = col5[col5.length - 1]
    }
    else if(event.target.id == "image5") {
        cardInMovement2 = col6[0]
    }
}

function checkIfCanMove2(position) {
    switch(position) {
        case 5:
            if(cardInMovement2.value == col5[col5.length - 1].value - 1 && col5[col5.length - 1].colour != cardInMovement2.colour) {
                return true
            }
            else {
                return false
            }
        case 6:
            if(cardInMovement2.value == col6[col6.length - 1].value - 1 && col6[col6.length - 1].colour != cardInMovement2.colour) {
                return true
            }
            else {
                return false
            }
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

function getData() {
    return data
}

// ------------------------------------------------

var col7 = []
var col8 = []

var data0 = []

var card4 = new Card(9,"spade")
var card5 = new Card(7,"club")
var card6 = new Card(8,"diamond")

col7.push(card4)
col8.push(card5)
col8.push(card6)

var cardInMovement0 = -1
var positionInMovement0 = -1

function buildCard(card) {
    var image = ""
    if(card.visible == false) {
        image = "../Card_Asset/Standard_52_Cards/solitaire/individuals/card_back/card_back.png"
    }
    else {
        image = "../Card_Asset/Standard_52_Cards/solitaire/individuals/" + card.value + "_" + card.suite + ".png"
    }
    var innerHTML = "<img id='image" + card.value + "' src='" + image + "' draggable='" + card.visible + "' ondragstart='drag4(event)'>"
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

function drop4(ev,position) {
    debugger
    var dataInDrop = getData1()
    ev.preventDefault()
    if(checkIfCanMove0(position)) {
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
    cardInMovement0 = -1
}

function allowDrop4(ev) {
    ev.preventDefault()
}

function drag4(ev) {
    var parent = ev.target.parentElement.id
    checkCard0(parent)
    checkIfMultipleCardsInMovement0(ev)
    if(parent === "div7") {
        positionInMovement0 = 7
    }
    else {
        positionInMovement0 = 8
    }
}

// --------------------------------------------------

function checkCard0(position) {
    if(position === "div7") {
        cardInMovement0 = col7[col7.length - 1]
    }
    else {
        cardInMovement0 = col8[col8.length - 1]
    }
}

function checkIfMultipleCardsInMovement0(event) {
    var firstCardId = event.target.id
    var firstCardParent = event.target.parentElement
    var foundCard = false
    for(let i = 0; i < firstCardParent.children.length; i++) {
        if(firstCardId === firstCardParent.children[i].id) {
            foundCard = true
        }

        if(foundCard) {
            data0.push(firstCardParent.children[i].id)
        }
    }
}

function checkIfCanMove0(position) {
    debugger
    switch(position) {
        case 7:
            if(cardInMovement0.value == col7[col7.length - 1].value - 1 && cardInMovement0.colour != col7[col7.length - 1].colour) {
                col7.push(cardInMovement0)
                col8.pop()
                return true
            }
            else {
                return false
            }
        case 8:
            if(cardInMovement0.value == col8[col8.length - 1].value - 1 && cardInMovement0.colour != col8[col8.length - 1].colour) {
                col8.push(cardInMovement0)
                col7.pop()
                return true
            }
            else {
                return false
            }

    }
}

function updateVisibility() {
    var columnToUpdate = positionInMovement0
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

function getData1() {
    return data0
}

function setData(list) {
    data = list
}