import {userOffOn} from '../forms/logInForm';

/* User results set */

const resultsToStorage = () => {
    console.log(userOffOn)
    let resultsNew = {
        category: document.querySelector('.category-name').innerHTML,
        percentage: document.querySelector('.percentage').innerHTML,
        score: document.querySelector('.total-score').innerHTML
    }
    let oldUserData = JSON.parse(localStorage.getItem(userOffOn));
    oldUserData.results = resultsNew;
    localStorage.setItem(userOffOn, JSON.stringify(oldUserData));// перезапишем в localStorage взяв старый ключ и перезаписав его с новыми результатами
}


const resultsToModal = () => {
    let data = JSON.parse(localStorage.getItem(userOffOn));
    let {results:{category, percentage,score}} = data;
    console.log(category)
    
    document.querySelector('.modal-body-results').innerHTML = `
    yor category: ${category} <br>
    yor percentage: ${percentage} <br>
    yor score: ${score} <br>
    `;
}


export {resultsToStorage, resultsToModal};

