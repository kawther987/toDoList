export function logOut() {
  localStorage.removeItem("loggedUser");
  location.href = "./sign-in.html";
}

