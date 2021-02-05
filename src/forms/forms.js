import { clearValidation } from "./logInForm";

export const showLoginForm = () => {
    const loginForm = document.querySelector('#login');
    const registrationForm = document.querySelector('#registration');

    registrationForm.classList.add('hide');
    loginForm.classList.remove('hide');
    
    clearValidation();
    document.querySelector("#regFormLabel").innerText = 'Login Form';
}

export const showRegistrationForm = () => {
    const loginForm = document.querySelector('#login');
    const registrationForm = document.querySelector('#registration');

    loginForm.classList.add('hide');
    registrationForm.classList.remove('hide');
    
    document.querySelector("#regFormLabel").innerText = 'Registration Form';
}