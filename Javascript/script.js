"use strict";

let username = document.querySelector("#username");
let password = document.querySelector("#password");
const buttonEL = document.querySelector(".login100-form-btn");

function validate(callback) {
  let loginval = false;
  const error = document.querySelector("small");
  if (username.value === "" || password.value === "") {
    error.textContent = "Username and password cannot be left blank";
  } else if (!(username.value === "admin") || !(password.value === "12345")) {
    error.textContent = "Please enter correct username & password";
    username.value = "";
    password.value = "";
  } else {
    error.textContent = "";
    loginval = true;
  }
  callback(loginval);
}

function loginStatus(loginval) {
  if (loginval) {
    window.location.replace("todo.html");
  }
}

buttonEL.addEventListener("click", function (e) {
  e.preventDefault();
  validate(loginStatus);
});
