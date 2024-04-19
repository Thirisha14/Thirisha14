const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement=document.getElementById("question-container")
const questionElement=document.getElementById("question")
const answerButtonsElement=document.getElementById("answer-btns")
const mainHeader=document.getElementById("main-header")
const controlHeader=document.getElementById("control-header")
const result=document.getElementById("result")
const currentTime=document.getElementById("current-time")
const currentQuestion=document.getElementById("current-question")

let currentQuestionIndex,total,wrongAns,seconds,timer,questionCount

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    currentQuestion.innerText="Question: "+(questionCount)+"/10"
    setNextQuestion()
})

function startGame(){
    questionCount=1
    total=0
    wrongAns=0
    seconds=0
    timer = setInterval(timeUpdate,1000);
    result.classList.add("hide")
    startButton.classList.add("hide")
    mainHeader.classList.add("hide")
    controlHeader.classList.add("hide")
    questionElement.classList.remove("hide")
    answerButtonsElement.classList.remove("hide")
    currentQuestionIndex=0
    questionContainerElement.classList.remove("hide")
    currentTime.innerText="Time remaining: "+(60-seconds)+"s"
    currentQuestion.innerText="Question: "+(questionCount)+"/10"
    currentQuestion.classList.remove("hide")
    currentTime.classList.remove("hide")
    setNextQuestion() 
}

function timeUpdate(){
    seconds++
    currentTime.innerText="Time remaining: "+(60-seconds)+"s"
    if(seconds>59){
        output()
    }
}

function setNextQuestion(){
    questionCount++
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText=question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText=answer.text
        button.classList.add("btn")
        if (answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function selectAnswer(e){
    const selectedButton=e.target
    const correct=selectedButton.dataset.correct
    if (correct){
        total+=10
    } else{
        wrongAns++
    }
    Array.from(answerButtonsElement.children).forEach(button=>{
        button.disabled=true
        setStatusClass(button, button.dataset.correct)
    })
    if (questions.length>currentQuestionIndex+1){
        nextButton.classList.remove("hide")
    } else{
        output()
    }
}

function output(){
    clearInterval(timer);
    currentQuestion.classList.add("hide")
    currentTime.classList.add("hide")
    questionElement.classList.add("hide")
    answerButtonsElement.classList.add("hide")
    result.classList.remove("hide")
    nextButton.classList.add("hide")
    if(total>79){
        result.innerText="Excellent!"
        result.style.color="#00b900"
    }else if(total>49){
        result.innerText="Average"
        result.style.color="yellow"
    }else{
        result.innerText="Below Average"
        result.style.color="#c00000"
    }
    mainHeader.innerText="Questions attempted: "+(questionCount-1)+ "\nWrong answers: "+wrongAns+"\nYour score is: "+total+"%"+"\nYou took: "+seconds+"s"
    startButton.innerText="Restart"
    mainHeader.classList.remove("hide")
    controlHeader.classList.remove("hide")
    startButton.classList.remove("hide")
}

function setStatusClass(element, correct){
    element.classList.remove("correct")
    element.classList.remove("wrong")
    if(correct){
        element.classList.add("correct")
    } else{
        element.classList.add("wrong")
    }
}

const questions = [
    {
        question: "What is the most popular toutrist attraction of Sri Lanka ?",
        answers: [
            {text: "Sigiriya", correct: true},
            {text: "Sri Dalada Maligawa", correct: false},
            {text: "Hikkaduwa Beach", correct: false},
            {text: "Yala National Park", correct: false},
        ]
    },
    {
        question: "How many steps does it take to climb Sigiriya ?",
        answers: [
            {text: "400+", correct: false},
            {text: "2000+", correct: false},
            {text: "700+", correct: false},
            {text: "1000+", correct: true},
        ]
    },
    {
        question: "What is the elevation of Sigiriya ?",
        answers: [
            {text: "180m above the surrounding plain", correct: true},
            {text: "500m above sea level", correct: false},
            {text: "180m above sea level", correct: false},
            {text: "500m above the surrounding plain", correct: false},
        ]
    },
    {
        question: "Why was the citadel on top of Sigiriya built ?",
        answers: [
            {text: "It had an amazing scenery", correct: false},
            {text: "To be a sign of wealth", correct: false},
            {text: "It provided protection from attack", correct: true},
            {text: "It had a plethora of resources", correct: false},
        ]
    },
    {
        question: "Sri Dalada Maligawa is also known as: ",
        answers: [
            {text: "Sacred Temple", correct: false},
            {text: "Temple of the Sacred Tooth Relic", correct: true},
            {text: "Tooth Temple", correct: false},
            {text: "Sacred Tooth Temple", correct: false},
        ]
    },
    {
        question: "What religion is associated with Sri Dalada Maligawa ?",
        answers: [
            {text: "Christianity", correct: false},
            {text: "Hinduism", correct: false},
            {text: "Buddhism", correct: true},
            {text: "Islam", correct: false},
        ]
    },
    {
        question: "What is Hikkaduwa cuisine famous for ?",
        answers: [
            {text: "Vegetarian", correct: false},
            {text: "Meat", correct: false},
            {text: "Dairy", correct: false},
            {text: "Seafood", correct: true},
        ]
    },
    {
        question: "What sea creature can be found occasionally at Hikkaduwa beach ?",
        answers: [
            {text: "Giant Sea Turtles", correct: true},
            {text: "Sharks", correct: false},
            {text: "Whales", correct: false},
            {text: "Manatees", correct: false},
        ]
    },
    {
        question: "How many square kilometers does Yala National Park cover ?",
        answers: [
            {text: "700+", correct: false},
            {text: "975+", correct: true},
            {text: "400+", correct: false},
            {text: "1100+", correct: false},
        ]
    },
    {
        question: "What is Yala National Park best known for ?",
        answers: [
            {text: "It's large size", correct: false},
            {text: "It's historical importance", correct: false},
            {text: "It's variety of wildlife", correct: true},
            {text: "The number of animals it protects", correct: false},
        ]
    }
]