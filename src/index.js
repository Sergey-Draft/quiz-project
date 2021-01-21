import _ from 'lodash';
import './style.scss';
import Icon from './assets/smartkeeda_quiz.jpg' 


 function component() {
   const element = document.createElement('div');
 
  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
   element.innerHTML = _.join(['Hello ', 'webpack'], ' ');
   element.classList.add('hello');
   return element;
 }
 
 document.body.appendChild(component());




 const myIcon = new Image();
 myIcon.src = Icon;

 document.body.appendChild(myIcon);

 