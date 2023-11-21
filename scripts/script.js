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
const fetchWordURL = 'https://www.wordgamedb.com/api/v1/words/random';
let playerScore;
let gameOver;
let currentWord;

$howToPlayBtn.click(() => $instructions.show(300));
$closeInstructionsBtn.click(() => $instructions.hide(300));
$newGameBtn.click(startGame);

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
  gameOver = false;
  playerScore = 0;
  updateScore(playerScore);
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
      console.log(data.word);
      currentWord = data.word.toUpperCase();
      $hintDiv.text(`HINT: ${data.category} - ${data.hint}`);
      makeWordDiv(currentWord);
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
  for (let i = 0; i < currentWord.length; i++){
    if (currentWord[i] === guess) {
      matches.push(i);
    }
  }
  $(this).addClass('disabled');
  $(this).prop('disabled', true);
  updateWordDiv(matches, guess);
};

function updateWordDiv(arrayOfMatches, letter){
  if (arrayOfMatches.length === 0){
    console.log("wrong guess");
  } else {
    for (let i = 0; i < arrayOfMatches.length; i++){
      $(`#word div:nth-child(${arrayOfMatches[i] + 1})`).text(`${letter}`);
    }
  }
};