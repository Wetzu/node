function sendAccess(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        document.getElementById('formCol').innerHTML = xhttp.responseText;
    };
    var formData = new FormData(document.getElementById('form'));
    xhttp.send(formData);
    xhttp.open("GET", "https://wtk25.johannes-essig.de/access" + document.getElementById("inviteCode").innerText, true);
    xhttp.send();
};

function sendData2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("submit").value = "Rückmeldung ändern"
        }
    };
    xhttp.open("GET", "https://wtk25.johannes-essig.de/submit?code=" + document.getElementById("inviteCode").value + "&participation=" + document.getElementById("comingYes").value + "&persons=" + document.getElementById("numberOfPersons").value + "&vegetarians=" + document.getElementById("numberOfVegetarians").value, true);
    xhttp.send();
};

var myForm = document.getElementById('form');
if(myForm.addEventListener()){
    myForm.addEventListener("submit", sendAccess, false);
}else if(myForm.attachEvent){
    myForm.attachEvent('onsubmit', sendAccess());
}