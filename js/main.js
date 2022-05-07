let quizErrors = document.querySelector(".quiz-errors");
let quizInfo = document.querySelector(".quiz-info");
let welcomName = document.querySelector(".welcoming span");
let quizname = document.querySelector(".category span");
let countspan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitBtn = document.querySelector(".submitting");
let results = document.querySelector(".results");
let countDownContainer = document.querySelector(".countdown");


let currentIndex = 0;
let rightAnswer = 0;
let countDowntimer;

// function to get data from json file
function getQuestions() {
    let myReq = new XMLHttpRequest();

    myReq.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            // convert to js
            let convertquestojs = JSON.parse(this.responseText);

            // get user name from the link
            let userName = (location.search.substring(1).split("&")[0].split("=")[1]);

            // print username 
            welcomName.innerHTML = userName;

            // get the quiz name from json file
            quizname.innerHTML = convertquestojs[currentIndex].quizName;

            // get length [number] of questions from json file
            let quesnumber = convertquestojs.length;

            // console.log(quesnumber);

            // call createBullets and print number
            createBullets(quesnumber);

            // add question content [data]
            addingQuesContent(convertquestojs[currentIndex], quesnumber);

            // timer function to start time
            timer(1800, quesnumber);

            // submit function
            submitBtn.addEventListener("click", () => {
                
                // select all radio input by name
                let getSelectedValue = document.querySelector( 'input[name="questions"]:checked');

                // check if radio button checked or not
                if(getSelectedValue != null) {   
                    
                    let rightAns = convertquestojs[currentIndex].right_answer;
                    // console.log(rightAns);

                    //increase number by 1
                    currentIndex++;

                    //check answer function
                    checkAnswer(rightAns, quesnumber);

                    // empty data to add the next question
                    quizArea.innerHTML = "";
                    answersArea.innerHTML = "";

                    // add new question content [data]
                    addingQuesContent(convertquestojs[currentIndex], quesnumber);

                    // decrease counter of the questions by 1 after click submiting ==
                    countspan.innerHTML--;

                    // show results after submitting
                    showResults(quesnumber);

                    // convert next by finish at the last question 
                    if(currentIndex == (quesnumber - 1)) {
                        submitBtn.innerHTML = "finish";
                    }

                    // empty the error message
                    quizErrors.innerHTML="";
                }
                else 
                {
                    // alert("must choose one");

                    // display the error message
                    quizErrors.innerHTML = "you must choose one answer !";
                    
                }
                
                
            });
        }
    };

    // open json file
    myReq.open("GET", "json/qustions.json", true);
    myReq.send();
}

getQuestions();


// js code functions

// createBullets function 
function createBullets(n) {   // n => number

    // print number to html
    countspan.innerHTML = n-1;  // for remaining questions

}

//addingQuesContent fun
function addingQuesContent(obj, count) {

    // check if the current question index < length number of the questions
    if(currentIndex < count) {

        // create quiz h2
        let quesTitle = document.createElement("h2");
        
        //create question inner text
        let quesText = document.createTextNode(obj['title']);   // == obj.title

        // append text to h2
        quesTitle.appendChild(quesText);

        // append h2 to quiz area 
        quizArea.appendChild(quesTitle);

        // create answers
        for(let i=1; i<=4; i++) {

            //create main div
            let maindiv = document.createElement("div");

            // give it class answer
            maindiv.className = "answer";

            // create input radio
            let radioInput = document.createElement("input");

            // set input radio attriutes
            radioInput.type = "radio";
            radioInput.name = "questions";
            radioInput.id   =  `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // create label
            let answerLabel = document.createElement("label");

            //add for attr to label
            answerLabel.htmlFor = `answer_${i}`;

            // create label text
            let labelText = document.createTextNode(obj[`answer_${i}`]);

            // append text to label
            answerLabel.appendChild(labelText);

            // append input and label to main div
            maindiv.appendChild(radioInput);
            maindiv.appendChild(answerLabel);

            // append all main div to answer area
            answersArea.appendChild(maindiv);
        }

        // just for test
        console.log(obj);
        console.log(count);
    }
            
}

// checkAnswer function
function checkAnswer(correctAns , count) {

    // select all answers [choices]
    let allAnswers = document.getElementsByName("questions");

    let userChoise;

    // loop for all ansers
    for(let i=0; i<allAnswers.length; i++) {
        if(allAnswers[i].checked) {
            userChoise = allAnswers[i].dataset.answer;
        }
    }

    // just for test
    console.log (`right ans is :  ${correctAns}`);
    console.log (`choosen ans is :  ${userChoise}`);
    
    // check answer
    if(correctAns === userChoise) {
        rightAnswer++;
        console.log("yesssssssss");
    }
}

// show results function after submitting
function showResults(count) {

    // declaring the result variablr
    let theResult;

    // if the user received to the last question
    if(currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        bullets.remove();
        submitBtn.remove();
        quizInfo.remove();
        

        if(rightAnswer < count && rightAnswer > count / 2) {
            theResult = `<span class="good">Good </span> Degree : ${rightAnswer * 10} of ${count * 10}`;
        }
        else if(rightAnswer === count) {
            theResult = `<span class="ex">Excellent </span> Degree : ${rightAnswer * 10} of ${count * 10}`;
        }
        else {
            theResult = `<span class="bad">Bad </span> Degree : ${rightAnswer * 10} of ${count * 10}`;
        }

        results.innerHTML = theResult;
    }

}

// count down function {
function timer(duration, count) {

    // check if the current question index < length number of the questions
    if(currentIndex < count) {
        let minutes, seconds;

        countDowntimer = setInterval(function() {

            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            // short if condition to display 0 before time if it less than 10
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            // append time to count down container
            countDownContainer.innerHTML = `${minutes}:${seconds}`;

            // display the result auto after time finish ed
            if(--duration < 0) {

                // remove nodes to show result
                quizArea.remove();
                answersArea.remove();
                bullets.remove();
                submitBtn.remove();
                quizInfo.remove();
                quizErrors.remove();

                if(rightAnswer < count && rightAnswer > count / 2) {
                    theResult = `<span class="good">Good </span> Degree : ${rightAnswer * 10} of ${count * 10}`;
                }
                else if(rightAnswer === count) {
                    theResult = `<span class="ex">Excellent </span> Degree : ${rightAnswer * 10} of ${count * 10}`;
                }
                else {
                    theResult = `<span class="bad">Bad </span> Degree : ${rightAnswer * 10} of ${count * 10}`;
                }
                // show result
                results.innerHTML = theResult;

                // clear interval time
                clearInterval(countDowntimer);

                // just a test
                console.log("time out");
                
            }

        }, 1000);
    }
}

