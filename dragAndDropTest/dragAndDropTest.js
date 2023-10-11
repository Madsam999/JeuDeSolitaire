// This is a super simple case of the drag and drop model. I move the card from div 1 to div 2

function allowDrop1(ev) {
	ev.preventDefault();
}

function drag1(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target);
}

function drop1(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}