import * as authFunctions from "./validate.js";

//====================================== Check authorization and authentication ===========================//
// Get user role and token from local_storage
const user_role = localStorage.user_role;
const token = localStorage.token;

if (user_role != 1 || !token) {
  location.assign('/html/login.html');
};

var userData = localStorage.getItem("user");
userData = JSON.parse(userData);
document.getElementsByClassName("userName")[0].innerHTML = userData.name;
document.getElementsByClassName("email")[0].innerHTML = userData.email;
document.getElementsByClassName("phone")[0].innerHTML =
userData.phone_number;
document.getElementsByClassName("city")[0].innerHTML = userData.city;
  

  var btnsendone = document.getElementById("one");
  var btnsendtwo = document.getElementById("two");
  var btnsendthree = document.getElementById("three");
  btnsendone.addEventListener("click", (e) => {
    if (
      getUserName.value.length == 0 ||
      password_confirmation.value != password.value
    ) {
      getUserErr.style.display = "block";
      e.preventDefault();
    } else if (getemail.value.length == 0) {
      getEmailErr.style.display = "block";
      e.preventDefault();
    } else if (getpassword.value.length == 0) {
      getPasswordErr.style.display = "block";
      e.preventDefault();
    } else if (
      getEmailErr.style.display == "none" &&
      getPasswordErr.style.display == "none"
    ) {
      $.ajax({
        url: `http://localhost:8000/api/user/updateemail/${userData.id}`,
        type: "post",
        headers: { "Authorization": `Bearer ${token}` },
        dataType: "json",
        data: $("#form").serialize(),
  
        success: function (response) {
          console.log(response);
          console.log($("#form").serialize());
          console.log(response)
          if(response.data != null){
            localStorage.setItem('user' ,JSON.stringify(response.data));
            window.location.reload();
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
  

  // Declare variables to update password modal
  var password = document.getElementById("inputpassword");
  var newpassword = document.getElementById("inputNewPassword");
  var password_confirmation = document.getElementById("inputConfirmPassword");

  var passworderr = document.getElementById("passwordTwo");
  var newpassworderr = document.getElementById("newpasswordErr");
  var passwordconfirmerr = document.getElementById("confirmpasswordErr");


  btnsendtwo.addEventListener("click", (e) => {
    console.log('from');

    if ( password.value.length == 0 ) {
      passworderr.style.display = "block";
      e.preventDefault();
    } else if (newpassword.value.length == 0) {
      console.log('two');
      newpassworderr.style.display = "block";
      e.preventDefault();
    } else if (password_confirmation.value.length == 0) {
      console.log('three')
      passwordconfirmerr.style.display = "block";
      e.preventDefault();
    } else if (
      newpassworderr.style.display == "none" &&
      passwordconfirmerr.style.display == "none"
    ) {
      console.log('alaa')
      $.ajax({
        url: `http://localhost:8000/api/user/updatepassword/${userData.id}`,
        type: "post",
        headers: { "Authorization": `Bearer ${token}` },
        typeof: "json",
        data: $("#formTwo").serialize(),
        success: function (response) {
          console.log($("#formTwo").serialize());
          console.log(response);
          if(response.date != null){
            localStorage.setItem('user' ,JSON.stringify(response.data));
            window.location.reload();
          } 
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });




  var phone_number = document.getElementById("phone_number");
  var city = document.getElementById("city");
  var passconfirm = document.getElementById("confirmPass");

  var phoneNumberErr = document.getElementById("phoneNumberErr");
  var cityErr = document.getElementById("cityErr");
  var confirm = document.getElementById("passwordErrTwo");

  btnsendthree.addEventListener("click", (e) => {
    if (phone_number.value.length == 0) {
      phoneNumberErr.style.display = "block";
      e.preventDefault();
    } else if (city.value.length == 0) {
      cityErr.style.display = "block";
      e.preventDefault();
    } else if (passconfirm.length == 0) {
      confirm.style.display = "block";
      e.preventDefault();
    } else if (
      phoneNumberErr.style.display == "none" &&
      cityErr.style.display == "none"
    ) {
      $.ajax({
        url: `http://localhost:8000/api/user/updatecontact/${userData.id}`,
        type: "post",
        headers: { "Authorization": `Bearer ${token}` },
        typeof: "json",
        data: $("#formThree").serialize(),
        success: function (response) {
          console.log($("#formThree").serialize());
          console.log(response)
          if(response.data != null){
            localStorage.setItem('user' ,JSON.stringify(response.data));
            window.location.reload();
          }
        },
        error: function (error) {
          console.log(error);
          console.log('alaa');

        },
      });
    }
  });



  var getUserName = document.getElementById("username");
  var getemail = document.getElementById("email");
  var getpassword = document.getElementById("password");

  var getUserErr = document.getElementById("userNameErr");
  var getEmailErr = document.getElementById("emailErr");
  var getPasswordErr = document.getElementById("passwordErr");

  getUserName.addEventListener('blur', function () {
    authFunctions.validation(getUserName, /^[a-zA-Z\s]{3,20}(?:[a-zA-z]{3})$/gmi, getUserErr);
  });

  getemail.addEventListener("blur", function () {
    authFunctions.validation(
      getemail,
      /^[a-zA-Z0-9]{2,20}@[a-zA-Z]{2,20}.(es|com|org)$/,
      getEmailErr
    );
  });

  getpassword.addEventListener("blur", function () {
    authFunctions.validation(getpassword, /^[a-zA-Z0-9]{8,}$/, getPasswordErr);
    
  });


  password.addEventListener('blur', function () {
    authFunctions.validation(password, /^[a-zA-Z0-9]{8,}$/, passwordErr);
  });

  newpassword.addEventListener("blur", function () {
    authFunctions.validation(newpassword, /^[a-zA-Z0-9]{8,}$/, newpassworderr);
  });

  password_confirmation.addEventListener('blur', function () {
    if (password_confirmation.value != newpassword.value) {
      passwordconfirmerr.style.display = 'block';
    } else {
      passwordconfirmerr.style.display = 'none';
    }
  });

  city.addEventListener("blur", function () {
    authFunctions.validation(city, /^[a-zA-Z]{4,20}$/, cityErr);
  });

  phone_number.addEventListener("blur", function () {
    authFunctions.validation(phone_number, /^(010|011|012|015)[0-9]{8}$/, phoneNumberErr);
  });

  var exit = document.getElementsByClassName("exit")[0];
  exit.addEventListener("click", () => {
    location.assign("/index.html");
  });
