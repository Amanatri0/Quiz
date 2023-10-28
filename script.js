const questions = [
        {
            question: "Which is the largest animal in the world?",
            answers: [
                {text:"Shark" , correct: false},
                {text:"Blue whale" , correct: true},
                {text:"Ant" , correct: false},
                {text:"Elephant" , correct: false},
            ]
        },
        {
            question: "Which is the smallest country in the world ?",
            answers: [
                {text:"Vatican City" , correct: true},
                {text:"Nepal" , correct: false},
                {text:"Russia" , correct: false},
                {text:"Shri Lanka" , correct: false},
            ]
        },
        {
            question: "Which is the richest country in the world ?",
            answers: [
                {text:"India" , correct: false},
                {text:"Luxembourg" , correct: true},
                {text:"Pakintan" , correct: false},
                {text:"Qatar" , correct: false},
            ]
    
        },
        {
            question: "What company was originally called 'Cadabra' ?",
            answers: [
                {text:"Amazon" , correct: true},
                {text:"Alibaba" , correct: false},
                {text:"Apple" , correct: false},
                {text:"Nvidia" , correct: false},
            ]
        },
        {
            question: "What sports car company manufactures the 911 ?",
            answers: [
                {text:"BMW" , correct: false},
                {text:"Ferrari" , correct: false},
                {text:"Porsche" , correct: true},
                {text:"Toyota Motor" , correct: false},
            ]
        },
        {
            question: "Which country has won the most World Cups ?",
            answers: [
                {text:"Argentina" , correct: false},
                {text:"Brazil" , correct: true},
                {text:"Germany" , correct: false},
                {text:"France" , correct: false},
            ]
        }
    ];
  
  function initializeQuiz() {
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");
  
    let currentQuestionIndex = 0;
    let score = 0;
  
    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      nextButton.removeEventListener("click", showScore);
      nextButton.addEventListener("click", handleNextButton);
      showQuestion();
    }
  
    function showQuestion() {
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
      currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
      });
    }
  
    function resetState() {
      nextButton.style.display = "none";
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }
  
    function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextButton.style.display = "block";
    }
  
    function showScore() {
      resetState();
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
      nextButton.innerHTML = "Play again";
      nextButton.removeEventListener("click", handleNextButton);
      nextButton.addEventListener("click", () => {
        startQuiz();
      });
      nextButton.style.display = "block";
    }
  
    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }
  
    nextButton.addEventListener("click", handleNextButton);
  
    startQuiz();
  }
  
  initializeQuiz();
  