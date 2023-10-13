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
        if(this.suite == "club" || this.suite == "ace" ) {
            this.colour = 0
        }
        else {
            this.colour = 1
        }
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