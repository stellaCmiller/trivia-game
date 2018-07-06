/*Simple timer to be reset after each question*/
var QuizTimer = {

    timeLeft: 30,

    start: function(){
        intervalID = setInterval(QuizTimer.count, 1000);
    },

    count: function(){
        $("#timer").html(`<div><p>${QuizTimer.timeLeft}</p></div>`);
        QuizTimer.timeLeft--;
    },

    reset: function(){
        clearInterval(QuizTimer.intervalID);
        timeLeft = 30;
    }
}

/*The whole fuckin game ayyo */
var TriviaGame = {
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
                {answer: "Super Smash Brothers",
                correct: false},
                {answer: "Metroid",
                correct: false}
            ]
        }
    ],

    //Implements Durstenfield's Fisher and Yates Shuffle Algorithm
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
}

var currentQuestion = 1;
var questionGrabber = TriviaGame.questionBank[(currentQuestion-1)].question;
var answersGrabber = TriviaGame.randomize(TriviaGame.questionBank[(currentQuestion-1)].answers);

$("#play").click(function(){

    QuizTimer.start();
    $("#question-container").empty();
    $("#question-container").append(`
    <div><p>${currentQuestion}: ${questionGrabber}</p></div>`);
    answersGrabber.forEach(e => {
        $("#answer-container").append(`<div>${e.answer}</div>`);
    })
    
})
