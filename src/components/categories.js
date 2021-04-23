import {userOffOn} from '../forms/logInForm';

const createCategories = (allCat) => {
    let row = document.querySelector('.categories');
    if (!row) return;
    for (let i = 0; i < allCat.length; i++) {
      let categoryName = document.createElement('div');
      let categoryImg = document.createElement('img');
      categoryName.innerText = allCat[i].name;
      categoryImg.id = allCat[i].id;
      categoryName.id = allCat[i].id;
      categoryName.classList.add('category');
      categoryImg.classList.add('img-fluid');
      categoryImg.src = './assets/pusto4.png';
      let col = document.createElement('div');
      col.classList.add('col-lg-4', 'col-md-4', 'col-sm-12', 'col', 'animate__animated', 'animate__backInDown');
      col.appendChild(categoryImg);
      col.appendChild(categoryName);
      row.appendChild(col);
    }
  }

  export default createCategories;