const quizContainer = document.querySelector(".quiz-container");
const countryName = document.querySelector(".country");
const answerContainer = document.querySelector(".answers");
let countryDataArr = [];
const nextQuestionBtn = document.querySelector("#next-btn");
let correctAnswer = "";
let scoreDisplay = document.getElementById("score");
let capitals = [];
let score = 0;
let rounds = 0;
const result = document.getElementById("result");
const maxRounds = 5;

//first fetch the countries from api
const initialFetch = async () => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/capital",
    );
    const result = await response.json();
    countryDataArr = result.data;
    console.log(countryDataArr);
    capitals = countryDataArr.map(country => country.capital);
    displayQuiz();
  } catch (error) {
    console.log(error);
    quizContainer.innerHTML = "<p>There was an error loading the quiz...</p>";
  }
};



const displayQuiz = () => {
  //pick a random country
  const dataObject = countryDataArr[getRandomInt(countryDataArr.length)];
  const countryQuestion = dataObject.name;
  correctAnswer = dataObject.capital;
  countryName.textContent = countryQuestion;

  //get 3 other random capitals for option
  let choices = [correctAnswer];
  while (choices.length < 4) {
    const capital = capitals[getRandomInt(capitals.length)];

    if (!choices.includes(capital) && capital !== "") {
      choices.push(capital);
    }
  }
  answerContainer.innerHTML = "";
  //display options
  choices.forEach((choice, index) => {
    
    answerContainer.innerHTML += `
        <div>
            <input type="radio"
                   id="option-${index}"
                   name="choice"
                   value="${choice}">
            <label for="option-${index}">${choice}</label>
        </div>
        `;
  });
};

const checkAnswer = () => {
    //check correct answer

  //how to take user input
  const selected = document.querySelector('input[name="choice"]:checked');
  if (!selected) {
    alert("Please choose an answer.");
    return;
  }
  const userAnswer = selected.value;

  if (userAnswer === correctAnswer) { 
    score++;
    scoreDisplay.textContent = score;
    result.style.color = "green";
    result.textContent = "Corrent Answer🎉"
  }else{
    result.style.color = "red";
    result.textContent = "Wrong Answer❌"
  }
}

nextQuestionBtn.addEventListener("click", () => {
  const hasSelectedAnswer = document.querySelector('input[name="choice"]:checked');

  if (!hasSelectedAnswer) {
    alert("Please choose an answer.");
    return;
  }

  checkAnswer();
  rounds++;

  if (rounds >= maxRounds) {
    result.style.color = "blue";
    result.textContent = `Game Over! Your score is ${score}/${maxRounds}`;
    score = 0;
    rounds = 0;
    scoreDisplay.textContent = score;
    displayQuiz();
  } else {
    displayQuiz();
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

initialFetch();
