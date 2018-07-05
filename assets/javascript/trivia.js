/*Simple timer to be reset after each question created such that the length of time to answer a question can be easily adjusted*/
function Timer(time){
    this.maxTime = time;

    this.startTime = function(){
        intervalID = setInterval(this.count(), 1000);
    }

    this.count = function(){
        maxTime--;
        displayUpdate(maxTime);
    }

    this.reset = function(){
        clearInterval(intervalID);
        this.time = maxTime;
    }

    this.displayUpdate = function(){
        $("#timer").text(maxTime);
    }
}

/*The whole fuckin game ayyo */
var TriviaGame = {
    questionBank = [
        {
            question: "When Nintendo was first founded, what did they sell?",
            correct: "Hanafuda cards",
            answer2: "Videogames",
            answer3: "Wooden toys",
            answer4: "Stationery"
        },
        {
            question: "Where is the Nintendo headquarters located?",
            correct: "Kyoto",
            answer2: "Tokyo",
            answer3: "Sapporo",
            answer4: "Oita"
        },
        {
            question: "What year was Nintendo established?",
            correct: "1889",
            answer2: "1963",
            answer3: "1860",
            answer4: "1975"
        },
        {
            question: "Which is Nintendo's best selling franchise?",
            correct: "Super Mario Bros.",
            answer2: "The Legend of Zelda",
            answer3: "Super Smash Brothers",
            answer4: "Metroid"
        }
    ]
}

var quizTimer = new Timer(30);





