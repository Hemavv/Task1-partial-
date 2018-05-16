var modal = document.getElementById('myModal');

var face = document.getElementById("myBtn");


face.onclick = function() {
    modal.style.display = "block";

}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload();
    }
}
var window = document.getElementById("clo");
if (window.onclick) {
    modal.style.display = "none";
}

/* window.onclick = function() {
    location.reload();
} */

//Getting API Key//
var APPID = "9255cdccfab1422f15ed5016615fc92b";
var temp;
var loc;
var icon;
var humidity;
var lat;
var direction;
var wind;
var pressure;
var main;

function update(weather) {
    icon.src = "codes/" + weather.code + ".png"
    humidity.innerHTML = weather.humidity;
    wind.innerHtml = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
    lat.innerHTML = weather.lat;
    pressure.innerHTML = weather.pressure;
    main.innerHTML = weather.main;
}

window.onclick = function() {
        temp = document.getElementById("temperature");
        loc = document.getElementById("location");
        icon = document.getElementById("icon");
        humidity = document.getElementById("humidity");
        wind = document.getElementById("wind");
        direction = document.getElementById("direction");
        lat = document.getElementById("lat");
        pressure = document.getElementById("pressure");

        main = document.getElementById("main");
        /* NEW */
        if (navigator.geolocation) {
            var showPosition = function(position) {
                updateByGeo(position.coords.latitude, position.coords.longitude);
            }
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            /* var zip = window.prompt("Could not discover your location. What is your zip code?");
            updateByZip(zip); */


        }
    }
    /* NEW */

function updateByGeo(lat, lon) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + lat +
        "&lon=" + lon +
        "&APPID=" + APPID;
    sendRequest(url);
}

function updateByZip(zip) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "zip=" + zip +
        "&APPID=" + APPID;
    sendRequest(url);
}


function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.code = data.weather[0].id;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
            weather.lat = data.coord.lat;
            weather.pressure = (data.main.pressure);

            weather.main = data.weather[0].main;
            /* NEW */
            weather.direction = degreesToDirection(data.wind.deg)
            weather.location = data.name;
            /* NEW */
            weather.temp = K2C(data.main.temp);
            update(weather);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function degreesToDirection(degrees) {
    var range = 360 / 16;
    var low = 360 - range / 2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for (i in angles) {
        if (degrees >= low && degrees < high) {
            console.log(angles[i]);
            return angles[i];
            console.log("derp");
        }
        low = (low + range) % 360;
        high = (high + range) % 360;
    }
    return "N";

}

function K2F(k) {
    return Math.round(k * (9 / 5) - 459.67);
}

function K2C(k) {
    return Math.round(k - 273.15);
}
//Validations for FirstName//
function checkforfirstname() {
    /* var see = new Array(); */
    var a = document.getElementById("firstname").value;
    if (a == "") {
        document.getElementById('username').innerHTML = "**Field Empty**";
        return false;

    } else if ((a.length < 8) || (a.length > 26)) {
        document.getElementById('username').innerHTML = "**Name should have min 8 characters and max 26 characters**";
        document.getElementById('firstname').style.borderColor = "red";
        return false;

    } else if (!isNaN(a)) {
        document.getElementById('username').innerHTML = "**Only characters are allowed**";
        document.getElementById('firstname').style.borderColor = "red";
        return false;
    } else {
        document.getElementById('username').innerHTML = "";
        document.getElementById('firstname').style.borderColor = "white";
    }
}
//Validations for LastName//
function checkforlastname() {
    var a = document.getElementById("lastname").value;

    if (a == "") {
        document.getElementById('username1').innerHTML = "";

        return false;
    } else if ((a.length < 8) || (a.length > 26)) {
        document.getElementById('username1').innerHTML = "**Name should have min 8 characters and max 26 characters**";
        document.getElementById('lastname').style.borderColor = "red";
        return false;
    } else if (!isNaN(a)) {
        document.getElementById('username1').innerHTML = "**Only characters are allowed**";
        document.getElementById('lastname').style.borderColor = "red";
    } else {
        document.getElementById('username1').innerHTML = "";
        document.getElementById('lastname').style.borderColor = "white";

    }
}

//Email and Confirm Email Validation//
function confirmmail() {
    var a = document.getElementById("email").value;
    var b = document.getElementById("crosscheck").value;

    if (b == "") {
        document.getElementById('con').innerHTML = "";


    } else if (a != b) {
        document.getElementById('con').innerHTML = "**Email MisMatch**";
        document.getElementById('crosscheck').style.borderColor = "red";

    } else {
        document.getElementById('con').innerHTML = "";
        document.getElementById('crosscheck').style.borderColor = "white";

    }
}
//Email Validation//
function validateemail() {
    var a = document.getElementById("email").value;

    if (a == "") {
        document.getElementById('mails').innerHTML = "";


    } else if (a.indexOf('@') <= 0) {
        document.getElementById('mails').innerHTML = "**Invalid email id**";
        document.getElementById('email').style.borderColor = "red";

    } else if ((a.charAt(a.length - 4) != '.') && (a.charAt(a.length - 3) != '.')) {
        document.getElementById('mails').innerHTML = "**Give Proper format**";
        document.getElementById('email').style.borderColor = "red";

    } else {
        document.getElementById('mails').innerHTML = "";
        document.getElementById('email').style.borderColor = "white";

    }
}

//Make the DIV element draggagle:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
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

/* btn2.onclick = function() {
    document.getElementById("mydiv").style.display = "block";
    
} */
function button1() {

    document.getElementById("mydiv").style.display = "block";

}




/* function f1() {


    alert(document.getElementById('username').innerHTML + '/n' + document.getElementById('username1').innerHTML + '/n' +
        document.getElementById('con').innerHTML + '/n' + document.getElementById('mails').innerHTML);
} */