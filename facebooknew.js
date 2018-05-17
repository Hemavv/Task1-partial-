var modal = document.getElementById('myModal');
var face = document.getElementById("myBtn");
face.onclick = function() {
    modal.style.display = "block";

}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
    /* wind.innerHtml = weather.wind;
    direction.innerHTML = weather.direction; */
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
    lat.innerHTML = weather.lat;
    pressure.innerHTML = weather.pressure;
    main.innerHTML = weather.main;
}


window.onload = function() {
        temp = document.getElementById("temperature");
        loc = document.getElementById("location");
        icon = document.getElementById("icon");
        humidity = document.getElementById("humidity");
        /* wind = document.getElementById("wind");
        direction = document.getElementById("direction"); */
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
            var zip = window.prompt("Could not discover your location. What is your zip code?");
            updateByZip(zip);
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
            /*  weather.wind = data.wind.speed; */
            weather.lat = data.coord.lat;
            weather.pressure = (data.main.pressure);
            weather.main = data.weather[0].main;
            /* NEW */
            /*  weather.direction = degreesToDirection(data.wind.deg); */
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
    var a = document.getElementById("firstname").value;
    var b = document.getElementById("division").value;
    if (a == "") {
        document.getElementById('username').innerHTML = "**Field Empty**";
        document.getElementById('division').innerHTML = "Field Empty";
        return false;

    } else if ((a.length < 8) || (a.length > 26)) {
        document.getElementById('username').innerHTML = "**Name should have min 8 characters and max 26 characters**";
        document.getElementById('firstname').style.borderColor = "red";
        document.getElementById('division').innerHTML = "Min 8 and max 26 characters allowed";
        return false;

    } else if (!isNaN(a)) {
        document.getElementById('username').innerHTML = "**Only characters are allowed**";
        document.getElementById('firstname').style.borderColor = "red";
        document.getElementById('division').innerHTML = "Only characters are allowed in First Name";
        return false;
    } else {
        document.getElementById('username').innerHTML = "";
        document.getElementById('firstname').style.borderColor = "white";
        document.getElementById('division').innerHTML = "";
    }
}
//Validations for LastName//
function checkforlastname() {
    var a = document.getElementById("lastname").value;
    var b = document.getElementById("division1").value;

    if (a == "") {
        document.getElementById('username1').innerHTML = "";

        return false;
    } else if ((a.length < 8) || (a.length > 26)) {
        document.getElementById('username1').innerHTML = "**Name should have min 8 characters and max 26 characters**";
        document.getElementById('division1').innerHTML = "Name should have min 8 characters and max 26 characters";
        document.getElementById('lastname').style.borderColor = "red";
        return false;
    } else if (!isNaN(a)) {
        document.getElementById('username1').innerHTML = "**Only characters are allowed**";
        document.getElementById('division1').innerHTML = "Only characters are allowed";
        document.getElementById('lastname').style.borderColor = "red";
    } else {
        document.getElementById('username1').innerHTML = "";
        document.getElementById('lastname').style.borderColor = "white";
        document.getElementById('division1').innerHTML = "";


    }
}

//Email and Confirm Email Validation//
function confirmmail() {
    var a = document.getElementById("email").value;
    var b = document.getElementById("crosscheck").value;
    var c = document.getElementById("division3").value;

    if (b == "") {
        document.getElementById('con').innerHTML = "";
        document.getElementById('division3').innerHTML = "";


    } else if (a != b) {
        document.getElementById('con').innerHTML = "**Email MisMatch**";
        document.getElementById('crosscheck').style.borderColor = "red";
        document.getElementById('division3').innerHTML = "Email Mismatch";
    } else {
        document.getElementById('con').innerHTML = "";
        document.getElementById('crosscheck').style.borderColor = "white";
        document.getElementById('division3').innerHTML = "";

    }
}
//Email Validation//
function validateemail() {
    var a = document.getElementById("email").value;
    var b = document.getElementById("division2").value;

    if (a == "") {
        document.getElementById('mails').innerHTML = "";
        document.getElementById('division2').innerHTML = "";
    } else if (a.indexOf('@') <= 0) {
        document.getElementById('mails').innerHTML = "**Invalid email id**";
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('division2').innerHTML = "Invalid email id";
    } else if ((a.charAt(a.length - 4) != '.') && (a.charAt(a.length - 3) != '.')) {
        document.getElementById('mails').innerHTML = "**Give Proper format**";
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('division2').innerHTML = "Give Proper Format";
    } else {
        document.getElementById('mails').innerHTML = "";
        document.getElementById('email').style.borderColor = "white";
        document.getElementById('division2').innerHTML = "";
    }
}

function button1() {
    location.reload();
}

function button2(myform) {
    /* console.log('log 1', myform); */
    /* var a = document.forms["myform"].getElementsByTagName("input"); */
    if (document.forms["myform"].getElementsByTagName("input").value) {
        /*  document.getElementById("mydiv").style.display = "none";
         document.getElementById("mydivheader").style.display = "none";
         document.getElementById("closing").style.display = "none";
         var dataToSave = document.getElementById('firstname').value;
         localStorage.setItem("data", dataToSave);
         localStorage.getItem("data");
         var dataToSave = document.getElementById('lastname').value;
         localStorage.setItem("data1", dataToSave);
         localStorage.getItem("data1");
         var dataToSave = document.getElementById('dob').value;
         localStorage.setItem("data2", dataToSave);
         localStorage.getItem("data2");
         var dataToSave = document.getElementById('age').value;
         localStorage.setItem("data3", dataToSave);
         localStorage.getItem("data3");
         var dataToSave = document.getElementById('email').value;
         localStorage.setItem("data3", dataToSave);
         localStorage.getItem("data3");
         var dataToSave = document.getElementById('goal').value;
         localStorage.setItem("data4", dataToSave);
         localStorage.getItem("data4");
         var dataToSave = document.getElementById('hob').value;
         localStorage.setItem("data5", dataToSave);
         localStorage.getItem("data5"); */
        alert("Clicked");

    } else {
        document.getElementById("mydiv").style.display = "block";
    }
}
// if (document.forms["myform"].value == true) {
//     document.getElementById("mydiv").style.display = "block";
// } else {
//     var dataToSave = document.getElementById('firstname').value;
//     localStorage.setItem("data", dataToSave);
//     localStorage.getItem("data");
//     var dataToSave = document.getElementById('lastname').value;
//     localStorage.setItem("data1", dataToSave);
//     localStorage.getItem("data1");
//     var dataToSave = document.getElementById('dob').value;
//     localStorage.setItem("data2", dataToSave);
//     localStorage.getItem("data2");
//     var dataToSave = document.getElementById('age').value;
//     localStorage.setItem("data3", dataToSave);
//     localStorage.getItem("data3");
//     var dataToSave = document.getElementById('email').value;
//     localStorage.setItem("data3", dataToSave);
//     localStorage.getItem("data3");
//     var dataToSave = document.getElementById('goal').value;
//     localStorage.setItem("data4", dataToSave);
//     localStorage.getItem("data4");
//     var dataToSave = document.getElementById('hob').value;
//     localStorage.setItem("data5", dataToSave);
//     localStorage.getItem("data5");
// }

var a = document.getElementById("close");
var b = document.getElementById("mydiv")
a.onclick = function() {
        b.style.display = "none";
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