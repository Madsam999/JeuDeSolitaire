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


function test() {
	var carte = new Card(1,"spade")
	carte.setPosition(1)
	var cardHTML = buildCard(carte)
	document.getElementById("div1").innerHTML = cardHTML
}

function buildCard(carte) {
    var suite = carte.suite
    var value = carte.value
    var position = carte.position

    var imgLink = "Card_Asset/Standard_52_Cards/solitaire/individuals/" + value + "_" + suite + ".png"

    var htmlImage = '<img class="' + position + '" src=' + '"' + imgLink + '" draggable="true" ondragstart="drag(event,' + position + ')">'

    return htmlImage
}








function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.className);
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
		console.log(ev.dataTransfer.getData("text") + " allo")
	    ev.target.appendChild(document.getElementsByClassName(data));

    }
}



