// JavaScript for Hangman

const $howToPlayBtn = $('#howToPlayBtn');
const $newGameBtn = $('#newGameBtn');
const $instructions = $('#instructions');
const $closeInstructionsBtn = $('#closeInstructions');
const fetchWordURL = 'https://www.wordgamedb.com/api/v1/words/random';

$howToPlayBtn.click(() => $instructions.show(300));
$closeInstructionsBtn.click(() => $instructions.hide(300));
$newGameBtn.click(restartGame);

function restartGame(){
  fetch(fetchWordURL)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
    })
    .then(function(data){
      console.log(data.word);
    })
    .catch(function(){
      console.log('Catch fetch error');
    });
};
