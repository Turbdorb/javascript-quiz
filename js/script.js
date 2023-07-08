// get all variables
var startContainer = document.getElementById('start-container');
var startBtn = document.getElementById('start-btn');
var quizContainer = document.getElementById('quiz-container');
var timerEl = document.getElementById('current-time');
var currentScoreEl = document.getElementById('current-score');

var score = 0;
var time = 100;
var questionIndex = 0;

var quizData = [
    {
        question: "What are For Loops useful for?",
        choices: ["answer 1 for question 1", "To run the same code over and over again, with a different value each time.", "answer 3 for question 1"],
        correct: "To run the same code over and over again, with a different value each time."
    },
    {
        question: "this is question TWO",
        choices: ["answer 1 for question 2", "answer 2 for question 2", "answer 3 for question 2"],
        correct: "answer 2 for question 2"
    },
];

startBtn.addEventListener("click", function () {
    currentScoreEl.textContent = score;
    startContainer.classList.add('hide');
    startTimer();
    renderQuestions();
});

function startTimer() {
    // adds the timerEl to the html with the time var as the text content
    timerEl.textContent = time;
    // sets an interval
    var timeInterval = setInterval(function() {
        time --;
        timerEl.textContent = time;
        if(time === 0 || questionIndex >= quizData.length) {
            timerEl.textContent = " ";
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000)
}

function endQuiz() {
    // create an input el for users name
    var inputEl = document.createElement('input');
    inputEl.setAttribute("id", "initials");
    quizContainer.append(inputEl);

    // create a button for the input el
    var userInputBtn = document.createElement('button');
    quizContainer.append(userInputBtn);
    userInputBtn.textContent = "Submit";
    
    // adds an event listener to the button
    userInputBtn.addEventListener('click', function() {
        // takes the inputEl value and save it to local storage
        console.log(inputEl.value);
        localStorage.setItem("initials", inputEl.value);
        // sends user to scores page
        window.location.href="score-page.html";
    })
}

function renderQuestions() {

    quizContainer.textContent = ''
    if (questionIndex >= quizData.length) {
        console.log('quiz is over');
        return;
    }

    var questionEl = document.createElement('h2');
    questionEl.setAttribute("class", "question");
    questionEl.textContent = quizData[questionIndex].question;
    quizContainer.append(questionEl);

    for (var i = 0; i < quizData[questionIndex].choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice');
        choiceBtn.textContent = quizData[questionIndex].choices[i];
        quizContainer.append(choiceBtn);

        choiceBtn.addEventListener('click', function(event) {
            var clicked = event.target.textContent;
            if (clicked === quizData[questionIndex].correct) {
                console.log('correct');
                // add to score
                score += 50;
            } else {
                console.log("incorrect");
                // subtract from current time
                time -= 10;
            }
            currentScoreEl.textContent = score;
            questionIndex++;
            renderQuestions();
        })
    }
}