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

var card1 = new Card(10,"club")
var card2 = new Card(9,"diamond")

function allowDrop2(ev) {
	ev.preventDefault();
}

function drag2(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target);
}

function drop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}