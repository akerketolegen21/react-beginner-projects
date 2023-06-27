import './index.scss';
import React from 'react'
const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <a href='/'>
      <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({step, question, onClickOption}) {
  const perc = Math.round((step/questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${perc}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => 
          <li onClick={() => onClickOption(index)} key={index}>
            {text}
            </li>)
        }
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickOption = (index) => {
    question.correct == index ? setCorrect(correct+1) : setCorrect(correct);
    setStep(step+1);
  }

  return (
    <div className="App">
      {step != questions.length ? <Game step = {step} question={question} onClickOption={onClickOption}/> 
      : <Result correct={correct}/>}
      
    </div>
  );
}

export default App;
