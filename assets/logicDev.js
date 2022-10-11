// variables to keep track of quiz state
var currentQuestionIndex = 0;
var timeLeft = questions.length * 15;
var score = 0;
var timerId; 

// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var timerEl = document.getElementById('time');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');



function startQuiz() {
    console.log('Good job!')
    // hide start screen
    var hide = document.getElementById('intro-screen');
    hide.style.display = 'none';

    // un-hide questions section
    var showQ = document.getElementById('question-screen');
    showQ.style.display = 'block';

    getQuestion();
    //start timer (high)

    timerId = setInterval(countdown, 1000);
    var storedTime = document.getElementById('time');
    function countdown() {
        if (timeLeft <= 0) {
            clearTimeout(timerId);
            quizEnd();
            } else {
                storedTime.innerHTML = timeLeft;
                timeLeft--;
            }
        };
    }

        
function getQuestion() { //this function is going to get the data from the questions array
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];

    // var currentAnswer = currentQuestion.answer;
    // var userChoice = event.target.textContent;
    // if (userChoice !== currentAnswer) {
    //     timeLeft -= 10;
    // }

    currentQuestionIndex++;

    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;

    var answerContainer = document.createElement('ul');
    answerContainer.setAttribute('id', 'answer-buttons');
    document.getElementById('question-container').appendChild(answerContainer);
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var answerBtn = document.createElement('button');
        answerBtn.textContent = currentQuestion.choices[i];
        answerBtn.setAttribute('id', currentQuestion.choices[i]);
        answerBtn.setAttribute('class', 'answers');
        answerContainer.appendChild(answerBtn);
    }
    answerContainer.addEventListener('click', questionClick)
}

function questionClick(event) {
    var chosenAnswer = event.target.id;
    var correctAnswer = questions[currentQuestionIndex].answer;
    console.log(correctAnswer);
    console.log(chosenAnswer);
    // if the clicked element is not a choice button, do nothing.
    // if (!buttonEl.matches('.choice')) {
    //     return;
    // }


    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        document.getElementById('answer-buttons').remove();
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);
    var showQ = document.getElementById("question-screen");
    showQ.style.display = "none"
    timerEl.style.display = "none"
    // show end screen
    var endScreenEl = document.getElementById('quiz-finish');
    endScreenEl.removeAttribute('class');

    // show final score
    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = timeLeft;
}


function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== '') {

        //JSON.parse
        // get saved scores from localstorage (highscores), or if not any, set to empty array
        

        // format new score object for current user
        

        // save to localstorage
        

        // redirect to next page
        window.location.href = 'highscores.html';
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === 'Enter') {
        saveHighscore();
    }
}

// user clicks button to submit initials
// submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.addEventListener('click', startQuiz);

// user clicks on element containing choices
// choicesEl.onclick = questionClick;

// initialsEl.onkeyup = checkForEnter;