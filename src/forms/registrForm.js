import { showLoginForm } from "./forms";

const template = `
<div class="row centered-form">
<div class="col-12">
  <div class="panel panel-default">
    <div class="panel-heading pb-3">
      <h4 class="panel-title">Please register&nbsp;<span class="badge bg-success text-white">It's free!</span></h4>
    </div>
    <div class="panel-body">
      <form role="form">
        <div class="form-group">
          <input type="text" name="first_name" id="first_name" class="form-control input-sm"
            placeholder="First Name">
        </div>
        <div class="form-group">
          <input type="email" name="email" id="email" class="form-control input-sm"
            placeholder="Email Address">
        </div>
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-6">
            <div class="form-group">
              <input type="password" name="password" id="password" class="form-control input-sm"
                placeholder="Password">
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6">
            <div class="form-group">
              <input type="password" name="password_confirmation" id="password_confirmation"
                class="form-control input-sm" placeholder="Confirm Password">
            </div>
          </div>
        </div>
        <div class="wrong_reg"></div>
        <div class="d-flex flex-row justify-content-between pt-3">
            <button id="sub-reg" type="button" class="btn btn-success">Register</button>
            <div id="sub-go-login" class="text-right mt-3">
                <a href="#" class="text-info" id="register-here">Back to Login</a>
            </div>
        </div>
      </form>
    </div>
  </div>
</div>
</div> 
<!-- form reg -->
`;

const regForm = document.querySelector('#registration');
regForm.innerHTML = template;

const btnSubmit = document.querySelector('#sub-reg');
const btnBackToLogin = document.querySelector('#sub-go-login');
const name = document.querySelector('#first_name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

btnSubmit.addEventListener('click', () => {
    checkRegForm();
});

btnBackToLogin.addEventListener('click', () => {
    showLoginForm();
});

const checkRegForm = () => {
    if ((name.value === '') || (email.value === '') || (password.value === '')) {
        document.querySelector('.wrong_reg').innerHTML = 'Please, input all fields';
    } else {
        writeAccountData();
    }
}

const writeAccountData = () => {
    let storageData = {
        name: name.value,
        email: email.value,
        password: password.value,
        results: {

        }
    }
    if (localStorage.getItem(name.value)) {
        document.querySelector('.wrong_reg').innerHTML = 'This name is used. Please, write other';
    } else {
        localStorage.setItem(name.value, JSON.stringify(storageData));
        showLoginForm();
    }
}

export { writeAccountData, checkRegForm };