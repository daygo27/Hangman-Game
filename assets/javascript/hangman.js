var wordList = ["minolta", "fstop", "apeture", "sony", "dslr", "lense", "iso", "focus"];
var chosenWord = "";
var lettersinChosenWord = [];
var numBlanks = 0;
var blankPush = [];
var wrongGuess = [];
//The counters
var winCount = 0;
var lossCount = 0;
var numGuesses = 9;
//The functions 
function startGame() {
    //random word select, split into letters, determine length
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
    lettersinChosenWord = chosenWord.split("");
    numBlanks = lettersinChosenWord.length;
    console.log(chosenWord);
    console.log(numBlanks);
    //reset variables on each game
    numGuesses = 9;
    blankPush = [];
    wrongGuess = [];
    // loop through word,replace the blanks
    for (var i = 0; i < numBlanks; i++) {
        blankPush.push("_");
    }
    console.log(blankPush);
    //print in the html
    document.getElementById("guessesLeft").innerHTML = numGuesses;
    document.getElementById("wordBlanks").innerHTML = blankPush.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongGuess.join(" ");

}
// check if letter is in word
function checkLetters(letter) {
    var letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] == letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (chosenWord[i] == letter) {
                blankPush[i] = letter;
            }
        }
        console.log(blankPush);
    } else {
        if (wrongGuess.indexOf(letter) > -1) {
            console.log("Letter already guessed");
        } else {
            wrongGuess.push(letter);
            numGuesses--;
        }
    }
}
// game complete function
function gameComplete() {
    // update html to show updates
    document.getElementById("guessesLeft").innerHTML = numGuesses;
    document.getElementById("wordBlanks").innerHTML = blankPush.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongGuess.join(" ");
    // all letters guessed correct
    if (lettersinChosenWord.toString() == blankPush.toString()) {
        winCount++;
        alert("You are a winner!");
        document.getElementById("winCounter").innerHTML = winCount;
        startGame();
    } else if (numGuesses == 0) {
        lossCount++;
        alert("You Lose!!!!");
        document.getElementById("lossCounter").innerHTML = lossCount;
        startGame();
        console.log(lossCount);
        console.log(winCount);
    }
}
// Start game
startGame();
//clicks capture
document.onkeyup = function(event) {
    letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    gameComplete();
}