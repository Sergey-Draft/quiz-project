/* const homeBtn = document.querySelector('.home-btn'); */
const template = `
<a class="nav-link dropdown-toggle " href="#" id="hi" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User Name</a>
<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#myModal" id="last_result">Show last result</a>
  <a id="signOut" class="dropdown-item" href="#">Exit</a>
</div>
`;
document.querySelector('#userInfo').innerHTML = template;
const loginBtn = document.querySelector('.btn-login');

const showLoggedUser = (userName) => {
    document.querySelector('#hi').classList.remove('hide');
    document.querySelector('#hi').innerHTML = userName;
};

export const hideUser = () => {
    document.querySelector('#hi').classList.add('hide');
    document.querySelector('#hi').innerHTML = '';
};

export const loadUserInfo = (sessionId) => {
    const session = sessionStorage.getItem(sessionId);

    if (session) {
        showLoggedUser(session);
        loginBtn.classList.add('hide');
    } else {
        hideUser();
        loginBtn.classList.remove('hide');
    }
};

export const isUserOnline = (sessionId) => {
    const session = sessionStorage.getItem(sessionId);
    if (session) {
        return true;
    }
    return false;
};

export const getUserName = (sessionId) => {
    const session = sessionStorage.getItem(sessionId);
    return session;
}

