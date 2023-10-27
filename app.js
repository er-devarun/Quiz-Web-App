const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false }
        ]
    }
];

const questionElement = document.querySelector("#question");
const ansBtns = document.querySelector("#ans-btns");
const nextBtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let currentQuestionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestionNo + ". " + currentQuestion.question;

    for(ans of currentQuestion.answers){
        const btn = document.createElement("button");
        btn.innerHTML = ans.text;
        btn.classList.add("btn");
        ansBtns.appendChild(btn);
        if(ans.correct) {
            btn.dataset.correct = ans.correct;
        }
        btn.addEventListener("click", selectAnswer);
    }
}

function resetState() {
    nextBtn.style.display = "none";
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    for(btn of ansBtns.children){
        if(btn.dataset.correct ==="true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    }
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    } else {
        startQuiz();
    }
})

startQuiz();
