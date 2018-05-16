function checkforfirstname() {
    var a = document.getElementById("firstname").value;
    var x = document.getElementById("mydiv");
    if (a == "") {
        x.style.display = "block";
        document.getElementById('username').innerHTML = "Field Empty in firstname";
        /* x.style.display = "inline-block"; */

    } else if ((a.length < 8) || (a.length > 26)) {
        document.getElementById('username').innerHTML = "Name should have min 8 characters and max 26 characters";

        return false;
    } else if (!isNaN(a)) {
        document.getElementById('username').innerHTML = "Only characters are allowed ";
    } else {
        document.getElementById('username').innerHTML = "";
        /* x.style.display = "none"; */
    }
}
//Validations for LastName//
function checkforlastname() {
    var a = document.getElementById("lastname").value;
    var x = document.getElementById("mydiv");
    if (a == "") {
        document.getElementById('username').innerHTML = "";
        x.style.display = "block";
    } else if ((a.length < 8) || (a.length > 26)) {
        document.getElementById('username').innerHTML = "Name should have min 8 characters and max 26 characters";
        return false;
    } else if (!isNaN(a)) {
        document.getElementById('username').innerHTML = "Only characters are allowed ";
    } else {
        document.getElementById('username').innerHTML = "";
        x.style.display = "none";
    }
}
//Make the DIV element draggagle:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
var closebtns = document.getElementsByClassName("close");
var i;

for (i = 0; i < closebtns.length; i++) {
    closebtns[i].addEventListener("click", function() {
        this.parentElement.style.display = 'none';
    });
}