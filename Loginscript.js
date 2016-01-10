/**
 * Created by Okan on 2015-12-06.
 */

function Redirect() {
    window.location="http://localhost:63342/The-Flying-Dutchman-/customer.html?";
}

function loginPage() {

    var inputUser = document.getElementById("user");
    var inputPw = document.getElementById("pass");

    if (checkUserDataBase()) {
        //window.alert("Login YES2");
        console.log("ahmad");
        Redirect();
    }

    else if(checkAdminDataBase()) {
        window.alert("Login YES");
    }

    else {
        window.alert("Login Failed");
    }
}


function goBack() {
    window.history.back();
}

function VIPuserDataBase() {
    return userList = [
        {"username": "aamsta", "password": "aamsta"},
        {"username": "anddar", "password": "anddar"},
        {"username": "ankov", "password": "ankov"},
        {"username": "aqulyn", "password": "aqulyn"},
        {"username": "aubbla", "password": "aubbla"},
    ]

}

function adminUserDataBase() {

    return adminList = [
        {"username": "ervtod", "password": "ervtod"},
        {"username": "hirchr", "password": "hirchr"},
        {"username": "jorass", "password": "jorass"},
        {"username": "saskru", "password": "saskru"},
        {"username": "svetor", "password": "svetor"},
    ]
}

function checkAdminDataBase() {

    var adminList = adminUserDataBase();
    var adminListLength = adminList.length;
    var inputUser = document.getElementById("user");
    var inputPw = document.getElementById("pass");

    for (var i = 0 ; i < adminListLength; i++) {
        if (adminList[i].username == inputUser.value && adminList[i].password == inputPw.value) {
            return true;
        }
        return false;
    }
}
function checkUserDataBase() {

    var userList = VIPuserDataBase();
    var userListLength = userList.length;
    var inputUser = document.getElementById("user");
    var inputPw = document.getElementById("pass");

    for (var i = 0 ; i < userListLength; i++) {
        if (userList[i].username == inputUser.value && userList[i].password == inputPw.value) {
            return true;
        }
        return false;
    }
}