import _, { includes } from 'lodash';
import './style.scss';
import Icon from './assets/smartkeeda_quiz.jpg'

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




let questions = [];
let questionCounter;
let currentQuestion;
let correctArr = [];
let answers = [];

let correctAnswers = 0;
let incorrectAnswers = 0;
let attempt = 1;




const getNewQuestion = (i) => {
  //выведем в поле количество вопросов
  currentQuestion = questions.results[i].question;
  questionNumber.innerHTML = `Question ${i + 1} of ${questions.results.length}`;
  questionText.innerHTML = currentQuestion;

  //создадим массив с вариантами ответов из апи и массив правильных ответов
  answers = questions.results[i].incorrect_answers;
  console.log('incorrect'+'='+questions.results[i].incorrect_answers);
  answers.push(questions.results[i].correct_answer);
  console.log('answers'+'='+ answers);
  let answLength = answers.length;
  correctArr.push(questions.results[i].correct_answer);
  console.log(correctArr);

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
  getQuestions(21).then(data => {
    questions = data;
    questionCounter = 0;
    getNewQuestion(questionCounter);
  });

 
  startBtn.addEventListener('click' , () => {
    startPage.classList.add('hide');
    mainPage.classList.remove('hide');
    quizBox.classList.remove('hide');
  })

  //вставим вопросы из апи в разметку
  next.addEventListener('click', () => {
    questionCounter++;
    if (questionCounter >= questions.results.length) {
      console.log('the end!');
      quizEnd();
    } else {
      while (optionContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
        optionContainer.removeChild(optionContainer.firstChild);
      }
      getNewQuestion(questionCounter);
    }
    console.log('correct=' + correctAnswers);
    console.log('incorrect=' + incorrectAnswers);
  });


  //получим результат выбора ответа и выделим цветом добавив классы
  optionContainer.addEventListener('click', (event) => {
    let target = event.target;
    if (target.className !== 'option') return;
    else {
      /* console.log(target.innerText); */
      if (correctArr.includes(target.innerText)) {
        /* console.log('correct'); */
        target.classList.add('correct');
        indicatorValue('correct');
        correctAnswers++;

      } else {
        /* console.log('Incorrect'); */
        indicatorValue('incorrect');
        target.classList.add('incorrect');
        incorrectAnswers++;
        const optionLen = optionContainer.children.length;
/*         console.log(optionLen); */
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

  //индикатор
  const answerIndicator = () => {
    for (let i = 0; i < 10; i++) {
      let indicator = document.createElement('div');
      indicatorsContainer.appendChild(indicator);
    }
  };
  //
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

  const quizResult = () => {
    document.querySelector('.total-question').innerHTML = questionCounter;
    document.querySelector('.total-attempt').innerHTML = attempt;
    document.querySelector('.total-correct').innerHTML = correctAnswers;
    document.querySelector('.total-wrong').innerHTML = incorrectAnswers;
    document.querySelector('.percentage').innerHTML = ((correctAnswers/questionCounter) * 100).toFixed(2) + '%';
    document.querySelector('.total-score').innerHTML = correctAnswers + '/' + questionCounter;
  }


  tryBtn.addEventListener('click', () => {
    resultsBox.classList.add('hide');
    quizBox.classList.remove('hide');
/*     window.location.reload(); */
    attempt++;
    clearQuiz();
  })

  const clearQuiz = () =>{
    correctAnswers = 0;
    incorrectAnswers = 0;
    correctArr.length = 0;
    answers.length = 0;
    while (optionContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
      optionContainer.removeChild(optionContainer.firstChild);
    }
    while (indicatorsContainer.firstChild) {//удалим предыдущие контейнеры с вариантами
      indicatorsContainer.removeChild(indicatorsContainer.firstChild);
    }
    getQuestions(21).then(data => {
      questions = data;
      questionCounter = 0;
      getNewQuestion(questionCounter);
      answerIndicator();
    });
  };

  homeBtn.addEventListener('click', () => {
    resultsBox.classList.add('hide');
    mainPage.classList.add('hide');
    startPage.classList.remove('hide');
  })

}
