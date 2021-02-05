import { includes } from "lodash";

/* registration form checks */
const name = document.querySelector('#first_name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const checkRegForm = () => {
    if((name.value === '') || (email.value === '') || (password.value === '')) {
        document.querySelector('.wrong_reg').innerHTML = 'Please, input all fields';
    }else {
        writeAccauntData();
    }
}

const writeAccauntData = () => {
    let storageData = {
        name: name.value,
        email: email.value,
        password: password.value,
        results: {

        }
    }
    if(localStorage.getItem(name.value)){
        document.querySelector('.wrong_reg').innerHTML = 'This name is used. Please, write other';
    }else {
        localStorage.setItem(name.value, JSON.stringify(storageData));
        document.querySelector('#x').click();
    }


}

export {writeAccauntData, checkRegForm};