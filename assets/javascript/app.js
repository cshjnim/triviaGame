console.log("See this to try if this works")

// jquery for game playing

$(document).ready(function() {
  $("#remaining-time").hide();
  $("#start").on ("click", game.startGame);
  $(document).on("click", '.option', game.guessChecker);
})
  
var game = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  timer: 20,
  timerOn: false,
  timerId: '',
  currentSet: 0,

  // questions options and answers data
 questions: {
  q1: 'Which actress has won the most Oscars?',
  q2: 'Which chess piece can only move diagonally?',
  q3: 'How many valves does a trumpet have?',
  q4: 'When did the Cold War end?',
  q5: "In the Marvel cinematic universe, what is the name of Thor's home planet?",
  q6: 'What does the "E" stand for in the name of the Chuck E Cheese?',
  q7: "What is the only Major League Baseball team to never make it to the World Series?"
},
options: {
  q1: ['Audley Hepburn', 'Jessica Simpson', 'Meryl Streep', 'Katherine Hepburn'],
  q2: ['Queen', 'Bishop', 'Knight', 'Pawn'],
  q3: ['5', '2', '1', '3'],
  q4: ['1989', '1991', '1985', '1986'],
  q5: ['Darbia','Asgard','Earth','Vormir'],
  q6: ['Edgar','Edward','Entertainment','Energy'],
  q7: ['Seattle Mariners', 'LA Dodgers', 'DC National','Houston Astros']
},
answers: {
  q1: 'Katherine Hepburn',
  q2: 'Bishop',
  q3: '3',
  q4: '1989',
  q5: 'Asgard',
  q6: 'Entertainment',
  q7: 'Seattle Mariners'
},
  
  startGame : function(){
    //variable
    game.currentSet = 0;
    game.correct =0;
    game.incorrect=0;
    game.unanswered = 0;
    clearInterval(game.timerId);
    //how the page should display
    $('#game').show();
    $('#results').html('');
    $('#timer').text(game.timer);
    $('#start').hide();
    $('#remaining-time').show();

    game.nextQuestion ();
  },

  // how to run next questions
  nextQuestion: function(){
    game.timer =20;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(game.timer);
    if(!game.timerOn){
      game.timerId = setInterval(game.timerRunning, 1000);
    }
    
    var questionContent = Object.values(game.questions)[game.currentSet];
    $('#question').text(questionContent);
    var questionOptions = Object.values(game.options)[game.currentSet];
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
  },

// when timer runs out
  timerRunning: function (){
    if(game.timer > -1 && game.currentSet < Object.keys(game.questions).length){
      $('#timer').text(game.timer);
      game.timer--;
        if(game.timer === 4){
          $('#timer').addClass('last-seconds');
        }
      }
        else if(game.timer === -1){
          game.unanswered++;
          game.result = false;
          clearInterval(game.timerId);
          resultId = setTimeout(game.guessResult, 1000);
          $('#results').html('<h3>Out of time! The answer was '+ Object.values(game.answers)[game.currentSet] +'</h3>');
        }

    else if(game.currentSet === Object.keys(game.questions).length){
    
      // adds results here
      $('#results')
        .html('<h3>Play again!</h3>'+
        '<p>Correct: '+ game.correct +'</p>'+
         '<p>Incorrect: '+ game.incorrect +'</p>'+
        '<p>Unaswered: '+ game.unanswered +'</p>');
      
      $('#game').hide();
      $('#start').show();}
    },

    // method to evaluate the option clicked
  guessChecker : function(){

    var resultId;
    var currentAnswer = Object.values(game.answers)[game.currentSet];
    //if correct
    if ($(this).text() === currentAnswer) {
      $(this).addClass('btn-success').removeClass('btn-info');
      game.correct++;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $('#results').html('<h3>Correct!</h3>');
    }
    //if wrong
    else {
      $(this).addClass('btn-danger').removeClass('btn-info');
    
      game.incorrect++;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $('#results').html('<h3>Wrong! Answer is: '+ currentAnswer +'</h3>');
    }
  },
  // method to remove previous question results and options
  guessResult : function(){
    
    game.currentSet++;
    
    $('.option').remove();
    $('#results h3').remove();

    game.nextQuestion();
    

  }
}