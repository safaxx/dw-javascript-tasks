let countries = [];
let capitalCities = [];
const quizContainer = document.querySelector(".quiz-container");
const countryName = document.querySelector(".country");
const answerContainer = document.querySelector(".answers");
let countryDataArr = [];
const nextQuestionBtn = document.querySelector(".next-btn");

//first fetch the countries from api
const initialFetch = async () => {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/capital",
    );
    const result = await response.json();
    countryDataArr = result.data;
    //console.log(countryDataArr);
    displayQuiz(countryDataArr);
  } catch (error) {
    console.log(error);
    quizContainer.innerHTML = "<p>There was an error loading the quiz...</p>";
  }
};

const displayQuiz = (countryDataArr) => {
  //pick a random country
  const dataObject = countryDataArr[getRandomInt(countryDataArr.length)];
  const countryQuestion = dataObject.name;
  const correctAnswer = dataObject.capital;
  countryName.textContent = countryQuestion;

  //get 3 other random capitals for option
  const capitals = countryDataArr.map(country => country.capital);
  let choices = [correctAnswer];
  while (choices.length < 4) {
    const capital = capitals[getRandomInt(capitals.length)];

    if (!choices.includes(capital)) {
      choices.push(capital);
    }
  }
  //display options
  choices.forEach((choice, index) => {
    answerContainer.innerHTML = "";
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
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

initialFetch();
