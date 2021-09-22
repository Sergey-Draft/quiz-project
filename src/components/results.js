/* User results set */

const resultsToStorage = (key) => {
    let resultsNew = {
        category: document.querySelector('.category-name').innerHTML,
        percentage: document.querySelector('.percentage').innerHTML,
        score: document.querySelector('.total-score').innerHTML
    }
    let oldUserData = JSON.parse(localStorage.getItem(key));
    oldUserData.results = resultsNew;
    localStorage.setItem(key, JSON.stringify(oldUserData));// перезапишем в localStorage взяв старый ключ и перезаписав его с новыми результатами
}


const resultsToModal = (key) => {
    let data = JSON.parse(localStorage.getItem(key));
    console.log(key)

    let { results: { category, percentage, score } } = data;
    console.log(category)

    document.querySelector('.modal-body-results').innerHTML = `
    your category: ${category} <br>
    your percentage: ${percentage} <br>
    your score: ${score} <br>
    `;
}


export { resultsToStorage, resultsToModal };

