import _, { includes } from 'lodash';
import './style.scss';
import Icon from './assets/smartkeeda_quiz.jpg'
import createCategories from './categories'

const getData = async (url) => {
  const quiz = await fetch(url);

  //console.log(quiz.json());
  return await quiz.json();

}

const getQuestions = async (category) => {
  const data = await getData(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`);
  console.log(data);
  return data;
}


const dataGet2 = async (url) => {
  let response = await fetch(url);
  return await response.json();
}

const startPage = document.querySelector('.start_page');
const mainPage = document.querySelector('.main_page');
const quizBox = document.querySelector('.quiz-box');
const resultsBox = document.querySelector('.result-box');

const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const next = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.answers-indicator');
const tryBtn = document.querySelector('.try-btn');
const homeBtn = document.querySelector('.home-btn');
const startBtn = document.querySelector('.btn-start');
const categoryBox = document.querySelector('.box-category');
const categoryCol = document.querySelectorAll('.col');





let questions = [];
let questionCounter;
let currentQuestion;
let correctArr = [];
let answers = [];

let correctAnswers = 0;
let incorrectAnswers = 0;
let attempt = 1;

var allCat;
let idCategory;




const getNewQuestion = (i) => {
  //выведем в поле количество вопросов
  currentQuestion = questions.results[i].question;
  questionNumber.innerHTML = `Question ${i + 1} of ${questions.results.length}`;
  questionText.innerHTML = currentQuestion;

  //создадим массив с вариантами ответов из апи и массив правильных ответов
  answers = questions.results[i].incorrect_answers;
  answers.push(questions.results[i].correct_answer);
  let answLength = answers.length;
  correctArr.push(questions.results[i].correct_answer);
  console.log('правильные ответы:' + ' = ' + correctArr);

  //вставим в документ
  let animation = 0.15;
  for (i = 0; i < answLength; i++) {
    const option = document.createElement('div');
    option.className = 'option';
    option.id = i;
    var rand = Math.floor(Math.random() * answers.length);
    option.innerHTML = answers[rand];

    option.style.animationDelay = animation + 's';
    animation = animation + 0.15;

    optionContainer.appendChild(option);
    //удалим уже найденный элемент из массива
    answers.splice(rand, 1);
  }
}


window.onload = function () {

  next.addEventListener('click', () => {
    questionCounter++;
    if (questionCounter >= questions.results.length) {
      quizEnd();
    } else {
      while (optionContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
        optionContainer.removeChild(optionContainer.firstChild);
      }
      getNewQuestion(questionCounter);
    }
  });


  //получим результат выбора ответа и выделим цветом добавив классы
  optionContainer.addEventListener('click', (event) => {
    let target = event.target;
    if (target.className !== 'option') return;
    else {
      if (correctArr.includes(target.innerText)) {
        target.classList.add('correct');
        indicatorValue('correct');
        correctAnswers++;
      } else {
        indicatorValue('incorrect');
        target.classList.add('incorrect');
        incorrectAnswers++;
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
          if (correctArr.includes(optionContainer.children[i].innerHTML)) {
            optionContainer.children[i].classList.add('correct');
          }
        }
      }
    }
    lock();
  });

  // не позволит пользователю выбирать ответы больше одного раза 
  const lock = () => {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      optionContainer.children[i].classList.add('lock');
    }
  };

  //индикаторы ответов
  const answerIndicator = () => {
    for (let i = 0; i < 10; i++) {
      let indicator = document.createElement('div');
      indicatorsContainer.appendChild(indicator);
    }
  };
  //примет значение правильного или неправильного ответа
  const indicatorValue = (value) => {
    console.log(value);
    indicatorsContainer.children[questionCounter].classList.add(value);
  }
  answerIndicator();

  const quizEnd = () => {
    quizBox.classList.add('hide');
    resultsBox.classList.remove('hide');
    quizResult();
  }
  //заполним таблицу с результатами
  const quizResult = () => {
    document.querySelector('.category-name').innerHTML = allCat[idCategory - 9].name;
    document.querySelector('.total-question').innerHTML = questionCounter;
    document.querySelector('.total-attempt').innerHTML = attempt;
    document.querySelector('.total-correct').innerHTML = correctAnswers;
    document.querySelector('.total-wrong').innerHTML = incorrectAnswers;
    document.querySelector('.percentage').innerHTML = ((correctAnswers / questionCounter) * 100).toFixed(2) + '%';
    document.querySelector('.total-score').innerHTML = correctAnswers + '/' + questionCounter;
    localStorage.setItem('Name', correctAnswers);
  }

  //очистим все переменные и заново отправим запрос
  const clearQuiz = () => {
    correctAnswers = 0;
    incorrectAnswers = 0;
    correctArr.length = 0;
    answers.length = 0;
    while (optionContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
      optionContainer.removeChild(optionContainer.firstChild);
    }
    while (indicatorsContainer.firstChild) {//удалим индикаторы
      indicatorsContainer.removeChild(indicatorsContainer.firstChild);
    }
    getQuestions(idCategory).then(data => {
      questions = data;
      questionCounter = 0;
      getNewQuestion(questionCounter);
      answerIndicator();
    });
  };


  /* выбираем категорию */
  categoryBox.addEventListener('click', (event) => {
    if (event.target.className == 'img-fluid' || event.target.className == 'category') {
      idCategory = event.target.id
      console.log(idCategory);
      getQuestions(idCategory).then(data => {
        questions = data;
        questionCounter = 0;
        getNewQuestion(questionCounter);
      });
      quizBox.classList.remove('hide');
      categoryBox.classList.add('hide');

    }
  })


  ///////////////////////////////////////////////////кнопки

  /* home */
  homeBtn.addEventListener('click', () => {
    resultsBox.classList.add('hide');
    mainPage.classList.add('hide');
    startPage.classList.remove('hide');
    /* почистим контейнеры и переменные */
    correctAnswers = 0;
    incorrectAnswers = 0;
    correctArr.length = 0;
    answers.length = 0;
    while (optionContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
      optionContainer.removeChild(optionContainer.firstChild);
    }
    while (indicatorsContainer.firstChild) {//удалим индикаторы
      indicatorsContainer.removeChild(indicatorsContainer.firstChild);
    }
    answerIndicator();
  });


  /* start */
  startBtn.addEventListener('click', () => {
    startPage.classList.add('hide');
    mainPage.classList.remove('hide');
    categoryBox.classList.remove('hide');

    dataGet2('https://opentdb.com/api_category.php')
      .then(data => {
        allCat = data.trivia_categories.slice(0, 21);
        console.log(allCat)
        createCategories(allCat);
      });
  })

  /* try again */
  tryBtn.addEventListener('click', () => {
    resultsBox.classList.add('hide');
    quizBox.classList.remove('hide');
    attempt++;
    clearQuiz();
  })


/* ------------------------Log in & Register------------------- */

const registerBtn = document.querySelector('#register-here');
const loginForm = document.querySelector('#login');
const regForm = document.querySelector('#registration');

const regSubmit = document.querySelector('#sub-reg');
const LogSubmit = document.querySelector('#sub-log');


registerBtn.addEventListener('click', () =>{
  loginForm.classList.add('hide');
  regForm.classList.remove('hide');
})

/* registration form */
const name = document.querySelector('#first_name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');


const writeAccauntData = () => {
  localStorage.setItem('Name', name.value);
  localStorage.setItem('Email', email.value);
  localStorage.setItem('Password', password.value);
}

regSubmit.addEventListener('click', ()=> {
  writeAccauntData();
})


/* LogIn Form */

const nameStorage = localStorage.getItem('Name');
const passwordStorage = localStorage.getItem('Password');

const loginName = document.querySelector('#username');
const loginPass = document.querySelector('#password-login');




const checkLogIn = () => {
  
  if(nameStorage === loginName.value && passwordStorage === loginPass.value) {
    console.log('OK!')
    document.querySelector('#x').click();
    document.querySelector('#hi-user').classList.remove('hide');
    document.querySelector('#hi').innerHTML = loginName.value;
  }else {
    document.querySelector('.wrong').style.color = 'red';
    document.querySelector('.wrong').innerHTML = 'Wrong name or password!';
  }
}


LogSubmit.addEventListener('click', () => {
  checkLogIn();
})


}
