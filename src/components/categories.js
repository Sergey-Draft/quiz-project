import {userOffOn} from '../forms/logInForm';



function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const createCategories = (allCat) => {
    let row = document.querySelector('.categories');
    if (!row) return;
    for (let i = 0; i < allCat.length; i++) {
      let categoryName = document.createElement('div');
      let categoryImg = document.createElement('span');
      categoryName.innerText = allCat[i].name;
      categoryImg.id = allCat[i].id;
      categoryName.id = allCat[i].id;
      categoryName.classList.add('category');
      categoryImg.classList.add('img-fluid');
      let col = document.createElement('div');
      col.classList.add('col-lg-4', 'col-md-4', 'col-sm-12', 'col', 'animate__animated', 'animate__backInDown');
      categoryImg.style.backgroundColor = getRandomColor();
      categoryImg.style.background = 'cover';
      col.appendChild(categoryImg);
      col.appendChild(categoryName);
      row.appendChild(col);
    }
  }

  export default createCategories;