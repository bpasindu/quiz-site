window.onload = function () {
  const userName = sessionStorage.getItem("userName");
  if (userName) {
    document.getElementById("userName1").innerText = userName;
  }
};

const questionarr = [
  {
    question: "1. What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Text Preprocessor", correct: false },
      { text: "Hyper Text Multiple Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false },
    ],
  },

  {
    question: "2. Which HTML tag is used for the largest heading?",
    answers: [
      { text: "head", correct: false },
      { text: "h1", correct: true },
      { text: "header", correct: false },
      { text: "h6", correct: false },
    ],
  },

  {
    question: "3. Which CSS property controls the space between lines of text?",
    answers: [
      { text: "line-height", correct: true },
      { text: "letter-spacing", correct: false },
      { text: "word-spacing", correct: false },
      { text: "text-indent", correct: false },
    ],
  },

  {
    question:
      "4. In JavaScript, which keyword declares a block-scoped variable?",
    answers: [
      { text: "var", correct: false },
      { text: "function", correct: false },
      { text: "let", correct: true },
      { text: "static", correct: false },
    ],
  },

  {
    question:
      "5. Which HTTP method is typically used to retrieve data from a server?",
    answers: [
      { text: "GET", correct: true },
      { text: "POST", correct: false },
      { text: "PUT", correct: false },
      { text: "DELETE", correct: false },
    ],
  },
];

let questionNumber = 0;
let score = 0;
let countdown;
const timer = document.getElementById("timer");

//Add click event listeners to answer options
document.querySelectorAll(".answer-option").forEach((option) => {
  option.addEventListener("click", function () {
    const radio = this.querySelector('input[type="radio"]');
    radio.checked = true;

    // Add selected class to clicked option
    this.classList.add("selected");
  });
});

function startTime() {
  if (countdown) {
    clearInterval(countdown);
  }

  let timeLeft = 20;

  let seconds = timeLeft % 60;
  timer.textContent = "00:" + (seconds < 10 ? "0" + seconds : seconds);

  countdown = setInterval(() => {
    timeLeft--;
    let seconds = timeLeft % 60;
    timer.textContent = "00:" + (seconds < 10 ? "0" + seconds : seconds);

    if (timeLeft < 0) {
      clearInterval(countdown);
      timer.textContent = "00:00";
      autoMoveNext();
    }
  }, 1000);
}

function autoMoveNext() {
  questionNumber++;

  if (questionNumber < questionarr.length) {
    const selectedRadio = document.querySelector(
      'input[name="question"]:checked'
    );
    if (selectedRadio) {
      selectedRadio.checked = false;
    }
    document.querySelectorAll(".answer-option").forEach((opt) => {
      opt.classList.remove("selected");
    });
    addQuestions();
  } else {
    showScore();
  }
}

function addQuestions() {
  document.getElementById("questionNumber").innerHTML =
    "Question " + (questionNumber + 1) + "/" + questionarr.length;

  document.getElementById("question-i").innerHTML =
    questionarr[questionNumber].question;

  for (let i = 0; i < 4; i++) {
    document.getElementById("label" + (i + 1)).innerHTML =
      questionarr[questionNumber].answers[i].text;
  }
  startTime();
}

function clickNext() {
  const selectedRadio = document.querySelector(
    'input[name="question"]:checked'
  );

  if (!selectedRadio) {
    alert("Please select an answer!");
    return;
  }

  const selectedValue = parseInt(selectedRadio.value) - 1;

  if (questionarr[questionNumber].answers[selectedValue].correct === true) {
    score++;
  } 

  questionNumber++;

  if (questionNumber < questionarr.length) {
    clearInterval(countdown);

    selectedRadio.checked = false;
    document.querySelectorAll(".answer-option").forEach((opt) => {
      opt.classList.remove("selected");
    });
    addQuestions();
  } else {
    clearInterval(countdown);
    showScore();
  }
}

function showScore() {
  clearInterval(countdown);
  timer.style.display = "none";

  document.getElementById("questionNumber").innerHTML = "Quiz Complete!";
  document.getElementById("question-i").innerHTML =
    "You scored " + score + " out of " + questionarr.length + "!";

  document.getElementById("answer-buttons").style.display = "none";

  const nextBtn = document.querySelector(".next-btn");
  nextBtn.innerHTML = "Play Again";

  nextBtn.onclick = restartQuiz;
}

function restartQuiz() {
  questionNumber = 0;
  score = 0;

  timer.style.display = "block";

  document.getElementById("answer-buttons").style.display = "flex";

  const nextBtn = document.querySelector(".next-btn");
  nextBtn.innerHTML = "Next";
  nextBtn.onclick = clickNext;

  addQuestions();
}

addQuestions();
