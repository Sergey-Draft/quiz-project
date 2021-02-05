/* LogIn Form cheсks */
const loginName = document.querySelector('#username');
const loginPass = document.querySelector('#password-login');

const loginBtn = document.querySelector('.btn-login');

let userOffOn; // переменная, запоминает юзера при регистрации


const checkLogIn = () => {
    let storageJson = localStorage.getItem(loginName.value);
    let password = JSON.parse(storageJson);
    console.log(password.password);
  if(localStorage.getItem(loginName.value) && (password.password == loginPass.value)) {
/*     console.log('OK!'); */
    document.querySelector('#x').click();
    document.querySelector('#hi').classList.remove('hide');
    document.querySelector('#hi').innerHTML = loginName.value;
    loginBtn.classList.add('hide');
    userOffOn = loginName.value;

  }else {
    document.querySelector('.wrong').style.color = 'red';
    document.querySelector('.wrong').innerHTML = 'Wrong name or password!';
  }
}

const checkFields = () => {
    if((loginName.value.trim() === '') || (loginPass.value.trim() === '')){
        document.querySelector('.wrong').style.color = 'red';
        document.querySelector('.wrong').innerHTML = 'Emty fields!';
    }
}


export {checkLogIn, checkFields, userOffOn};