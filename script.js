// Regular expressions
const exReUser = /^(?=.*[a-z0-9\_\-])(?=.*[A-Z\_\-]).{5,12}$/;
const exReEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const exRePass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/;
const exRetlf = /^[0-9]{7,16}$/;

// Selectorses
const countrys = document.querySelector('#countrys');
const userNameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const phoneCode = document.querySelector('#phone-code');
const phoneInput = document.querySelector('#phone');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const formBtm = document.querySelector('#form-btm');
const form = document.querySelector('#form');

// Validation
let userNameValid = false;
let emailValid = false;
let phoneValid = false;
let passwordValid = false;
let confirmPasswordValid = false;
let countrysValid = false;

[...countrys].forEach( elementos => {
    elementos.innerHTML = elementos.innerHTML.split('(')[0];
});

// Functions

const Validation = (evento, Validation, elemento) => {
    const information = evento.target.parentElement.children[1];
    formBtm.disabled = !(userNameValid && emailValid && phoneValid && passwordValid && confirmPasswordValid && countrysValid);
    if (Validation) {
        elemento.classList.add('correct');
        elemento.classList.remove('incorrect');
        information.classList.remove('show-information');
        
    } else {
        elemento.classList.add('incorrect');
        elemento.classList.remove('correct');
        information.classList.add('show-information'); 
    }
}

// Event listeners
userNameInput.addEventListener('input', evento => {
    userNameValid = exReUser.test(evento.target.value);
    Validation(evento, userNameValid, userNameInput);
});

emailInput.addEventListener('input', evento => {
    emailValid = exReEmail.test(evento.target.value);
    Validation(evento, emailValid, emailInput);
});

countrys.addEventListener('input', evento => {
    const selectedCountry = [...evento.target.children].find(option => option.selected);
    phoneCode.innerHTML = `+${selectedCountry.value}`;
    countrysValid = selectedCountry.value !== ' '; 
    countrys.classList.add('correct');
    phoneCode.classList.add('correct');
    Validation(evento, null, null);
});

phoneInput.addEventListener('input', evento => {
    phoneValid = exRetlf.test(evento.target.value);
    const information = evento.target.parentElement.parentElement.children[1];
    if (phoneValid) {
        phoneInput.classList.add('correct');
        phoneInput.classList.remove('incorrect');
        information.classList.remove('show-information');
        
    } else {
        phoneInput.classList.add('incorrect');
        phoneInput.classList.remove('correct');
        information.classList.add('show-information'); 
    }
});

passwordInput.addEventListener('input', evento => {
    passwordValid = exRePass.test(evento.target.value);
    Validation(evento, passwordValid, passwordInput);
});

confirmPasswordInput.addEventListener('input', evento => {
    confirmPasswordValid = passwordInput.value === evento.target.value;
    Validation(evento, confirmPasswordValid, confirmPasswordInput);
});

form.addEventListener('submit', evento => {
    evento.preventDefault();
    const user = {
        userName: userNameInput.value,
        email: emailInput.value,
        phone: phoneCode.innerHTML + ' ' + phoneInput.value,
        password: passwordInput.value,
    };
    // console.log(user);
});




