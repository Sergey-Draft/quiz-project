import './style.scss';
import createCategories from './components/categories';
import './forms/registrForm';
import './forms/logInForm';
import { showLoginForm } from './forms/forms';
import { resultsToStorage, resultsToModal } from './components/results';
import { getUserName, isUserOnline, loadUserInfo, hideUser } from './forms/userInfo';
import { getData, getQuestions } from './data/dataService';
import preloader from './components/preloader';
export const sessionId = "quiz-session-unique-id";



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
const showResultBtn = document.querySelector('#last_result');
const loginBtn = document.querySelector('.btn-login');

quizBox.classList.add('animate__animated', 'animate__backInDown');


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

window.onload = preloader;

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

loadUserInfo(sessionId);

next.addEventListener('click', () => {
  questionCounter++;
  if (questionCounter >= questions.results.length) {
    quizEnd();
  } else {
    while (optionContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
      optionContainer.removeChild(optionContainer.firstChild);
    }
    getNewQuestion(questionCounter);
    hardCore();
  }
});

//получим результат выбора ответа и выделим цветом добавив классы
optionContainer.addEventListener('click', (event) => {
  next.classList.add('lockbtn');
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
  //при выборе откроем следующий вопрос

  setTimeout(() => {
    next.click();
    next.classList.remove('lockbtn');
  }, 1000);
  clearTimeout(timer)
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
  indicatorsContainer.children[questionCounter].classList.add(value);
}
answerIndicator();

const quizEnd = () => {
  quizBox.classList.add('hide');
  resultsBox.classList.remove('hide');
  quizResult();
  
  
  
  
  if(isUserOnline) {
    resultsToStorage(getUserName(sessionId)); // перезапись объекта в хранилище
  }
  console.log(getUserName(sessionId));
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
    getQuestions(idCategory).then(data => {
      questions = data;
      questionCounter = 0;
      getNewQuestion(questionCounter);
      hardCore();
    });
    quizBox.classList.remove('hide');
    categoryBox.classList.add('hide');

  }
})


/* ---------------------------------кнопки---------------------------------- */

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
  while (document.querySelector('.categories').firstChild){
    document.querySelector('.categories').removeChild(document.querySelector('.categories').firstChild);
  }
  answerIndicator();
  /* hard = false; */
  document.querySelector('.next-question-btn').classList.remove('hide');

});


/* start */
startBtn.addEventListener('click', () => {
  document.querySelector('.preloader').classList.remove('loaded')
  startPage.classList.add('hide');
  mainPage.classList.remove('hide');
  categoryBox.classList.remove('hide');

  getData('https://opentdb.com/api_category.php')
    .then(data => {
      document.querySelector('.preloader').classList.add('loaded')
      if (!isUserOnline(sessionId)) {//незарегистрированному пользователю меньше категорий
        allCat = data.trivia_categories.slice(0, 9);
      } else {
        allCat = data.trivia_categories;
        hardcoreBtn.classList.remove('hide');
        hardcoreOffBtn.classList.remove('hide');
        hardcoreBtns.classList.remove('hide');

      }
      createCategories(allCat);
    });
})

/* try again */
tryBtn.addEventListener('click', () => {
  resultsBox.classList.add('hide');
  quizBox.classList.remove('hide');
  attempt++;
  clearQuiz();
  clearTimeout(timer);
  hardCore();
})


/* show yor last result */
showResultBtn.addEventListener('click', () => {
  resultsToModal(getUserName(sessionId));
})


/* ------ close question & choose other category by X & btn 'categories'------ */
const closeQuestionCross = document.querySelector('.close-question');
closeQuestionCross.addEventListener('click', () => {
  // почистим контейнеры и переменные
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
  while (document.querySelector('.categories').firstChild){
    document.querySelector('.categories').removeChild(document.querySelector('.categories').firstChild);
  }
  quizBox.classList.add('hide');
  startBtn.click();
  answerIndicator();
  clearTimeout(timer);
})

const closeQuestionBtn = document.querySelector('.cat-btn');
closeQuestionBtn.addEventListener('click', () => {
  resultsBox.classList.add('hide');
  closeQuestionCross.click();
})



/* --------------------------- Hardcore mod ---------------------------------*/
let timer;
let hard = false;

const hardCore = () => {
  if (hard) {

    let x = 10;
    countdown();
    function countdown() {
      document.querySelector('.hard_mod').innerHTML = x;
      x--;
      if (x < 0) {
        clearTimeout(timer);
        document.querySelector('.next').click();
      }
      else {
        timer = setTimeout(countdown, 1000);
      }
    }
  }
}

const hardcoreBtn = document.querySelector('.btn-harcore');
const hardcoreOffBtn = document.querySelector('.btn-harcore-off');

const hardcoreBox = document.querySelector('.timer-box');
const hardcoreBtns = document.querySelector('.hardcore_btns');


hardcoreBtn.addEventListener('click', () => {
  hard = true;
  hardcoreBox.classList.remove('timerOff');
  document.querySelector('.next-question-btn').classList.add('hide');
  if(hardcoreOffBtn.className !='hard'){
    hardcoreBtn.classList.add('hard')
    hardcoreOffBtn.classList.remove('hard')
  }
  
})

hardcoreOffBtn.addEventListener('click', () => {
  hard = false;
  clearTimeout(timer);
  hardcoreBox.classList.add('timerOff');
  document.querySelector('.next-question-btn').classList.remove('hide');
  if(hardcoreBtn.className !='hard'){
    hardcoreOffBtn.classList.add('hard')
    hardcoreBtn.classList.remove('hard')
  }
  
})

loginBtn.addEventListener('click', () => {
  showLoginForm();
});

/* ----------------------- Home Link --------------------- */
const homeLink = document.querySelector('.homeLink');
homeLink.addEventListener('click', () => {
  hardcoreOffBtn.click();
  homeBtn.click();
  quizBox.classList.add('hide');
  if(!isUserOnline) {
    hardcoreBtns.classList.add('hide');
  }


})

document.querySelector('#signOut').addEventListener('click', () => {
  sessionStorage.clear();
  hideUser();
  loginBtn.classList.remove('hide');
  homeLink.click();
  hardcoreOffBtn.click();
  hardcoreBtns.classList.add('hide');
});