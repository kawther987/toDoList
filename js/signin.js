import { regexemail, regexpass, validate } from "./utils/validation.js";

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.querySelector(".btn-sign-in");
const loginFailedModal = document.querySelector(".login-failed");
const tryBtn = document.querySelector(".btn-try");

const usersArr = JSON.parse(localStorage.getItem("users") || []);

function login() {
  if (validate(emailInput, regexemail) && validate(passwordInput, regexpass)) {
    const user = usersArr.find(function (user) {
      return user.email == emailInput.value && user.pass == passwordInput.value;
    });
    if (user) {
      localStorage.setItem("loggedUser", true);
      location.href = "./index.html";
      return;
    }
    loginFailedModal.classList.replace("d-none", "d-flex");
  }
}

loginBtn.addEventListener("click", login);
tryBtn.addEventListener("click", function () {
  loginFailedModal.classList.replace("d-flex", "d-none");
  emailInput.value = "";
  passwordInput.value = "";
  passwordInput.classList.remove("is-valid", "is-invalid");
  emailInput.classList.remove("is-valid", "is-invalid");
});

emailInput.addEventListener("input", function () {
  validate(emailInput, regexemail);
});

passwordInput.addEventListener("input", function () {
  validate(passwordInput, regexpass);
});
