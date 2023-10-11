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
            if(cardInMovement.value < col3[0].value && col3[0].colour != cardInMovement.colour) {
                return true
            }
            else {
                return false
            }
        case 4:
            if(cardInMovement.value < col4[0].value && col4[0].colour != cardInMovement.colour) {
                return true
            }
            else {
                return false
            }
    }
}

// -----------------------------------------------------------

