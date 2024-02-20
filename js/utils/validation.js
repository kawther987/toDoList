export const regexName = /^[A-Z][a-z]{2,8}$/;
export const regexemail = /.com$/;
export const regexpass = /^\w{5,8}$/;

export function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.parentElement.nextElementSibling.classList.add("invisible");
    return true;
  }
  element.classList.add("is-invalid");
  element.classList.remove("is-valid");
  element.parentElement.nextElementSibling.classList.remove("invisible");
  return false;
}
