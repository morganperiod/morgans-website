// Retrieve
const key1_unlockStatus = localStorage.getItem("key1");
if (key1_unlockStatus == "true") {
    document.getElementById("key_container_1").style.background = "red";
} else {
    document.getElementById("key_container_1").style.background = "blue";
}

const key2_unlockStatus = localStorage.getItem("key2");
if (key2_unlockStatus == "true") {
    document.getElementById("key_container_2").style.background = "red";
} else {
    document.getElementById("key_container_2").style.background = "blue";
}

const key3_unlockStatus = localStorage.getItem("key3");
if (key3_unlockStatus == "true") {
    document.getElementById("key_container_3").style.background = "red";
} else {
    document.getElementById("key_container_3").style.background = "blue";
}

const key4_unlockStatus = localStorage.getItem("key4");
if (key4_unlockStatus == "true") {
    document.getElementById("key_container_4").style.background = "red";
} else {
    document.getElementById("key_container_4").style.background = "blue";
}

if (key1_unlockStatus == "true" && key2_unlockStatus == "true" && key3_unlockStatus == "true" && key4_unlockStatus == "true") {
    document.getElementById("key_container_5").style.visibility = "visible";
} else {
    document.getElementById("key_container_5").style.visibility = "hidden";
}

function LoadBackend() {
    document.getElementById("error404_container").style.visibility = 'hidden';
    document.getElementById("key_container_5").style.visibility = "hidden";
}

function Highlight(element) {
    element.style.background = '#141a24';
}

function Dehighlight(element) {
    element.style.background = '';
}