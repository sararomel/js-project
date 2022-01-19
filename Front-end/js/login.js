import * as authFunctions from "./validate.js";

let register = document.getElementById('register');
register.addEventListener('click', () => {
    window.open("/html/register.html" , "_self");
})

if (localStorage.getItem('user')) {
    let user_role = localStorage.getItem('user_role');
    (user_role == 1) ? window.open("/index.html", "_self") : window.open("/Admin/index.html", "_self");
};


//=================================== Target Inputs ===============================================//
var allInputs = document.getElementsByTagName('input');
let email = document.getElementsByName('email')[0];
let password = document.getElementsByName('password')[0];

//=================================== Target Err Messages ===============================================//
var allErr = document.getElementsByTagName('span');
let emailErr = document.getElementById('emailErr');
let passwordErr = document.getElementById('passwordErr');


email.addEventListener('blur', function () {
    authFunctions.validation(email, /^[a-zA-Z0-9\.]{1,}\@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/gmi, emailErr);
});

password.addEventListener('blur', function () {
    authFunctions.validation(password, /^[a-zA-Z0-9]{8,}$/, passwordErr);
});


document.getElementById('login').addEventListener('click', (e) => {
    for (var i = 0; i < allErr.length && allInputs.length; i++) {
        if (allErr[i].style.display == 'block' || allInputs[i].value.length == 0) {
            console.log('block');
            allErr[i].style.display = 'block';
            e.preventDefault();
            return false;
        }
    }

    //========================================= Send Request To Store User ===================================//

    let loginUrl = 'http://localhost:8000/api/login';
    authFunctions.accessUser(loginUrl);
});
    //=========================================== End Of Submit Form =============================================//