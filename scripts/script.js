// JavaScript for Hangman

const $howToPlayBtn = $('#howToPlayBtn');
const $newGameBtn = $('#newGameBtn');
const $scoreDiv = $('#score');
const $hangmanImg = $('#hangmanImg');
const $wordDiv = $('#word');
const $hintDiv = $('#hint');
const $letterKeys = $('#letterKeys');
const $instructions = $('#instructions');
const $closeInstructionsBtn = $('#closeInstructions');
const $gameOver = $('#gameOverPopup');
const $finalScore = $('#finalScore');
const $correctWord = $('#correctWord');
const $playAgainBtn = $('#playAgain');
const fetchWordURL = 'https://www.wordgamedb.com/api/v1/words/random';
// Object to keep track of game state
const gameState = {
  playerScore: 0,
  incorrectGuesses: 0,
  currentWord: null
};

$howToPlayBtn.click(() => $instructions.fadeIn(300));
$closeInstructionsBtn.click(() => $instructions.fadeOut(300));
$newGameBtn.click(startGame);
$playAgainBtn.click(startGame);

// Add event listener for keyboard input
$(window).keypress(function(e){
  let buttonID = String.fromCharCode(e.which).toUpperCase();
  if(!$(`#${buttonID}`).prop('disabled')){
    $(`#${buttonID}`).click();
  }
});

// Creates buttons for letters
makeLetterKeys();
$letterKeys.children().each(function(){
  $(this).click(makeGuess);
});

function makeLetterKeys(){
  let i = 65;
  while (i <= 90){
    let letter = String.fromCharCode(i);
    $letterKeys.append(`<button class="disabled" id="${letter}" disabled>${letter}</button>`);
    i++;
  }
};

function startGame(){
  gameState.playerScore = 0;
  gameState.incorrectGuesses = 0;
  updateScore(gameState.playerScore);
  $gameOver.fadeOut(300);
  $hangmanImg.attr('src', 'images/drawing/hangman-1.png');
  $letterKeys.children().each(function(){
    $(this).removeClass('disabled');
    $(this).prop('disabled', false);
  });
  getRandomWord();
};

function getRandomWord(){
  fetch(fetchWordURL)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
    })
    .then(function(data){
      gameState.currentWord = data.word.toUpperCase();
      $hintDiv.text(`HINT: ${data.category} - ${data.hint}`);
      makeWordDiv(gameState.currentWord);
    })
    .catch(function(){
      console.log('Catch fetch error');
    });
};

function makeWordDiv(word){
  $wordDiv.empty();
  let n = word.length;
  for (let i = 1; i <= n; i++){
    const $letterDiv = $('<div></div>');
    $wordDiv.append($letterDiv);
  }
};

function updateScore(score){
  $scoreDiv.text(`SCORE: ${score}`);
};

function makeGuess(){
  let guess = $(this).attr('id');
  let matches = [];
  for (let i = 0; i < gameState.currentWord.length; i++){
    if (gameState.currentWord[i] === guess) {
      matches.push(i);
    }
  }
  $(this).addClass('disabled');
  $(this).prop('disabled', true);
  validateGuess(matches, guess);
};

function validateGuess(arrayOfMatches, letter){
  if (arrayOfMatches.length === 0){
    gameState.incorrectGuesses++;
    $hangmanImg.attr('src', `images/drawing/hangman-${gameState.incorrectGuesses + 1}.png`);
    if (gameState.incorrectGuesses === 6){
      gameOver();
    }
  } else {
    for (let i = 0; i < arrayOfMatches.length; i++){
      $(`#word div:nth-child(${arrayOfMatches[i] + 1})`).text(`${letter}`);
    }
    if (!$wordDiv.children().is(':empty')){
      gameState.playerScore++;
      updateScore(gameState.playerScore);
      $letterKeys.children().each(function(){
        $(this).removeClass('disabled');
        $(this).prop('disabled', false);
      });
      getRandomWord();
    };
  };
};

function gameOver(){
  $letterKeys.children().each(function(){
    $(this).addClass('disabled');
    $(this).prop('disabled', true);
  });
  $correctWord.text(`The correct word was ${gameState.currentWord}.`);
  $finalScore.text(`Final score: ${gameState.playerScore}`);
  $gameOver.fadeIn(300);
};
