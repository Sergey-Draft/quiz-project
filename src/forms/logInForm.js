import { showRegistrationForm } from "./forms";
import { sessionId } from '../index';
import { loadUserInfo } from "./userInfo";

const template = `
<div id="login-row" class="row justify-content-center align-items-center">
  <div id="login-column" class="col-md-12">
    <div id="login-box" class="col-md-12">
      <form id="login-form" class="form" action="" method="post">
        <h3 class="text-center text-info">Login</h3>
        <div class="form-group">
          <label for="username" class="text-info"></label><br>
          <input type="text" name="username" id="username" class="form-control" placeholder="Username">
        </div>
        <div class="form-group">
          <label for="password-login" class="text-info"></label><br>
          <input type="text" name="password-login" id="password-login" class="form-control"
            placeholder="Password">
          <div class="wrong text-danger"></div>
          <div class="notRegistered mt-3 text-warning"></div>
        </div>
        <div class="form-group pt-3 mb-0">
          <div class="d-flex flex-row justify-content-between">
            <button id="btn-login" type="button" class="btn btn-secondary">Login</button>
            <div id="register-link" class="text-right mt-3">
              <a href="#" class="text-info" id="register-here">Register here</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
`;

const loginForm = document.querySelector('#login');
loginForm.innerHTML = template;
document.querySelector("#regFormLabel").innerText = 'Login Form';

const loginName = document.querySelector('#username');
const loginPass = document.querySelector('#password-login');
const btnRegistr = document.querySelector('#register-here');
const btnSubmit = document.querySelector('#btn-login');

btnRegistr.addEventListener('click', () => {
  showRegistrationForm();
});

btnSubmit.addEventListener('click', () => {
  if (checkFields()) {
    signIn();
  }
});

const signIn = () => {
  clearValidation();
  let storageJson = localStorage.getItem(loginName.value);

  if (storageJson) {
    let parsed = JSON.parse(storageJson);
    const storedName = parsed.name;
    const storedPass = parsed.password;

    if (storedName && storedPass && loginName.value == storedName && loginPass.value == storedPass) {
      startSession(sessionId, storedName);
    } else {
      wrongPassword();
    }

  } else {
    clearValidation();
    notRegistered();
  }
}

const wrongPassword = () => {
  document.querySelector('.wrong').innerHTML = 'Wrong name or password!';
};

const notRegistered = () => {
  document.querySelector('.notRegistered').innerHTML = 'Not registered yet? Follow the link below!';
};

export const clearValidation = () => {
  document.querySelector('.wrong').innerHTML = '';
  document.querySelector('.notRegistered').innerHTML = '';
};

const checkFields = () => {
  if ((loginName.value.trim() === '') || (loginPass.value.trim() === '')) {
    document.querySelector('.wrong').innerHTML = 'Emty fields!';
    return false;
  }
  return true;
};

const startSession = (sessionId, userName) => {
  sessionStorage.setItem(sessionId, userName);
  document.querySelector('#x').click();
  loadUserInfo(sessionId);
};