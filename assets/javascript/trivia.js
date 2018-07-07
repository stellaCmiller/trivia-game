/*Simple timer to be reset after each question*/
var QuizTimer = {

    timeLeft: 15,

    start: function(){
        intervalID = setInterval(QuizTimer.count, 1000);
    },
    count: function(){
        $("#timer").html(`<div><p>${QuizTimer.timeLeft}</p></div>`);
        QuizTimer.timeLeft--;
    },
    reset: function(){
        clearInterval(intervalID);
        QuizTimer.timeLeft = 15;
    }
}

/*The Trivia Game!! Literally everything is inside this object, yeet */
var TriviaGame = {
    numCorrect: 0,
    numWrong: 0,
    currentQuestion: 1,

    //Shuffles the Questions in the question bank
    shuffleQs: function(){
        this.questionBank = TriviaGame.randomize(TriviaGame.questionBank);
    },

    //Shuffles the answer choices for each question
    shuffleAs: function(){
        for (let i=0; i<TriviaGame.questionBank.length; i++){
            this.questionBank[i].answers = TriviaGame.randomize(TriviaGame.questionBank[i].answers);        
        }
    },

    questionBank: [
        {
            question: "When Nintendo was first founded, what did they sell?",
            answers: [
                {answer: "Hanafuda cards",
                correct: true},
                {answer: "Videogames",
                correct: false},
                {answer: "Wooden toys",
                correct: false},
                {answer: "Stationery",
                correct: false}
            ]
        },
        {
            question: "Where is the Nintendo headquarters located?",
            answers: [
                {answer: "Kyoto",
                correct: true},
                {answer: "Tokyo",
                correct: false},
                {answer: "Sapporo",
                correct: false},
                {answer: "Oita",
                correct: false}
            ]
        },
        {
            question: "What year was Nintendo established?",
            answers: [
                {answer: "1889",
                correct: true},
                {answer: "1963",
                correct: false},
                {answer: "1860",
                correct: false},
                {answer: "1975",
                correct: false}
            ]
        },
        {
            question: "Which is Nintendo's best selling franchise?",
            answers: [
                {answer: "Super Mario Bros.",
                correct: true},
                {answer: "The Legend of Zelda",
                correct: false},
                {answer: "Pokemon",
                correct: false},
                {answer: "Metroid",
                correct: false}
            ]
        },
        {
            question: "What was the Nintendo Entertainment System known as in Japan?",
            answers: [
                {answer: "Famicom",
                correct: true},
                {answer: "NES",
                correct: false},
                {answer: "Nintendo Family Game System",
                correct: false},
                {answer: "Famigame",
                correct: false}
            ]
        }
    ],

    /*Implements Durstenfield's Fisher and Yates Shuffle Algorithm to shuffle the order of the questions and the order of the answer choices*/
    randomize: function(arr){
        var currentIndex = arr.length, randIndex, temp;
        while (currentIndex !==0){
            randIndex = Math.floor(Math.random()*currentIndex);
            currentIndex--;
            temp = arr[currentIndex];
            arr[currentIndex] = arr[randIndex];
            arr[randIndex] = temp;
        }
        return arr;
    },

    showCorrect: function(){
        $("#question-container").empty();
        $("#answer-container").empty();
        $("#question-container").append(`
        <div><h2>CORRECT!!!!!</h2></div>
        <img src='/assets/images/marioStarGet.gif'>`);
        TriviaGame.numCorrect++;
        TriviaGame.currentQuestion++;
        setTimeout(function(){TriviaGame.displayNextQuestion()}, 6000);
    },

    showWrong: function(a, timesup=false){
        $("#question-container").empty();
        $("#answer-container").empty();
        if (timesup){
            $("#question-container").append(`
            <div><h2>Oof, you took too long! The correct answer was: ${a} </h2></div>
            <img src='/assets/images/linkRagdollGif.gif'>`);
        } else {
            $("#question-container").append(`
            <div><h2>Sorry, the correct answer was actually: ${a} </h2></div>
            <img src='/assets/images/linkRagdollGif.gif'>`);
            TriviaGame.numWrong++;
            TriviaGame.currentQuestion++;
        }
        setTimeout(function(){TriviaGame.displayNextQuestion()}, 6000);
    },

    displayNextQuestion: function(){
        if (this.currentQuestion <= this.questionBank.length){
            QuizTimer.start();
            $("#question-container").empty();
            $("#question-container").append(`
            <div><p>${this.currentQuestion}: ${this.questionBank[this.currentQuestion-1].question}</p></div>`);
            this.questionBank[this.currentQuestion-1].answers.forEach(e => {
                $("#answer-container").append(`<div class="answer" style="display: inline-block">${e.answer}</div><br>`);
            })
        } else {
            TriviaGame.displayEndStats();
        }
    },

    getCorrectAnswer: function(){
        var correct;
        TriviaGame.questionBank[TriviaGame.currentQuestion-1].answers.forEach(e => {
            if (e.correct == true){
                correct = e.answer;
            }
        })
        return correct;
    },

    displayEndStats: function(){
        $("#question-container").empty();
        $("#question-container").append(`
        <div><h2>Thanks for Playing! Your score: </h2>
        <p>Correct Answers: ${TriviaGame.numCorrect}</p>
        <p>Wrong Answers: ${TriviaGame.numWrong}</p>
        <p>Try again? </p>
        <button id="play">PLAY AGAIN</button>
        `)
    }

}

/*Click Handlers and Game Logic */
$("body").on("click", "#play", function() {
    TriviaGame.currentQuestion = 1;
    TriviaGame.shuffleQs();
    TriviaGame.shuffleAs();
    TriviaGame.displayNextQuestion();
})

$("body").on("click", ".answer", function(){
    TriviaGame.questionBank[TriviaGame.currentQuestion-1].answers.forEach(e => {
        if (e.answer == $(this).text()){
            if (e.correct == true){
                QuizTimer.reset();
                TriviaGame.showCorrect();
            } else {
                QuizTimer.reset();
                TriviaGame.showWrong(TriviaGame.getCorrectAnswer());
            }
        }
    })
})

