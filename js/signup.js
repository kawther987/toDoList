import {
  regexName,
  regexemail,
  regexpass,
  validate,
} from "./utils/validation.js";

const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const registerBtn = document.getElementById("registerBtn");
const loginSuccessModal = document.querySelector(".login-success");

const usersArr = JSON.parse(localStorage.getItem("users")) || [];
function signUp() {
  if (
    validate(firstNameInput, regexName) &&
    (lastNameInput, regexName) &&
    (emailInput, regexemail) &&
    (passwordInput, regexpass)
  ) {
    const isExist = usersArr.find(function (user) {
      return user.email == emailInput.value;
    });

    if (isExist) {
      alert("Email already Exist");
      return;
    }
    let user = {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      pass: passwordInput.value,
    };
    usersArr.push(user);
    localStorage.setItem("users", JSON.stringify(usersArr));
    loginSuccessModal.classList.replace("d-none", "d-flex");
  } else {
    alert("Please enter correct data");
  }
}

registerBtn.addEventListener("click", signUp);

firstNameInput.addEventListener("input", function () {
  validate(firstNameInput, regexName);
});
lastNameInput.addEventListener("input", function () {
  validate(lastNameInput, regexName);
});
emailInput.addEventListener("input", function () {
  validate(emailInput, regexemail);
});
passwordInput.addEventListener("input", function () {
  validate(passwordInput, regexpass);
});
