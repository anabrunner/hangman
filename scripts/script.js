// JavaScript for Hangman

const $howToPlayBtn = $('#howToPlayBtn');
const $newGameBtn = $('#newGameBtn');
const $wordDiv = $('#word');
const $hintDiv = $('#hint');
const $instructions = $('#instructions');
const $closeInstructionsBtn = $('#closeInstructions');
const fetchWordURL = 'https://www.wordgamedb.com/api/v1/words/random';

$howToPlayBtn.click(() => $instructions.show(300));
$closeInstructionsBtn.click(() => $instructions.hide(300));
$newGameBtn.click(getRandomWord);

function getRandomWord(){
  fetch(fetchWordURL)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
    })
    .then(function(data){
      console.log(data.word);
      console.log(data.word.length);
      $hintDiv.text(`HINT: ${data.hint}`);
      makeWordDiv(data.word);
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
